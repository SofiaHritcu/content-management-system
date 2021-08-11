
var currentId = 1;

window.onload = async function (){
    console.log("loading");
    let numberEmployees = await getNumberOfEmployees();
    if( numberEmployees !== 0){
        // let employeesLocally = loadData();
        // console.log(employeesLocally);
        // employeesLocally.forEach(employee =>{
        //     addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        // });

        // currentId = employeesLocally.length + 1;
        // getNumberOfEmployees().then(function (lengthEmployees) { 
        //     currentId = lengthEmployees + 1;})
        getMaxId().then(function (maxId) {
            currentId = maxId + 1;
            console.log('currentId: '+currentId);
        });
        // hide table to render loading indicator
        document.getElementById("employees").hidden = true;
        employeesLocally = await loadData();
        // dispatch click event on next button in order to load first page
        let nextButton = document.getElementById('next-button');
        nextButton.dispatchEvent(new Event("click"));
        document.getElementById("employees").hidden = false;
        document.getElementById("loading-employees").setAttribute('style','display: none!important ;')

        // employees = employeesLocally;
        // employeesLocally.forEach(employee =>{
        //     addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        // });
    } else {
        currentId = 1;
        document.getElementById('table-title').innerHTML = "NO EMPLOYEES YET";
        console.log('currentId: '+currentId);
    }
    
    $(document).ready(function() {
        $('#employees').DataTable({
            "ordering": true,
            // pageLength: 5,
            // lengthMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
            "columnDefs":   [
                                {
                                "targets": [ 5, 6 ],
                                    orderable: false
                                },
                            ],
            "paging": false,
            "bInfo": false,    
        });

        // pagination

        // check if the current number od employees is bigger than the number of them on each page
        console.log(numberEmployees);
        console.log(document.getElementById("employees").getAttribute("data-page-size"));
        if (numberEmployees > document.getElementById("employees").getAttribute("data-page-size")){
            document.getElementById("next-button").setAttribute("class","btn pagination");
        }
    } );
    
}

// retrieve data from input form 
const form = document.querySelector('form');
const inputFirstName = document.getElementById('input-firstname');
const inputLastName = document.getElementById('input-lastname');
const inputEmail = document.getElementById('input-email');
const inputGender = document.getElementById('input-gender');
var inputBirthDate = document.getElementById('input-birthdate');
const inputImage = document.getElementById('input-image');
const genderSelected = inputGender.options[inputGender.selectedIndex];

// filters elements
const genderFilter = document.getElementById('filter-gender');
const profileFilter = document.getElementById('filter-profile');
const birthdateFilterEnd = document.getElementById('input-birthdate-end');
const birthdateFilterStart = document.getElementById('input-birthdate-start');



// change button
const change = document.getElementById('change');
var currentBirthDate = '';


// creates an <td></td> element with given text
function createTd( text ){
    td =  document.createElement('td');
    var tdText = document.createTextNode(text);
    td.appendChild(tdText);
    return td;
}


// creates an id <td></td> element with given text and image
function createTdId( id, image ){
    var td =  document.createElement('td');

    var tdIdHTML = '<a href="javascript:;" class="avatar rounded-circle"><img class="img-avatar" width="20"height="20" alt="Image placeholder" src="'
    tdIdHTML += image;
    tdIdHTML += '"></a><br><p class="text-id">';
    tdIdHTML += id;
    tdIdHTML += '</p>';
    td.innerHTML = tdIdHTML;

    return td;
}


// creates an id <td></td> element with given text and no profile image
function createTdIdNoProfile( id ){
    var td =  document.createElement('td');

    var tdIdHTML = '<a href="javascript:;" class="avatar rounded-circle"><img class="img-avatar-no-profile" src="/assets/user.png"></a><br><p class="text-id">';
    tdIdHTML += id;
    tdIdHTML += '</p>';
    td.innerHTML = tdIdHTML;

    return td;
}

// deletion of employee
async function eraseEmployee(employee) {
    console.log('on delete');
    const employeeToDeleteId = employee.parentNode.parentNode.firstChild.textContent;

    await deleteEmployee(employeeToDeleteId);
    var employeesLocally = await loadData();
    document.querySelector("tbody").innerHTML = "";
    employeesLocally.forEach(employee =>{
        addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
    })
  }


