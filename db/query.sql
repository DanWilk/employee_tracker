select roles.title, roles.salary, departments.department_name
from roles
join departments
    on roles.department_id = departments.id;