const express = require('express');
const inquirer = require('inquirer');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const pool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'employeetracker_db',
        password: 'prince'
        
    },
console.log('Connected to the employeetracker_db database'))
    
pool.connect();

// Setup prompt for options menu:

/* const options = [
    {
    type: 'list', 
    name: 'options',
    message: 'Choose an option:',
    choices: ['View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee',
            'Exit'
    ] 
}] */

//initialize app:
async function init() {
    const { options } = await inquirer.prompt([
    {
    type: 'list', 
    name: 'options',
    message: 'Choose an option:',
    choices: ['View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee',
            'Exit'
    ] 
}]);

switch (options) {
    case 'View all departments':
        await pool.query('SELECT * FROM departments;',
            function (err, {rows}) {
                console.table(rows);
            });
        break;
    case 'View all roles':
        await pool.query('SELECT * FROM roles;',
            function (err, {rows}) {
                console.table(rows);
            });
        break;
    case 'View all employees':
        await pool.query('SELECT * FROM employees;',
            function (err, {rows}) {
                console.table(rows);
            }
        );
        break;
    case 'Add a department':
        inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:',
            }
        ])
       .then(answers => {
         pool.query('INSERT INTO departments (name) VALUES ($1)', [answers.departmentName], (err, result) => {
             if (err) {
                 console.error(err.stack);
             } else {
                 console.log(`Department ${answers.departmentName} added successfully`);
             }
         });
        });
        break;

    case 'Add a role':
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'Enter the title of the role:',
            },
            {
                type: 'input', 
                name: 'salary', 
                message: 'Enter salary:'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID of the role:',
            }
        ])
       .then(answers => {
         pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [answers.roleName, answers.salary, answers.department_id], (err, result) => {
             if (err) {
                 console.error(err.stack);
             } else {
                 console.log(`Role ${answers.roleName} added successfully`);
             }
         });
        });
        break;

    case 'Add an employee':
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee:',
            },
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the role of the employee:',
            }, 
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager ID of the employee (leave blank if none):',
            }

        ])
       .then(answers => {
        /* pool.query('SELECT id FROM roles WHERE title = $1', [answers.roleTitle], (err, {rows}) => {
             if (err) {
                 console.error(err.stack);
                 res.status(500).send('Error finding role ID');
             } else {
                 const roleTitle = rows[0].title; */
                 pool.query('INSERT INTO employees (first_name, last_name, role_title, manager_id) VALUES ($1, $2, $3, $4)', [answers.firstName, answers.lastName, answers.roleTitle, answers.manager_id], (err, result) => {
                     if (err) {
                         console.error(err.stack);
                     } else {
                         console.log(`Employee ${answers.firstName} ${answers.lastName} added successfully`);
                     }
                 });
                })
        break;
        case 'Update an employee role':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter the ID of the employee to update:',
                },
                {
                    type: 'input',
                    name: 'roleTitle',
                    message: 'Enter the new role of the employee:',
                }, 
            ])
           .then(answers => {
             pool.query('SELECT id FROM roles WHERE title = $1', [answers.roleTitle], (err, {rows}) => {
                 if (err) {
                     console.error(err.stack);
                 } else {
                     const roleTitle = rows[0].title;
                     pool.query('UPDATE employees SET role_title = $1 WHERE id = $2', [roleTitle, answers.employeeId], (err, result) => {
                         if (err) {
                             console.error(err.stack);
                         } else {
                             console.log(`Employee role updated successfully for employee ID ${answers.employeeId}`);
                         }
                     });
                 }
             })})}};
        
//    return response;


//SET UP QUERIES: 

// const { options } = init();


init();

app.use((req, res) => {
        res.status(404).end();
    });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});

