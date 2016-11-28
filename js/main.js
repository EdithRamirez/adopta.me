var urlApi = 'http://138.68.19.221:1500/api/v1/pets';

$(document).ready(function () {
	console.log('Documento listo');
	loadPet('583862e728bbcee3798c4cb3');
});

//GET
//obtener la lista de mascotas
function loadPet(petId) {

	$.ajax({

		url : urlApi + '/' + petId,
		/*se ejecuta cuando el 
		servidor responde 2XX*/
		success : function(data, status, request) {
			console.log('Status: ', status);
			console.log('Data: ', data);
			renderPet(data);
		},

		//se ejecuta cuando hay error
		error : function(request, options, error) {
			alert(error);
		},
		//se ejecuta cuando acaba la peticion
		//Si hay error o si todo sale bien
		complete : function() {

		}
	});
}
//Pintar la informacion de la mascota
function renderPet(pet){
	//busca el texto que se modificara
	var labelName = $('#labelName');
	var photoPet = $('#photoPet');
	var labelDescription = $('#labelDescription');
	var labelAge = $('#labelAge');

	//actualiza los valores
	labelName.text(pet.name);
	photoPet.attr('src', pet.mainPicture);
	labelDescription.text(pet.description);

	//funcion de underscore
	var templateAge = "<%= number %> <span> <%= type %> </span>";
	
	var compiled = _.template(templateAge);
	
	var parmsTemplate = {
		number : pet.age.number	
	};

	//opcion 1 para cambia texto
	// if(pet.age.type == 'years') {
	// 	parmsTemplate.type = 'Años';
	// } else {
	// 	parmsTemplate.type = 'Meses';
	// }

	//opcion 2 
	parmsTemplate.type = pet.age.type == 'years'?'Años':'Meses';



	var p = compiled(parmsTemplate);

	//objeto que contiene la edad (numero y meses/años)
	/* var p = compiled({
	 	number : pet.age.number,
	 	type : pet.age.type
	});*/

	labelAge.html(p);
}