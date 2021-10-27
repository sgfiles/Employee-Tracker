const inquirer = require('inquirer');
const db = require('./db')
require('console.table');
loadPrompts()
function loadPrompts() {


inquirer
    .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View Employees',
                    value: 'VIEW_EMPLOYEE'
                },
                {
                    name: 'View all Departments',
                    value: 'VIEW_BY_DEPARTMENT'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Remove Employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ALL_ROLES'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Remove Role',
                    value: 'REMOVE_ROLE'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Remove Department',
                    value: 'REMOVE_DEPARTMENT'
                },
                {
                    name: 'Quit',
                    value: 'QUIT'
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        ///// finish switch statements
        switch (choice) {
            case 'VIEW_EMPLOYEE':
                viewEmployees();
                break;
            case 'VIEW_BY_DEPARTMENT':
                viewByDepartment();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
            case 'REMOVE_EMPLOYEE':
                removeEmployee();
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            case 'VIEW_ALL_ROLES':
                viewAllRoles();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'REMOVE_ROLE':
                removeRole();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'REMOVE_DEPARTMENT':
                removeDepartment();
                break;
            default:
                quit();
        }
    })
}

function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => loadPrompts());
}

function viewByDepartment() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log('\n');
            console.table(departments)

        })
        .then(() => loadPrompts());
}

 function addEmployee() {
     db.createEmployee()
     .then(([rows]) => {
         let employee = rows;
         const addEmployeeChoice = create.employee(({ name, id}) => ({
             name: name,
             value:id
         }))
     })
 }
// function viewEmployeesByManager() {
//     db.findAllEmployees()
//     .then(([rows]) => {
//         let managers = rows;
//         const managerChoices = managers.map(({ id, first_name, last_name}) => ({
//             name: `${first_name} ${last_name}`,
//             value: id
//         }));

//         prompt([
//             {
//                 type:'list',
//                 name:'managerId',
//                 message:'Which employee do you want to see direct reports for?',
//                 choices: managerChoices
//             }
//         ])
//         .then(res => db.findAllEmployeesByManager(res.managerId))
//         .then(([rows]) => {
//             let employees = rows;
//             console.log('\n');
//             if (employees.length == 0) {
//                 console.log('The selected employee has no direct reports');
//             } else {
//                 console.table(employees);
//             }
//         })
//         .then(() => inquirer.prompt())
//     });
// }

function removeEmployee() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Which employee do you want to remove?',
                    choices: employeeChoices
                }
            ])
                .then(res => db.removeEmployee(res.employeeId))
                .then(() => console.log('Removed employee from the database'))
                .then(() => inquirer.prompt())
        })
}

function updateEmployeeRole() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Which employees role do you want to update?',
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.findAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            prompt([
                                {
                                    type: 'list',
                                    name: 'roleId',
                                    message: 'Which role do you want to assign the selected employee?',
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

function viewAllRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const viewRoleChoices = role.map(({ id, title}) => {
                name:title,
                value; id
            })

        })
}

function addRole() {
    db.createRole()
    .then(([rows]) => {
        let addRole = rows;
    }).then(() => console.log('Role added'))
}

function removeRole() {
    db.removeRole()
    .then(([rows]) => {
         removeRoleChoices = role.destroy(({first_name, last_name, id}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))
        .then(() => console.log('Removed role from the database'))
    })
}

function addDepartment() {
    db.addDepartment()
    .then(([rows]) => {
        let addDepartment = db.updateDepartment(role)
    }).then(() => console.log('Added Department!'))
}

function removeDepartment() {
    db.removeDepartment
}

function quit() {
    console.log('Goodbye') 
    process.exit()
}
///