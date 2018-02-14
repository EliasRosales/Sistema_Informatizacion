var url = "http://localhost:8000/api/"

$("#send").click(function(event) {
	var usuario = $("#username").val();
	var contraseña = $("#password").val();

	login(usuario, contraseña);


});

function login(usuario, contraseña){
	completeURL = url + "login/";
	$.post(completeURL, {username: usuario, password: contraseña} , function(response) {
		console.log(response);
		if(response.response == 1){
			localStorage.setItem("Id",response.data.id);
			localStorage.setItem("Name", response.data.name);
			localStorage.setItem("LastName", response.data.last_name);
			localStorage.setItem("Token",response.data.token);
            window.location.href = "../index.html";



		}else{
            swal(
                'Error',
                'Usuario o Contraseña incorrectos verifique ;)',
                'error'
            )
            var usuario = $("#username").val("");
            var contraseña = $("#password").val("");
		}
    	
	}, 'json');
}