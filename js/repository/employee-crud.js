// let employees = localStorage.getItem('employees')
//                     ? JSON.parse(localStorage.getItem('employees'))
//                     : []

let employees = [];

let employeesFiltered = localStorage.getItem('employees')
                            ? JSON.parse(localStorage.getItem('employees'))
                            : []

function addEmployee(firstName, lastName, email, birthdate, gender, image){
    // var employee = new Employee(currentId, firstName, lastName, email, birthdate, gender, image);
    // employees.push(employee);
    // putData();
    var employee = new Employee(currentId, firstName, lastName, email, birthdate, gender, image);
    addEmployeeToFirestore(employee);
}

function deleteEmployee(employeeToDeleteId){
    employees.forEach(employee => {
        if ( employee.idEmployee == employeeToDeleteId){
            employees.pop(employee);
        }
    });
    putData();
}

function updateEmployee(id, firstName, lastName, email, birthdate, gender, image){
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

function getEmployeeById(idEmployee) {
    
    let employeeFound = employees.filter( employee => employee.idEmployee == idEmployee )
    if (employeeFound.length !== 0){
        return employeeFound[0]
    }else{
        return null;
    }
}

function getNumberOfEmployees(){
    // console.log(employees.length);
    // return employees.length;
    return getNumberOfEmployeesFromFirestore();
}

function putData() {
    // localStorage.clear()
    // localStorage.setItem('employees', JSON.stringify(employees))
    addEmployeesToFirestore(employees);
}

async function loadData() {
    
    // const employeesLocallyJSON = JSON.parse(localStorage.getItem('employees'));
    // var employeesLocally = [];
    // employeesLocallyJSON.forEach(employee => {
    //     let e = new Employee(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
    //     employeesLocally.push(e);
    // });
    // return employeesLocally;
    return await getEmployeesFromFirestore();
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


