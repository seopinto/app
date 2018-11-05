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

var emailscomplete = ('gmail.com hotmail.com hotmail.es yahoo.es Melon Orange Peach Pear Pineapple').split(' ');

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
            		  text: 'Señor(a) usuario usted no se encuentra registrado, por favor regístrese',
            		  buttons: [
				      {
				        text: 'Cancelar',
				        onClick: function() {
				         
				         document.getElementById("document").value = "";   
				         $('#suscribe').attr("disabled", true);	
				         myApp.closeModal();					         
				        }
				      }, 
				      {
				        text: 'Registrarme',
				        onClick: function() {
				        var popupHTML = '<div class="popup"><div class="content-block1"><h2 class="page_title">Gracias por querer formar parte de la familia Mundo Único</h2><h2 class="page_title_secondary">Por favor completa el siguiente formulario</h2><form class="form-modal"><div class = "list-block"><ul><div class="row"><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="document1" type="text" class="input-form" required name="password" placeholder="Número de documento" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="name1" type="text" class="input-form" required name="password" placeholder="Nombre" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="phone1" type="text" class="input-form" required name="password" placeholder="Teléfono" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="city1" type="text" class="input-form" name="city" placeholder="Ciudad" ></div></div></li></div><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="mail1" type="text" class="input-form" required name="password" placeholder="Correo electrónico" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="lastname1" type="text" class="input-form" required name="password" placeholder="Apellidos" ></div></div></li><div class="label-content2"><label>Género</label><input type="radio" id="Hombre" name="drone2" value="M" checked /><label for="huey">Hombre</label><input type="radio" id="Mujer" name="drone2" value="F" /><label for="dewey">Mujer</label></div><li class="item-content"><div class="item-inner"><div class="item-input"><input id="birthday1" type="date" class="input-form" name="birthday" placeholder="Fecha de cumpleaños" ></div></div></li></div></div></ul></div><div class = "list-block"><ul><button onClick="RegistryUserBlog();" class="item-link list-button position-popup-button" type="button">REGISTRARME</button><a href="#" id="closemodal" class="item-link list-button position-popup-button" type="button">CANCELAR</a></ul></div></form>'+
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
	});

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
            	html+="<input id='PostDetalle' value='"+obj[i].id+"' style='display:none'> <li class='cards__item1'><div class='card'><div class='card__image'><img src='http://35.231.135.74/intereses/verImagenes/"+obj[i].identificadorMultimedia+"'></div><div class='card__content'><div class='card__title'>"+obj[i].titulo+"</div><p class='card__text'>"+obj[i].descripcion+"</p><a href='#' data-popover='.popover-about"+obj[i].id+"' class='open-popover btn btn-block card__btn'>Ver articulo</a><a href='#' class='btn btn-block-new'>Recibir Noticia</a></div></div> <div  class='popover popover-about"+obj[i].id+"'><div class='popover-angle'></div><div class='popover-inner'><div class='content-block-popup'><a href='#' class='close-popover'><div class='navbar_right2'><img  src='images/icons/black/back.png' alt='' title='' /></div></a><h2 class='page_title'>"+obj[i].titulo+"</h2><div class='card__image_2'><img class='content-block-image' src='http://35.231.135.74/intereses/verImagenes/"+obj[i].identificadorMultimedia+"'></div><div class='p-item-content' style='margin: 20px 0 0 0;'>"+obj[i].descripcion+"</div><div class='title-new'>Si estas interesado en recibir noticias de este tipo te invitamos a suscribirte. <br> Ven y haz parte de la Familia Mundo Único </div><a href='#' data-popover='.popover-about-sus' class='open-popover btn btn-block card__btn''>Suscribirme</a></div></div></div></li>"           	
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
            	 mainView.router.loadPage('notification3.html');                       
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
         fecha : $('#birthday1').val()
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
					  title: '¡Bievenido!',
            		  text: 'Ya eres parte de la familia de Mundo Único',
            		  buttons: [
				      {
				        text: 'VOLVER',
				        onClick: function() {
				         myApp.closeModal();
				         document.getElementById("document").value = "";
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


function RegistryUserBlog(){
        var clienteRegisBlog = { 
         numeroDocumento : $("#document1").val(),
         primerNombre : $('#name1').val(), 	
         segundoNombre : $('#name1').val(), 	
         primerApellido : $('#lastname1').val(),
         segundoApellido : $('#lastname1').val(), 	
         correo : $('#mail1').val(), 
         sexo : $('input[name=drone2]:checked', '.label-content2').val(),
         telefono : $('#phone1').val(),
         fecha : $('#birthday1').val(),
         municipio : $('#city1').val()
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
					  title: '¡Bievenido!',
            		  text: 'Ya eres parte de la familia de Mundo Único',
            		  buttons: [
				      {
				        text: 'VOLVER',
				        onClick: function() {
				         document.getElementById("documentsearch").value = "";
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
};

function registryPQRS(){
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
         municipio : $('#city_reg').val()
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
				         document.getElementById("documentsearch").value = "";
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


myApp.onPageInit('calification', function(page){

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
				        var popupHTML = '<div class="popup"><div class="content-block1"><h2 class="page_title">Gracias por querer formar parte de la familia Mundo Único</h2><h2 class="page_title_secondary">Por favor completa el siguiente formulario</h2><form class="form-modal"><div class = "list-block"><ul><div class="row"><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="document1" type="text" class="input-form" required name="password" placeholder="Número de documento" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="name1" type="text" class="input-form" required name="password" placeholder="Nombre" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="phone1" type="text" class="input-form" required name="password" placeholder="Teléfono" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="city1" type="text" class="input-form" name="city" placeholder="Ciudad" ></div></div></li></div><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="mail1" type="text" class="input-form" required name="password" placeholder="Correo electrónico" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="lastname1" type="text" class="input-form" required name="password" placeholder="Apellidos" ></div></div></li><div class="label-content2"><label>Género</label><input type="radio" id="Hombre" name="drone2" value="M" checked /><label for="huey">Hombre</label><input type="radio" id="Mujer" name="drone2" value="F" /><label for="dewey">Mujer</label></div><li class="item-content"><div class="item-inner"><div class="item-input"><input id="birthday1" type="date" class="input-form" name="birthday" placeholder="Fecha de cumpleaños" ></div></div></li></div></div></ul></div><div class = "list-block"><ul><button onClick="registryCalification();" class="item-link list-button position-popup-button" type="button">REGISTRARME</button><a href="#" id="closemodal" class="item-link list-button position-popup-button" type="button">CANCELAR</a></ul></div></form>'+
						                    '</div>'+
						                  '</div>'
						myApp.popup(popupHTML);						   
					  	
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
            	var resul = informacion.replace(/&/g, "<br><br>");            	
            	if (obj[i].imagen != null) {
            		html+="<div class='accordion-item'><div class='accordion-item-toggle'><i class='icon icon-plus'>+</i><i class='icon icon-minus'>-</i><span> "+obj[i].titulo+"</span></div><div class='accordion-item-content'><img src="+obj[i].imagen+"></div></div>";
            	}else{
            		html+="<div class='accordion-item'><div class='accordion-item-toggle'><i class='icon icon-plus'>+</i><i class='icon icon-minus'>-</i><span> "+obj[i].titulo+"</span></div><div class='accordion-item-content'><p class='p-item-content' id='con"+obj[i].id+"'>"+resul+"</p></div></div>";
            	}	            	
			}
			$(".custom-accordion").html(html);
   }
});

})

myApp.onPageInit('registro2', function (page){

	// var calendarDefault = myApp.calendar({
	//     input: '#birthday',
	// }); 
	   
    $$('#registry').click(function(){	   
	     var cliente = { 
         numeroDocumento : $("#document").val(),
         primerNombre : $('#name').val(), 	
         segundoNombre : $('#name').val(), 	
         primerApellido : $('#lastname').val(),
         segundoApellido : $('#name').val(), 	
         correo : $('#mail').val(), 
         sexo : $('input[name=drone]:checked', '.label-content').val(),
         telefono : $('#phone').val(),
         fecha : $('#birthday').val(),
         municipio : $('#city').val()
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
					    	$("#name").val(data.primerNombre);	
					    	$("#lastname").val(data.primerApellido);	
					    	$("#mail").val(data.correo);	
					    	$("#phone").val(data.telefono);	
					    	$("#city").val(data.municipio);	
					    	$("#birthday").val(data.fecha);	
					    }
	                },
	                error: function(xhr, status, error){
	                    console.log(xhr.responseText);
	                }
	        });
	});    		
})

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
				        var popupHTML = '<div class="popup"><div class="content-block1"><h2 class="page_title">Gracias por querer formar parte de la familia Mundo Único</h2><h2 class="page_title_secondary">Por favor completa el siguiente formulario</h2><form class="form-modal"><div class = "list-block"><ul><div class="row"><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="document_reg" type="text" class="input-form" required name="password" placeholder="Número de documento" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="name_reg" type="text" class="input-form" required name="password" placeholder="Nombre" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="phone_reg" type="text" class="input-form" required name="password" placeholder="Teléfono" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="city_reg" type="text" class="input-form" name="city" placeholder="Ciudad" ></div></div></li></div><div class="col-50"><li class="item-content"><div class="item-inner"><div class="item-input"><input id="mail_reg" type="text" class="input-form" required name="password" placeholder="Correo electrónico" ></div></div></li><li class="item-content"><div class="item-inner"><div class="item-input"><input id="lastname_reg" type="text" class="input-form" required name="password" placeholder="Apellidos" ></div></div></li><div class="label-content2"><label>Género</label><input type="radio" id="Hombre" name="drone_reg" value="M" checked /><label for="huey">Hombre</label><input type="radio" id="Mujer" name="drone_reg" value="F" /><label for="dewey">Mujer</label></div><li class="item-content"><div class="item-inner"><div class="item-input"><input id="birthday_reg" type="date" class="input-form" name="birthday" placeholder="Fecha de cumpleaños" ></div></div></li></div></div></ul></div><div class = "list-block"><ul><button onClick="registryPQRS();" class="item-link list-button position-popup-button" type="button">REGISTRARME</button><a href="#" id="closemodal" class="item-link list-button position-popup-button" type="button">CANCELAR</a></ul></div></form>'+
						                    '</div>'+
						                  '</div>'
						  myApp.popup(popupHTML);
						  $("#closemodal").click(function() {
								document.getElementById("name_pqrs").value = "";
								document.getElementById("phone_pqrs").value = "";
								document.getElementById("mail_pqrs").value = "";
								document.getElementById("message_pqrs").value = "";
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

	  	   
})

myApp.onPageInit('shopping', function(page){

$(window).ready(function(){

  var static_counter = document.querySelector('.progress-counter');
  var score_counter = document.querySelector('.score-counter');
  var points_system = document.getElementsByClassName('points-system')[0];
  var clicked = document.getElementsByClassName('button-yes');
  var skipped = document.getElementsByClassName('button-no');
  var thumbs_up = document.getElementsByClassName('fa');
  var span_yes = document.querySelector('.span-yes');
  var span_no = document.querySelector('.span-no');
  var question_template = document.querySelector('.question-template');
  var questions_wrap = document.querySelector('.questions-wrap');
  var input_area = document.getElementsByClassName('input-area')[0];
  var incentive = document.getElementsByClassName('incentive')[0];

  try{
    if (sessionStorage.user_score) {
      static_counter.innerHTML = sessionStorage.user_score + 'pts';
      score_counter.innerHTML = 5 - Number(sessionStorage.user_score);
    }
  } catch(error) {
    alert('Please, turn off private browsing mode.');
  }


  //resizing handler
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 640 || window.innerWidth == 640) {
      if (points_system.nextElementSibling !== incentive) {
        input_area.insertBefore(points_system, incentive);
      }
    } else {
      if (incentive.nextElementSibling !== points_system) {
        input_area.insertBefore(incentive, points_system);
      }
    }
    if (window.innerWidth <= 360 || window.innerWidth == 360) {
      for (var v = 0; v < thumbs_up.length; v++) {
        thumbs_up[v].classList.remove('fa-2x');
        thumbs_up[v].classList.add('fa-lg');
      }
    } else {
      for (var x = 0; x < thumbs_up.length; x++) {
        thumbs_up[x].classList.remove('fa-lg');
        thumbs_up[x].classList.add('fa-2x');
      }
    }
  });
  window.dispatchEvent(new Event('resize'));

  var question_config = [{
    'question_text': '¿La prenda que estás buscando es para un momento en específico?',
    'question_value': 2,
    'coreg_field': 'f12345',
    // 'options': [
    //   {
    //     'text': 'yes',
    //     'value': 2
    //   }, {
    //     'text': 'No',
    //     'value': 0
    //   }
    // ]
  }, {
    'question_text': '¿Tienes alguna preferencia en el material de tu ropa interior?',
    'question_value': 4,
    'coreg_field': 'f54321'
  }, {
    'question_text': 'De estos grupos de colores, ¿con cuál te identificas más?',
    'question_value': 2,
    'coreg_field': 'f78945'
  }, {
    'question_text': '¿Cómo es tu día a día?, un día normal en semana',
    'question_value': 5,
    'coreg_field': 'f98745'
  }, {
    'question_text': 'Leaving so soon?',
    'question_value': 2,
    'coreg_field': 'f65412'
  }];

  //question handler
  question_config.forEach(function(config_item) {
    var questionNode = question_template.content.querySelector('.question').cloneNode(true);
    questionNode.querySelector('.question-value').value = config_item.question_value;
    questionNode.querySelector('.question-text').innerHTML = config_item.question_text;
    questionNode.querySelector('.coreg-field').name = config_item.coreg_field;
    questions_wrap.appendChild(questionNode);
  });

  var question = document.querySelector('.question').classList.add('visible');

  function switch_questions(clicked_yes) {
    clicked_yes = clicked_yes || false;

    var current_question = document.querySelector('.question.visible');
    var next_question = current_question.nextElementSibling;

    if (clicked_yes) {
      current_question.querySelector('.coreg-field').value = 'yes';
    }
    if (next_question) {
      current_question.classList.remove('visible');
      next_question.classList.add('visible');
    } else {
      document.getElementById('ss_submit_button').click();
      alert('5 questions submitted in bulk!');
    }

  }

  //yes button handler
  for (var i = 0; i < clicked.length; i++) {
    clicked[i].addEventListener('click', function() {

      var question_value = parseFloat(document.querySelector('.question.visible .question-value').value);
      var floating_counter = document.querySelector('.floating-progress-counter');
      var total_points = static_counter.innerHTML;
      var number = parseFloat(total_points.match(/\d+/)[0]);
      var total_value = (number + question_value);
      var score_counter_value = parseFloat(score_counter.innerHTML);
      var updated_points = total_value ;
      var updated_score = (score_counter_value - question_value);
      //progress spinner variables
      var spinner = document.querySelector('.spinner');
      var filler = document.querySelector('.filler');
      var mask = document.querySelector('.mask');
      var progress_spinner = [spinner, filler, mask];
      var circle_is_active = document.getElementsByClassName('active');
      
      span_yes.style.display = 'none';
      thumbs_up[0].style.display = 'block';
      thumbs_up[0].classList.add('pop');

      //accrued points handler   
      floating_counter.innerHTML = '+' + question_value;
      floating_counter.classList.add('animate');

      //handler for session storage    
      try {
        sessionStorage.user_score = total_value;
      }
      catch(error){
        alert('Please, turn off private browsing mode.');
      }
      
      //handler for score at the top  
      static_counter.innerHTML = updated_points;

      if (updated_score > 0) {
        score_counter.innerHTML = updated_score;
      } else if (updated_score === 0) {
        score_counter.innerHTML = 0;
      }

      //animate progress-spinner
      for (var j = 0; j < progress_spinner.length; j++) {
        progress_spinner[j].classList.add('active');
      }

      setTimeout(function() {
        thumbs_up[0].classList.remove('pop');
        for (var k = 0; k < progress_spinner.length; k++) {
          progress_spinner[k].classList.remove('active');
        }
      }, 800);

      setTimeout(function() {
        floating_counter.classList.remove('animate');
        span_yes.style.display = 'block';
        thumbs_up[0].style.display = 'none';
      }, 790);

      // when reach end of survey, uncomment the click of submit button do this
      if (score_counter.innerHTML <= 0) {
        document.querySelector('#ss_submit_button').click();
        alert('SURVEY COMPLETE!');
      }

      setTimeout(function() {
        switch_questions(true);
      }, 500);

    });
  }

  //skip button handler
  for (var m = 0; m < skipped.length; m++) {
    skipped[m].addEventListener('click', function() {
      span_no.style.display = 'none';
      thumbs_up[1].style.display = 'block';
      thumbs_up[1].classList.add('pop');

      setTimeout(function() {
        thumbs_up[0].classList.remove('pop');
      }, 800);

      setTimeout(function() {
        span_no.style.display = 'block';
        thumbs_up[1].style.display = 'none';
      }, 790);

      switch_questions();
    });
  }

// trying this out



});





});









