jQuery('.mobile-btn').on('click', function () {
    jQuery(this).toggleClass('mobile-btn-open');
    jQuery('.menu-main').toggleClass('menu-main-open');
});

//  Nice Scroll init
$(function() {
    $(".scroll").niceScroll({
        cursorcolor: "#ffffff", // change cursor color in hex
        cursorborder: "1px solid #fff", // css definition for cursor border
        cursoropacitymax: .5,
        autohidemode: true,
    });
});