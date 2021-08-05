
var id = "1";
var firstName = "firstName";
var lastName = "lastName";
var email ="email";
var gender = "gender";

var currentId = 1;


// retrieve data from input form 
const form = document.querySelector('form');
const inputFirstName = document.getElementById('input-firstname');
const inputLastName = document.getElementById('input-lastname');
const inputEmail = document.getElementById('input-email');
const inputGender = document.getElementById('input-gender');
var inputBirthDate = document.getElementById('input-birthdate');
const genderSelected = inputGender.options[inputGender.selectedIndex];


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
function addTableInstance (id, firstName, lastName, email, birthdate, gender) {
    var tr = document.createElement('tr');

    var tdId = createTd(id);
    tdId.setAttribute("scope","row");

    var tdFirstName = createTd(firstName);
    var tdLastName = createTd(lastName);
    var tdEmail = createTd(email);
    var tdBirthDate = createTd(birthdate);
    var tdGender = createTd(gender);

    tr.appendChild(tdId);
    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdBirthDate);
    tr.appendChild(tdGender);
    document.querySelector("tbody").appendChild(tr);
}

function addEmployee(firstName, lastName, email, birthdate, gender){

}



// add event on form submit
form.addEventListener('submit', function (e) {
    e.preventDefault()
    addEmployee(inputFirstName.value, inputLastName.value, inputEmail.value, getDate(inputBirthDate.value), inputGender.value);
    // itemsArray.push(input.value)
    // localStorage.setItem('items', JSON.stringify(itemsArray))
    // liMaker(input.value)
    // input.value = ''
  })


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


    

