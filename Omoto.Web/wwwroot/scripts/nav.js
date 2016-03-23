var nav = {
    init: function () {
        $('.mobile-nav ul').html($('nav .navbar-nav').html());
        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('span') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        })
        $('.navbar-toggle').on('click', function (e) {
            $('.mobile-nav').addClass('active');
        });
        $('.mobile-nav ul').html($('nav .navbar-nav').html());
        $('.mobile-nav ul li').on('click', function (e) { $('.mobile-nav').removeClass('active'); });
        $('body').on('click', '.mobile-nav a.close-link', function (event) {
            $('.mobile-nav').removeClass('active');
            event.preventDefault();
        });
    }
}
