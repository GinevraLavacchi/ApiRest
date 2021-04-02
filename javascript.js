var counter=1;
function start()
{
    $.ajax({
    	url: 'http://localhost:8080/api/tutorial/1.0/employees',
      type: 'get',
    	contentType: 'application/json',
      success: function(data, textstatus, jQxhr){
        
        var dataDefault = data;
        // var ciccio='cioa';
            var employee_data = '';
            $.each(data, function(key, value){
              employee_data += '<tr>';
              employee_data += '<td><input class="form-check-input" type="checkbox" name="checkbox" style="margin-left: 1%"></td>';
              employee_data += '<td>'+value.firstName+' '+value.lastName+'</td>';
              employee_data += '<td>'+value.email+'</td>';
              employee_data += '<td></td>';
              employee_data += '<td>'+value.phone+'</td>';
              employee_data += '<td><button class="btn btn"><img onClick="modify()" src="img/editbutton.png" style="width: 30px; height: 30px;"></button></td>';
              employee_data += '<td><button class="btn btn"><img onClick="deleteCheck()" src="img/removebutton.png" style="width: 30px; height: 30px;"></button></td>';  
             
              employee_data += '<tr>';
              counter++;
            });
            $('#employee_table').append(employee_data);
        
      },
      error: function (data, textstatus, errorThrown){
      	console.log (errorThrown);
      }
    });
}

$(document).ready(function() {
	start();
    
});

function deleteCheck() {
    $('input:checked').each(function() {
        $(this).closest('tr').remove();
    });
}
function showForm()
{
    document.getElementById("form").style.display="block";
}

function checkboxall(maincheckbox) {
    var appo = document.getElementsByName('checkbox');
    for (var i = 0, n = appo.length; i < n; i++) {
        appo[i].checked = maincheckbox.checked;
    }
}

function modify()
{
    $('input:checked').each(function() {
        $(this).closest('tr').remove();
        mainadd();
    });
}

function newEmployee(){
    let form=document.createElement("div");
    
    form.innerHTML='<div id="form"><fieldset><label for="firstName">First name: </label>\
        <input type="text" id="firstName" placeholder="First name" /></fieldset>\
        <fieldset><label for="lastName">Last name: </label>\
        <input type="text" id="lastName" placeholder="Last name" /></fieldset>\
        <fieldset><label for="email">Email: </label>\
        <input type="text" id="email" placeholder="Email"/></fieldset>\
        <fieldset><label for="phone">Phone: </label>\
        <input type="text" id="phone" placeholder="Phone"/></fieldset>\
        <fieldset>\
            <button class="btn btn-success" id="save" onclick="saveEmployee()">Save</button>\
        </fieldset></div>';
    document.body.appendChild(form);
}

function saveEmployee(){
    let req=new XMLHttpRequest();
    let employee=new Object();
    employee.firstName=document.getElementById("firstName").value;
    employee.lastName=document.getElementById("lastName").value;
    employee.email=document.getElementById("email").value;
    employee.phone=document.getElementById("phone").value;
    req.open("POST","http://localhost:8080/api/tutorial/1.0/employees",true);
    employee.employeeId=counter;
    req.setRequestHeader("content-type","application/json");
    req.send(JSON.stringify(employee));
    location.reload();
}