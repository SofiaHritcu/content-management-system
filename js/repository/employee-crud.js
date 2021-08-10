async function addEmployee(firstName, lastName, email, birthdate, gender, image){
    var employee = new Employee(currentId, firstName, lastName, email, birthdate, gender, image);
    // addEmployeeLS(employee);
    await addEmployeeToFirestore(employee);
}

async function deleteEmployee(employeeToDeleteId){
    // deleteEmployeeLS();
    await deleteEmployeeFromFirestore(employeeToDeleteId);
}

async function updateEmployee(id, firstName, lastName, email, birthdate, gender, image){
    // updateEmployeeLS(id, firstName, lastName,email, birthdate, gender, image );
    await upadateEmployeeFromFirestore(id, firstName, lastName,email, birthdate, gender, image );
}

function getEmployeeById(idEmployee) {
    // return getEmployeeByIdLS(idEmployee);
    return getEmployeeByIdFirestore(idEmployee);
}

function getNumberOfEmployees(){
    // return getNumberOfEmployeesLS();
    return getNumberOfEmployeesFromFirestore();
}

function putData() {
    // putDataLS();
    // addEmployeesToFirestore(employees);
}

async function loadData() {
    // return getEmployeesLS();
    return await getEmployeesFromFirestore();
};


//filters
function filterEmployeeByGender(gender) {
    return filterEmployeeByGenderLS(gender);
}

function filterEmployeeByProfile(profile){
    return filterEmployeeByProfileLS(profile);
}

function filterEmployeeByBirthdate(start, end){
    return filterEmployeeByBirthdateLS(start, end);
}


