//MAP INICIALIZADOR
var map = '';
      var center;

      function initialize() {
          var mapOptions = {
              zoom: 16,
              center: new google.maps.LatLng(-2.147733, -79.964542),
              scrollwheel: false
          };

          map = new google.maps.Map(document.getElementById('google-map'),  mapOptions);

          google.maps.event.addDomListener(map, 'idle', function() {
            calculateCenter();
            console.log("calculo centro")
        });

          google.maps.event.addDomListener(window, 'resize', function() {
            map.setCenter(center);
           
        });
      }

      function calculateCenter() {
          center = map.getCenter();
          var marker = new google.maps.Marker({
            position: center,
            map: map,
            title: 'Escuela Superior Politecnica del Litoral - ESPOL'
          });
      }

      function loadGoogleMap(){
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB_uM0BgDIiri-RlGCU49uXY7IRqMpcfcY&v=3.exp&' + 'callback=initialize';
          document.body.appendChild(script);
      }
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
        intro: "<p class= 'text-center'>Comencemos con nuestro recorrido!<img src='./resources/img/logotipo.png' alt='Site logo'></p>"
      },

    {
      element:'#slide-atencion',
      intro: "<p class= 'text-center'>Descubre todo acerca de nuestro grupo de profecionales medicos y nuestro historial de atencion</p>",
      position: 'bottom'
    },
    
    {
      element:'#slide-tecnologia',
      intro: "<p class= 'text-center'>Nuestros pacientes siempre son lo mas importante, usamos tecnologia de punta</p>",
      position: 'bottom'
    },
    {
      element: '#card-1',
      intro: "<p class= 'text-center'>Puedes descubrir las mejores protesis </p>",
      position: 'auto'
    },
    {
      element: '#card-2',
      intro: "<p class= 'text-center'>Aprende como evitar la caries y sus tratamientos </p>",
      position: 'auto'
    },
    {
      element: '#card-3',
      intro: "<p class= 'text-center'>Aprende como cuidar tu sonrisa </p>",
      position: 'auto'
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
