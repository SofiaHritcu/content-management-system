let employees = localStorage.getItem('employees')
                    ? JSON.parse(localStorage.getItem('employees'))
                    : []

function addEmployee(firstName, lastName, email, birthdate, gender){
    var employee = new Employee(currentId, firstName, lastName, email, birthdate, gender);
    employees.push(employee);
    putDataLocalStorage();
}

function putDataLocalStorage() {
    localStorage.clear()
    localStorage.setItem('employees', JSON.stringify(employees))
}

function loadData() {
    const employeesLocallyJSON = JSON.parse(localStorage.getItem('employees'));
    var employeesLocally = [];
    employeesLocallyJSON.forEach(employee => {
        employeesLocally.push(new Employee(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee));
    });
    return employeesLocally;
};