var currentId = 1;

window.onload = function (){
    console.log("loading");
    $(document).ready(function() {
        $('#employees').DataTable({
            "ordering": true,
            pageLength: 5,
            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "Todos"]],
            "columnDefs":   [
                                {
                                "targets": [  5, 6 ],
                                    orderable: false
                                },
                            ],
        
        });
        } );
    
    
    if( localStorage.getItem('employees') !== null){
        var employeesLocally = loadData() ;
        employeesLocally.forEach(employee =>{
            addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        });
        currentId = employeesLocally.length + 1;
    } else {
        document.getElementById('table-title').innerHTML = "NO EMPLOYEES YET";
    }
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
function eraseEmployee(employee) {
    const employeeToDeleteId = employee.parentNode.parentNode.firstChild.textContent;
    var indexSelectedEmployee = employee.parentNode.parentNode.rowIndex ;

    deleteEmployee(employeeToDeleteId);
    var employeesLocally = loadData();
    document.querySelector("tbody").innerHTML = "";
    employeesLocally.forEach(employee =>{
        addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
    })
    document.getElementById("employees").deleteRow(indexSelectedEmployee);
  }


// creates an <td></td> element with delete button
function createTdDelete(){
    td =  document.createElement('td');
    var tdText = document.createTextNode('');
    td.appendChild(tdText);
    td.innerHTML = '<button class="btn" onclick="eraseEmployee(this)"><i class="fa fa-trash"></i></button>'
    td.appendChild(tdText);
    return td;
}




// get a date in default format in required format of day month year
function getDate(oldFormatDate) {
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
    var tdBirthDate = createTd(birthdate);
    var tdGender = createTd(gender);
    var tdDelete = createTdDelete();

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


// add event on form submit
form.addEventListener('submit', function (e) {
    e.preventDefault()


    if (inputImage.files.length == 0) {
        addEmployee(inputFirstName.value, inputLastName.value, inputEmail.value, getDate(inputBirthDate.value), inputGender.value, 'no-profile-picture');
        var employeesLocally = loadData();
        document.querySelector("tbody").innerHTML = "";
        employeesLocally.forEach(employee =>{
            addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        })
        currentId ++;
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

    resultImage.then(function(result) {
        imageBase64 = result;
        addEmployee(inputFirstName.value, inputLastName.value, inputEmail.value, getDate(inputBirthDate.value), inputGender.value, imageBase64);
        var employeesLocally = loadData();
        document.querySelector("tbody").innerHTML = "";
        employeesLocally.forEach(employee =>{
            addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
        })
        currentId ++;
    });

    form.reset();
    
  })


// function for changing format of birthdate by replacing the date input with a text input and a button 
function onChange (){
    document.querySelector(".birthdate").innerHTML = '<input placeholder="Select date" type="date"  id="input-birthdate" class="form-control">';
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
        firstPartInnerHTML += getDate(inputBirthDate.value);
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

genderFilter.addEventListener('change',() => {
   let employeesAfterFilter =  filterEmployeeByGender(genderFilter.value);
    document.querySelector("tbody").innerHTML = "";
    employeesAfterFilter.forEach(employee =>{
        addTableInstance(employee.idEmployee, employee.firstNameEmployee, employee.lastNameEmployee, employee.emailEmployee, employee.birthDateEmployee, employee.genderEmployee, employee.imageEmployee);
    })
})