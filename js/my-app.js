// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: true,
	swipePanelOnlyClose: true,
	pushState: false,
    template7Pages: true,
    fastclick: true,
    smartSelectOpenIn:'popup',
    touch: { tapHold: true},
    stackPages: false,	
    removeElements: true,

});

// Export selectors engine
var $$ = Dom7;


var itemsSlider = 0;
var getURLimagenesIntereses = "http://35.231.135.74:80/multimedia/verImagenes/";

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
});


var subnaview = myApp.addView('.view-subnav');


$(document).ready(function() {
        circlemenu();
		$("#RegisterForm").validate();
		$("#LoginForm").validate();
		$("#ForgotForm").validate();
		$(".close-popup").click(function() {					  
			$("label.error").hide();
		});

		$("#closePop").click(function() {
			$(".popover-about1").attr('style','display:none');
		});	
		
		
});

function LoginUser(){

	var loginaccess = { 
         		empleado : $("#username").val(),
         		contrasena : $('#password').val()
         		};
			        $.ajax({
			            url : 'http://35.231.135.74:80/empleado/autenticacion',
			            processData: false,
			            dataType : 'json',
			            contentType: 'application/json',
			            method : 'post', //en este caso
			            data : JSON.stringify(loginaccess),
			            success : function(data){
			            	if ($('#password').val() == "" && $("#username").val() == "") {
						       myApp.alert('Por favor ingrese el usuario y contraseña');
						    }else if (data.id == 1) {
			                	myApp.alert(data.error);   
						    }else if (data.id == -1 ) {
						        myApp.alert(data.error);
						    }else if (data.id == -2 ) {
						        myApp.alert(data.error);
						    }else{
						    	
						    	var yetVisited = localStorage[loginaccess.empleado];
						    	if (!yetVisited) {
							        localStorage[loginaccess.empleado] = loginaccess.empleado;							        
							    }

							   	myApp.showPreloader('Cargando')
							    setTimeout(function () {
							        myApp.hidePreloader();
							    }, 180);
							   	myApp.closeModal('.login-screen');
					             
								var html = "<div class='swiper-wrapper'>";								
					          	for(var i = 0;i<data.length;i++){
					          		localStorage.setItem("imgData"+i+"", getURLimagenesIntereses+data[i].url);
					          		localStorage.setItem("TiendaLocal", data[i].idTiendas);
					          		
					          		html+="<div class='swiper-slide' style='background-image:url("+getURLimagenesIntereses+data[i].url+");'><div class='slider_trans'></div></div>";
							  		itemsSlider++;
							 	}
        							
        						$("#SliderHome").html(html + "</div><div class='swiper-pagination'></div>");					          	
					          	var mySwiper = new Swiper ('.swiper-container', {
					          		autoplay:3000,
					          		speed: 1200,
					          		autoplayDisableOnInteraction: false,

					          		watchSlidesProgress: true,
					                watchVisibility: true,

					                // Loop
					                loop: true,
					                loopAdditionalSlides: 2,
					                loopedSlides: 2,

					                // Position
					                //slidesPerView: 1, //If "auto" or slidesPerView > 1, enable watchSlidesVisibility for lazy load
					            
					                preloadImages: true,
								    // Enable lazy loading
								    lazy: true,
					        

					                // Lazy Loading 
					                watchSlidesVisibility: true,
					                lazyLoading: true,

							    pagination: {
							      el: '.swiper-pagination',
										clickable: true,
							    },
							  })

						      } 
			                },
			            error: function(xhr, status, error){
			                console.log(xhr.responseText);
			            }
			        }); 
}

     
         $$('.login-screen .list-button').on('click', function () {

         	var loginaccess = { 
         		empleado : $("#username").val(),
         		contrasena : $('#password').val()
         		};
			        $.ajax({
			            url : 'http://35.231.135.74:80/empleado/autenticacion',
			            processData: false,
			            dataType : 'json',
			            contentType: 'application/json',
			            method : 'post', //en este caso
			            data : JSON.stringify(loginaccess),
			            success : function(data){
			            	if ($('#password').val() == "" && $("#username").val() == "") {
						       myApp.alert('Por favor ingrese el usuario y contraseña');
						    }else if (data.id == 1) {
			                	myApp.alert(data.error);
						    }else if (data.id == -1 ) {
						        myApp.alert(data.error);
						    }else if (data.id == -2) {
						        myApp.alert(data.error);
						    }else{
						    	
						    	var yetVisited = localStorage[loginaccess.empleado];
						    	if (!yetVisited) {
							        localStorage[loginaccess.empleado] = loginaccess.empleado;							        
							    }

							    myApp.showPreloader('Cargando')
							    setTimeout(function () {
							        myApp.hidePreloader();
							    }, 180);
							   	myApp.closeModal('.login-screen');
					             
								var html = "<div class='swiper-wrapper'>";								
					          	for(var i = 0;i<data.length;i++){
					          		localStorage.setItem("imgData"+i+"", getURLimagenesIntereses+data[i].url);
					          		localStorage.setItem("TiendaLocal", data[i].idTiendas);
					          		
					          		html+="<div class='swiper-slide' style='background-image:url("+getURLimagenesIntereses+data[i].url+");'><div class='slider_trans'></div></div>";
							  		itemsSlider++;
							 	}
        							
        						$("#SliderHome").html(html + "</div><div class='swiper-pagination'></div>");					          	
					          	var mySwiper = new Swiper ('.swiper-container', {
					          		autoplay:3000,
					          		speed: 1200,
					          		autoplayDisableOnInteraction: false,

					          		watchSlidesProgress: true,
					                watchVisibility: true,

					                // Loop
					                loop: true,
					                loopAdditionalSlides: 2,
					                loopedSlides: 2,

					                // Position
					                //slidesPerView: 1, //If "auto" or slidesPerView > 1, enable watchSlidesVisibility for lazy load
					            
					                preloadImages: true,
								    // Enable lazy loading
								    lazy: true,
					        

					                // Lazy Loading 
					                watchSlidesVisibility: true,
					                lazyLoading: true,

							    pagination: {
							      el: '.swiper-pagination',
										clickable: true,
							    },
							  })

						      } 
			                },
			            error: function(xhr, status, error){
			                console.log(xhr.responseText);
			            }
			        });      
            
         });


