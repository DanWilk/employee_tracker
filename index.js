const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'action',
            message: 'Say something',
            choices: ['hello', 'how', 'no']
        }
    ]);
}
promptUser()
.then(data => {
    console.log(data);
});
