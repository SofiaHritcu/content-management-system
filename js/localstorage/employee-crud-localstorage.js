let employees = localStorage.getItem('employees')
                ? JSON.parse(localStorage.getItem('employees'))
                : []

let employees = [];

let employeesFiltered = localStorage.getItem('employees')
                            ? JSON.parse(localStorage.getItem('employees'))
                            : []

function addEmployeeLS(employee){
    employees.push(employee);
    putData();
}

function deleteEmployeeLS(employeeToDeleteId){
    employees.forEach(employee => {
        if ( employee.idEmployee == employeeToDeleteId){
            employees.pop(employee);
        }
    });
    putData();
}

function updateEmployeeLS(id, firstName, lastName, email, birthdate, gender, image){
    employees.forEach(employee => {
        if(employee.idEmployee == id){
            employee.firstNameEmployee = firstName;
            employee.lastNameEmployee = lastName;
            employee.emailEmployee = email;
            employee.birthDateEmployee = birthdate;
            employee.genderEmployee = gender;
            employee.imageEmployee = image;
        }
    })
    putData();
}

function getEmployeeByIdLS(idEmployee) {
    
    let employeeFound = employees.filter( employee => employee.idEmployee == idEmployee )
    if (employeeFound.length !== 0){
        return employeeFound[0]
    }else{
        return null;
    }
}

function getNumberOfEmployeesLS(){
    console.log(employees.length);
    return employees.length;
}

function putDataLS() {
    localStorage.clear()
    localStorage.setItem('employees', JSON.stringify(employees))
}

async function getEmployeesLS() {
    const employeesLocallyJSON = JSON.parse(localStorage.getItem('employees'));
    var employeesLocally = [];
    employeesLocallyJSON.forEach(employee => {
        let e = new Employee(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        employeesLocally.push(e);
    });
    return employeesLocally;
};


//filters
function filterEmployeeByGenderLS(gender) {
    if(gender === 'male' || gender === 'female'){
        employeesFiltered = employeesFiltered.filter(employees => employees.genderEmployee === gender);
    }
    return employeesFiltered;
}

function filterEmployeeByProfileLS(profile){
    if(profile === 'no-profile-picture'){
        employeesFiltered = employeesFiltered.filter(employees => employees.imageEmployee === profile);
    }else if (profile === 'profile-picture'){
        employeesFiltered = employeesFiltered.filter(employees => employees.imageEmployee !== 'no-profile-picture');
    }
    return employeesFiltered;
}

function filterEmployeeByBirthdateLS(start, end){
        employeesFiltered = employeesFiltered.filter(employees => employees.birthDateEmployee >= start && employees.birthDateEmployee <= end);
    return employeesFiltered;
}
