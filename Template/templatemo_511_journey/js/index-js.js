    /* Google Maps
    ------------------------------------------------*/
    var map = '';
    var center;

    function initialize() {
        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(37.769725, -122.462154),
            scrollwheel: false
        };

        map = new google.maps.Map(document.getElementById('google-map'),  mapOptions);

        google.maps.event.addDomListener(map, 'idle', function() {
          calculateCenter();
      });

        google.maps.event.addDomListener(window, 'resize', function() {
          map.setCenter(center);
      });
    }

    function calculateCenter() {
        center = map.getCenter();
    }

    function loadGoogleMap(){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDVWt4rJfibfsEDvcuaChUaZRS5NXey1Cs&v=3.exp&sensor=false&' + 'callback=initialize';
        document.body.appendChild(script);
    }

    /* DOM is ready
    ------------------------------------------------*/
    $(function(){

        // Change top navbar on scroll
        $(window).on("scroll", function() {
            if($(window).scrollTop() > 100) {
                $(".tm-top-bar").addClass("active");
            } else {
             $(".tm-top-bar").removeClass("active");
            }
        });

        // Smooth scroll to search form
        $('.tm-down-arrow-link').click(function(){
            $.scrollTo('#tm-section-search', 300, {easing:'linear'});
        });

        // Date Picker in Search form
        var pickerCheckIn = datepicker('#inputCheckIn');
        var pickerCheckOut = datepicker('#inputCheckOut');

        // Update nav links on scroll
        $('#tm-top-bar').singlePageNav({
            currentClass:'active',
            offset: 60
        });

        // Close navbar after clicked
        $('.nav-link').click(function(){
            $('#mainNav').removeClass('show');
        });

        // Slick Carousel
        $('.tm-slideshow').slick({
            infinite: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });

        loadGoogleMap();                                       // Google Map
        $('.tm-current-year').text(new Date().getFullYear());  // Update year in copyright
    });
