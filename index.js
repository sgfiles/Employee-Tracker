const inquirer = require('inquirer');
const db = require('./db')
require('console.table');


inquirer
  .prompt([ 
      {
      type:'List',
      name:'choice',
      message: 'What would you like to do?',
      choices: [
          {
              name:'View All Employees',
              value:'VIEW_EMPLOYEE'
          },
          {
              name:'View all Employees by Department',
              value:'VIEW_EMPLOYEES_BY_DEPARTMENT'
          },
          {
              name:'Add Employee',
              value:'ADD_EMPLOYEE'
          },
          {
              name:'Remove Employee',
              value:'REMOVE_EMPLOYEE'
          },
          {
              name:'Update Employee Role',
              value:'UPDATE_EMPLOYEE_ROLE'
          },
          {
              name:'View All Roles',
              value:'VIEW_ALL_ROLES'
          },
          {
              name:'Add Role',
              value:'ADD_ROLE'
          },
          {
              name:'Remove Role',
              value:'REMOVE_ROLE'
          },
          {
              name:'Add Department',
              value:'ADD_DEPARTMENT'
          },
          {
              name:'Remove Department',
              value:'REMOVE_DEPARTMENT'
          },
          {
              name:'Quit',
              value:'QUIT'
          }
      ]
    }
]).then(res => {
    let choice = res.choice;
///// finish switch statements
    switch (choice) {
        case 'VIEW_EMPLOYEES':
            viewEmployees();
            break;
        case 'ADD_EMPLOYEE':
            addEmployee();
        case 'REMOVE_EMPLOYEE':
            removeEmployee();
        case 'UPDATE_EMPLOYEE_ROLE':
            updateEmployeeRole();
            break;
        case 'UPDATE_EMPLOYEE_MANAGER':
            updateEmployeeManager();

        default:
            break;
    }
})

function viewEmployees() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log('\n');
        console.table(employees);
    })
    .then(() => inquirer.prompt());
}

function viewEmployeesByDepartment() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name}) => ({
            name: name,
            value: id
        }));

        prompt([
            {
                type: 'list',
                name:'departmentId',
                message: 'Which department would you like to see employees for?',
                choices: departmentChoices
            }
        ])
        .then(res => db.findAllEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => inquirer.prompt())
    });
}

function viewEmployeesByManager() {
    db.findAllEmployees()
    .then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(({ id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
            {
                type:'list',
                name:'managerId',
                message:'Which employee do you want to see direct reports for?',
                choices: managerChoices
            }
        ])
        .then(res => db.findAllEmployeesByManager(res.managerId))
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            if (employees.length == 0) {
                console.log('The selected employee has no direct reports');
            } else {
                console.table(employees);
            }
        })
        .then(() => inquirer.prompt())
    });
}

function removeEmployee() {
    db,findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

        prompt([
            {
                type:'list',
                name:'employeeId',
                message:'Which employee do you want to remove?',
                choices: employeeChoices
            }
        ])
        .then(res => db.removeEmployee(res.employeeId))
        .then(() => console.log('Removed employee from the database'))
        .then(() => inquirer.prompt())
    })
}

function updateEmployeeRole() {
    BroadcastChannel.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        prompt([
            {
                type:'list',
                name:'employeeId',
                message:'Which employees role do you want to update?',
                choices: employeeChoices
            }
        ])
        .then(res => {
            let employeeId = res.employeeId;
            db.findAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoices = roles.map(({ id, title}) => ({
                    name: title,
                    value: id
                }));

                prompt([
                    {
                    type:'list',
                    name:'roleId',
                    message:'Which role do you want to assign the selected employee?',
                    choices: roleChoices
                    }
                ])
                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                .then(() => console.log('Updated employees role'))
                .then(() => inquirer.prompt())
            });
        });
    })
}

function updateEmployeeManager() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows;

    })
}
/// continue functions