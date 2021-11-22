const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        // host: 'localhost',

        user: 'root',

        password: 'Dan$0430',
        database: 'employee_tracker'
    },
    console.log('Connected to the election database')
);

const viewAllDepartments = () => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, results) => {
          console.table(results);
        }
    );
}

const viewAllRoles = () => {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, results) => {
          console.table(results);
        }
    );
}

const viewAllEmployees = () => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, results) => {
          console.table(results);
        }
    );
}


const actionFilter = ({ action }) => {
    if (data.a)
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
    ]);
}
promptUser()
.then(data => {
    if (data.action === 'view all departments') {
        viewAllDepartments()
    }
    console.log(data);
});