// update employee
async function editEmployee(employee) {    
    const employeeToEditId = employee.parentNode.parentNode.firstChild.textContent;
    const preview = document.getElementById("profile-picture-preview");
    var employeeToUpdate = await getEmployeeById(employeeToEditId);
    if( employeeToUpdate !== null){
        inputFirstName.value = employeeToUpdate.firstNameEmployee;
        inputLastName.value = employeeToUpdate.lastNameEmployee;
        inputEmail.value = employeeToUpdate.emailEmployee;
        changeBirthdateInput(moment(employeeToUpdate.birthDateEmployee.toDate()).format("MM/DD/YYYY"));
        inputGender.value = employeeToUpdate.genderEmployee;
        if(employeeToUpdate.imageEmployee !== 'no-profile-picture'){
            preview.src = employeeToUpdate.imageEmployee;
        }else{
            preview.src="/assets/user.png"
        }
        document.querySelector('.submit-button').innerHTML = '<button type="submit" class="btn submit update">Update</button>';
        // setEmployeeIdToBeUpdatedLS(employeeToUpdate.idEmployee);
        await setEmployeeIdToBeUpdatedFirestore(employeeToUpdate.idEmployee);
    }
}



// creates an <td></td> element with delete and edit button
function createTdActions(){
    td =  document.createElement('td');
    var tdText = document.createTextNode('');
    td.appendChild(tdText);
    td.innerHTML = '<button class="btn" onclick="eraseEmployee(this)"><i class="fa fa-trash"></i></button>'
    td.innerHTML += '<button class="btn" onclick="editEmployee(this)"><i class="fa fa-edit"></i></button>'
    td.appendChild(tdText);
    return td;
}




// get a date in default format in required format of day month year
function getDateFromOld(oldFormatDate) {
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }
    var date = new Date(oldFormatDate);
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    return day+' ' + month + ' ' + year;
}


// create a row table instance with given data for employee properties
function addTableInstance (id, firstName, lastName, email, birthdate, gender, image) {
    var tr = document.createElement('tr');

    var tdId;
    if ( image === 'no-profile-picture'){
        tdId = createTdIdNoProfile(id);
    }else{
        tdId = createTdId(id, image);
    }
    tdId.setAttribute("scope","row");

    var tdFirstName = createTd(firstName);
    var tdLastName = createTd(lastName);
    var tdEmail = createTd(email);
    var tdBirthDate = createTd(moment(birthdate.toDate()).format("DD MMMM YYYY"));
    // var tdBirthDate = createTd(birthdate);
    var tdGender = createTd(gender);
    var tdDelete = createTdActions();

    tr.appendChild(tdId);
    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdBirthDate);
    tr.appendChild(tdGender);
    tr.appendChild(tdDelete);
    document.querySelector("tbody").appendChild(tr);
}


// put data in table 
function setTableInstances (employees) {
    employees.foreach( employee => {
        addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
    })
}

// clear input fields 
function clearInputFields(){
    // reset input form
    form.reset();
    document.getElementById('profile-picture-preview').src = "//placehold.it/140?text=IMAGE";
    onChange();
    // alert the success of clearing the inputs 
    document.getElementById('fields-cleared').setAttribute('class','alert alert-success my-2');
    window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove(); 
        });
    }, 1500);
}


// add event on form submit
form.addEventListener('submit', async function (e) {
    e.preventDefault()
    document.getElementById('loading-indicator').setAttribute('class', 'spinner-border');
    if(document.querySelector('.submit-button').textContent.indexOf('Update') !== 0){
        addEmployeeSubmit();
        document.getElementById('loading-indicator').setAttribute('class', 'spinner-border hidden-spinner');
        document.getElementById('added-success').setAttribute('class','alert alert-success my-2');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function(){
                $(this).remove(); 
            });
        }, 1500);
        document.getElementById("at-top").scrollIntoView({behavior: 'smooth'});
    }else{
        updateEmployeeSubmit();
        document.getElementById('updated-success').setAttribute('class','alert alert-success my-2');
        document.getElementById('loading-indicator').setAttribute('class', 'spinner-border hidden-spinner');
        window.setTimeout(function() {
            $(".alert").fadeTo(500, 0).slideUp(500, function(){
                $(this).remove(); 
            });
        }, 1500);
        document.getElementById("at-top").scrollIntoView({behavior: 'smooth'});
    }
})


