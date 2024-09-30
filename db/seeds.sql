INSERT INTO departments (id, name)
VALUES 
(01, 'Human Resources'), 
(02, 'Accounting'), 
(03, 'Marketing'), 
(04, 'Sales'), 
(05, 'IT'),
(06, 'Administration');

INSERT INTO roles (id, title, salary, department_id)
VALUES
(10, 'CEO', 700000, 06),
(11, 'HR Manager', 200000, 01), 
(12, 'Accounting Manager', 250000, 02),
(13, 'Marketing Manager', 300000, 03),
(14, 'Sales Manager', 350000, 04),
(15, 'IT Manager', 275000, 05),
(16, 'HR Associate', 65000, 01),
(17, 'Accountant', 80000, 02),
(18, 'Marketing Executive', 65000, 03),
(19, 'Sales Representative', 70000, 04),
(20, 'IT Specialist', 80000, 05), 
(21, 'Administrative Assistant', 45000, 06);



INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
(01, 'Luke', 'Cannon', 10, null),
(02, 'Brenda', 'Sewell', 11, 01),
(03, 'Jason', 'Taylor', 12, 01),
(04, 'David', 'Smith', 13, 01),
(05, 'Samantha', 'Johnson', 14, 01), 
(06, 'Jessica', 'Williams', 15, 01), 
(07, 'Michael', 'Thompson', 16, 02),
(08, 'Emily', 'Jackson', 17, 03),
(09, 'Daniel', 'White', 18, 04),
(10, 'Robert', 'Brown', 19, 05),
(11, 'Christopher', 'Davis', 20, 06),
(12, 'Anna', 'Miller', 21, 01);
