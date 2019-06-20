
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




        // Slick Carousel
        $('.tm-slideshow').slick({
            infinite: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });

                                         // Google Map
        $('.tm-current-year').text(new Date().getFullYear());  // Update year in copyright
    });
