use employees_db;

INSERT INTO deparment (id, name)
VALUES  ( 'Women'),
        ( 'Men'),
        ( 'Kids'),
        ( 'Pets');

INSERT INTO role (title,salary, department_id)
VALUES   ('Manager', 50000, 01),
         ('Supervisor', 40000, 02),
         ('Clerk', 30000, 03),
         ('Cashier', 20000, 04);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES   ('Homer', 'Simpson', 03, NULL),
         ('Turanga', 'Leela', 01,3),
         ('Arthur', 'Read', 04, NULL),
         ('Peggy', 'Bundy',02,1);