myApp.onPageInit('index', function (page) {		

		var html1 = "<div class='swiper-wrapper'>";

		for(var i = 0;i<itemsSlider;i++){
			var dataImage = localStorage.getItem('imgData'+i+'');
			
      		html1+="<div class='swiper-slide' style='background-image:url("+dataImage+");'><div class='slider_trans'></div></div>";
      						
		}

		$("#SliderHome").html(html1 + "</div><div class='swiper-pagination'></div>");
		
		var mySwiper = new Swiper ('.swiper-container', {
					          		autoplay:3000,
					          		speed: 1200,
					          		autoplayDisableOnInteraction: false,

					          		watchSlidesProgress: true,
					                watchVisibility: true,

					                // Loop
					                loop: true,
					                loopAdditionalSlides: 2,
					                loopedSlides: 2,

					                // Position
					                //slidesPerView: 1, //If "auto" or slidesPerView > 1, enable watchSlidesVisibility for lazy load
					            
					                preloadImages: true,
								    // Enable lazy loading
								    lazy: true,
					        

					                // Lazy Loading 
					                watchSlidesVisibility: true,
					                lazyLoading: true,

							    pagination: {
							      el: '.swiper-pagination',
										clickable: true,
							    },
							  })

		});

		$(".close-popup").click(function() {					  
			$("label.error").hide();
		});

	
$$(document).on('pageInit', function (e) {
		$("#RegisterForm").validate();
		$("#LoginForm").validate();
		$("#ForgotForm").validate();
})

myApp.onPageInit('videos', function (page) {
		  $(".videocontainer").fitVids();
})
myApp.onPageInit('contact', function (page) {
		$("#ContactForm").validate({
		submitHandler: function(form) {
		ajaxContact(form);
		return false;
		}
		});	
})

// myApp.onPageInit('blog', function (page) {
 
// 		$(".posts li").hide();	
// 		size_li = $(".posts li").size();
// 		x=4;
// 		$('.posts li:lt('+x+')').show();
// 		$('#loadMore').click(function () {
// 			x= (x+1 <= size_li) ? x+1 : size_li;
// 			$('.posts li:lt('+x+')').show();
// 			if(x == size_li){
// 				$('#loadMore').hide();
// 				$('#showLess').show();
// 			}
// 		});

// })



