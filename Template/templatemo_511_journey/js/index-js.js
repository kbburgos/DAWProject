
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

                                         // Google Map
        $('.tm-current-year').text(new Date().getFullYear());  // Update year in copyright
    });
