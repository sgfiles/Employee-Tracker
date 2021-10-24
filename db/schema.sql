-- Drops the db if it exists currently --
DROP DATABASE IF EXISTS employees_db;
-- Creates the db database --
CREATE DATABASE employees_db;
-- Makes it so all of the following code will affect db --
USE employees_db;
-- Creates the tables within db --
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30)UNIQUE NOT NULL,
  last_name VARCHAR(30)UNIQUE NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);
