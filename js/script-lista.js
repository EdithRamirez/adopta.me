var urlApi = 'http://138.68.19.221:1500/api/v1/pets';

$(document).ready(function(){
	console.log('lista.html Listo');
	//
	getLista();
});

/*Obtener la lista de mascotas*/
function getLista() {
	$.ajax({
		url : urlApi,
		/*se ejecuta cuando el 
		servidor responde 2XX*/
		success : function(data, status, request) {
			console.log(data);
			//ejecutamos la funcion
			renderList(data);
		},

		//se ejecuta cuando hay error
		error : function(request, options, error) {
			console.log(error);
		},

		//se ejecuta cuando acaba la peticion
		//Si hay error o si todo sale bien
		complete : function() {
			console.log('Complete');
		} 
	});
};

function renderList(petList) {
	//FORMA 1
	// for (var i = 0; i < petList.length; i++) {
	// 	//arreglo de la lista de mascotas
	// 	var pet = petList[i];
	// 	renderPet(pet);
	// }

	//FORMA 2 UNDERSCOPE
	//(arreglo, funcion que se ejecuta)
	_.each(petList, renderPet2);
};

function renderPet(pet){
	console.log('Pintando una mascota: ', pet);
	//crear html de la tarjeta
	var li = $('<li></li>');
	li.addClass('card');

	var img = $('<img/>');
	img.attr('src', pet.mainPicture);
	img.addClass('foto-list img-circle');

	var pName = $('<p></p>');
	pName.text(pet.name);

	var pAge = $('<p></p>');
	pAge.text(pet.age.number);

	var spanAge = $('<span></span');
	spanAge.text(pet.age.type);

	//insertamos span dentro del p
	pAge.append(spanAge);

	//insertamos los elementos dentro del li
	li.append(img);
	li.append(pName);
	li.append(pAge);

	console.log(li);
	//se pintan en pantalla
	$('#petLi').append(li);
};
//UNDERSCORE
function renderPet2(pet) {

	var template =
	'<li class="card">' +
		'<img src="<%= mainPicture %>" class="foto-list img-circle">' +
		'<p><%= name %></p>' +
		'<p><%= age.number %>' + 
			'<span><%= age.type %></span>' +
		'</p>' +
	'</li>';
	
	var compiled = _.template(template);
	
	var li = compiled(pet);
	
	console.log(li);

	var elemento = $(li);
	$('#petLi').append(elemento);
};

/*function renderPet2(pet) {

	var template =
	'<li class="card">' +
		'<img src="<%= pet.mainPicture %>" class="foto img-circle">' +
		'<p><%= pet.name %></p>' +
		'<p><%= pet.age.number %>' + 
			'<span><%= pet.age.type %></span>' +
		'</p>' +
	'</li>';
	
	var compiled = _.template(template);
	
	var li = compiled({ pet : pet });
	
	console.log(li);
	
	var elemento = $(li);
	$('#petLi').append(elemento);
};*/