
var id = "1";
var firstName = "firstName";
var lastName = "lastName";
var email ="email";
var gender = "gender";

const form = document.querySelector('form');
const inputFirstName = document.getElementById('input-firstname');
const inputLastName = document.getElementById('input-lastname');
const inputEmail = document.getElementById('input-email');
const inputGender = document.getElementById('input-gender');
const genderSelected = inputGender.options[inputGender.selectedIndex];



// creates an <td></td> element with given text
function createTd( text ){
    td =  document.createElement('td');
    var tdText = document.createTextNode(text);
    td.appendChild(tdText);
    return td;
}


// create a row table instance with given data for employee properties
function addTableInstance (id, firstName, lastName, email, gender) {
    var tr = document.createElement('tr');

    var tdId = createTd(id);
    tdId.setAttribute("scope","row");

    var tdFirstName = createTd(firstName);
    var tdLastName = createTd(lastName);
    var tdEmail = createTd(email);
    var tdGender = createTd(gender);

    tr.appendChild(tdId);
    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdGender);
    document.querySelector("tbody").appendChild(tr);
}

addTableInstance(id, firstName, lastName, email, gender);

// add event on form submit
form.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log("submit event"+inputFirstName.value + inputLastName.value + inputEmail.value + inputGender.value)
    // itemsArray.push(input.value)
    // localStorage.setItem('items', JSON.stringify(itemsArray))
    // liMaker(input.value)
    // input.value = ''
  })