myApp.onPageInit('blog', function (page) {
 
if($("#Post1").click(function() {
document.getElementById("Post").value = "1";
mainView.router.loadPage('blog_internal.html'); 
}));
if($("#Post2").click(function() {
document.getElementById("Post").value = "2";
mainView.router.loadPage('blog_internal.html'); 
}));
if($("#Post3").click(function() {
document.getElementById("Post").value = "3";
mainView.router.loadPage('blog_internal.html'); 
}));
if($("#Post4").click(function() {
document.getElementById("Post").value = "4";
mainView.router.loadPage('blog_internal.html'); 
}));
if($("#Post5").click(function() {
document.getElementById("Post").value = "5";
mainView.router.loadPage('blog_internal.html'); 
}));


 $.ajax({ 
    type: 'GET', 
    url: 'http://35.231.135.74/intereses/detalleIntereses/'+$("#Post").val()+'',
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
           
            var results = JSON.stringify(data);
            var obj = JSON.parse(results);
            var html = "";
            var html2 = "";

            var secondobj = obj.length;
      
            for(var i = 0;i<obj.length;i++){

            	$('.modal-overlay-visible').attr("style", "visibility: hidden !important;");
            	
            	html+="<input id='PostDetalle' value='"+obj[i].id+"' style='display:none'> <li class='cards__item'><div class='card'><div class='card__image'><img src='http://35.231.135.74/intereses/verImagenes/"+obj[i].identificadorMultimedia+"'></div><div class='card__content'><div class='card__title'>"+obj[i].titulo+"</div><p class='card__text'>"+obj[i].descripcion+"</p><a href='#' data-popover='.popover-about"+obj[i].id+"' class='open-popover btn btn-block card__btn'>Ver articulo</a><a href='#' data-popover='.popover-about-sus"+obj[i].id+"' class='open-popover btn btn-block1 card__btn''>Suscribirme</a></div></div> <div class='popover popover-about"+obj[i].id+"'><div class='popover-angle'></div><div class='popover-inner'><div class='content-block-popup'><a href='#' class='close-popover'><div class='navbar_right2'><img  src='images/icons/black/back.png' alt='' title='' /></div></a><h2 class='page_title'>"+obj[i].titulo+"</h2><div class='card__image_2'><img class='content-block-image' src='http://35.231.135.74/intereses/verImagenes/"+obj[i].identificadorMultimedia+"'></div><p style='margin: 20px 0 0 0;'>"+obj[i].descripcion+"</p></div></div></div><div class='popover popover-about-sus"+obj[i].id+"'><div class='popover-angle'></div><div class='popover-inner'><div class='content-block-popup'><a href='#' class='close-popover'><div class='navbar_right2'><img  src='images/icons/black/back.png' alt='' title='' /></div></a><h2 class='page_title'>Gracias por querer suscríbirte a la familia Mundo Único</h2><h2 class='page_title_secondary'>Por favor ingrese su documento</h2><form class='form'><div class='list-block'><ul><div class='row'><div class='col-100'><li class = 'item-content'><div class = 'item-inner'><div class = 'item-input'><input id='document'  onblur='findusersus()' type='text' class='input-form' required name='document' placeholder='Número de documento'></div></div></li></div></div></ul></div><div class = 'list-block'><ul><button id='suscribe' onclick='subscribe();' class='item-link list-button' type='button'>SUSCRIBIRME</button></ul></div></form></div></div></div></li>"
            	          	
           	
			}
			$("#cards1").html(html);
			$("#internalDetalle").html(html2);


// 			if($("#buttonDetalle1").click(function() {
			
// 			mainView.router.loadPage('blog-single.html'); 

// 			console.log($("#PostDetalle").val());
// }));

   }
})





})



function IndexLog() {
 mainView.router.reloadPage('registro.html');
}

function finduser(){

	var cliente = {numeroDocumento : $("#document").val() }
	$.ajax({
	            url : 'http://35.231.135.74:80/clientes/'+$("#document").val()+'',
	            processData: false,
	             dataType : 'json',
	            contentType: 'application/json',
	                method : 'post', //en este caso
	                data : JSON.stringify(cliente),
	                success : function(data){
	                     if (data.id == -1) {
		                	
					    }else{
					    	$("#name").val(data.primerNombre);	
					    	$("#lastname").val(data.primerApellido);	
					    	$("#mail").val(data.correo);	
					    	$("#phone").val(data.telefono);	
					    }
	                },
	                error: function(xhr, status, error){
	                    console.log(xhr.responseText);
	                }
	        });

}

