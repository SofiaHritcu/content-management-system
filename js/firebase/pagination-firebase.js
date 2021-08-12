// pagination
let lastVisible = new Object();
let firstVisible = new Object();
let page = 1;
let employeesOnPage = new Number(document.getElementById("employees").getAttribute("data-page-size"));
let currentEmployeesFetched = 0;
async function next(){
    console.log("next");
    if( page === 1){
        console.log("1 page");
        var first = db.collection("employees")
                        .orderBy("firstName")
                        .limit(5);
        let employeesFirstPageAsync = await first.get();
        lastVisible = employeesFirstPageAsync.docs[employeesFirstPageAsync.docs.length-1];
        currentEmployeesFetched = employeesOnPage;
        let employeesFirstPage = getEmployeesArray(employeesFirstPageAsync)
        document.querySelector("tbody").innerHTML = "";
        employeesFirstPage.forEach(employee =>{
            addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        });
    }else {
        if (page === 2){
            document.getElementById('prev-button').className = "btn pagination";
        }
        console.log(page+" page");
        var next = db.collection("employees")
                        .orderBy("firstName")
                        .startAfter(lastVisible)
                        .limit(5);
        let employeesPageAsync = await next.get();
        lastVisible = employeesPageAsync.docs[employeesPageAsync.docs.length-1];
        firstVisible = employeesPageAsync.docs[0];
        currentEmployeesFetched += new Number(employeesPageAsync.docs.length);
        let employeesPage = getEmployeesArray(employeesPageAsync)
        document.querySelector("tbody").innerHTML = "";
        employeesPage.forEach(employee =>{
            addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        })   
        // disable next-button if there are no more employees to fetch
        let numberOfEmployeesInFirestore = await getNumberOfEmployees();
        if ( currentEmployeesFetched == numberOfEmployeesInFirestore) {
            page--;
            document.getElementById('next-button').className = "btn pagination disabled";
        }
    }
    page++;
}

async function prev(){
    page--;
    console.log("prev");
    console.log(page);
    const lastPage = page; 
    if( page === 1){
        console.log("1 page");
        var first = db.collection("employees")
                        .orderBy("firstName")
                        .limit(5);
        let employeesFirstPageAsync = await first.get();
        lastVisible = employeesFirstPageAsync.docs[employeesFirstPageAsync.docs.length-1];
        currentEmployeesFetched = employeesOnPage;
        let employeesFirstPage = getEmployeesArray(employeesFirstPageAsync)
        document.querySelector("tbody").innerHTML = "";
        employeesFirstPage.forEach(employee =>{
            addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        });
        document.getElementById('prev-button').className = "btn pagination disabled";
        document.getElementById('next-button').className = "btn pagination";
    }else {
        if (page === lastPage ){
            document.getElementById('next-button').className = "btn pagination";
        }
        var next = db.collection("employees")
                    .orderBy("firstName")
                    .endBefore(firstVisible)
                    .limitToLast(5);
        let employeesPageAsync = await next.get();
        lastVisible = employeesPageAsync.docs[employeesPageAsync.docs.length-1];
        firstVisible = employeesPageAsync.docs[0];
        currentEmployeesFetched -= new Number(employeesPageAsync.docs.length);
        let employeesPage = getEmployeesArray(employeesPageAsync)
        document.querySelector("tbody").innerHTML = "";
        employeesPage.forEach(employee =>{
            addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        }); 
    }
}