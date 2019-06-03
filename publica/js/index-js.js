
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


    /* DOM is ready
    ------------------------------------------------*/
    $(function(){
      // $(".slider").not('.slick-initialized').slick();
        // Change top navbar on scroll
        $(window).on("scroll", function() {
            if($(window).scrollTop() > 100) {
                $(".tm-top-bar").addClass("active");
            } else {
             $(".tm-top-bar").removeClass("active");
            }
        });

        // Smooth scroll to search form
        // $('.tm-down-arrow-link').click(function(){
        //     $.scrollTo('#tm-section-search', 300, {easing:'linear'});
        // });



        // Update nav links on scroll
        // $('#tm-top-bar').singlePageNav({
        //     currentClass:'active',
        //     offset: 60
        // });

        // Close navbar after clicked
        // $('.nav-link').click(function(){
        //     $('#mainNav').removeClass('show');
        // });

        //Slick Carousel
        // $('.tm-slideshow').slick({
        //     infinite: true,
        //     arrows: true,
        //     slidesToShow: 1,
        //     slidesToScroll: 1
        // });
        //loadGoogleMap();    
                                         // Google Map

        //animacion scroll
    $(".ancla").click(function(evento){
      //Anulamos la funcionalidad por defecto del evento
      evento.preventDefault();
      //Creamos el string del enlace ancla
      var codigo = "#" + $(this).data("ancla");
      //Funcionalidad de scroll lento para el enlace ancla en 2 segundos
      $("html,body").animate({scrollTop: $(codigo).offset().top}, 2000);
    });

        $('.tm-current-year').text(new Date().getFullYear());  // Update year in copyright
    });
