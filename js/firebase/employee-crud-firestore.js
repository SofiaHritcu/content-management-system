
// add all of the employees to firestore
function addEmployeesToFirestore(employees) {    
    employees.forEach(employee => {
        db.collection("employees").doc(employee.idEmployee+"")
                                .withConverter(employeeConverter)
                                .set(employee);
    });
}

// add one employee to firestore
async function addEmployeeToFirestore(employee) {    
    await db.collection("employees").doc(employee.idEmployee+"")
                                .withConverter(employeeConverter)
                                .set(employee);
}

// delete one employee from firestore
async function deleteEmployeeFromFirestore(idEmployee) { 
    await db.collection("employees").doc(idEmployee+"")
                            .delete()
}

// update one employee from firestore
async function upadateEmployeeFromFirestore(id, firstNameEmployee, lastNameEmployee, emailEmployee, birthDateEmployee, genderEmployee, imageEmployee) { 
    await db.collection("employees").doc(id+"")
                            .update({
                                firstName: firstNameEmployee,
                                lastName: lastNameEmployee,
                                email: emailEmployee,
                                birthDate: birthDateEmployee,
                                gender: genderEmployee,
                                image: imageEmployee
                            })
}


// get all of the employees from firestore
async function  getEmployeesFromFirestore(){
    var employees = [];
    var employeesFirebase = await db.collection("employees").get();
    employeesFirebase.forEach((employee) => {
                let id = employee.id;
                let fields = employee.data();
                let e = new Employee(id, fields.firstName, fields.lastName, fields.email, fields.birthDate, fields.gender, fields.image);
                employees.push(e);
            });
    return employees;
}

async function getEmployeeByIdFirestore(id){
    var employeeFirebase = await db.collection("employees").doc(id+"").get();
    var employee = employeeFirebase.data();
    return new Employee(id, employee.firstName, employee.lastName, employee.email, employee.birthDate, employee.gender, employee.image)
}


async function getNumberOfEmployeesFromFirestore(){
    let employees = await db.collection("employees").get();
    return employees.docs.length;
}

async function getMaxId(){
    let employees = await getEmployeesFromFirestore();
    return Math.max.apply(Math, employees.map(function(employee) { return employee.idEmployee; }))

}

async function setEmployeeIdToBeUpdatedFirestore(idEmployeeToBeUpdated){
    await db.collection("employeeToUpdate")
                            .doc("idUpdate")
                            .set({'id':idEmployeeToBeUpdated});
}

async function getEmployeeIdToBeUpdatedFirestore(){
    var idEmployeeToUpdateFirebase = await db.collection("employeeToUpdate").doc("idUpdate").get();
    return idEmployeeToUpdateFirebase.data().id;
}