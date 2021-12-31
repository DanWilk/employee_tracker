const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { title } = require('process');
const { resolve } = require('path');

const db = mysql.createConnection(
    {
        // host: 'localhost',

        user: 'root',

        password: 'Dan$0430',
        database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database')
);

const viewAllDepartments = () => {
    
    new Promise((resolve, reject) => {
        const sql = `SELECT * FROM departments`;

        db.query(sql, (err, results) => {
              console.table(results);
            }
        );
        console.log();
        resolve(true);
    })
    .then(promptUser);
};

const viewAllRoles = () => {
    console.log('f');
    const sql = `select roles.title, roles.salary, departments.department_name
    from roles
    join departments
        on roles.department_id = departments.id;`;

    db.query(sql, (err, results) => {
          console.table(results);
        }
    );
}

const viewAllEmployees = () => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, results) => {
          console.table(results);
          console.log('');
        }
    );
}

const addEmployee = () => {
    return  inquirer.prompt([
        {
            type: 'input',
            name: 'new_department',
            message: 'What is the new departments name',
        }
    ])
    .then(data => {
        const sql = `INSERT INTO departments (department_name)
        VALUES (?)`;

        db.query(sql, data.new_department, (err, results) => {
            viewAllDepartments();
            }
        );
    });
}

// const addRole = () => { 
//     const getDepartments = () => {
//         db.query(`SELECT department_name FROM departments`, (err, rows) => {
//             return rows[1];
//     });
//     }

//     console.log(getDepartments());
//     return  inquirer.prompt([
//         {
//             type: 'input',
//             name: 'new_role',
//             message: 'What is the new roles name'
//         },
//         {
//             type: 'list',
//             name: 'new_role_department',
//             message: 'What department is the new role in',
//             choices: [getDepartments()]
//         },
//         {
//             type: 'input',
//             name: 'new_role_salary',
//             message: 'What is the new roles salary'
//         }

//     ])
//     .then(data => {
//         const sql = `INSERT INTO roles (title, salary, department_id)
//         VALUES (?,?,?)`;

//         db.query(sql, [data.new_role, data.new_role_salary, data.new_role_department], (err, results) => {
//             viewAllRoles();
//             }
//         );
//     })
//     .then(() => {
//         promptUser();
//     });
// }

const actionFilter = ({ action }) => {
    if (action === 'view all departments') {
       viewAllDepartments();
    } else if (action === 'view all roles') {
        viewAllRoles();
        promptUser();
    } else if (action === 'view all employees') {
        viewAllEmployees();
        promptUser();
    } else if (action === 'add a department') {
        addDepartment();
    } else if (action === 'add a role') {
        addRole();
    }
    // promptUser()
}

const addDepartment = () => {
    return  inquirer.prompt([
        {
            type: 'input',
            name: 'new_department',
            message: 'What is the new departments name',
        }
    ])
    .then(data => {
        const sql = `INSERT INTO departments (department_name)
        VALUES (?)`;

        db.query(sql, data.new_department, (err, results) => {
            viewAllDepartments();
            }
        );
    })
    .then(() => {
        promptUser();
    });
}

const promptUser = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update employee role'
            ]
        }
    ])
    .then(data => {
        console.log('');
        return data;
    })
    .then(data => {
        actionFilter(data);
    })
}
promptUser()



// const sql = `SELECT * FROM roles`;

//     db.query(sql, (err, rows) => {
//           rows.forEach((value, index) => {
//             console.log(rows[index].title)
//           });
//         }
//     );