function finduserpqrs(){

	var cliente = {numeroDocumento : $("#document").val() }
	$.ajax({

	            url : 'http://35.231.135.74:80/clientes/'+$("#document").val()+'',
	            processData: false,
	             dataType : 'json',
	            contentType: 'application/json',
	                method : 'post', //en este caso
	                data1 : JSON.stringify(cliente),
	                success : function(data1){
	                     if (data1.id == -1) {

	                     	myApp.modal({
							  title: 'Notificación Mundo Único',
		            		  text: 'Señor(a) usuario usted no se encuentra registrado, por favor regístrese',
		            		  buttons: [
						      {
						        text: 'Cancelar',
						        onClick: function() {
						         myApp.closeModal();
						         document.getElementById("name").value = " ";
								 document.getElementById("phone").value = " ";
								 document.getElementById("mail").value = " ";
								 document.getElementById("message").value = " ";
						         $('#name').attr("disabled", true);
						         $('#phone').attr("disabled", true);
						         $('#mail').attr("disabled", true);
						         $('.label-content').attr("disabled", true);
						         $('#message').attr("disabled", true);

						         
						         document.getElementById("name").reset();
						        }
						      }, 
						      {
						        text: 'Registrarme',
						        onClick: function() {
						         //mainView.router.reloadPage('registry.html');
						        // myApp.popup(popupHTML, removeOnClose); 
						        var popupHTML = '<div class="popup"><div class="content-block1"><h2 class="page_title">Gracias por querer formar parte de la familia Mundo Único</h2><h2 class="page_title_secondary">Por favor completa el siguiente formulario</h2><form class="form-modal"><div class = "list-block"><ul><div class="row"><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="document1" type="text" class="input-form" required name="password" placeholder="Número de documento" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="name1" type="text" class="input-form" required name="password" placeholder="Nombre" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="phone1" type="text" class="input-form" required name="password" placeholder="Teléfono" ></div></div></li></div><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="mail1" type="text" class="input-form" required name="password" placeholder="Correo electrónico" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="lastname1" type="text" class="input-form" required name="password" placeholder="Apellidos" ></div></div></li><div class="label-content2"><label>Género</label><input type="radio" id="Hombre" name="drone2" value="M" checked /><label for="huey">Hombre</label><input type="radio" id="Mujer" name="drone2" value="F" /><label for="dewey">Mujer</label></div></div></div></ul></div><div class = "list-block"><ul class="button-modal2"><button onclick="registry2();" class="item-link list-button" type="button">REGISTRARME</button></ul></div></form>'+
													'<p><a href="#" class="close-popup-2" id="closemodal">Cancelar</a></p>'+
								                    '</div>'+
								                  '</div>'
								  myApp.popup(popupHTML);

								  $("#closemodal").click(function() {
										document.getElementById("name").value = " ";
										document.getElementById("phone").value = " ";
										document.getElementById("mail").value = " ";
										document.getElementById("message").value = " ";
								   });
						        }
						      }
						    ]
		                	});  
		                	 
					    }else{
					    	$("#name").val(data1.primerNombre + " " + data1.segundoApellido);	
					    	$("#mail").val(data1.correo);	
					    	$("#phone").val(data1.telefono);
					        $('#name').attr("disabled", false);
					        $('#phone').attr("disabled", false);
					        $('#mail').attr("disabled", false);
					        $('.label-content').attr("disabled", false);
					        $('#message').attr("disabled", false);	
					    }
	                },
	                error: function(xhr, status, error){
	                    console.log(xhr.responseText);
	                }
	        });

}

