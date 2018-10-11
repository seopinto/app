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
myApp.onPageInit('blog', function (page) {
 
		$(".posts li").hide();	
		size_li = $(".posts li").size();
		x=4;
		$('.posts li:lt('+x+')').show();
		$('#loadMore').click(function () {
			x= (x+1 <= size_li) ? x+1 : size_li;
			$('.posts li:lt('+x+')').show();
			if(x == size_li){
				$('#loadMore').hide();
				$('#showLess').show();
			}
		});

})

function finduser(){

	var cliente = {numeroDocumento : $("#q1").val() }
	$.ajax({
	            url : 'http://35.231.135.74:80/clientes/'+$("#q1").val()+'',
	            processData: false,
	             dataType : 'json',
	            contentType: 'application/json',
	                method : 'post', //en este caso
	                data : JSON.stringify(cliente),
	                success : function(data){
	                     if (data.id == -1) {
		                	myApp.alert(data.error);
					    }else{
					    	$("#q2").val(data.primerNombre);	
					    	$("#q3").val(data.segundoNombre);	
					    	$("#q4").val(data.primerApellido);	
					    	$("#q5").val(data.segundoApellido);	
					    	$("#q6").val(data.correo);	
					    	$("#q7").val(data.telefono);	
					    }
	                },
	                error: function(xhr, status, error){
	                    console.log(xhr.responseText);
	                }
	        });

}

function finduserpqrs(){

	var cliente = {numeroDocumento : $("#q1").val() }
	$.ajax({

	            url : 'http://35.231.135.74:80/clientes/'+$("#q1").val()+'',
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
						         $('.fs-continue').attr("disabled", true);
						         document.getElementById("q3").readOnly = true; 
						        }
						      }, 
						      {
						        text: 'Registrarme',
						        onClick: function() {
						         mainView.router.reloadPage('registro.html');
						        }
						      }
						    ]
		                	});   
					    }
	                },
	                error: function(xhr, status, error){
	                    console.log(xhr.responseText);
	                }
	        });

}


// myApp.onPageInit('registro', function(page){
    
//   $$('#registrar').click(function(){
//         var cliente = { 
//          numeroDocumento : $("#q1").val(),
//          primerNombre : $('#q2').val(), 
//          segundoNombre : $('#q3').val(), 
//          primerApellido : $('#q4').val(),
//          segundoApellido : $('#q5').val(), 
//          correo : $('#q6').val(), 
//          telefono : $('#q7').val(),
//          sexo : $('input[name=q8]:checked', '.fs-form-wrap').val()};
//         $.ajax({
//                 url : 'http://35.231.135.74:80/clientes',
//             processData: false,
//              dataType : 'json',
//             contentType: 'application/json',
//                 method : 'post', //en este caso
//                 data : JSON.stringify(cliente),
//                 success : function(response){
//                       myApp.modal({
// 					  title: 'Notificación Mundo Único',
//             		  text: 'Usuario registrado correctamente',
//             		  buttons: [
// 				      {
// 				        text: 'OK',
// 				        onClick: function() {
// 				         myApp.closeModal();
// 				        }
// 				      }
// 				    ]
//                 	});   
//                 },
//                 error: function(xhr, status, error){
//                     console.log(xhr.responseText);
//                 }
//         });
// });  
    
// })


myApp.onPageInit('pqrs', function(page){

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
            	if (obj[i].imagen != null) {
            		html+="<div class='accordion-item'><div class='accordion-item-toggle'><i class='icon icon-plus'>+</i><i class='icon icon-minus'>-</i><span> "+obj[i].titulo+"</span></div><div class='accordion-item-content'><img src="+obj[i].imagen+"></div></div>";
            	}else{
            		html+="<div class='accordion-item'><div class='accordion-item-toggle'><i class='icon icon-plus'>+</i><i class='icon icon-minus'>-</i><span> "+obj[i].titulo+"</span></div><div class='accordion-item-content'><p>"+obj[i].informacion+"</p></div></div>";
            	}	
			}
			$(".custom-accordion").html(html);
   }
});


$$('#SendPQRS').click(function(){
	    var dataTienda = localStorage.getItem('TiendaLocal');
        var pqrsregister = { 
         pqrs : $('input[name=q2]:checked', '.fs-form-wrap').val(),
         nota : $('#q3').val()};
        $.ajax({
                url : 'http://35.231.135.74:80/pqrs/tienda/'+dataTienda+'/cliente/'+$("#q1").val(),
            processData: false,
             dataType : 'json',
            contentType: 'application/json',
                method : 'POST', //en este caso
                data : JSON.stringify(pqrsregister),
                success : function(response){
                	myApp.modal({
					  title: 'Notificación Mundo Único',
            		  text: 'Señor(a) su '+pqrsregister.pqrs+' ha sido registrada correctamente',
            		  buttons: [
				      {
				        text: 'OK',
				        onClick: function() {
				         myApp.closeModal();
				         mainView.router.loadPage('index.html');
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

})

myApp.onPageInit('success', function(page){

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

myApp.onPageInit('registro2', function (page){
    
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


 $$('#registrar').click(function(){
        var cliente = { 
         numeroDocumento : $("#q1").val(),
         primerNombre : $('#q2').val(), 
         segundoNombre : $('#q3').val(), 
         primerApellido : $('#q4').val(),
         segundoApellido : $('#q5').val(), 
         correo : $('#q6').val(), 
         sexo : $('input[name=q8]:checked', '.fs-form-wrap').val(),
         telefono : $('#q7').val()
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
					  title: 'Notificación Mundo Único',
            		  text: 'Usuario registrado correctamente',
            		  buttons: [
				      {
				        text: 'OK',
				        onClick: function() {
				        mainView.router.loadPage('index.html');
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
    
})







