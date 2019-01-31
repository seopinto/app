// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: true,
	swipePanelOnlyClose: true,
	pushState: true,
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
var getURLimagenesPreguntasFrecuentes = "http://35.231.135.74:80/preguntasTienda/verImagenes/";


// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true
    

  	
});



function onDeviceReady() {
    document.addEventListener('backbutton', onBackKeyDown, false);
}

function onBackKeyDown() {
    var cpage = mainView.activePage;
    var cpagename = cpage.name;
    console.log(cpagename);
    if (($$('#leftpanel').hasClass('active')) || ($$('#rightpanel').hasClass('active'))) { // #leftpanel and #rightpanel are id of both panels.
        myApp.closePanel();
        return false;
    } else if ($$('.modal-in').length > 0) {
        myApp.closeModal();
        return false;
    } else if (cpagename == 'index') {
        myApp.confirm('Are you sure you want to exit?', function() {
            // var deviceType = device.platform;
            // if(deviceType == â€œAndroidâ€ || deviceType == â€œandroidâ€){
            navigator.app.exitApp();
            // }
        },
        function() {
        });
    } else {
        mainView.router.back();
    }
}

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
						       myApp.alert('Por favor ingrese el usuario y contraseÃ±a');
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
						       myApp.alert('Por favor ingrese el usuario y contraseÃ±a');
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


function calendarioblog(){
	var myCalendar  = myApp.calendar({
	    input: '#birthday_blog',
	    closeOnSelect: true,
	    toolbarCloseText: 'Done',
	    dateFormat: 'yyyy-mm-dd',
	    yearPicker: true
	});
}

 
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

$$.ajax({ 
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
            	if (document.getElementById("Post").value == "1") {
            		document.getElementById("title-new").innerHTML = "Entretenimiento";  	
            	}
            	if (document.getElementById("Post").value == "2") {
            		document.getElementById("title-new").innerHTML = "Deportes";  	
            	}
            	if (document.getElementById("Post").value == "3") {
            		document.getElementById("title-new").innerHTML = "Gadgets";  	
            	}
            	if (document.getElementById("Post").value == "4") {
            		document.getElementById("title-new").innerHTML = "Viajes";  	
            	}
            	if (document.getElementById("Post").value == "5") {
            		document.getElementById("title-new").innerHTML = "Un mundo de comodidad";  	
            	}  

            	var informacion = obj[i].descripcion;            	
            	var resulinfo = informacion.replace(/&&/g, "<br><br>");     
            	var infototal = resulinfo.replace(/&/g, "<br>");     
            	     	        	
            	html+="<input id='PostDetalle' value='"+obj[i].id+"' style='display:none'> <li class='cards__item1'><div class='card'><div class='card__image'><img id='src_image' src='http://35.231.135.74/intereses/verImagenes/"+obj[i].identificadorMultimedia+"'></div><div class='card__content'><div class='card__title' id='title_news'>"+obj[i].titulo+"</div><p class='card__text' id='desc_news'>"+resulinfo+"</p><a href='#' data-popover='.popover-about"+obj[i].id+"' class='open-popover btn btn-block card__btn'>Ver articulo</a><a href='#' data-popover='.popover-about-sus-2' class='btn btn-block-new open-popover'>Recibir Noticia</a></div></div><div class='popover popover-about"+obj[i].id+"'><div class='popover-angle'></div><div class='popover-inner'><div class='content-block-popup'><a href='#' class='close-popover'><div class='navbar_right2'><img  src='images/icons/black/back.png' alt='' title='' /></div></a><h2 class='page_title'>"+obj[i].titulo+"</h2><div class='card__image_2'><img class='content-block-image' src='http://35.231.135.74/intereses/verImagenes/"+obj[i].identificadorMultimedia+"'></div><div class='p-item-content contenido-text'>"+infototal+"</div><div class='title-new'>Si estas interesado en recibir noticias de este tipo te invitamos a suscribirte. <br> Ven y haz parte de la Familia Mundo Único </div><a href='#' data-popover='.popover-about-sus-2' class='open-popover btn btn-block card__btn''>Recibir Noticia</a></div></div></div></li>"           	

			}
			$("#cards1").html(html);
			$("#internalDetalle").html(html2);
				   }
})




$$('#suscribe').click(function(){
    var susregister = { 
    cliente : $('#documentsearch').val()
	};
    $.ajax({
            url : 'http://35.231.135.74:80/intereses/'+$("#Post").val(),
       		processData: false,
        	dataType : 'json',
        	contentType: 'application/json',
            method : 'POST', //en este caso
            data : JSON.stringify(susregister),
            success : function(response){
            	  if ( $('#documentsearch').val() == "") {
            	  	myApp.alert("Por favor ingrese un número de documento");
            	  }else{
            	  	mainView.router.loadPage('notification3.html');  
            	  }
            	                      
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
            }
    });
});

$$('#send_news').click(function(){
    var sendnews = { 
   	    titulo :  document.getElementById("title_news").innerHTML,
        descripcion : document.getElementById("desc_news").innerHTML, 	
        multimedia : document.getElementById("src_image").src
	};
    $.ajax({
            url : 'http://35.231.135.74:80/intereses/correoIcommkt/'+$("#email_news").val(),
       		processData: false,
        	dataType : 'json',
        	contentType: 'application/json',
            method : 'POST', //en este caso
            data : JSON.stringify(sendnews),
            success : function(response){
            	if ( $("#email_news").val() == "") {
            	  	$('#suscribe').attr("disabled", true);	
            	  }else{
            	  	mainView.router.loadPage('notification4.html');  
            	  }
            	  
            	  	
            	  
            	                      
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
            }
    });
});