function findusercalification(){

	var cliente = {numeroDocumento : $("#document").val() }
	$.ajax({

	            url : 'http://35.231.135.74:80/clientes/'+$("#document").val()+'',
	            processData: false,
	             dataType : 'json',
	            contentType: 'application/json',
	                method : 'post', //en este caso
	                data1 : JSON.stringify(cliente),
	                success : function(data1){
	                     if (data1.id == -1) {

	                     	myApp.modal({
							  title: 'Notificación Mundo Único',
		            		  text: 'Señor(a) usuario usted no se encuentra registrado, por favor regístrese',
		            		  buttons: [
						      {
						        text: 'Cancelar',
						        onClick: function() {
						         myApp.closeModal();
						         $('#why').attr("disabled", true);						         
						         document.getElementById("document").reset();
						        }
						      }, 
						      {
						        text: 'Registrarme',
						        onClick: function() {
						         //mainView.router.reloadPage('registry.html');
						        // myApp.popup(popupHTML, removeOnClose); 
						        var popupHTML = '<div class="popup"><div class="content-block1"><h2 class="page_title">Gracias por querer formar parte de la familia Mundo Único</h2><h2 class="page_title_secondary">Por favor completa el siguiente formulario</h2><form class="form-modal"><div class = "list-block"><ul><div class="row"><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="document1" type="text" class="input-form" required name="password" placeholder="Número de documento" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="name1" type="text" class="input-form" required name="password" placeholder="Nombre" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="phone1" type="text" class="input-form" required name="password" placeholder="Teléfono" ></div></div></li></div><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="mail1" type="text" class="input-form" required name="password" placeholder="Correo electrónico" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="lastname1" type="text" class="input-form" required name="password" placeholder="Apellidos" ></div></div></li><div class="label-content2"><label>Género</label><input type="radio" id="Hombre" name="drone2" value="M" checked /><label for="huey">Hombre</label><input type="radio" id="Mujer" name="drone2" value="F" /><label for="dewey">Mujer</label></div></div></div></ul></div><div class = "list-block"><ul class="button-modal2"><button onclick="registry3();" class="item-link list-button" type="button">REGISTRARME</button></ul></div></form>'+
													'<p><a href="#" id="closemodal" class="close-popup-2">Cancelar</a></p>'+
								                    '</div>'+
								                  '</div>'
								  myApp.popup(popupHTML);
								   
								   $("#closemodal").click(function() {
										$('#why').attr("disabled", true);						         
								   });
						        }
						      }
						    ]
		                	});  
		                	 
					    }else{
					    	$('#why').attr("disabled", false);						         
					    	$("#name").val(data1.primerNombre + " " + data1.segundoApellido);	
					    	$("#mail").val(data1.correo);	
					    	$("#phone").val(data1.telefono);
					        $('#name').attr("disabled", false);
					        $('#phone').attr("disabled", false);
					        $('#mail').attr("disabled", false);
					        $('.label-content').attr("disabled", false);
					        $('#message').attr("disabled", false);	
					    }
	                },
	                error: function(xhr, status, error){
	                    console.log(xhr.responseText);
	                }
	        });

}


function findusersus(){

	var cliente = {numeroDocumento : $("#document").val() }
	$.ajax({

	            url : 'http://35.231.135.74:80/clientes/'+$("#document").val()+'',
	            processData: false,
	             dataType : 'json',
	            contentType: 'application/json',
	                method : 'post', //en este caso
	                data3 : JSON.stringify(cliente),
	                success : function(data3){
	                     if (data3.id == -1) {

	                     	myApp.modal({
							  title: 'Notificación Mundo Único',
		            		  text: 'Señor(a) usuario usted no se encuentra registrado, por favor regístrese',
		            		  buttons: [
						      {
						        text: 'Cancelar',
						        onClick: function() {
						         myApp.closeModal();				
						         document.getElementById("document").value = "";   
						         $('#document').attr("placeholder", "Número de documento");      
						         document.getElementById("document").reset();
						        }
						      }, 
						      {
						        text: 'Registrarme',
						        onClick: function() {
						         //mainView.router.reloadPage('registry.html');
						        // myApp.popup(popupHTML, removeOnClose); 
						        var popupHTML = '<div class="popup"><div class="content-block1"><h2 class="page_title">Gracias por querer formar parte de la familia Mundo Único</h2><h2 class="page_title_secondary">Por favor completa el siguiente formulario</h2><form class="form-modal"><div class = "list-block"><ul><div class="row"><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="document1" type="text" class="input-form" required name="password" placeholder="Número de documento" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="name1" type="text" class="input-form" required name="password" placeholder="Nombre" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="phone1" type="text" class="input-form" required name="password" placeholder="Teléfono" ></div></div></li></div><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="mail1" type="text" class="input-form" required name="password" placeholder="Correo electrónico" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="lastname1" type="text" class="input-form" required name="password" placeholder="Apellidos" ></div></div></li><div class="label-content2"><label>Género</label><input type="radio" id="Hombre" name="drone2" value="M" checked /><label for="huey">Hombre</label><input type="radio" id="Mujer" name="drone2" value="F" /><label for="dewey">Mujer</label></div></div></div></ul></div><div class = "list-block"><ul class="button-modal2"><button onclick="registry4();" class="item-link list-button" type="button">REGISTRARME</button></ul></div></form>'+
													'<p><a href="#" id="closemodal" class="close-popup-2">Cancelar</a></p>'+
								                    '</div>'+
								                  '</div>'
								  myApp.popup(popupHTML);
								   
								   $("#closemodal").click(function() {

										$('#suscribe').attr("disabled", true);						         
								   });
						        }
						      }
						    ]
		                	});  
		                	 
					    }else{
					    	$('#suscribe').attr("disabled", false);						         
					    	
					    }
	                },
	                error: function(xhr, status, error){
	                    console.log(xhr.responseText);
	                }
	        });

}

