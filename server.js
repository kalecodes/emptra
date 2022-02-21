const mysql = require("mysql2");
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = require('./db/connection');
const Connection = require("mysql2/typings/mysql/lib/Connection");

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    appStart();
})

// App start screen
const appStart = () => {
    console.log("***********************************")
    console.log("*                                 *")
    console.log("*             EMPTRA              *")
    console.log("*        EMPLOYEE MANAGER         *")
    console.log("*                                 *")
    console.log("***********************************")
    promptUser();
}

// Initial inquirer prompt
const promptUser = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What action would you like to take?',
            choices: [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
                'Update an employee manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View department budgets',
                'No Action'
            ]

        }
    ])
    .then((answer) => {
        if (answer === 'View all departments') {

        }
        if (answer === 'View all roles') {

        }
        if (answer === 'View all employess') {

        }
        if (answer === 'Add a department') {

        }
        if (answer === 'Add a role') {

        } 
        if (answer === 'Add an employee') {

        }
        if (answer === 'Update an employee role') {

        }
        if (answer === 'Update an employee manager') {

        }
        if (answer === 'View employees by department') {

        }
        if (answer === 'Delete a department') {

        }
        if (answer === 'Delete a role') {

        }
        if (answer === 'Delete an employee') {

        }
        if (answer === 'View department budgets') {

        }
        if (answer === 'No Action') {
            db.end()
        }
    })
}