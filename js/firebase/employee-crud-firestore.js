// transactions
function updateTransactionFirestore(id, firstNameEmployee, lastNameEmployee, emailEmployee, birthDateEmployee, genderEmployee, imageEmployee){
    var employeeDocRef = db.collection("employees").doc(id+"");
    return db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(employeeDocRef).then((employeeDoc) => {
                                                    if (!employeeDoc.exists) {
                                                        throw "Document does not exist!";
                                                    }
                                            
                                                    // Note: this could be done without a transaction
                                                    //       by updating the population using FieldValue.increment()
                                                    transaction.update(employeeDocRef, {
                                                                    firstName: firstNameEmployee,
                                                                    lastName: lastNameEmployee,
                                                                    email: emailEmployee,
                                                                    birthDate: birthDateEmployee,
                                                                    gender: genderEmployee,
                                                                    image: imageEmployee
                                                                })
                                                    });
                                                }).then(() => {
                                                    console.log("Transaction successfully committed!");
                                                }).catch((error) => {
                                                    console.log("Transaction failed: ", error);
                                                });
}

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
    employee.birthDateEmployee = new Date(employee.birthDateEmployee); 
    await db.collection("howMany").doc('1')
                                    .update({noOfEmployees: firebase.firestore.FieldValue.increment(1)});
    await db.collection("employees").doc(employee.idEmployee+"")
                                .withConverter(employeeConverter)
                                .set(employee);
}

// delete one employee from firestore
async function deleteEmployeeFromFirestore(idEmployee) { 
    await db.collection("howMany").doc('1')
                                    .update({noOfEmployees: firebase.firestore.FieldValue.increment(-1)});
    await db.collection("employees").doc(idEmployee+"")
                            .delete()
}



// update one employee from firestore
async function updateEmployeeFromFirestore(id, firstNameEmployee, lastNameEmployee, emailEmployee, birthDateEmployee, genderEmployee, imageEmployee) { 
    birthDateEmployee = new Date(birthDateEmployee);   
    await updateTransactionFirestore(id, firstNameEmployee, lastNameEmployee, emailEmployee, birthDateEmployee, genderEmployee, imageEmployee);
}


// get all of the employees from firestore
async function  getEmployeesFromFirestore(){
    // var employeesFirebase = await db.collection("employees").get();
    var employeesFirebase = await db.collection("employees")
                                    .orderBy("firstName")
                                    .limit(5)
                                    .get();
    let employees = getEmployeesArray(employeesFirebase);
    // await db.collection("howMany").doc('1').set({noOfEmployees: employees.length});
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

function getEmployeesArray(asyncResultEmployees) {
    var employees = [];
    asyncResultEmployees.forEach((employee) => {
        let id = employee.id;
        let fields = employee.data();
        let e = new Employee(id, fields.firstName, fields.lastName, fields.email, fields.birthDate, fields.gender, fields.image);
        employees.push(e);
    });
    return employees;
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

// sorting

async function sortFirestore(field, order){
    console.log(field+" "+order);
    var employeesFirebase = await db.collection("employees").orderBy(field, order).get();
    return  getEmployeesArray(employeesFirebase);
}


//filters
async function filterEmployeeByGenderFirestore(gender) {
    if(gender === ""){
        return getEmployeesFromFirestore();
    }
    var employeesFirebase = await db.collection("employees")
                                    .where("gender", "==", gender)
                                    .get();                                
    return getEmployeesArray(employeesFirebase);
}

async function filterEmployeeByProfileFirestore(profile){
    if(profile === ""){
        return getEmployeesFromFirestore();
    }
    let employeesFirebase = []
    if(profile === 'no-profile-picture'){
        employeesFirebase = await db.collection("employees")
                                    .where("image", "==", profile)
                                    .get();  
    }else if (profile === 'profile-picture'){
        employeesFirebase = await db.collection("employees")
                                    .where("image", "!=", 'no-profile-picture')
                                    .get();      
    }
    return getEmployeesArray(employeesFirebase);
}

async function filterEmployeeByBirthdateFirestore(start, end){ 
    let startDate = new Date(start);
    let endDate = new Date(end);
    let employeesFirebase = await db.collection("employees")
                                .where("birthDate", ">=", startDate)
                                .where("birthDate", "<=", endDate)
                                .get();   
    return getEmployeesArray(employeesFirebase);
}

async function filterAllFirestore(filters){
    let gender = filters.get('gender');
    let profile = filters.get('image');
    let start = filters.get('birthDate').start;
    let end = filters.get('birthDate').end;

    // compound query for filtering by gender and profile
    let employeeRef = db.collection("employees");
    if(gender !== ""){
        employeeRef = employeeRef.where("gender", "==", gender);
    }
    if(profile === "no-profile-picture"){
        employeeRef = employeeRef.where("image", "in", [profile])
    }else if (profile === 'profile-picture'){
        employeeRef = employeeRef.where("image", "!=", 'no-profile-picture');
    }

    // simple query for filtering by birthdate
    let employeeRefBirthdate = db.collection("employees");
    employeeRefBirthdate = employeeRefBirthdate.where("birthDate", ">=", start).where("birthDate", "<=", end);

    // execute queries
    let employeesFirebase = await employeeRef.get();
    let employeesBirthdateFirebase = await employeeRefBirthdate.get();

    // get array of employees from firestore result 
    let genderProfileEmployees = getEmployeesArray(employeesFirebase);
    let birthDateEmployees = getEmployeesArray(employeesBirthdateFirebase);
    let finalFilteredResult = genderProfileEmployees.filter(function(employee) {
                                                        // check whether in th second array, there is
                                                        // an employee with the same id as the current employee
                                                        if(birthDateEmployees.filter(e => e.idEmployee === employee.idEmployee).length !== 0)
                                                            return true;
                                                        else
                                                            return false;
                                                        });
    return finalFilteredResult;
}


// pagination

async function getNumberOfEmployeesDocFirestore(){
    let noOfEmployeesAsync = await db.collection("howMany").doc("1").get();
    return await noOfEmployeesAsync.data().noOfEmployees;
}