/*Script backbutton Android*/

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{ 
   document.addEventListener("backbutton", onBackKeyDown, false); 
} 
function onBackKeyDown() 
{ 
  mainView.router.back(); 
}