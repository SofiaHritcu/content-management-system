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
    await updateEmployeeFromFirestore(id, firstName, lastName,email, birthdate, gender, image );
}

function getEmployeeById(idEmployee) {
    // return getEmployeeByIdLS(idEmployee);
    return getEmployeeByIdFirestore(idEmployee);
}

function getNumberOfEmployees(){
    // return getNumberOfEmployeesLS();
    // return getNumberOfEmployeesFromFirestore();
    return getNumberOfEmployeesDocFirestore();
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
var filters = new Map([['gender', ""], ['image', ""], ['birthDate', {start: new Date('1900-01-01'), end: new Date('2005-12-31')}]]);
function filter(filter, filterValue){
    filters.set(filter, filterValue);
}



async function filterEmployeeByGender(gender) {
    // return filterEmployeeByGenderLS(gender);
    filter('gender', gender)
    // return await filterEmployeeByGenderFirestore(gender);
    return await filterAllFirestore(filters);
}

async function filterEmployeeByProfile(profile){
    // return filterEmployeeByProfileLS(profile);
    filter('image', profile)
    // return await filterEmployeeByProfileFirestore(profile);
    return await filterAllFirestore(filters);
}

async function filterEmployeeByBirthdate(startFilter, endFilter){
    // return filterEmployeeByBirthdateLS(start, end);
    filter('birthDate', {start: new Date(startFilter), end: new Date(endFilter)})
    // return await filterEmployeeByBirthdateFirestore(startFilter, endFilter);
    return await filterAllFirestore(filters);
}


