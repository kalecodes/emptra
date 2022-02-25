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
                // 'View Employees by Department',
                // 'View Employees by Manager',
                // 'View Department Budgets',
                'Add a Department', 
                'Add a Role', 
                'Add an Employee', 
                'Update Employee Role',
                // 'Update Employee Manager',
                // 'Delete a Department',
                // 'Delete a Role',
                // 'Remove an Employee',
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
        // if (choices === 'View Employees by Department') {
        //     viewEmpByDep();
        // }
        // if (choices === 'View Employees by Manager') {
        //     viewEmpByMan();
        // }
        // if (choices === 'View Department Budgets') {
        //     viewBudgets();
        // }
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
        // if (choices === 'Update Employee Manager') {
        //     updateManager();
        // }
        // if (choices === 'Delete a Department') {
        //     deleteDep();
        // }
        // if (choices === 'Delete a Role') {
        //     deleteRole();
        // }
        // if (choices === 'Remove an Employee') {
        //     deleteEmp()
        // }
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




// ------------------------- ADD --------------------- //

const addDep = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: "What department would you like to add?",
            validate: addDept => {
                if (addDept) {
                    return true;
                } else {
                    console.log('Please enter a department');
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [answer.addDept];
    
        db.promise().query(sql, params)
        .then( () => {
            console.log(`${params} has been added to departments`)
        })
        .catch(console.log)
        .then( () => {
            promptUser();
        })
    })
}


const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "What role would you like to add?",
            validate: role => {
                if (role) {
                    return true;
                } else {
                    console.log('Please enter a role title');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this role?",
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    console.log('Please enter a salary for this role');
                    return false;
                }
            }
        },
        {
            type: 'choices',
            name: 'roleDept',
            message: "What department is this role in? Options: 1- Accounting & Finance, 2- IT, 3- Sales & Marketing, 4- Operations, 5- Legal",
            choices: [
                "1",
                "2",
                "3",
                "4",
                "5"
            ]
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [answer.role, answer.salary, answer.roleDept];
    
        db.promise().query(sql, params)
        .then( () => {
            console.log(`${answer.role} has been added to roles`)
        })
        .catch(console.log)
        .then( () => {
            promptUser();
        })
    })
};


const addEmp = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the first name of the employee you would like to add?",
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('Please enter a name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the last name of the employee you would like to add?",
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    console.log('Please enter a name');
                    return false;
                }
            }
        },
        {
            type: 'choices',
            name: 'role',
            // need to update this to explain roles or dynamically update
            message: "What role will this employee hold? .........." ,
            choices: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10"
            ]
        },
        {
            type: 'choices',
            name: 'manager',
            // need to update this to explain roles or dynamically update
            message: "Who will this employee report to? .........." ,
            choices: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12"
            ]
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answer.firstName, answer.lastName, answer.role, answer.manager];
    
        db.promise().query(sql, params)
        .then( () => {
            console.log(`${answer.firstName} ${answer.lastName} has been added to employees`)
        })
        .catch(console.log)
        .then( () => {
            promptUser();
        })
    })
};



// ---------------------- UPDATE -------------------- //

const updateRole = () => {
    console.log("choice selected");
    promptUser();
};



// ------------------- BONUS --------------------- //



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

const viewEmpByMan = () => {
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