myApp.onPageInit('pqrs', function(page){
    
 $$.ajax({ 
    type: 'GET', 
    url: 'http://35.231.135.74:80/preguntasTienda',
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
           
            var results = JSON.stringify(data);
            var obj = JSON.parse(results);
            var html = "";



            for(var i = 0;i<obj.length;i++){

            	var informacion = obj[i].informacion;
            	var resul = informacion.replace(". ",". <br><br>");

            	
            	if (obj[i].imagen != null) {
            		html+="<div class='accordion-item'><div class='accordion-item-toggle'><i class='icon icon-plus'>+</i><i class='icon icon-minus'>-</i><span> "+obj[i].titulo+"</span></div><div class='accordion-item-content'><img src="+obj[i].imagen+"></div></div>";
            	}else{
            		html+="<div class='accordion-item'><div class='accordion-item-toggle'><i class='icon icon-plus'>+</i><i class='icon icon-minus'>-</i><span> "+obj[i].titulo+"</span></div><div class='accordion-item-content'><p class='p-item-content' id='con"+obj[i].id+"'>"+resul+"</p></div></div>";
            		
            	}	

     //        	var txt = document.getElementById("con"+obj[i].id+"");
					// txt.innerHTML.replace (".",". \n\n");
            	
			}
			$(".custom-accordion").html(html);
   }
});


  

})

