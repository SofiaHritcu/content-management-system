let employees = localStorage.getItem('employees')
                    ? JSON.parse(localStorage.getItem('employees'))
                    : []

let employeesFiltered = localStorage.getItem('employees')
                            ? JSON.parse(localStorage.getItem('employees'))
                            : []

function addEmployee(firstName, lastName, email, birthdate, gender, image){
    var employee = new Employee(currentId, firstName, lastName, email, birthdate, gender, image);
    employees.push(employee);
    putDataLocalStorage();
}

function deleteEmployee(employeeToDeleteId){
    
    employees.forEach(employee => {
        console.log(employee.idEmployee);
        if ( employee.idEmployee == employeeToDeleteId){
            employees.pop(employee);
        }
    })
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
        let e = new Employee(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        employeesLocally.push(e);
    });

    return employeesLocally;
};


function filterEmployeeByGender(gender) {
    if(gender === 'male' || gender === 'female'){
        return employees.filter(employees => employees.genderEmployee === gender);
    }
    return employees;
}