async function addEmployeeSubmit(){
    if (inputImage.files.length == 0) {
        await addEmployee(inputFirstName.value, inputLastName.value, inputEmail.value, inputBirthDate.value, inputGender.value, 'no-profile-picture')
        loadData().then(employeesLocally => {
            document.querySelector("tbody").innerHTML = "";
            employeesLocally.forEach(employee =>{
                addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
            })
            currentId ++;
            // reset initial values for form 
            form.reset();
            document.getElementById('profile-picture-preview').src = "//placehold.it/140?text=IMAGE";
            onChange();
            return;
        })
        return ;
        // var employeesLocally = loadData();
        // document.querySelector("tbody").innerHTML = "";
        // employeesLocally.forEach(employee =>{
        //     addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        // })
        // currentId ++;

        // reset initial values for form 
        // form.reset();
        // document.getElementById('profile-picture-preview').src = "//placehold.it/140?text=IMAGE";
        // onChange();
        // return;
    }

    const file = inputImage.files[0];

    var imageBase64 ='';

    var resultImage = new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });


    resultImage.then(async function(result) {
        imageBase64 = result;
        await addEmployee(inputFirstName.value, inputLastName.value, inputEmail.value, inputBirthDate.value, inputGender.value, imageBase64)
        loadData().then(employeesLocally => {
            document.querySelector("tbody").innerHTML = "";
            employeesLocally.forEach(employee =>{
                addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
            })
            currentId ++;
            // reset initial values for form 
            form.reset();
            document.getElementById('profile-picture-preview').src = "//placehold.it/140?text=IMAGE";
            onChange();
        })
        
        
        
        // var employeesLocally = loadData();
        // document.querySelector("tbody").innerHTML = "";
        // employeesLocally.forEach(employee =>{
        //     addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        // })
        // currentId ++;

        // // reset initial values for form 
        // form.reset();
        // document.getElementById('profile-picture-preview').src = "//placehold.it/140?text=IMAGE";
        // onChange();
    });
}

async function updateEmployeeSubmit(){
    console.log('update submit');
    // const idEmployeeToBeUpdated = getEmployeeByIdToBeUpdatedLS();
    const idEmployeeToBeUpdated = await getEmployeeIdToBeUpdatedFirestore();
    let employeeToBeUpdated = await getEmployeeById(idEmployeeToBeUpdated);
    if (inputImage.files.length == 0) {
        await updateEmployee(idEmployeeToBeUpdated,inputFirstName.value, inputLastName.value, inputEmail.value, inputBirthDate.value, inputGender.value, employeeToBeUpdated.imageEmployee);
        var employeesLocally = await loadData();
        document.querySelector("tbody").innerHTML = "";
        employeesLocally.forEach(employee =>{
            addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        })

        // reset initial values for form 
        form.reset();
        document.getElementById('profile-picture-preview').src = "//placehold.it/140?text=IMAGE";
        onChange();

        return;
    }

    const file = inputImage.files[0];

    var imageBase64 ='';

    var resultImage = new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });


    resultImage.then(async function(result) {
        imageBase64 = result;
        await updateEmployee(idEmployeeToBeUpdated,inputFirstName.value, inputLastName.value, inputEmail.value, inputBirthDate.value, inputGender.value, imageBase64);
        var employeesLocally = await loadData();
        document.querySelector("tbody").innerHTML = "";
        employeesLocally.forEach(employee =>{
            addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        })

        // reset initial values for form 
        form.reset();
        document.getElementById('profile-picture-preview').src = "//placehold.it/140?text=IMAGE";
        onChange();
    });
}


// function for changing format of birthdate by replacing the date input with a text input and a button 
function onChange (){
    document.querySelector(".birthdate").innerHTML = '<input placeholder="Select date" type="date"  id="input-birthdate" min="1900-01-01" max="2005-12-31" class="form-control">';
    inputBirthDate = document.getElementById('input-birthdate');
    inputBirthDate.addEventListener('change', function(e){
        e.preventDefault();
        const months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        }
        var firstPartInnerHTML = '<input placeholder="';
        firstPartInnerHTML += getDateFromOld(inputBirthDate.value);
        firstPartInnerHTML += '" type="text" readonly id="input-birthdate" class="form-control">'
        firstPartInnerHTML += '<div class="change-button"> <button class="btn changeBirthDate"  onclick="onChange()" id="change">Change Birth Date</button></div>'
        document.querySelector(".birthdate").innerHTML = firstPartInnerHTML;
    })
    
}


inputBirthDate.addEventListener('change', function(e){
    e.preventDefault();
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      }
    var firstPartInnerHTML = '<input placeholder="'
    var birthdate = new Date(inputBirthDate.value);
    var year = birthdate.getFullYear();
    var month = months[birthdate.getMonth()];
    var day = birthdate.getDate();
    firstPartInnerHTML += day+' ' + month + ' ' + year;
    currentBirthDate = inputBirthDate.value;
    firstPartInnerHTML += '" type="text" readonly id="input-birthdate" class="form-control">'
    firstPartInnerHTML += '<div class="change-button"> <button class="btn changeBirthDate"  onclick="onChange()" id="change">Change Birth Date</button></div>'
    document.querySelector(".birthdate").innerHTML = firstPartInnerHTML;
})

