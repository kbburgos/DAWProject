var card1 = $("#card1");
var card2 = $("#card2");
var card3 = $("#card3");
var card4 = $("#card4");
var contador = 0;
var cardP = $("#card-principal");

card1.flip({
  axis: "y",
  trigger: "hover"
},$(".desaparecer")[0].style.display = "inline");

card2.flip({
  axis: "y",
  trigger: "hover"
},$(".desaparecer")[1].style.display = "inline");

card3.flip({
  axis: "y",
  trigger: "hover"
},$(".desaparecer")[2].style.display = "inline");

card4.flip({
  axis: "y",
  trigger: "hover"
},$(".desaparecer")[3].style.display = "inline");

function cambiar() {
  var h3 = $("#h3-principal");
  var img = $("#img-principal");
  if(contador == 0){
    cardP.animate({
      opacity: 0
    },4000);
  }
  else if(contador == 1){
    cardP.animate({
      opacity: 1
    },1000);
    img.attr("src","../resources/img-developers/kb.jpeg");
    cardP.animate({
      opacity: 0
    },3000);
    //img[0].style.filter = "opacity(.5)";
    h3.text("Karla Burgos");
  }
  else if (contador == 2) {
    cardP.animate({
      opacity: 1
    },1000);
    img.attr("src","../resources/img-developers/tv.jpg");
    h3.text("Tony Veas");
    cardP.animate({
      opacity: 0
    },3000);
  }
  else if (contador == 3) {
    cardP.animate({
      opacity: 1
    },1000);
    img.attr("src","../resources/img-developers/cs.jpg");
    cardP.animate({
      opacity: 0
    },3000);
    h3.text("Carlos Sesme");
  }
  else if(contador == 4){
    cardP[0].style.display = "none";
    var columnas = $(".row-ocultar");
    columnas[0].style.visibility="visible";
    columnas[1].style.visibility="visible";
  }
  contador++;
}

$("body").ready(function(){
  setInterval(cambiar,4000);
});
