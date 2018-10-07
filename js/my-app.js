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
    fastclick: false,
    smartSelectOpenIn:'popup',
});

// Export selectors engine
var $$ = Dom7;

var itemsSlider = 0;
var getURLimagenesIntereses = "https://6614d187.ngrok.io/multimedia/verImagenes/";

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

     
         $$('.login-screen .list-button').on('click', function () {

         	var loginaccess = { 
         		empleado : $("#username").val(),
         		contrasena : $('#password').val()
         		};
			        $.ajax({
			            url : 'https://6614d187.ngrok.io/empleado/autenticacion',
			            processData: false,
			            dataType : 'json',
			            contentType: 'application/json',
			            method : 'post', //en este caso
			            data : JSON.stringify(loginaccess),
			            success : function(data){
			                if (data.id == 1) {
			                	myApp.alert(data.error);
						    }else if (data.id == -1 ) {
						        myApp.alert(data.error);
						    }else if (data.id == -2) {
						        myApp.alert(data.error);
						    }else{
						    	console.log(data.idTiendas);
						    	var yetVisited = localStorage[loginaccess.empleado];
						    	if (!yetVisited) {
							        localStorage[loginaccess.empleado] = loginaccess.empleado;							        
							    }							    
					          	 myApp.alert('Usuario: ' + loginaccess.empleado + ', Contrasena: ' + loginaccess.contrasena, function () {
					                myApp.closeModal('.login-screen');
					             });		
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

	var cliente = {numeroDocumento : $("#numeroDocumento").val() }
	$.ajax({
	            url : 'https://6614d187.ngrok.io/clientes/'+$("#numeroDocumento").val()+'',
	            processData: false,
	             dataType : 'json',
	            contentType: 'application/json',
	                method : 'post', //en este caso
	                data : JSON.stringify(cliente),
	                success : function(data){
	                     if (data.id == -1) {
		                	myApp.alert(data.error);
					    }else{
					    	$("#primerNombre").val(data.primerNombre);	
					    	$("#segundoNombre").val(data.segundoNombre);	
					    	$("#primerApellido").val(data.primerApellido);	
					    	$("#segundoApellido").val(data.segundoApellido);	
					    	$("#correo").val(data.correo);	
					    	$("#sexo").val(data.sexo);	
					    	$("#telefono").val(data.telefono);	
					    }
	                },
	                error: function(xhr, status, error){
	                    console.log(xhr.responseText);
	                }
	        });

}

function finduserpqrs(){

	var cliente = {numeroDocumento : $("#identification").val() }
	$.ajax({

	            url : 'https://6614d187.ngrok.io/clientes/'+$("#identification").val()+'',
	            processData: false,
	             dataType : 'json',
	            contentType: 'application/json',
	                method : 'post', //en este caso
	                data1 : JSON.stringify(cliente),
	                success : function(data1){
	                	console.log(data1);

	                     if (data1.id == -1) {
		                	//myApp.alert(data.error);

		                	myApp.alert('El Usuario no se encuentra registrado' + '<a href="registro.html" data-view=".view-main">Registrar usuario</a>', function () {
					                myApp.closeModal('.modal');
					             });

					    }
	                },
	                error: function(xhr, status, error){
	                    console.log(xhr.responseText);
	                }
	        });

}


myApp.onPageInit('registro', function(page){
    
  $$('#registrar').click(function(){
        var cliente = { 
         numeroDocumento : $("#numeroDocumento").val(),
         primerNombre : $('#primerNombre').val(), 
         segundoNombre : $('#segundoNombre').val(), 
         primerApellido : $('#primerApellido').val(),
         segundoApellido : $('#segundoApellido').val(), 
         correo : $('#correo').val(), 
         sexo : $('#sexo').val(), 
         telefono : $('#telefono').val()};
        $.ajax({
                url : 'https://6614d187.ngrok.io/clientes',
            processData: false,
             dataType : 'json',
            contentType: 'application/json',
                method : 'post', //en este caso
                data : JSON.stringify(cliente),
                success : function(response){
                      alert (" " + response );
                },
                error: function(xhr, status, error){
                    console.log(xhr.responseText);
                }
        });
});  
    
})


myApp.onPageInit('pqrs', function(page){
    
 $$.ajax({ 
    type: 'GET', 
    url: 'https://6614d187.ngrok.io/preguntasTienda',
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
           
            var results = JSON.stringify(data);
            var obj = JSON.parse(results);
            var html;

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


$$('#EnviarPQRS').click(function(){
	    var dataTienda = localStorage.getItem('TiendaLocal');
        var pqrsregister = { 
         pqrs : $('input[name=myradio]:checked', '.list-block').val(), 
         nota : $('#message').val()};
        $.ajax({
                url : 'https://6614d187.ngrok.io/pqrs/tienda/'+dataTienda+'/cliente/'+$("#identification").val(),
            processData: false,
             dataType : 'json',
            contentType: 'application/json',
                method : 'POST', //en este caso
                data : JSON.stringify(pqrsregister),
                success : function(response){
                	myApp.alert("Señor(a) su "+pqrsregister.pqrs+" ha sido registrada correctamente");
                      
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
                url : 'https://6614d187.ngrok.io/felicitaciones/tienda/'+dataTienda+'/cliente/'+$("#identification").val(),
            processData: false,
             dataType : 'json',
            contentType: 'application/json',
                method : 'POST', //en este caso
                data : JSON.stringify(felregister),
                success : function(response){
                	myApp.alert("Su felicitación ha sido registrada correctamente");                      
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



})







