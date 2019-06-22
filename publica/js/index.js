//MAP INICIALIZADOR

/* ----------------------------------------------------------------------------------------------------------------------------------------*/

//intro.js inicializador

function startIntro(){
  intro = introJs();
  intro.setOptions({
    scrollToElement:true,
    overlayOpacity:1,
    keyboardNavigation: true,
    tooltipPosition:'auto',
    nextLabel: 'Siguiente >',
		prevLabel: '< Anterior',
		skipLabel: 'Salir',

		doneLabel: 'Hecho',
    steps: [
      {
        intro: "<p class= 'text-center'>Comencemos con nuestro recorrido!</p> <br><center><img src='./resources/img/logotipo.png' alt='Site logo'></center>"
      },

    {
      element:'#slide-tratamiento',
      intro: "<p class= 'text-center'>Descubre todo acerca de nuestro grupo de profecionales medicos y nuestro historial de atención</p>",
      position: 'bottom'
    },

    {
      element:'#slide-instalaciones',
      intro: "<p class= 'text-center'>Nuestros pacientes siempre son lo mas importante, usamos tecnologia de punta</p>",
      position: 'bottom'
    },
    {
      element: '#card-1',
      intro: "<p class= 'text-center'>Puedes descubrir las mejores prótesis </p>",
      position: 'left'
    },
    {
      element: '#card-2',
      intro: "<p class= 'text-center'>Aprende como evitar la caries y sus tratamientos </p>",
      position: 'left'
    },
    {
      element: '#card-3',
      intro: "<p class= 'text-center'>Aprende como cuidar tu sonrisa </p>",
      position: 'rigth'
    },
    {
      intro: "<p class= 'text-center'>Gracias por visitarnos, disfruta de nuestros servicios!<img src='./resources/img/logotipo.png' alt='Site logo'></p>"
    }
        ]
  });
  intro.start();
}


function showToast(){

  toastr.options = {
    "closeButton": true,
    "positionClass": "toast-bottom-right",
    "showDuration": "100000",
    "hideDuration": "10000",
    "timeOut": "8000",
    "extendedTimeOut": "10000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  } 
  toastr.options.onclick=function(){
    startIntro();
  };
  toastr["info"]("<p class='text-justify'>¿Quieres un recorrido por nuestra pagina para saber lo que tenemos para ti y tu sonrisa? <i> Dame Click</i></p> ", "Bienvenido a Sis Medic TBS!");

};
//startIntro();

    /* DOM is ready
    ------------------------------------------------*/
    $(function(){

        $(window).on("scroll", function() {
            if($(window).scrollTop() > 100) {
                $(".tm-top-bar").addClass("active");
            } else {
             $(".tm-top-bar").removeClass("active");
            }
        });

        $(".ancla").click(function(evento){
          //Anulamos la funcionalidad por defecto del evento
          evento.preventDefault();
          //Creamos el string del enlace ancla
          var codigo = "#" + $(this).data("ancla");
          //Funcionalidad de scroll lento para el enlace ancla en 2 segundos
          $("html,body").animate({scrollTop: $(codigo).offset().top}, 2000);
        });
       

        showToast();
        $('.tm-current-year').text(new Date().getFullYear());  // Update year in copyright

       

    });