function pqrs(){

	    var dataTienda = localStorage.getItem('TiendaLocal');
        var pqrsregister = { 
         pqrs : $('input[name=drone1]:checked', '.label-content1').val(),
         nota : $('#message').val()};
        $.ajax({
                url : 'http://35.231.135.74:80/pqrs/tienda/'+dataTienda+'/cliente/'+$("#document").val(),
            processData: false,
             dataType : 'json',
            contentType: 'application/json',
                method : 'POST', //en este caso
                data : JSON.stringify(pqrsregister),
                success : function(response){
                	 mainView.router.loadPage('notification2.html');                       
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
}

function subscribe(){

        var susregister = { 
         cliente : $('#document').val()};
        $.ajax({
                url : 'http://35.231.135.74:80/intereses/'+$("#PostDetalle").val(),
            processData: false,
             dataType : 'json',
            contentType: 'application/json',
                method : 'POST', //en este caso
                data : JSON.stringify(susregister),
                success : function(response){
                	 mainView.router.loadPage('notification3.html');                       
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
}

function registry(){

        var cliente = { 
         numeroDocumento : $("#document").val(),
         primerNombre : $('#name').val(), 	
         segundoNombre : $('#name').val(), 	
         primerApellido : $('#lastname').val(),
         segundoApellido : $('#name').val(), 	
         correo : $('#mail').val(), 
         sexo : $('input[name=drone]:checked', '.label-content').val(),
         telefono : $('#phone').val()
     };

       $.ajax({
            url : 'http://35.231.135.74:80/clientes',
            processData: false,
            dataType : 'json',
            contentType: 'application/json',
            method : 'post', //en este caso
            data : JSON.stringify(cliente),
                success : function(response){
                       mainView.router.loadPage('notification.html');  
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
}; 

function registry2(){

        var cliente = { 
         numeroDocumento : $("#document1").val(),
         primerNombre : $('#name1').val(), 	
         segundoNombre : $('#name1').val(), 	
         primerApellido : $('#lastname1').val(),
         segundoApellido : $('#lastname1').val(), 	
         correo : $('#mail1').val(), 
         sexo : $('input[name=drone2]:checked', '.label-content2').val(),
         telefono : $('#phone1').val()
     };

       $.ajax({
            url : 'http://35.231.135.74:80/clientes',
            processData: false,
            dataType : 'json',
            contentType: 'application/json',
            method : 'post', //en este caso
            data : JSON.stringify(cliente),
                success : function(response){
                       myApp.modal({
					  title: '¡Bievenido!',
            		  text: 'Ya eres parte de la familia de Mundo Único',
            		  buttons: [
				      {
				        text: 'VOLVER',
				        onClick: function() {
				         myApp.closeModal();
				          mainView.router.loadPage('pqrs.html');  
				        }
				      }
				    ]
                	});
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
}; 

function registry3(){

        var cliente = { 
         numeroDocumento : $("#document1").val(),
         primerNombre : $('#name1').val(), 	
         segundoNombre : $('#name1').val(), 	
         primerApellido : $('#lastname1').val(),
         segundoApellido : $('#lastname1').val(), 	
         correo : $('#mail1').val(), 
         sexo : $('input[name=drone2]:checked', '.label-content2').val(),
         telefono : $('#phone1').val()
     };

       $.ajax({
            url : 'http://35.231.135.74:80/clientes',
            processData: false,
            dataType : 'json',
            contentType: 'application/json',
            method : 'post', //en este caso
            data : JSON.stringify(cliente),
                success : function(response){
                       myApp.modal({
					  title: '¡Bievenido!',
            		  text: 'Ya eres parte de la familia de Mundo Único',
            		  buttons: [
				      {
				        text: 'VOLVER',
				        onClick: function() {
				         myApp.closeModal();
				         document.getElementById("document").value = " ";
				          mainView.router.loadPage('calification.html');  
				        }
				      }
				    ]
                	});
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
}; 

function registry4(){

        var cliente = { 
         numeroDocumento : $("#document1").val(),
         primerNombre : $('#name1').val(), 	
         segundoNombre : $('#name1').val(), 	
         primerApellido : $('#lastname1').val(),
         segundoApellido : $('#lastname1').val(), 	
         correo : $('#mail1').val(), 
         sexo : $('input[name=drone2]:checked', '.label-content2').val(),
         telefono : $('#phone1').val()
     };

       $.ajax({
            url : 'http://35.231.135.74:80/clientes',
            processData: false,
            dataType : 'json',
            contentType: 'application/json',
            method : 'post', //en este caso
            data : JSON.stringify(cliente),
                success : function(response){
                       myApp.modal({
					  title: '¡Bievenido!',
            		  text: 'Ya eres parte de la familia de Mundo Único',
            		  buttons: [
				      {
				        text: 'VOLVER',
				        onClick: function() {
				         myApp.closeModal();
				         document.getElementById("document").value = " ";
				          mainView.router.loadPage('blog-single.html');  
				        }
				      }
				    ]
                	});
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
}; 

function felicitaciones(){

		$$('#SendCongratulations').click(function(){
	    var dataTienda = localStorage.getItem('TiendaLocal');
        var felregister = { 
         puntaje : $('input[name=rating]:checked', '.ratingItemList').val()};
        $.ajax({
                url : 'http://35.231.135.74:80/felicitaciones/tienda/'+dataTienda+'/cliente/'+$("#identification").val(),
            processData: false,
             dataType : 'json',
            contentType: 'application/json',
                method : 'POST', //en este caso
                data : JSON.stringify(felregister),
                success : function(response){
                	myApp.modal({
					  title: 'Notificación Mundo Único',
            		  text: 'Señor(a) su felicitación ha sido registrada correctamente',
            		  buttons: [
				      {
				        text: 'OK',
				        onClick: function() {
				         myApp.closeModal();
				        }
				      }
				    ]
                	}); 
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
});

}
myApp.onPageInit('success', function(page){


$(document).ready(function(){
      $( "#haha" ).click(function() {
        $('#haha').attr("style", "filter: none !important;width: 140px !important;height: 140px !important;");
        $('#yay').attr("style", "filter: grayscale(100%) !important;");
        $('#wow').attr("style", "filter: grayscale(100%) !important;");
        $('#sad').attr("style", "filter: grayscale(100%) !important;");
        $('#angry').attr("style", "filter: grayscale(100%) !important;");
        $('.display-not-input').removeClass('display-not-input');
        document.getElementById("calification").value = "5";
      });

      $( "#yay" ).click(function() {
        $('#yay').attr("style", "filter: none !important;width: 140px !important;height: 140px !important;");
        $('#haha').attr("style", "filter: grayscale(100%) !important;");
        $('#wow').attr("style", "filter: grayscale(100%) !important;");
        $('#sad').attr("style", "filter: grayscale(100%) !important;");
        $('#angry').attr("style", "filter: grayscale(100%) !important;");
        $('.display-not-input').removeClass('display-not-input');
        document.getElementById("calification").value = "4";
      });

      $( "#wow" ).click(function() {
        $('#wow').attr("style", "filter: none !important;width: 140px !important;height: 140px !important;");
        $('#haha').attr("style", "filter: grayscale(100%) !important;");
        $('#yay').attr("style", "filter: grayscale(100%) !important;");
        $('#sad').attr("style", "filter: grayscale(100%) !important;");
        $('#angry').attr("style", "filter: grayscale(100%) !important;");
        $('.display-not-input').removeClass('display-not-input');
        document.getElementById("calification").value = "3";
      });

      $( "#sad" ).click(function() {
        $('#sad').attr("style", "filter: none !important;width: 140px !important;height: 140px !important;");
        $('#haha').attr("style", "filter: grayscale(100%) !important;");
        $('#yay').attr("style", "filter: grayscale(100%) !important;");
        $('#wow').attr("style", "filter: grayscale(100%) !important;");
        $('#angry').attr("style", "filter: grayscale(100%) !important;");
        $('.display-not-input').removeClass('display-not-input');
        document.getElementById("calification").value = "2";
      });

      $( "#angry" ).click(function() {
        $('#angry').attr("style", "filter: none !important;width: 140px !important;height: 140px !important;");
        $('#haha').attr("style", "filter: grayscale(100%) !important;");
        $('#yay').attr("style", "filter: grayscale(100%) !important;");
        $('#wow').attr("style", "filter: grayscale(100%) !important;");
        $('#sad').attr("style", "filter: grayscale(100%) !important;");
        $('.display-not-input').removeClass('display-not-input');
        document.getElementById("calification").value = "1";
      });

    });

	$$('#SendCongratulations').click(function(){
	    var dataTienda = localStorage.getItem('TiendaLocal');
        var felregister = { 
         puntaje : $('#calification').val()};
        $.ajax({
                url : 'http://35.231.135.74:80/felicitaciones/tienda/'+dataTienda+'/cliente/'+$("#document").val(),
            processData: false,
             dataType : 'json',
            contentType: 'application/json',
                method : 'POST', //en este caso
                data : JSON.stringify(felregister),
                success : function(response){
                	mainView.router.loadPage('notification2.html');  
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
}); 
    
   $('button.submit').disabled = true;	// disable button on load

   // Enable button 
function enable_submit() {
  $('button.submit').disabled = false;
  $('button.submit').addClass('not-disabled');
}

// Disable button
function disable_submit() {
  $('button.submit').disabled = true;
  $('button.submit').removeClass('not-disabled');
}

// Display feedback after rating 
$('.rating').on('click', function() {
  var rating = this['value'];
  
  $('.feedback').css('display', "block");
  
  feedback_validate(rating);
  
});


// Run enable button function based on input
$('.feedback textarea').keyup(function() {
  if ($('.feedback textarea').val().length > 3)   {
    enable_submit();
  }
});

// Enable or disable button by validation
function feedback_validate(val) {
  if (val <= 3) {
    disable_submit();
    
  } 
  else if (val > 3) {
    enable_submit();
  }
  
}



});

myApp.onPageInit('registro', function (page){
    
    		(function() {
				var formWrap = document.getElementById( 'fs-form-wrap' );

				[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {	
					new SelectFx( el, {
						stickyPlaceholder: false,
						onChange: function(val){
							document.querySelector('span.cs-placeholder').style.backgroundColor = val;
						}
					});
				} );

				new FForm( formWrap, {
					onReview : function() {
						classie.add( document.body, 'overview' ); // for demo purposes only
					}
				} );
			})();



 
    
})


myApp.onPageInit('shopping', function(page){


$(window).ready(function(){
	var left, width, cont = "#q-cont";
	$('span').click(function(){
		$(this).css("background","#5a6");
		$('.re').css("background","#d90");
		next();
	});
	$('.re').click(function(){
		$(".op").css("background","#d90");
		$('.re').css("background","#5a6");
		$(cont).css("left", "0px");
	});
	function next() {
		width = $(cont).width()/4;
		left = $(cont).css("left").slice(0,-2)*1;
		left -= width;
		$(cont).css("left", left+"px");
	}
});


});









