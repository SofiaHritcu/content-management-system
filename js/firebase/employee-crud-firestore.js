
// add all of the employees to firestore
function addEmployeesToFirestore(employees) {    
    employees.forEach(employee => {
        db.collection("employees").doc(employee.idEmployee+"")
                                .withConverter(employeeConverter)
                                .set(employee);
    });
}

// add one employee to firestore
function addEmployeeToFirestore(employee) {    
        db.collection("employees").doc(employee.idEmployee+"")
                                .withConverter(employeeConverter)
                                .set(employee);
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


async function getNumberOfEmployeesFromFirestore (){
    let employees = await db.collection("employees").get();
    return employees.docs.length;
}