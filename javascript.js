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
              employee_data += '<td><input class="form-check-input" type="checkbox" name="checkbox" id="'+value.employeeId+'" style="margin-left: 1%"></td>';
              employee_data += '<td>'+value.firstName+' '+value.lastName+'</td>';
              employee_data += '<td>'+value.email+'</td>';
              employee_data += '<td></td>';
              employee_data += '<td>'+value.phone+'</td>';
              employee_data += '<td><button class="btn btn"><img onClick="appoMod('+value.employeeId+')" src="img/editbutton.png" style="width: 30px; height: 30px;"></button></td>';
              employee_data += '<td><button class="btn btn"><img onClick="appoRem('+value.employeeId+')" src="img/removebutton.png" style="width: 30px; height: 30px;"></button></td>';  
             
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
function appoMod(id)
{
    getId("modify",id);
}
function appoRem(id)
{
    getId("remove",id);
}
function getId(string,id)
{
    if(string=="remove")
    {
        
    delEmployee(id);
	location.reload();
    }
    else if(string=="modify")
    {
        modify(id);
    }
}
function delEmployee(id)
{
	$.ajax({
	url: "http://localhost:8080/api/tutorial/1.0/employees/"+id,
    type: "delete",
    contentType: 'String',
    success: function (data,textstatus,jQxhr){
    
    }
     });
}
function deleteCheck() {
    $('input:checked').each(function(index) {
		if (!(index==0&&document.getElementById("maincheckbox").checked))
		{
			let ide = $(this).attr('id');
			console.log(ide);
			delEmployee(ide);
		}
    });
	location.reload();
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

function modify(id)
{
    let form=document.createElement("div");
    
    form.innerHTML='<div id="form"><input type="text" id="firstName" placeholder="First name" /></fieldset>\
        <input type="text" id="lastName" placeholder="Last name" /></fieldset>\
        <input type="text" id="email" placeholder="Email"/></fieldset>\
        <input type="text" id="phone" placeholder="Phone"/></fieldset>\
        <fieldset>\
            <button class="btn btn-success" id="save" onclick="edit('+id+')">Save</button>\
        </fieldset></div>';
    document.body.appendChild(form);
}
function edit(id)
{
    var firstName=document.getElementById("firstName").value;
    var lastName=document.getElementById("lastName").value;
    var email=document.getElementById("email").value;
    var phone=document.getElementById("phone").value;
    var JSONEmployee =
	{
	"employeeId": id,
    "firstName": firstName,
    "lastName":lastName,
    "email": email,
    "phone": phone
    };
	console.log(JSONEmployee);
	$.ajax({
	url: 'http://localhost:8080/api/tutorial/1.0/employees/'+id,
	type: 'put',
	data : JSON.stringify(JSONEmployee),
	contentType: 'application/json',
	success: function (data,textstatus,jQxhr)
		{
		location.reload();
		}
	});
}
function newEmployee(){
    let form=document.createElement("div");
    
    form.innerHTML='<div id="form"><input type="text" id="firstNameAdd" placeholder="First name" /></fieldset>\
        <input type="text" id="lastNameAdd" placeholder="Last name" /></fieldset>\
        <input type="text" id="emailAdd" placeholder="Email"/></fieldset>\
        <input type="text" id="phoneAdd" placeholder="Phone"/></fieldset>\
        <fieldset>\
            <button class="btn btn-success" id="save" onclick="saveEmployee()">Save</button>\
        </fieldset></div>';
    document.body.appendChild(form);
}

function saveEmployee(){
    
    counter++;
    let req=new XMLHttpRequest();
    let employee=new Object();
    employee.firstName=document.getElementById("firstNameAdd").value;
    employee.lastName=document.getElementById("lastNameAdd").value;
    employee.email=document.getElementById("emailAdd").value;
    employee.phone=document.getElementById("phoneAdd").value;
    req.open("POST","http://localhost:8080/api/tutorial/1.0/employees",true);
    employee.employeeId=counter;
    req.setRequestHeader("content-type","application/json");
    req.send(JSON.stringify(employee));
    
	location.reload()
}