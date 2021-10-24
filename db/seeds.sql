INSERT INTO deparment (id, name)
VALUES  (01, 'Women'),
        (02, 'Men'),
        (03, 'Kids'),
        (04, 'Pets');

INSERT INTO role (title,salary, department_id)
VALUES   ('Manager', 50000, 01),
         ('Supervisor', 40000, 02),
         ('Clerk', 30000, 03),
         ('Cashier', 20000, 04);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES   ('Homer', 'Simpson', 3, NULL)
         ('Turanga', 'Leela', 1)
         ('Arthur', 'Read', 4, NULL)
         ('Peggy', 'Bundy',2)