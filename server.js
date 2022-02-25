const inquirer = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');


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
    const sql = `SELECT id,
                name AS Department
                FROM department
                ORDER BY name ASC`;

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
    const sql = `SELECT role.id, 
                role.title AS Role,
                department.name AS Department,
                role.salary AS Salary
                FROM role
                LEFT JOIN department ON role.department_id = department.id`;

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
    const sql = `SELECT employee.id,
                employee.first_name,
                employee.last_name,
                role.title AS Role,
                department.name AS Department,
                role.salary AS Salary,
                CONCAT (manager.first_name, " ", manager.last_name) AS Manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id;`;
    
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
    console.log("choice selected");
    promptUser();
};

const addRole = () => {
    console.log("choice selected");
    promptUser();
};

const addEmp = () => {
    console.log("choice selected");
    promptUser();
};



// ---------------------- UPDATE -------------------- //

const updateRole = () => {
    console.log("choice selected");
    promptUser();
};

const updateManager = () => {
    console.log("choice selected");
    promptUser();
};




// --------------------- DELETE --------------------- // 

const deleteDep = () => {
    console.log("choice selected");
    promptUser();
};

const deleteRole = () => {
    console.log("choice selected");
    promptUser();
};

const deleteEmp = () => {
    console.log("choice selected");
    promptUser();
};