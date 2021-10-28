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
                    name: 'View Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
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
                case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                 break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'ADD_DEPARTMENT':
                createDepartment();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                 updateEmployeeRole();
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

function viewRoles() {
    db.findRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log('\n');
        console.table(roles)

    })
    .then(() => loadPrompts())
}

function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            message:"What's employee first name?"
        },
        {
            name:'last_name',
            message:"What is employee last name?"
        },
    ])

    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name
        db.findRoles()
        .then(([rows]) => {
            let roles = rows;
           const choiceRoles = roles.map(({id, title}) =>
           ({
               name:title,
               value:id
           }))
           inquirer.prompt({
               
                   type: 'list',
                   name: 'roleId',
                   message:"What is the employee role?",
                   choices: choiceRoles
           })
           .then(res => {
               let roleId = res.roleId
               db.findAllEmployees()
               .then(([rows]) => {
                   let employees = rows;
                   const choiceManagers = employees.map(({id, first_name, last_name}) => ({
                       value: id,
                       name: `${first_name} ${last_name}`
                   }))
                   choiceManagers.unshift({name:"none", value:null})
                   inquirer.prompt({
                       type:'list',
                       name:'managerId',
                       message:"Who is this employee's manager?",
                       choices: choiceManagers
                   })
                   .then(res => {
                       let employee = {
                           manager_id:res.managerId,
                           role_id: roleId,
                         first_name:firstName, last_name:lastName 
                       }
                       db.createEmployee()

                   }).then(() => console.log(
                    `Added ${firstName} ${lastName} to the database`
                  ))
                  .then(() => loadPrompts())
               })

           })
    
        })
    })
 }

 function addRole() {
    db.createRole()
    .then(([rows]) => {
        let addRole = rows;
    }).then(() => console.log('Role added'))
}

function createDepartment() {
    db.addDepartment()
    .then(([rows]) => {
        let addDepartment = db.createDepartment(role)
    }).then(() => console.log('Added Department!'))
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
                                .then(() => loadPrompts())
                        });
                });
        })
}


function quit() {
    console.log('Goodbye') 
    process.exit()
}
///