$$('#documentsearch').change(function(){
	var cliente = {numeroDocumento : $("#documentsearch").val() }
	$.ajax({
	        url : 'http://35.231.135.74:80/clientes/'+$("#documentsearch").val()+'',
	        processData: false,
	        dataType : 'json',
	        contentType: 'application/json',
	        method : 'post', //en este caso
	        data1 : JSON.stringify(cliente),
            success : function(data1){
                 if (data1.id == -1) {
                 	myApp.modal({
					  title: 'Notificación Mundo Único',
            		  text: 'Señor(a) usuario usted no se encuentra registrado, por favor regí­strese',
            		  buttons: [
				      {
				        text: 'Cancelar',
				        onClick: function() {
				         
				        // document.getElementById("document").value = "";   
				         $('#suscribe').attr("disabled", true);	
				         myApp.closeModal();					         
				        }
				      }, 
				      {
				        text: 'Registrarme',
				        onClick: function() {

				        

				        var popupHTML = '<div class="popup"><div class="content-block1"><h2 class="page_title">Gracias por querer formar parte de la familia Mundo Único</h2><h2 class="page_title_secondary">Por favor completa el siguiente formulario</h2><div class="form-modal"><div class = "list-block"><ul><div class="row"><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="document_blog" type="number" class="input-form" required name="password" placeholder="Número de documento" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="name_blog" type="text" class="input-form" required name="password" placeholder="Nombre" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="lastname_blog" type="text" class="input-form" required name="password" placeholder="Apellidos" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="phone_blog" type="number" class="input-form" required name="password" placeholder="TelÃ©fono" ></div></div><div class="item-inner"><div class="item-input"><input id="city_blog" type="text" class="input-form" name="city" placeholder="Ciudad" ></div></div></li></div><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="mail_blog" type="text" class="input-form" required name="password" placeholder="Correo electrónico" ></div></div></li><div class="label-content2"><label>GÃ©nero</label><input type="radio" id="Hombre" name="drone2" value="M" checked /><label for="huey">Hombre</label><input type="radio" id="Mujer" name="drone2" value="F" /><label for="dewey">Mujer</label></div><li class="item-content"><div class="label-content"><label>CumpleaÃ±os</label></div><div class="item-inner"><div class="item-input"><input id="birthday_blog" onfocus="calendarioblog();" type="text" class="input-form" name="birthday" placeholder="aaaa-mm-dd"  ></div></div></li><li class="item-content"><div id="tiendatitle" class="item-inner"><div class="item-title title-select">Tienda Favorita</div></div><div class="item-input "><div class="radiotienda"><input type="radio" id="Opt1" name="tiendaf_blog" value="Viva Envigado" checked /><label class="optionlabel" for="huey">Viva Envigado</label> <br><input type="radio" id="Opt2" name="tiendaf_blog" value="Tesoro" /><label class="optionlabel" for="dewey">Tesoro</label><br><input type="radio" id="Opt3" name="tiendaf_blog" value="Oviedo" /><label class="optionlabel" for="dewey">Oviedo</label></div><div  class="radiotiendaf_blog"><input type="radio" id="Opt4" name="tiendaf_blog" value="Chipichape" /><label class="optionlabel" for="dewey">Chipichape</label><br><input type="radio" id="Opt5" name="tiendaf_blog" value="Cartagena" /><label class="optionlabel" for="dewey">Cartagena</label><br><input type="radio" id="Opt6" name="tiendaf_blog" value="Gran EstaciÃ³n" /><label class="optionlabel" for="dewey">Gran EstaciÃ³n</label><br><input type="radio" id="Opt7" name="tiendaf_blog" value="El Retiro" /><label class="optionlabel"for="dewey">El Retiro</label></div></div></li><li  class = "item-content"><div class="item-inner"><Input Type="checkbox" class="checkTermino" id="termino" name="agree"><p><a href="#" onClick="alertatermino();"  class="alert-text-title">Acepto los <strong>Términos y Condiciones</strong> de Mundo Único</a></p></div></li></div></div></ul></div><div class = "list-block"><ul><button onClick="RegistryUserBlog();" class="item-link list-button position-popup-button" type="button">REGISTRARME</button><button id="closemodal" class="item-link list-button position-popup-button" type="button">CANCELAR</button></ul></div></div>'+
						                    '</div>'+
						                  '</div>'

						
						myApp.popup(popupHTML);						   
					  	$("#closemodal").click(function() {
							$('#suscribe').attr("disabled", true);	
							myApp.closeModal();							         
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

	  });

})

function IndexLog() {
 mainView.router.reloadPage('registro.html');
}


function registryCalification(){

	if ($('#termino').is(':checked') ) {	
		 var clienteres = { 
         numeroDocumento : $("#document1").val(),
         primerNombre : $('#name1').val(), 	
         segundoNombre : $('#name1').val(), 	
         primerApellido : $('#lastname1').val(),
         segundoApellido : $('#lastname1').val(), 	
         correo : $('#mail1').val(), 
         sexo : $('input[name=drone2]:checked', '.label-content2').val(),
         telefono : $('#phone1').val(),
         municipio : $('#city1').val(),
         fecha : $('#birthday1').val(),
         tiendaFavorita : $('input[name=tiendaf1]:checked', '.item-input').val()
     };

       $.ajax({
            url : 'http://35.231.135.74:80/clientes',
            processData: false,
            dataType : 'json',
            contentType: 'application/json',
            method : 'post', 
            data : JSON.stringify(clienteres),
                success : function(response){
                       myApp.modal({
					  title: 'Â¡Bievenido!',
            		  text: 'Ya eres parte de la familia de Mundo Único',
            		  buttons: [
				      {
				        text: 'VOLVER',
				        onClick: function() {
				         myApp.closeModal();
				         document.getElementById("document1").value = "";
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
	}else{
		myApp.modal({
			  title: 'Advertencia',
			  text: 'Para hacer parte de la Familia Mundo Único debes Aceptar los términos y Condiciones',
			  buttons: [
		      {
		        text: 'Aceptar los Términos y Condiciones',
		        onClick: function() {
		         document.getElementById("termino").checked = true;
		        }
		      }
		    ]
			});

	}	
       
 	};


function RegistryUserBlog(){

	if ($('#termino').is(':checked') ) {	
		
		  var clienteRegisBlog = { 
         numeroDocumento : $("#document_blog").val(),
         primerNombre : $('#name_blog').val(), 	
         segundoNombre : $('#name_blog').val(), 	
         primerApellido : $('#lastname_blog').val(),
         segundoApellido : $('#lastname_blog').val(), 	
         correo : $('#mail_blog').val(), 
         sexo : $('input[name=drone2]:checked', '.label-content2').val(),
         telefono : $('#phone_blog').val(),
         fecha : $('#birthday_blog').val(),
         municipio : $('#city_blog').val(),
         tiendaFavorita : $('input[name=tiendaf_blog]:checked', '.item-input').val()
     };

       $.ajax({
            url : 'http://35.231.135.74:80/clientes',
            processData: false,
            dataType : 'json',
            contentType: 'application/json',
            method : 'post', //en este caso
            data : JSON.stringify(clienteRegisBlog),
                success : function(response){
                       myApp.modal({
					  title: 'Â¡Bievenido!',
            		  text: 'Ya eres parte de la familia de Mundo Único',
            		  buttons: [
				      {
				        text: 'VOLVER',
				        onClick: function() {
				         document.getElementById("document_blog").value = "";
				         myApp.closeModal();
				         mainView.router.loadPage('blog_internal.html');  
				        }
				      }
				    ]
                	});
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });

	}else{


	myApp.modal({
		  title: 'Advertencia',
		  text: 'Para hacer parte de la Familia Mundo Único debes Aceptar los términos y Condiciones',
		  buttons: [
	      {
	        text: 'Aceptar los Términos y Condiciones',
	        onClick: function() {
	         document.getElementById("termino").checked = true;
	        }
	      }
	    ]
		});

	}
      
};


function RegistryUserGuia(){

	if ($('#termino').is(':checked') ) {	
		var clienteRegisBlog = { 
         numeroDocumento : $("#document_guia").val(),
         primerNombre : $('#name_guia').val(), 	
         segundoNombre : $('#name_guia').val(), 	
         primerApellido : $('#lastname_guia').val(),
         segundoApellido : $('#lastname_guia').val(), 	
         correo : $('#mail_guia').val(), 
         sexo : $('input[name=drone2]:checked', '.label-content2').val(),
         telefono : $('#phone_guia').val(),
         fecha : $('#birthday_guia').val(),
         municipio : $('#city_guia').val(),
         tiendaFavorita : $('input[name=tiendaf_guia]:checked', '.item-input').val()
     };

       $.ajax({
            url : 'http://35.231.135.74:80/clientes',
            processData: false,
            dataType : 'json',
            contentType: 'application/json',
            method : 'post', //en este caso
            data : JSON.stringify(clienteRegisBlog),
                success : function(response){
                       myApp.modal({
					  title: 'Â¡Bievenido!',
            		  text: 'Ya eres parte de la familia de Mundo Único y te has suscrito a la categoría seleccionada',
            		  buttons: [
				      {
				        text: 'VOLVER AL INICIO',
				        onClick: function() {
				        	var susregister = { 
							    cliente : $('#document_guia').val()
								};
							    $.ajax({
							            url : 'http://35.231.135.74:80/boxerCategoria/'+$("#Postguia").val()+'/cliente/'+$("#document_guia").val(),
							       		processData: false,
							        	dataType : 'json',
							        	contentType: 'application/json',
							            method : 'POST', //en este caso
							            data : JSON.stringify(susregister),
							            success : function(response){							            	  
							            	  	myApp.closeModal();
							            	  	posicionActual = 0;
							            	  	RespuestasFinales = [];
							            	  	mainView.router.loadPage('index.html');  							            	                      
							            },
							            error: function(xhr, status, error){
							                console.log(xhr.responseText);
							            }
							    });				         
				        }
				      }
				    ]
                	});
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
       

	}else{
		
		myApp.modal({
			  title: 'Advertencia',
			  text: 'Para hacer parte de la Familia Mundo Único debes Aceptar los términos y Condiciones',
			  buttons: [
		      {
		        text: 'Aceptar los Términos y Condiciones',
		        onClick: function() {
		         document.getElementById("termino").checked = true;
		        }
		      }
		    ]
			});

	}
        
};

function registryPQRS(){

	if ($('#termino').is(':checked') ) {	
		var cliente = { 
         numeroDocumento : $("#document_reg").val(),
         primerNombre : $('#name_reg').val(), 	
         segundoNombre : $('#name_reg').val(), 	
         primerApellido : $('#lastname_reg').val(),
         segundoApellido : $('#lastname_reg').val(), 	
         correo : $('#mail_reg').val(), 
         sexo : $('input[name=drone_reg]:checked', '.label-content2').val(),
         telefono : $('#phone_reg').val(),
         fecha : $('#birthday_reg').val(),
         municipio : $('#city_reg').val(),
         tiendaFavorita : $('input[name=tiendaf_reg]:checked', '.item-input').val()
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
					  title: 'Â¡Bievenido!',
            		  text: 'Ya eres parte de la familia de Mundo Único',
            		  buttons: [
				      {
				        text: 'VOLVER',
				        onClick: function() {
				         myApp.closeModal();
				         document.getElementById("document_reg").value = "";
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

	}else{
		myApp.modal({
			  title: 'Advertencia',
			  text: 'Para hacer parte de la Familia Mundo Único debes Aceptar los términos y Condiciones',
			  buttons: [
		      {
		        text: 'Aceptar los TÃ©rminos y Condiciones',
		        onClick: function() {
		         document.getElementById("termino").checked = true;
		        }
		      }
		    ]
			});
	}
        
};

function calendariocalification(){
	var myCalendar  = myApp.calendar({
	    input: '#birthday1',
	    closeOnSelect: true,
	    toolbarCloseText: 'Done',
	    dateFormat: 'yyyy-mm-dd',
	    yearPicker: true
	});
}


myApp.onPageInit('calification', function(page){

$(document).ready(function(){
      $( "#haha" ).click(function() {
        $('#haha').attr("style", "filter: none !important;width: 130px !important;height: 130px !important;");
        $('#yay').attr("style", "filter: grayscale(100%) !important;");
        $('#wow').attr("style", "filter: grayscale(100%) !important;");
        $('#sad').attr("style", "filter: grayscale(100%) !important;");
        $('#angry').attr("style", "filter: grayscale(100%) !important;");
        $('.display-not-input').removeClass('display-not-input');
        document.getElementById("calification").value = "5";
      });

      $( "#yay" ).click(function() {
        $('#yay').attr("style", "filter: none !important;width: 130px !important;height: 130px !important;");
        $('#haha').attr("style", "filter: grayscale(100%) !important;");
        $('#wow').attr("style", "filter: grayscale(100%) !important;");
        $('#sad').attr("style", "filter: grayscale(100%) !important;");
        $('#angry').attr("style", "filter: grayscale(100%) !important;");
        $('.display-not-input').removeClass('display-not-input');
        document.getElementById("calification").value = "4";
      });

      $( "#wow" ).click(function() {
        $('#wow').attr("style", "filter: none !important;width: 130px !important;height: 130px !important;");
        $('#haha').attr("style", "filter: grayscale(100%) !important;");
        $('#yay').attr("style", "filter: grayscale(100%) !important;");
        $('#sad').attr("style", "filter: grayscale(100%) !important;");
        $('#angry').attr("style", "filter: grayscale(100%) !important;");
        $('.display-not-input').removeClass('display-not-input');
        document.getElementById("calification").value = "3";
      });

      $( "#sad" ).click(function() {
        $('#sad').attr("style", "filter: none !important;width: 130px !important;height: 130px !important;");
        $('#haha').attr("style", "filter: grayscale(100%) !important;");
        $('#yay').attr("style", "filter: grayscale(100%) !important;");
        $('#wow').attr("style", "filter: grayscale(100%) !important;");
        $('#angry').attr("style", "filter: grayscale(100%) !important;");
        $('.display-not-input').removeClass('display-not-input');
        document.getElementById("calification").value = "2";
      });

      $( "#angry" ).click(function() {
        $('#angry').attr("style", "filter: none !important;width: 130px !important;height: 130px !important;");
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
        puntaje : $('#calification').val(),
    	mensaje : $('#why').val()};
        if ($("#documentcalification").val() == "") {
        	routepqrs = 'http://35.231.135.74:80/felicitaciones/tienda/'+dataTienda+''
        }else{
			routepqrs = 'http://35.231.135.74:80/felicitaciones/tienda/'+dataTienda+'/cliente/'+$("#documentcalification").val();
        }
        $.ajax({
                url : routepqrs,
                processData: false,
             	dataType : 'json',
            	contentType: 'application/json',
                method : 'POST', 
                data : JSON.stringify(felregister),
                success : function(response){
                	mainView.router.loadPage('notification2.html');  
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
	}); 

	$$('#why').change(function(){
	    var dataTienda = localStorage.getItem('TiendaLocal');
        var felregister = { 
        puntaje : $('#calification').val()};
        if ($("#documentcalification").val() == "") {
        	routepqrs = 'http://35.231.135.74:80/felicitaciones/tienda/'+dataTienda+''
        }else{
			routepqrs = 'http://35.231.135.74:80/felicitaciones/tienda/'+dataTienda+'/cliente/'+$("#documentcalification").val();
        }
        $.ajax({
                url : routepqrs,
                processData: false,
             	dataType : 'json',
            	contentType: 'application/json',
                method : 'POST', 
                data : JSON.stringify(felregister),
                success : function(response){
                	mainView.router.loadPage('notification2.html');  
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
	}); 
    
	$$('#documentcalification').change(function(){  
	var cliente = {numeroDocumento : $("#documentcalification").val() }
	$.ajax({
	        url : 'http://35.231.135.74:80/clientes/'+$("#documentcalification").val()+'',
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
				        }
				      }, 
				      {
				        text: 'Registrarme',
				        onClick: function() {
				        var popupHTML =   '<div class="popup"><div class="content-block1"><h2 class="page_title">Gracias por querer formar parte de la familia Mundo Único</h2><h2 class="page_title_secondary">Por favor completa el siguiente formulario</h2><div class="form-modal"><div class = "list-block"><ul><div class="row"><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="document1" type="number" class="input-form" required name="password" placeholder="Número de documento" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="name1" type="text" class="input-form" required name="password" placeholder="Nombre" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="lastname1" type="text" class="input-form" required name="password" placeholder="Apellidos" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="phone1" type="number" class="input-form" required name="password" placeholder="TelÃ©fono" ></div></div><div class="item-inner"><div class="item-input"><input id="city1" type="text" class="input-form" name="city" placeholder="Ciudad" ></div></div></li></div><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="mail1" type="text" class="input-form" required name="password" placeholder="Correo electrónico" ></div></div></li><div class="label-content2"><label>GÃ©nero</label><input type="radio" id="Hombre" name="drone2" value="M" checked /><label for="huey">Hombre</label><input type="radio" id="Mujer" name="drone2" value="F" /><label for="dewey">Mujer</label></div><li class="item-content"><div class="label-content"><label>CumpleaÃ±os</label></div><div class="item-inner"><div class="item-input"><input id="birthday1" onfocus="calendariocalification();" type="text" class="input-form" name="birthday" placeholder="aaaa-mm-dd"  ></div></div></li><li class="item-content"><div class="item-inner" id="tiendatitle"><div class="item-title title-select">Tienda Favorita</div></div><div class="item-input "><div class="radiotienda"><input type="radio" id="Opt1" name="tiendaf1" value="Viva Envigado" checked /><label class="optionlabel" for="huey">Viva Envigado</label> <br><input type="radio" id="Opt2" name="tiendaf1" value="Tesoro" /><label class="optionlabel" for="dewey">Tesoro</label><br><input type="radio" id="Opt3" name="tiendaf1" value="Oviedo" /><label class="optionlabel" for="dewey">Oviedo</label></div><div  class="radiotiendaf1"><input type="radio" id="Opt4" name="tiendaf1" value="Chipichape" /><label class="optionlabel" for="dewey">Chipichape</label><br><input type="radio" id="Opt5" name="tiendaf1" value="Cartagena" /><label class="optionlabel" for="dewey">Cartagena</label><br><input type="radio" id="Opt6" name="tiendaf1" value="Gran Estaci�n" /><label class="optionlabel" for="dewey">Gran Estaci�n</label><br><input type="radio" id="Opt7" name="tiendaf1" value="El Retiro" /><label class="optionlabel"for="dewey">El Retiro</label></div></div></li><li  class = "item-content"><div class="item-inner"><Input Type="checkbox" class="checkTermino" id="termino" name="agree"><p><a href="#" onClick="alertatermino();"  class="alert-text-title">Acepto los <strong>T�rminos y Condiciones</strong> de Mundo Único</a></p></div></li></div></div></ul></div><div class = "list-block"><ul><button onClick="registryCalification();" class="item-link list-button position-popup-button" type="button">REGISTRARME</button><button id="closemodal" class="item-link list-button position-popup-button" type="button">CANCELAR</button></ul></div></div>'+
						                    '</div>'+
						                  '</div>'
						myApp.popup(popupHTML);		

						 $("#closemodal").click(function() {
							myApp.closeModal();
						  });								   
				        }
				      }
				    ]
                	}); 
			    }else{
			    
			    }
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
            }
	        });
	});
});

myApp.onPageInit('questions', function(page){
    
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
            	var resul = informacion.replace(/&/g, "<br>");  
            	         	
            	if (obj[i].imagen != null) {
            		html+="<div class='accordion-item'><div class='accordion-item-toggle'><i class='icon icon-plus'>+</i><i class='icon icon-minus'>-</i><span> "+obj[i].titulo+"</span></div><div class='accordion-item-content'><p class='p-item-content'>"+obj[i].informacion+"</p><img src="+getURLimagenesPreguntasFrecuentes+obj[i].imagen+"></div></div>";
            	}else{
            		html+="<div class='accordion-item'><div class='accordion-item-toggle'><i class='icon icon-plus'>+</i><i class='icon icon-minus'>-</i><span> "+obj[i].titulo+"</span></div><div class='accordion-item-content'><p class='p-item-content' id='con"+obj[i].id+"'>"+resul+"</p></div></div>";
            	}	            	
			}
			$(".custom-accordion").html(html);
   }
});

})


function validar(){
	if ($('#termino').is(':checked') ) {		   
	     var cliente = { 
         numeroDocumento : $("#document").val(),
         primerNombre : $('#name').val(), 	
         segundoNombre : $('#name').val(), 	
         primerApellido : $('#lastname').val(),
         segundoApellido : $('#name').val(), 	
         correo : $('#mail').val(), 
         sexo : $('input[name=drone]:checked', '.item-content').val(),
         telefono : $('#phone').val(),
         fecha : $('#birthday').val(),
         municipio : $('#city').val(),
         tiendaFavorita : $('input[name=tienda]:checked', '.item-input').val()
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
	

	}else{
		myApp.modal({
			  title: 'Advertencia',
			  text: 'Para hacer parte de la Familia Mundo Único debes Aceptar los términos y Condiciones',
			  buttons: [
		      {
		        text: 'Aceptar los TÃ©rminos y Condiciones',
		        onClick: function() {
		         document.getElementById("termino").checked = true;
		        }
		      }
		    ]
			});
	}
   
}


myApp.onPageInit('registro2', function (page){

	$$('.alert-text-title').on('click', function () {
		myApp.modal({
	  title: 'Términos y Condiciones',
	  text: 'Para darle cumplimiento a la ley 1581 de 2012, 1266 de 2008 y el decreto 1377 del 2013, al dar clic aquí, estoy autorizando de manera voluntaria a UNICO INTERIOR SAS con NIT número 811.007.707-2 ubicado en la dirección Carrera 50Âª #43-13  INT 115 (Itagui­ - Antioquia) para el tratamiento de datos personales así como de las demás normas que los modifiquen o sustituyan con sujeción a las polí­ticas de tratamiento de datos de Unico Interior SAS.',
	  buttons: [
      {
        text: 'OK',
        onClick: function() {
         document.getElementById("termino").checked = true;
        }
      }
    ]
	});
});
  
	var myCalendar  = myApp.calendar({
	    input: '#birthday',
	    closeOnSelect: true,
	    toolbarCloseText: 'Done',
	    dateFormat: 'yyyy-mm-dd',
	    yearPicker: true
	}); 
	   
    

	$$('#document').change(function(){   
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
					    	myApp.modal({
							  title: 'Â¡Bievenido!',
		            		  text: 'Ya eres parte de la familia de Mundo Único',
		            		  buttons: [
						      {
						        text: 'OK',
						        onClick: function() {
						         myApp.closeModal();
						         mainView.router.loadPage('registry.html');  
						        }
						      }
						    ]
		                	});
					    	$("#name").val(data.primerNombre);	
					    	$("#lastname").val(data.primerApellido);	
					    	$("#mail").val(data.correo);	
					    	$("#phone").val(data.telefono);	
					    	$("#city").val(data.municipio);	
					    	$("#birthday").val(data.fecha);	
					    	$('#registry').attr("disabled", true);			
					    }
	                },
	                error: function(xhr, status, error){
	                    console.log(xhr.responseText);
	                }
	        });
	});    		
})

function calendariopqrs(){
	var myCalendar  = myApp.calendar({
	    input: '#birthday_reg',
	    closeOnSelect: true,
	    toolbarCloseText: 'Done',
	    dateFormat: 'yyyy-mm-dd',
	    yearPicker: true
	});
}

function alertatermino(){
	myApp.modal({
	  title: 'Términos y Condiciones',
	  text: 'Para darle cumplimiento a la ley 1581 de 2012, 1266 de 2008 y el decreto 1377 del 2013, al dar clic aquí, estoy autorizando de manera voluntaria a UNICO INTERIOR SAS con NIT número 811.007.707-2 ubicado en la dirección Carrera 50Âª #43-13  INT 115 (Itagui - Antioquia) para el tratamiento de datos personales así como de las demás normas que los modifiquen o sustituyan con sujeción a las políticas de tratamiento de datos de Unico Interior SAS.',
	  buttons: [
      {
        text: 'OK',
        onClick: function() {
         document.getElementById("termino").checked = true;
         document.getElementById("termino").checked = true;
        }
      }
    ]
	});

}


myApp.onPageInit('pqrs', function (page){

		

    $$('#pqrsSend').click(function(){  
	    var dataTienda = localStorage.getItem('TiendaLocal');
        var pqrsregister = { 
         pqrs : $('input[name=drone1]:checked', '.label-content1').val(),
         nota : $('#message_pqrs').val()};
        $.ajax({
                url : 'http://35.231.135.74:80/pqrs/tienda/'+dataTienda+'/cliente/'+$("#documentpqrs").val(),
            processData: false,
             dataType : 'json',
            contentType: 'application/json',
                method : 'POST', 
                data : JSON.stringify(pqrsregister),
                success : function(response){
                	 mainView.router.loadPage('notification2.html');                       
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
	});   

    $$('#message_pqrs').change(function(){  
	    var dataTienda = localStorage.getItem('TiendaLocal');
        var pqrsregister = { 
         pqrs : $('input[name=drone1]:checked', '.label-content1').val(),
         nota : $('#message_pqrs').val()};
        $.ajax({
                url : 'http://35.231.135.74:80/pqrs/tienda/'+dataTienda+'/cliente/'+$("#documentpqrs").val(),
            processData: false,
             dataType : 'json',
            contentType: 'application/json',
                method : 'POST', 
                data : JSON.stringify(pqrsregister),
                success : function(response){
                	 mainView.router.loadPage('notification2.html');                       
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
	});

	$$('#documentpqrs').change(function(){  
	var cliente = {numeroDocumento : $("#documentpqrs").val() }
	$.ajax({
	        url : 'http://35.231.135.74:80/clientes/'+$("#documentpqrs").val()+'',
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
				         document.getElementById("name_pqrs").value = "";
						 document.getElementById("phone_pqrs").value = "";
						 document.getElementById("mail_pqrs").value = "";
						 document.getElementById("message_pqrs").value = "";
				         $('#name_pqrs').attr("disabled", true);
				         $('#phone_pqrs').attr("disabled", true);
				         $('#mail_pqrs').attr("disabled", true);
				         $('.label-content').attr("disabled", true);
				         $('#message_pqrs').attr("disabled", true);				         
				        }
				      }, 
				      {
				        text: 'Registrarme',
				        onClick: function() {
				        var popupHTML = '<div class="popup"><div class="content-block1"><h2 class="page_title">Gracias por querer formar parte de la familia Mundo Único</h2><h2 class="page_title_secondary">Por favor completa el siguiente formulario</h2><div class="form-modal"><div class = "list-block"><ul><div class="row"><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="document_reg" type="number" class="input-form" required name="password" placeholder="N�mero de documento" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="name_reg" type="text" class="input-form" required name="password" placeholder="Nombre" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="lastname_reg" type="text" class="input-form" required name="password" placeholder="Apellidos" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="phone_reg" type="number" class="input-form" required name="password" placeholder="TelÃ©fono" ></div></div><div class="item-inner"><div class="item-input"><input id="city_reg" type="text" class="input-form" name="city" placeholder="Ciudad" ></div></div></li></div><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="mail_reg" type="text" class="input-form" required name="password" placeholder="Correo electrónico" ></div></div></li><div class="label-content2"><label>GÃ©nero</label><input type="radio" id="Hombre" name="drone_reg" value="M" checked /><label for="huey">Hombre</label><input type="radio" id="Mujer" name="drone2" value="F" /><label for="dewey">Mujer</label></div><li class="item-content"><div class="label-content"><label>CumpleaÃ±os</label></div><div class="item-inner"><div class="item-input"><input id="birthday_reg" onfocus="calendariopqrs();" type="text" class="input-form" name="birthday" placeholder="aaaa-mm-dd"  ></div></div></li><li class="item-content"><div id="tiendatitle" class="item-inner"><div class="item-title title-select">Tienda Favorita</div></div><div class="item-input "><div class="radiotienda"><input type="radio" id="Opt1" name="tiendaf_reg" value="Viva Envigado" checked /><label class="optionlabel" for="huey">Viva Envigado</label> <br><input type="radio" id="Opt2" name="tiendaf_reg" value="Tesoro" /><label class="optionlabel" for="dewey">Tesoro</label><br><input type="radio" id="Opt3" name="tiendaf_reg" value="Oviedo" /><label class="optionlabel" for="dewey">Oviedo</label></div><div  class="radiotiendaf_reg"><input type="radio" id="Opt4" name="tiendaf_reg" value="Chipichape" /><label class="optionlabel" for="dewey">Chipichape</label><br><input type="radio" id="Opt5" name="tiendaf_reg" value="Cartagena" /><label class="optionlabel" for="dewey">Cartagena</label><br><input type="radio" id="Opt6" name="tiendaf_reg" value="Gran EstaciÃ³n" /><label class="optionlabel" for="dewey">Gran EstaciÃ³n</label><br><input type="radio" id="Opt7" name="tiendaf_reg" value="El Retiro" /><label class="optionlabel"for="dewey">El Retiro</label></div></div></li><li  class = "item-content"><div class="item-inner"><Input Type="checkbox" class="checkTermino" id="termino" name="agree"><p><a href="#" onClick="alertatermino();" class="alert-text-title2">Acepto los <strong>Términos y Condiciones</strong> de Mundo Único</a></p></div></li></div></div></ul></div><div class = "list-block"><ul><button onClick="registryPQRS();" class="item-link list-button position-popup-button" type="button">REGISTRARME</button><button id="closemodal" class="item-link list-button position-popup-button" type="button">CANCELAR</button></ul></div></div>'+
						                    '</div>'+
						                  '</div>'

						  myApp.popup(popupHTML);
						  $("#closemodal").click(function() {
								document.getElementById("name_pqrs").value = "";
								document.getElementById("phone_pqrs").value = "";
								document.getElementById("mail_pqrs").value = "";
								document.getElementById("message_pqrs").value = "";
								myApp.closeModal();
						   });

				        }
				      }
				    ]
                	}); 		                	 
			    }else{
			    	$("#name_pqrs").val(data1.primerNombre + " " + data1.segundoApellido);	
			    	$("#mail_pqrs").val(data1.correo);	
			    	$("#phone_pqrs").val(data1.telefono);
			        $('#name_pqrs').attr("disabled", false);
			        $('#phone_pqrs').attr("disabled", false);
			        $('#mail_pqrs').attr("disabled", false);
			        $('.label-content').attr("disabled", false);
			        $('#message_pqrs').attr("disabled", false);	
			    }
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
            }
	    });
	}); 

	  	   
});

var posicionActual = 0;
var countPreguntas = 0;
var preguntas = [];
var RespuestasFinales = [];

function calendarioguia(){
	var myCalendar  = myApp.calendar({
	    input: '#birthday_guia',
	    closeOnSelect: true,
	    toolbarCloseText: 'Done',
	    dateFormat: 'yyyy-mm-dd',
	    yearPicker: true
	});
}


myApp.onPageInit('shopping', function(page){
       
       posicionActual = 0;
	RespuestasFinales = [];

$$.ajax({ 
			type: 'GET', 
			url: 'http://35.231.135.74/preguntasRespuestas',
			data: { get_param: 'value' }, 
			dataType: 'json',
			success: function (data) {

				if(data.length > 0){
					posicionActual = 0;
					RespuestasFinales = [];
	
					for(var i in data){
						var item = data[i];
					    preguntas.push({ 
							'question_text': item.pregunta,
							'question_value': item.identificador,
							'buttons': item.respuestas
					    });	
					}
					countPreguntas = preguntas.length;
					
					var HTMLPregunta = "<div class=\"question\"><span class=\"question-text\">{Pregunta}</span></div>";
					var Button = "<button type=\"button\" class=\"button-no optionButton\" data-QB=\"{ValorBoton}\" onClick=\"CambiarPregunta(this); return false;\"><i class=\"fa fa-thumbs-up fa-2x\"></i>{Respuesta}</button>"
					var questions_wrap = $('.questions-wrap');
					var question_button = $(".question-button");

					var botones1 = preguntas[posicionActual].buttons;
					var pregunta1 = preguntas[posicionActual].question_text;

					questions_wrap.append(HTMLPregunta.replace('{Pregunta}',pregunta1));
					$(".questions-wrap .question").first().addClass("visible");

					for(var b in botones1){
						var item = botones1[b];
						question_button.append(Button.replace('{ValorBoton}',item.valor).replace('{Respuesta}',item.respuesta));
					}
				}
			}
		});

 
	

});

function loadPagina(){
	posicionActual = 0;
    RespuestasFinales = [];
}

function suscribirmeGuia(){
	var susregister = { 
    cliente : $('#documentsearchguiaa').val()
	};
    $.ajax({
            url : 'http://35.231.135.74:80/boxerCategoria/'+$("#Postguia").val()+'/cliente/'+$("#documentsearchguiaa").val(),
       		processData: false,
        	dataType : 'json',
        	contentType: 'application/json',
            method : 'POST', //en este caso
            data : JSON.stringify(susregister),
            success : function(response){
            	  if ( $('#documentsearchguiaa').val() == "") {
            	  	myApp.alert("Por favor ingrese un número de documento");
            	  }else{
            	  	myApp.closeModal();
            	  	posicionActual = 0;
            	  	RespuestasFinales = [];
            	  	mainView.router.loadPage('notification3.html');  
            	  }
            	                      
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
            }
    });
}



function documentsearchGuia(){

var cliente = {numeroDocumento : $("#documentsearchguiaa").val() }
	$.ajax({
	        url : 'http://35.231.135.74:80/clientes/'+$("#documentsearchguiaa").val(),
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
				         posicionActual = 0;
            	  	     RespuestasFinales = [];
				         $('#suscribeguia').attr("disabled", true);	
				         myApp.closeModal();
				         					         
				        }
				      }, 
				      {
				        text: 'Registrarme',
				        onClick: function() {
				        popupHTML1 = '<div class="popup"><div class="content-block1"><h2 class="page_title">Gracias por querer formar parte de la familia Mundo Único</h2><h2 class="page_title_secondary">Por favor completa el siguiente formulario</h2><div class="form-modal"><div class = "list-block"><ul><div class="row"><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="document_guia" type="number" class="input-form" required name="password" placeholder="Número de documento" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="name_guia" type="text" class="input-form" required name="password" placeholder="Nombre" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="lastname_guia" type="text" class="input-form" required name="password" placeholder="Apellidos" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="phone_guia" type="number" class="input-form" required name="password" placeholder="TelÃ©fono" ></div></div><div class="item-inner"><div class="item-input"><input id="city_guia" type="text" class="input-form" name="city" placeholder="Ciudad" ></div></div></li></div><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="mail_guia" type="text" class="input-form" required name="password" placeholder="Correo electrónico" ></div></div></li><div class="label-content2"><label>GÃ©nero</label><input type="radio" id="Hombre" name="drone2" value="M" checked /><label for="huey">Hombre</label><input type="radio" id="Mujer" name="drone2" value="F" /><label for="dewey">Mujer</label></div><li class="item-content"><div class="label-content"><label>CumpleaÃ±os</label></div><div class="item-inner"><div class="item-input"><input id="birthday_guia" onfocus="calendarioguia();" type="text" class="input-form" name="birthday" placeholder="aaaa-mm-dd"  ></div></div></li><li class="item-content"><div id="tiendatitle" class="item-inner"><div class="item-title title-select">Tienda Favorita</div></div><div class="item-input "><div class="radiotienda"><input type="radio" id="Opt1" name="tiendaf_guia" value="Viva Envigado" checked /><label class="optionlabel" for="huey">Viva Envigado</label> <br><input type="radio" id="Opt2" name="tiendaf_guia" value="Tesoro" /><label class="optionlabel" for="dewey">Tesoro</label><br><input type="radio" id="Opt3" name="tiendaf_guia" value="Oviedo" /><label class="optionlabel" for="dewey">Oviedo</label></div><div  class="radiotiendaf_guia"><input type="radio" id="Opt4" name="tiendaf_guia" value="Chipichape" /><label class="optionlabel" for="dewey">Chipichape</label><br><input type="radio" id="Opt5" name="tiendaf_guia" value="Cartagena" /><label class="optionlabel" for="dewey">Cartagena</label><br><input type="radio" id="Opt6" name="tiendaf_guia" value="Gran EstaciÃ³n" /><label class="optionlabel" for="dewey">Gran EstaciÃ³n</label><br><input type="radio" id="Opt7" name="tiendaf_guia" value="El Retiro" /><label class="optionlabel"for="dewey">El Retiro</label></div></div></li><li  class = "item-content"><div class="item-inner"><Input Type="checkbox" class="checkTermino" id="termino" name="agree"><p><a href="#" onClick="alertatermino();"  class="alert-text-title">Acepto los <strong>Términos y Condiciones</strong> de Mundo Único</a></p></div></li></div></div></ul></div><div class = "list-block"><ul><button onClick="RegistryUserGuia();" class="item-link list-button position-popup-button" type="button">REGISTRARME</button><button id="closemodal" class="item-link list-button position-popup-button" type="button">CANCELAR</button></ul></div></div>'+
						                    '</div>'+
						                  '</div>'
						myApp.popup(popupHTML1);						   
						posicionActual = 0;
            	  	    RespuestasFinales = [];
					  	$("#closemodal").click(function() {
							$('#suscribeguia').attr("disabled", true);	
							myApp.closeModal();					         
						});
				        }
				      }
				    ]
                	}); 
			    }else{
			    	$('#suscribeguia').attr("disabled", false);			
			    }
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
            }
	        });

}


function CambiarPregunta(button){				

	RespuestasFinales.push($(button).attr("data-QB"));
	var HTMLPregunta = "<div class=\"question\"><span class=\"question-text\">{Pregunta}</span></div>";
	var Button = "<button type=\"button\" class=\"button-no optionButton\" data-QB=\"{ValorBoton}\" onClick=\"CambiarPregunta(this); return false;\"><i class=\"fa fa-thumbs-up fa-2x\"></i>{Respuesta}</button>"
	var questions_wrap = $('.questions-wrap');
	var question_button = $(".question-button");

	var respuestasJoin = RespuestasFinales.join('');
	var urlFinal = "http://35.231.135.74/boxerCategoria/consultarRespuestaGCB/{respuesta}/preguntaGC/{pregunta}";

	document.getElementById("counter-questions").innerHTML = preguntas[posicionActual].question_value+1;

	if(parseInt(RespuestasFinales.length) > 2){
		try{
			$$.ajax({ 
				type: 'GET', 
				url: urlFinal.replace("{respuesta}",respuestasJoin).replace("{pregunta}",preguntas[posicionActual].question_value),
				data: { get_param: 'value' }, 
				dataType: 'json',
				success: function (data) {
					var results = JSON.stringify(data);
			        var obj = JSON.parse(results);					
					if(Object.keys(obj).length == 3){
						var resultscategory = obj.boxerCategoria;
							

							var popupHTML = '<div class="popup">'+
						                    '<div class="content-blockguia">'+
						                    '<a id="close" href="index.html" class="close-popup"><div class="navbar_right2"><img class="Navbar-img" src="images/icons/black/back.png" alt="" title=""></div></a>'+						                     
						                      '<h2 class="page_title">La categoría recomendada para ti es '+resultscategory.categoria+'</h2>'+
						                      '<h2 class="page_title_secondary">'+resultscategory.referencia+'</h2>'+
						                      '<h2 class="page_title2">Pregunta a tu Confort Advisor por más referencias de este tipo</h2><br><br>'+
						                      '<div class="row"><div class="col-50 content-img"><div class="box"><h2 class="page_title_secondary2">Imagen de Referencia</h2><img class="imgguia" src="http://35.231.135.74/boxerCategoria/verImagenes/'+resultscategory.identificadorImagen+'"></div></div><div class="col-50 section-sus"><h2 class="page_title2">Si deseas suscribirte a esta categoría</h2><h2 class="page_title_secondary2">Por favor ingrese su número de documento</h2><div class=""><div class="list-block"><ul><div class="row"><div class="col-80"><li class = "item-content"><div class = "item-inner"><div class = "item-input"><input id="documentsearchguiaa" onchange="documentsearchGuia();" type="number" style="font-size: 18px !important;" class="input-form" required name="document" placeholder="Número de documento"></div></div></li></div></div></ul></div><div class = "list-block"><ul><button onclick="suscribirmeGuia();"  class="item-link list-button" style="font-size: 14px;" type="button">SUSCRIBIRME</button></ul></div></div></div></div>'+
						                      ''+
						                    '</div>'+
						                  '</div>'
						  myApp.popup(popupHTML);

						  document.getElementById("Postguia").value = resultscategory.id;
							
						

						$("#close").click(function() {
							posicionActual = 0;
							RespuestasFinales = [];
							
						});
					
						
					}else if(Object.keys(obj).length > 3){
						console.log(obj);
						questions_wrap.empty();
						question_button.empty();

						var nuevaPosicion = posicionActual+1;
						posicionActual++;
						var botones1 = preguntas[nuevaPosicion].buttons;
						var pregunta1 = preguntas[nuevaPosicion].question_text;

						questions_wrap.append(HTMLPregunta.replace('{Pregunta}',pregunta1));
						$(".questions-wrap .question").first().addClass("visible");

						for(var b in botones1){
							var item = botones1[b];
							question_button.append(Button.replace('{ValorBoton}',item.valor).replace('{Respuesta}',item.respuesta));


						}	

							var resultscategory = obj.boxerCategoria;
							

							var popupHTML = '<div class="popup">'+
						                    '<div class="content-blockguia">'+
						                    '<a id="close" href="index.html" class="close-popup"><div class="navbar_right2"><img class="Navbar-img" src="images/icons/black/back.png" alt="" title=""></div></a>'+						                     
						                      '<h2 class="page_title">'+resultscategory.categoria+'</h2>'+
						                      '<h2 class="page_title_secondary">'+resultscategory.referencia+'</h2>'+
						                      '<div class="row"><div class="col-50"><img class="imgguia" src="http://35.231.135.74/boxerCategoria/verImagenes/'+resultscategory.identificadorImagen+'"></div><div class="col-50 section-sus"><h2 class="page_title2">Si deseas suscribirte a esta categoría</h2><h2 class="page_title_secondary2">Por favor ingrese su número de documento</h2><div class="list-block"><ul><div class="row"><div class="col-80"><li class = "item-content"><div class = "item-inner"><div class = "item-input"><input id="documentsearchguia" type="number" style="font-size: 18px !important;" class="input-form" required name="document" placeholder="Número de documento"></div></div></li></div></div></ul></div><div class = "list-block"><ul><button id="suscribeguia" class="item-link list-button" style="font-size: 14px;" type="button">SUSCRIBIRME</button></ul></div></div></div>'+
						                      ''+
						                    '</div>'+
						                  '</div>'
						  myApp.popup(popupHTML);
							
						

						$("#close").click(function() {
							posicionActual = 0;
							RespuestasFinales = [];
							
						});
					}
				}
			});
		
		}catch(ex){
			console.log(ex);
			questions_wrap.empty();
			question_button.empty();

			var nuevaPosicion = posicionActual+1;
			posicionActual++;
			var botones1 = preguntas[nuevaPosicion].buttons;
			var pregunta1 = preguntas[nuevaPosicion].question_text;

			questions_wrap.append(HTMLPregunta.replace('{Pregunta}',pregunta1));
			$(".questions-wrap .question").first().addClass("visible");

			for(var b in botones1){
				var item = botones1[b];
				question_button.append(Button.replace('{ValorBoton}',item.valor).replace('{Respuesta}',item.respuesta));
			}		
		}

	}else{
		questions_wrap.empty();
		question_button.empty();

		var nuevaPosicion = posicionActual+1;
		posicionActual++;
		var botones1 = preguntas[nuevaPosicion].buttons;
		var pregunta1 = preguntas[nuevaPosicion].question_text;

		questions_wrap.append(HTMLPregunta.replace('{Pregunta}',pregunta1));
		$(".questions-wrap .question").first().addClass("visible");
		

		for(var b in botones1){
			var item = botones1[b];
			question_button.append(Button.replace('{ValorBoton}',item.valor).replace('{Respuesta}',item.respuesta));
		}
	}	
}






