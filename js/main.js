
var id = "1";
var firstName = "firstName";
var lastName = "lastName";
var email ="email";
var gender = "gender";






function createTd( text ){
    td =  document.createElement('td');
    var tdText = document.createTextNode(text);
    td.appendChild(tdText);
    return td;
}



function addTableInstance (id, firstName, lastName, email, gender) {
    var tr = document.createElement('tr');

    var tdId = createTd(id);
    tdId.setAttribute("scope","row");

    var tdFirstName = createTd(firstName);
    var tdLastName = createTd(lastName);
    var tdEmail = createTd(email);
    var tdGender = createTd(gender);

    // var tdFirstName = document.createElement('td');
    // var tdEmail = document.createElement('td');
    // var tdGender = document.createElement('td');
    // var textId = document.createTextNode(id);
    // var textFirstName = document.createTextNode(firstName);
    // var textLastName = document.createTextNode(lastName);
    // var textEmail = document.createTextNode(email);
    // var textGender = document.createTextNode(gender);
    // tdId.appendChild(textId);
    // tdFirstName.appendChild(textFirstName);
    // tdLastName.appendChild(textLastName);
    // tdEmail.appendChild(textEmail);
    // tdGender.appendChild(textGender);

    tr.appendChild(tdId);
    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdGender);
    document.querySelector("tbody").appendChild(tr);
}

addTableInstance(id, firstName, lastName, email, gender);