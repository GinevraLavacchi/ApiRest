$(document).ready(function() {
	
    $.ajax({
    	url: 'http://localhost:8080/api/tutorial/1.0/employees',
      type: 'get',
    	contentType: 'application/json',
      success: function(data, textstatus, jQxhr){
        
        var dataDefault = data;
        
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
            });
            $('#employee_table').append(employee_data);
        
      },
      error: function (data, textstatus, errorThrown){
      	console.log (errorThrown);
      }
    });
});

function deleteCheck() {
    $('input:checked').each(function() {
        $(this).closest('tr').remove();
    });
}
function mainadd() {
    
    var name = prompt("Please enter your name:", "");
    var email = prompt("Please enter your email:", "");
    var address = prompt("Please enter your address:", "");
    var phone = prompt("Please enter your phone:", "");

    var append = '<td><input class="form-check-input" type="checkbox" name="checkbox" ></td><td><p>'+name+'</p></td><td><p>'+email+'</p></td><td class="l"><p>'+address+'</p></td><td><p>'+phone+'</p></td>';
    append = append + '<td><button class="btn btn"><img onClick="modify()" src="img/editbutton.png" style="width: 30px; height: 30px;"></button></td>';
    append = append + '<td><button class="btn btn"><img onClick="deleteCheck()" src="img/removebutton.png" style="width: 30px; height: 30px;"></button></td>';
    const tr = document.createElement('tr');
    var appo = document.getElementsByName('checkbox');
    tr.id = (tr + appo.length);
    tr.innerHTML = append;
    document.getElementById('body').appendChild(tr);
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
