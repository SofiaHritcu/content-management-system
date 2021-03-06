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
        if ( currentEmployeesFetched === numberOfEmployeesInFirestore) {
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



async function sortDataByWithPagination(column, field){
    const col = document.querySelector("."+column);
    const sorting = col.getAttribute('class');
    console.log(sorting);
    if(sorting.indexOf('srt-a') !== -1 || (sorting.indexOf('srt') !== -1 && sorting.indexOf('srt-d') === -1)){
        await db.collection("sortings").doc(field).set({order: "asc"});
        // let employees = await sortFirestore(field,'asc');
        // console.log(employees);
        // document.querySelector("tbody").innerHTML = "";
        // employees.forEach(employee =>{
        //     addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        // });
        col.setAttribute('class',column+' text-center srt-d');
        if (column === 'birth-date-column'){
            document.getElementById("arr-"+column).setAttribute("class", "fas fa-sort-amount-up-alt");
        }else{
            document.getElementById("arr-"+column).setAttribute("class", "fas fa-sort-alpha-up-alt");
        }
    }else if (sorting.indexOf('srt-d') !== -1){
        await db.collection("sortings").doc(field).set({order: "desc"});

        // let employees = await sortFirestore(field,'desc');
        // document.querySelector("tbody").innerHTML = "";
        // employees.forEach(employee =>{
        //     addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        // });
        col.setAttribute('class',column+' text-center srt-a');
        if (column === 'birth-date-column'){
            document.getElementById("arr-"+column).setAttribute("class", "fas fa-sort-amount-down-alt");
        }else{
            document.getElementById("arr-"+column).setAttribute("class", "fas fa-sort-alpha-down-alt");
        }
    }
    next()
}
