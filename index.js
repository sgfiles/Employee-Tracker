const inquirer = require('inquirer');
const db = require('./db')
require('console.table');


inquirer
  .prompt([ {
      type:'List',
      name:'List',
      message: 'What would you like to do?',
      choices: [
          {
              name:'Add Employee',
              value:'ADD_EMPLOYEE'
          },
          {
              name:'View Employee',
              value:'VIEW_EMPLOYEE'
          },
          {
              name:'View Role',
              value:'VIEW EMPLOYEE'
          },
          {
              name:'Add Role',
              value:'ADD ROLE'
          },
          {
              name:'View Department',
              value:'VIEW DEPARTMENT'
          },
          {
              name:'Add Department',
              value:'ADD ROLE'
          }
      ]
    },
]).then((response) => {
    let choice = response.choice
})/// GIANT ASS SWITCH STATEMENT
//   [
//    {
//     type:'input',
//     name: 'name',
//     message: 'What is the employee first name?'
//    },
//    {
//     type:'input',
//     name: 'name',
//     message: 'What is the employee last name?'
//    },
//    {
//     type:'list',
//     name: 'name',
//     message: 'What is the employee role?',
//     choices:[Manager, Supervisor, Clerk, Cashier]
//    },

//   ]