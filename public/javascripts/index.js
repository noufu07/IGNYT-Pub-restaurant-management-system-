
var tablinks=document.getElementsByClassName("tab-links")
var tabcontents=document.getElementsByClassName("tab-contents")

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove('active-link')
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove('active-tab')
    }

    event.currentTarget.classList.add('active-link')
    document.getElementById(tabname).classList.add('active-tab')
}

var sidemenu=document.getElementById("sidemenu")
function openmenu(){
    sidemenu.style.right="0";
}
function closemenu(){
    sidemenu.style.right="-200px";
}


function toggleZoom(element) {
    element.classList.toggle('zoomed');
  }
  
// -------------for pop up menu------------
function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

//   --------------for openmodel1------------
function openModal1() {
    var modal = document.getElementById("myModal1");
    modal.style.display = "block";
  }

  function closeModal1() {
    var modal = document.getElementById("myModal1");
    modal.style.display = "none";
  }