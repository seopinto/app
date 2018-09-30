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
            var uname = $$('.login-screen input[name = "username"]').val();
            var pwd = $$('.login-screen input[name = "password"]').val();
            
            myApp.alert('Username: ' + uname + ', Password: ' + pwd, function () {
               myApp.closeModal('.login-screen');
            });
         });

myApp.onPageInit('index', function (page) {
		circlemenu();
});

$$(document).on('pageInit', function (e) {
		$("#RegisterForm").validate();
		$("#LoginForm").validate();
		$("#ForgotForm").validate();
		$(".close-popup").click(function() {					  
			$("label.error").hide();
		});

	
})
myApp.onPageInit('music', function (page) {
		  audiojs.events.ready(function() {
			var as = audiojs.createAll();
		  });
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

myApp.onPageInit('shop', function (page) {
			
		$('.qntyplusshop').click(function(e){
									  
			e.preventDefault();
			var fieldName = $(this).attr('field');
			var currentVal = parseInt($('input[name='+fieldName+']').val());
			if (!isNaN(currentVal)) {
				$('input[name='+fieldName+']').val(currentVal + 1);
			} else {
				$('input[name='+fieldName+']').val(0);
			}
			
		});
		$(".qntyminusshop").click(function(e) {
			e.preventDefault();
			var fieldName = $(this).attr('field');
			var currentVal = parseInt($('input[name='+fieldName+']').val());
			if (!isNaN(currentVal) && currentVal > 0) {
				$('input[name='+fieldName+']').val(currentVal - 1);
			} else {
				$('input[name='+fieldName+']').val(0);
			}
		});	
  
})
myApp.onPageInit('shopitem', function (page) {
		$(".swipebox").swipebox();	
		$('.qntyplusshop').click(function(e){
									  
			e.preventDefault();
			var fieldName = $(this).attr('field');
			var currentVal = parseInt($('input[name='+fieldName+']').val());
			if (!isNaN(currentVal)) {
				$('input[name='+fieldName+']').val(currentVal + 1);
			} else {
				$('input[name='+fieldName+']').val(0);
			}
			
		});
		$(".qntyminusshop").click(function(e) {
			e.preventDefault();
			var fieldName = $(this).attr('field');
			var currentVal = parseInt($('input[name='+fieldName+']').val());
			if (!isNaN(currentVal) && currentVal > 0) {
				$('input[name='+fieldName+']').val(currentVal - 1);
			} else {
				$('input[name='+fieldName+']').val(0);
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
    url: 'http://d5b42361.ngrok.io/preguntasTienda',
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
          console.log (" " + JSON.stringify(data) );
    }
});
})