function changeBirthdateInput(date){
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }
    var firstPartInnerHTML = '<input placeholder="'
    var birthdate = new Date(date);
    var year = birthdate.getFullYear();
    var month = months[birthdate.getMonth()];
    var day = birthdate.getDate();
    firstPartInnerHTML += day+' ' + month + ' ' + year;
    currentBirthDate = date;
    firstPartInnerHTML += '" type="text" readonly id="input-birthdate" class="form-control">'
    firstPartInnerHTML += '<div class="change-button"> <button class="btn changeBirthDate"  onclick="onChange()" id="change">Change Birth Date</button></div>'
    document.querySelector(".birthdate").innerHTML = firstPartInnerHTML;
}

// preview the image  
function previewFile() {
    const preview = document.getElementById("profile-picture-preview");
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();


    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}
    

// filters

genderFilter.addEventListener('change',async () => {
    // let employeesAfterFilter =  filterEmployeeByGenderLS(genderFilter.value);
    document.getElementById('loading-indicator').setAttribute('class', 'spinner-border');
    document.getElementById("at-top").scrollIntoView({behavior: 'smooth'});
    let employeesAfterFilter =  await filterEmployeeByGender(genderFilter.value);
    document.querySelector("tbody").innerHTML = "";
    employeesAfterFilter.forEach(employee =>{
        addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
    });
    document.getElementById('loading-indicator').setAttribute('class', 'spinner-border hidden-spinner');
})

profileFilter.addEventListener('change',async () => {
    // let employeesAfterFilter =  filterEmployeeByProfile(profileFilter.value);
    document.getElementById('loading-indicator').setAttribute('class', 'spinner-border');
    document.getElementById("at-top").scrollIntoView({behavior: 'smooth'});
    let employeesAfterFilter =  await filterEmployeeByProfile(profileFilter.value);
    document.querySelector("tbody").innerHTML = "";
    employeesAfterFilter.forEach(employee =>{
        addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
    })
    document.getElementById('loading-indicator').setAttribute('class', 'spinner-border hidden-spinner');
})

birthdateFilterEnd.addEventListener('change',async () => {
    document.getElementById('loading-indicator').setAttribute('class', 'spinner-border');
    document.getElementById("at-top").scrollIntoView({behavior: 'smooth'});
    let employeesAfterFilter =  await filterEmployeeByBirthdate(birthdateFilterStart.value, birthdateFilterEnd.value);
    document.querySelector("tbody").innerHTML = "";
    employeesAfterFilter.forEach(employee =>{
        addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
    })
    document.getElementById('loading-indicator').setAttribute('class', 'spinner-border hidden-spinner');
})


async function deleteFilters(){
    console.log("all filters deleted");
    document.getElementById('loading-indicator').setAttribute('class', 'spinner-border');
    document.getElementById("at-top").scrollIntoView({behavior: 'smooth'});
    let employees =  await loadData();
    document.querySelector("tbody").innerHTML = "";
    employees.forEach(employee =>{
        addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
    })
    document.getElementById('loading-indicator').setAttribute('class', 'spinner-border hidden-spinner');
}

 // sortings

async function sortDataBy(column, field){
    const col = document.querySelector("."+column);
    const sorting = col.getAttribute('class');
    if(sorting.indexOf('sorting_asc') !== -1 || sorting.indexOf('sorting') !== -1){
        await sortFirestore(field,'asc');
    }else if (sorting.indexOf('sorting_desc') !== -1){
        await sortFirestore(field,'desc');
    }
}

// pagination
let lastVisible = new Object();
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
        console.log(page+" page");
        var next = db.collection("employees")
                        .orderBy("firstName")
                        .startAfter(lastVisible)
                        .limit(5);
        let employeesPageAsync = await next.get();
        lastVisible = employeesPageAsync.docs[employeesPageAsync.docs.length-1];
        currentEmployeesFetched += new Number(employeesPageAsync.docs.length);
        let employeesPage = getEmployeesArray(employeesPageAsync)
        document.querySelector("tbody").innerHTML = "";
        employeesPage.forEach(employee =>{
            addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        })   
        // disable next-button if there are no more employees to fetch
        let numberOfEmployeesInFirestore = await getNumberOfEmployees();
        if ( currentEmployeesFetched == numberOfEmployeesInFirestore) {
            console.log("here");
            document.getElementById('next-button').className = "btn pagination disabled";
        }
    }
    page++;
}

function prev(){
    console.log("prev");
}
