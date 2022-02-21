INSERT INTO department (name)
VALUES
('Accounting & Finance'),
('IT'),
('Sales & Marketing'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES 
('Accountant', 45000, 1),
('Financial Analyst', 75000, 1),
('UI/UX Designer', 68000, 2),
('Software Developer', 90000, 2),
('Full Stack Enginerr', 110000, 2),
('Project Manager', 80000, 4),
('Operations Manager', 85000, 4),
('Marketing Manager', 70000, 3),
('Sales Lead', 78000, 3),
('Sales Development Manager', 92000, 3),
('CEO', 9000000, NULL),
('CFO', 2000000, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Richard', 'Spence', 11, null),
('Monty', 'Money', 12, null),
('Harry', 'Styles', 10, 1),
('Nicki', 'Minaj', 6, 1),
('Kalen', 'Wiley', 5, 4),
('Kyle', 'Molder', 9, 3),
('Rebecca', 'Lakes', 3, 4),
('Crystal', 'Geiser', 7, 4),
('Hannah', 'Malley', 1, 2),
('Harrison', 'Hughes', 2, 2),
('Morgan', 'Mackey', 9, 3),
('Alexis', 'Looney', 8, 1),
('Katy', 'Clack', 3, 4),
('Meek', 'Single', 4, 4);

