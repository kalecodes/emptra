const inquirer = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');
const { ADDRGETNETWORKPARAMS } = require('dns');


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
            viewAllDeps();
        }
        if (choices === 'View all Roles') {
            viewAllRoles();
        }
        if (choices === 'View all Employees') {
            viewAllEmps();
        }
        if (choices === 'View Employees by Department') {
            viewEmpByDep();
        }
        if (choices === 'View Department Budgets') {
            viewBudgets();
        }
        if (choices === 'Add a Department') {
            addDep();
        }
        if (choices === 'Add a Role') {
            addRole();
        } 
        if (choices === 'Add an Employee') {
            addEmp();
        }
        if (choices === 'Update Employee Role') {
            updateRole();
        }
        if (choices === 'Update Employee Manager') {
            updateManager();
        }
        if (choices === 'Delete a Department') {
            deleteDep();
        }
        if (choices === 'Delete a Role') {
            deleteRole();
        }
        if (choices === 'Remove an Employee') {
            deleteEmp()
        }
        if (choices === 'Exit') {
            db.end()
            console.log("You have chosen to exit the application. To re-start, enter 'npm start'!")
        }
    })
}


// ---------------------------------- VIEW -------------------//
const viewAllDeps = () => {
    const sql = `SELECT department.name AS Departments FROM department`;

    db.promise().query(sql)
    .then( ([rows, fields]) => {
        console.log('')
        console.table(rows);
    })
    .catch(console.log)
    .then( () => {
        promptUser();
    })
};

const viewAllRoles = () => {
    const sql = `SELECT role.title AS Roles FROM role`;

    db.promise().query(sql)
    .then( ([rows, fields]) => {
        console.log('')
        console.table(rows);
    })
    .catch(console.log)
    .then( () => {
        promptUser();
    })
};

const viewAllEmps = () => {
    const sql = `SELECT employee.first_name AS First,
                employee.last_name AS Last
                FROM employee`;
    
    db.promise().query(sql)
    .then( ([rows, fields]) => {
        console.log('')
        console.table(rows);
    })
    .catch(console.log)
    .then( () => {
        promptUser();
    })
}

const viewEmpByDep = () => {
    const sql = ``;

    db.promise().query(sql)
    .then( ([rows, fields]) => {
        console.log('')
        console.table(rows);
    })
    .catch(console.log)
    .then( () => {
        promptUser();
    })
}

const viewBudgets = () => {
    const sql = '';

    db.promise().query(sql)
    .then( ([rows, fields]) => {
        console.log('')
        console.table(rows);
    })
    .catch(console.log)
    .then( () => {
        promptUser();
    })
}




// ------------------------- ADD --------------------- //

const addDep = () => {

};

const addRole = () => {
    
};

const addEmp = () => {
    
};



// ---------------------- UPDATE -------------------- //

const updateRole = () => {

};

const updateManager = () => {

};




// --------------------- DELETE --------------------- // 

const deleteDep = () => {

};

const deleteRole = () => {

};

const deleteEmp = () => {

};