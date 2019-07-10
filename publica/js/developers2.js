// Wrap every letter in a span
$('.ml11 .letters').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});
$("body").ready(function(){
  $("#col-card-1").hide();
  $("#col-card-2").hide();
  $("#col-card-3").hide();
  $("#col-card-4").hide();
  $("#cardGroup").hide();
  $("#rowCard1").hide();
  $("#mail1").hide();
  $("#rowCard2").hide();
  $("#mail2").hide();
  $("#rowCard3").hide();
  $("#mail3").hide();
  $("#rowCard4").hide();
  $("#mail4").hide();
});
var cont = 0;


anime.timeline({loop: false})
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0,$(".ml11 .letters").width()],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: function(el, i) {
      return 34 * (i+1)
    }
  }).add({
    targets: '.ml11',
    opacity: 1,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

//codigo para pantalla de intro
$("#btnStart").click(function() {
  $("#col-intro").hide();
  var colCard1 = $("#col-card-1");
  colCard1.show();
  colCard1.addClass('animated slideInLeft');
});

$("#btnCardP1").click(function(){
  $("#col-card-1").hide();
  $("#col-card-2").show();
  $("#col-card-2").addClass('animated slideInRight');
});

$("#btnCardP2").click(function(){
  $("#col-card-2").hide();
  $("#col-card-3").show();
  $("#col-card-3").addClass('animated slideInLeft');
});
$("#btnCardP3").click(function(){
  $("#col-card-3").hide();
  $("#col-card-4").show();
  $("#col-card-4").addClass('animated slideInRight');
});
$("#btnCardP4").click(function(){
  $("#col-card-4").hide();
  $("#cardGroup").show();
  $("#cardGroup").addClass('animated zoomIn');
});
//codigo para card 1
$("#card1").click(function(){
   $("#cardGroup").addClass('animated zoomOut');
   $("#cardGroup").hide();
  $("#rowCard1").show();
  $("#rowCard1").addClass('animated zoomIn');
});

$("#icoM1").click(function() {
  if(cont == 0){
    $("#mail1").show();
    cont = 1;
  }
  else {
    cont=0;
    $("#mail1").hide();
  }
});
$("#back1").click(function () {
  $("#rowCard1").addClass('animated zoomOut');
  $("#rowCard1").removeClass('animated zoomOut');
  $("#rowCard1").hide();
  $("#cardGroup").show();
  $("#cardGroup").removeClass('animated zoomOut');
  $("#cardGroup").addClass('animated zoomIn');
});

//codigo para card 2
$("#card2").click(function(){
   $("#cardGroup").addClass('animated zoomOut');
   $("#cardGroup").hide();
  $("#rowCard2").show();
  $("#rowCard2").addClass('animated zoomIn');
});

$("#icoM2").click(function() {
  if(cont == 0){
    $("#mail2").show();
    cont = 1;
  }
  else {
    cont=0;
    $("#mail2").hide();
  }
});
$("#back2").click(function () {
  $("#rowCard2").addClass('animated zoomOut');
  $("#rowCard2").removeClass('animated zoomOut');
  $("#rowCard2").hide();
  $("#cardGroup").show();
  $("#cardGroup").removeClass('animated zoomOut');
  $("#cardGroup").addClass('animated zoomIn');
});

//codigo para card 3
$("#card3").click(function(){
   $("#cardGroup").addClass('animated zoomOut');
   $("#cardGroup").hide();
  $("#rowCard3").show();
  $("#rowCard3").addClass('animated zoomIn');
});

$("#icoM3").click(function() {
  if(cont == 0){
    $("#mail3").show();
    cont = 1;
  }
  else {
    cont=0;
    $("#mail3").hide();
  }
});
$("#back3").click(function () {
  $("#rowCard3").addClass('animated zoomOut');
  $("#rowCard3").removeClass('animated zoomOut');
  $("#rowCard3").hide();
  $("#cardGroup").show();
  $("#cardGroup").removeClass('animated zoomOut');
  $("#cardGroup").addClass('animated zoomIn');
});

//codigo para card 4
$("#card4").click(function(){
   $("#cardGroup").addClass('animated zoomOut');
   $("#cardGroup").hide();
  $("#rowCard4").show();
  $("#rowCard4").addClass('animated zoomIn');
});

$("#icoM4").click(function() {
  if(cont == 0){
    $("#mail4").show();
    cont = 1;
  }
  else {
    cont=0;
    $("#mail4").hide();
  }
});
$("#back4").click(function () {
  $("#rowCard4").addClass('animated zoomOut');
  $("#rowCard4").removeClass('animated zoomOut');
  $("#rowCard4").hide();
  $("#cardGroup").show();
  $("#cardGroup").removeClass('animated zoomOut');
  $("#cardGroup").addClass('animated zoomIn');
});

//efecto texto equipo de trabajo
// Wrap every letter in a span
$('.ml12 .letters2').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter2'>$&</span>"));
});

anime.timeline({loop: true})
  .add({
    targets: '.ml12 .letter2',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: function(el, i) {
      return 70 * (i+1)
    }
  }).add({
    targets: '.ml12 .line2',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: function(el, i, l) {
      return 80 * (l - i);
    }
  }).add({
    targets: '.ml12',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
