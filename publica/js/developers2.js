// Wrap every letter in a span
$('.ml11 .letters').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});
$("body").ready(function(){
  $("#col-card-1").hide();
  $("#col-card-2").hide();
  $("#col-card-3").hide();
  $("#col-card-4").hide();
});

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
  $("#col-card-4").addClass('animated slideInLeft');
});
