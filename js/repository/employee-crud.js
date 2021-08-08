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


//filters
function filterEmployeeByGender(gender) {
    if(gender === 'male' || gender === 'female'){
        employeesFiltered = employeesFiltered.filter(employees => employees.genderEmployee === gender);
    }
    return employeesFiltered;
}

function filterEmployeeByProfile(profile){
    if(profile === 'no-profile-picture'){
        employeesFiltered = employeesFiltered.filter(employees => employees.imageEmployee === profile);
    }else if (profile === 'profile-picture'){
        employeesFiltered = employeesFiltered.filter(employees => employees.imageEmployee !== 'no-profile-picture');
    }
    return employeesFiltered;
}

function filterEmployeeByBirthdate(start, end){
        employeesFiltered = employeesFiltered.filter(employees => employees.birthDateEmployee >= start && employees.birthDateEmployee <= end);
    return employeesFiltered;
}


