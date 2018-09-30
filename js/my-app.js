// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: true,
	swipePanelOnlyClose: true,
	pushState: true,
    template7Pages: true
});

// Export selectors engine
var $$ = Dom7;


var getURLimagenesIntereses = "http://5a6e74f2.ngrok.io/multimedia/verImagenes/";

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
			            url : 'http://5a6e74f2.ngrok.io/empleado/autenticacion',
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
						    	var yetVisited = localStorage[loginaccess.empleado];
						    	if (!yetVisited) {
							        
							        localStorage[loginaccess.empleado] = loginaccess.empleado;
							    }
							    
					          	myApp.alert('Usuario: ' + loginaccess.empleado + ', Contrasena: ' + loginaccess.contrasena, function () {
					               myApp.closeModal('.login-screen');
					            });	

					          	var html = "<div class='swiper-wrapper'>";

					          	for(var i = 0;i<data.length;i++){							         
							  		html+="<div class='swiper-slide' style='background-image:url("+getURLimagenesIntereses+data[i].url+");'></div>";
							 	}
        							
        						$("#SliderHome").html(html + "<div class='swiper-pagination'></div></div>");

						      } 
			                },
			            error: function(xhr, status, error){
			                console.log(xhr.responseText);
			            }
			        });      
            
         });

myApp.onPageInit('index', function (page) {
		circlemenu();

		

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




myApp.onPageInit('registro', function(page){
    
  $$('#registrar').click(function(){
        var cliente = { numeroDocumento : $("#numeroDocumento").val(), primerNombre : $('#primerNombre').val(), segundoNombre : $('#segundoNombre').val(), primerApellido : $('#primerApellido').val(), segundoApellido : $('#segundoApellido').val(), correo : $('#correo').val(), sexo : $('#sexo').val(), 
                    telefono : $('#telefono').val()};
        $.ajax({
                url : 'http://55c62644.ngrok.io/clientes',
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
//myApp.onPageInit('pqrs', function(page){
//    var titulo = document.querySelector('#titulo');
//var descripcion = document.querySelector('#descripcion');
//    var requestURL = 'http://0ecac117.ngrok.io/preguntasTienda';
//    var request = new XMLHttpRequest();
//    request.open('GET', requestURL);
//    request.responseType = 'json';
//    request.send();
//    request.onload = function() {
//  var preguntas = request.response;
//        console.log (" " +JSON.stringify(preguntas) );
//        
////  populateHeader(preguntas);
////  showHeroes(preguntas);
//}
//
//})
myApp.onPageInit('pqrs', function(page){
    
 $$.ajax({ 
    type: 'GET', 
    url: 'https://5a6e74f2.ngrok.io/preguntasTienda',
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
})




