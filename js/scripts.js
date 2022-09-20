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

// GET API ESTRENOS DATA
let request = new XMLHttpRequest();
const apiToken = '05eee14b96efca359ec12cf22564da51';
request.open("GET", "https://api.themoviedb.org/3/trending/all/week?api_key=" + apiToken);
request.send();
request.onload = () => {
    if (request.status === 200) {
        let container = document.querySelector('.aside-estrenos .estrenos');
        let estrenoArticle = "";
        console.info(JSON.parse(request.response));
        let estrenos = JSON.parse(request.response);
        for(let i = 0; i < 4; i++) {
            let resObj = estrenos.results[i];
            let movieTitle = resObj.title || resObj.name;
            estrenoArticle += '<article class="estreno">'+
                    '<p class="estreno-title"><a href="detail.html" class="link">'+ movieTitle +'</a></p>' +
                    '<a href="detail.html" class="link"><img src="https://image.tmdb.org/t/p/w500/'+ resObj.poster_path +'" alt="[movie title]" class="estreno-image"></a>' +
                    '<p><a href="detail.html" class="link">'+ resObj.overview +'</a></p>' +
                '</article>';
        }
        container.innerHTML = estrenoArticle;
    } else {
        console.error('error ${request.status} ${request.statusText}');
    }
};