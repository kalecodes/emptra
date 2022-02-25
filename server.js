const inquirer = require('inquirer');
const db = require('./config/connection');


// app.use routes go here


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
    inquirer
    .prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What action would you like to take?',
            choices: [
                'View all Departments', 
                'View all Roles', 
                'View all Employees',
                'View Employees by Department',
                'View Department Budgets',
                'Add a Department', 
                'Add a Role', 
                'Add an Employee', 
                'Update Employee Role',
                'Update Employee Manager',
                'Delete a Department',
                'Delete a Role',
                'Remove an Employee',
                'Exit'
            ]
        }
    ])
    .then((answers) => {
        const {choices} = answers;
        if (choices === 'View all Departments') {
            viewAllDepartments();
        }
        if (choices === 'View all Roles') {
            viewAllRoles();
        }
        if (choices === 'View all Employess') {
            viewAllEmployees();
        }
        if (choices === 'View Employees by Department') {
            
        }
        if (choices === 'View Department Budgets') {

        }
        if (choices === 'Add a Department') {

        }
        if (choices === 'Add a Role') {

        } 
        if (choices === 'Add an Employee') {

        }
        if (choices === 'Update Employee Role') {

        }
        if (choices === 'Update Employee Manager') {

        }
        if (choices === 'Delete a Department') {

        }
        if (choices === 'Delete a Role') {

        }
        if (choices === 'Remove an Employee') {

        }
        if (choices === 'Exit') {
            db.end()
        }
    })
}


// // ---------------------------------- VIEW -------------------//
const viewAllDepartments = () => {
    const sql = `SELECT department.name AS Department FROM department`;

    db.promise().query(sql)
    .then( ([rows,fields]) => {
        console.log(rows);
    })
    .catch(console.log)
    .then( () => {
        db.end()
        promptUser();
    })
};
