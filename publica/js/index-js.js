//MAP INICIALIZADOR

/* ----------------------------------------------------------------------------------------------------------------------------------------*/

//intro.js inicializador

function startIntro(){
  intro = introJs();
  intro.setOptions({
    scrollToElement:true,
    overlayOpacity:1,
    keyboardNavigation: true,
<<<<<<< HEAD
    
    nextLabel: 'Siguiente >', 
		prevLabel: '< Anterior', 
		skipLabel: 'Salir', 
=======
    tooltipPosition:'auto',
    nextLabel: 'Siguiente >',
		prevLabel: '< Anterior',
		skipLabel: 'Salir',
>>>>>>> 74a267be113fa9bea1e9a69bf9ba3cff2075688b
		doneLabel: 'Hecho',
    steps: [
      {
        intro: "<p class= 'text-center'>Comencemos con nuestro recorrido!<img src='./resources/img/logotipo.png' alt='Site logo'></p>"
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


        $('.toast').toast('show');
        $('#btn-intro').on('click',function(){
          $('.toast').toast('hide');
          startIntro();
        });

        //loadGoogleMap();
       // Google Map

        //animacion scroll


        $('.tm-current-year').text(new Date().getFullYear());  // Update year in copyright
    });
