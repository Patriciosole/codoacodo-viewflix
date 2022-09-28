jQuery('.mobile-btn').on('click', function () {
    jQuery(this).toggleClass('mobile-btn-open');
    jQuery('.menu-main').toggleClass('menu-main-open');
});

const apiToken = '05eee14b96efca359ec12cf22564da51';

// GET ASIDE
function getAside(){
    $('.aside-estrenos').load('aside.html');
    setTimeout(function(){
        getEstrenos();
    }, 100);

}

// GET API ESTRENOS DATA
function getEstrenos(){
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.themoviedb.org/3/trending/movie/week?api_key=" + apiToken)+ '&include_adult=false';
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let container = document.querySelector('.aside-estrenos .estrenos');
            let estrenoArticle = "";
            let estrenos = JSON.parse(request.response);
            //console.log(estrenos);
            for(let i = 0; i < 3; i++) {
                let resObj = estrenos.results[i];
                let movieTitle = resObj.title || resObj.name;
                estrenoArticle += '<article class="estreno">'+
                        '<p class="estreno-title"><a href="detail.html?movID='+ resObj.id +'" class="link">'+ movieTitle +'</a></p>' +
                        '<a href="detail.html?movID='+ resObj.id +'" class="link"><img src="https://image.tmdb.org/t/p/w500/'+ resObj.poster_path +'" alt="[movie title]" class="estreno-image"></a>' +
                        '<p><a href="detail.html?movID='+ resObj.id +'" class="link">'+ resObj.overview +'</a></p>' +
                    '</article>';
            }
            container.innerHTML = estrenoArticle;
        } else {
            console.error('error ${request.status} ${request.statusText}');
        }
    };
}

function getNetflix(){
    // GET API NETFLIX DATA
    let requestnetflix = new XMLHttpRequest();
    requestnetflix.open("GET", "https://api.themoviedb.org/4/list/8218196?page=1&api_key=" + apiToken)+ '&include_adult=false';
    requestnetflix.send();
    requestnetflix.onload = () => {
        if (requestnetflix.status === 200) {
            let container = document.querySelector('.catalogue-content--netflix');
            let netflixItem = "";
            let netflixItems = JSON.parse(requestnetflix.response);
            for(let i = 0; i < netflixItems.results.length; i++) {
                let resObj = netflixItems.results[i];
                let movieTitle = resObj.title || resObj.name;
                netflixItem += '<div class="catalogue-item">'+
                                    '<a href="detail.html?movID='+ resObj.id +'" class="catalogue-image-link">'+
                                        '<img src="https://image.tmdb.org/t/p/w500/' + resObj.poster_path + '" alt="' + movieTitle + '" class="catalogue-image" />'+
                                    '</a>'+
                                    '<p><a href="detail.html" class="link">'+ movieTitle +'</a></p>'+
                                '</div>';
            }
            container.innerHTML = netflixItem;
            $(".scroll").getNiceScroll().resize();
        } else {
            console.error('error ${requestnetflix.status} ${requestnetflix.statusText}');
        }
    };
}

function getHulu(){
    // GET API HULU DATA
    let requestHulu = new XMLHttpRequest();
    requestHulu.open("GET", "https://api.themoviedb.org/4/list/8218197?page=1&api_key=" + apiToken)+ '&include_adult=false';
    requestHulu.send();
    requestHulu.onload = () => {
        if (requestHulu.status === 200) {
            let container = document.querySelector('.catalogue-content--hulu');
            let huluItem = "";
            let huluItems = JSON.parse(requestHulu.response);
            for(let i = 0; i < huluItems.results.length; i++) {
                let resObj = huluItems.results[i];
                let movieTitle = resObj.title || resObj.name;
                huluItem += '<div class="catalogue-item">'+
                                '<a href="detail.html?tvID='+ resObj.id +'" class="catalogue-image-link">'+
                                    '<img src="https://image.tmdb.org/t/p/w500/' + resObj.poster_path +'" alt="'+ movieTitle +'" class="catalogue-image" />'+
                                '</a>'+
                                '<p><a href="detail.html?tvID='+ resObj.id +'" class="link">'+ movieTitle +'</a></p>'+
                            '</div>';
            }
            container.innerHTML = huluItem;
            $(".scroll").getNiceScroll().resize();
        } else {
            console.error('error ${requestHulu.status} ${requestHulu.statusText}');
        }
    };
}

function getHBO(){
    // GET API HBO MAX DATA
    let requestHBO = new XMLHttpRequest();
    requestHBO.open("GET", "https://api.themoviedb.org/4/list/8218198?page=1&api_key=" + apiToken)+ '&include_adult=false';
    requestHBO.send();
    requestHBO.onload = () => {
        if (requestHBO.status === 200) {
            let container = document.querySelector('.catalogue-content--hbo');
            let hboItem = "";
            let hboItems = JSON.parse(requestHBO.response);
            for(let i = 0; i < hboItems.results.length; i++) {
                let resObj = hboItems.results[i];
                let movieTitle = resObj.title || resObj.name;
                hboItem += '<div class="catalogue-item">'+
                                '<a href="detail.html?tvID='+ resObj.id +'" class="catalogue-image-link">'+
                                    '<img src="https://image.tmdb.org/t/p/w500/'+ resObj.poster_path +'" alt="'+ movieTitle +'" class="catalogue-image" />'+
                                '</a>'+
                                '<p><a href="detail.html?tvID='+ resObj.id +'" class="link">'+ movieTitle +'</a></p>'+
                            '</div>';
            }
            container.innerHTML = hboItem;
            $(".scroll").getNiceScroll().resize();
        } else {
            console.error('error ${requestHBO.status} ${requestHBO.statusText}');
        }
    };
}


function getMovieDetail(){
    // GET SPECIFIC MOVIE
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movID = urlParams.get('movID');
    const tvID = urlParams.get('tvID');
    let movieMode;
    if (movID) {
        movieMode = true;
    } else if (tvID) {
        movieMode = false;
    }

    let requestMovie = new XMLHttpRequest();
    if(movieMode) {
        requestMovie.open("GET", "https://api.themoviedb.org/3/movie/" + movID + "?api_key=" + apiToken) + '&include_adult=false';
    } else {
        requestMovie.open("GET", "https://api.themoviedb.org/3/tv/" + tvID + "?api_key=" + apiToken) + '&include_adult=false';
    }
    requestMovie.send();
    requestMovie.onload = () => {
        if (requestMovie.status === 200) {
            let movies = JSON.parse(requestMovie.response);
            let movieTitle = movies.original_title || movies.name;
            let genreItem = "";
            document.getElementsByClassName("movie-detail__title")[0].innerHTML  = movieTitle;
            if(movieMode) {
                let date = new Date(movies.release_date).toLocaleDateString('es-AR');
                document.getElementsByClassName("movie-detail__specifics")[0].innerHTML  = '<span>' + date + '</span> <span>HD</span>';
            } else {
                let date = new Date(movies.first_air_date).toLocaleDateString('es-AR');
                document.getElementsByClassName("movie-detail__specifics")[0].innerHTML  = '<span>' + date + '</span> <span>HD</span> <span>' + movies.number_of_seasons +' Temporadas</span>';
            }

            for(let i = 0; i < movies.genres.length; i++) {
                let resObj = movies.genres[i];
                genreItem += resObj.name;
                if(i < (movies.genres.length - 1)){
                    genreItem += ', ';
                };
             }

            document.getElementsByClassName("movie-detail__genres")[0].innerHTML = genreItem;

            document.getElementsByClassName("movie-detail__description")[0].innerHTML = movies.overview;
            document.getElementsByClassName("movie-detail__image")[0].src='https://image.tmdb.org/t/p/w500/' + movies.poster_path;

            // GET CAST
            let requestcredits = new XMLHttpRequest();
            if(movieMode) {
                requestcredits.open("GET", "https://api.themoviedb.org/3/movie/" + movID + "/credits?api_key=" + apiToken) + '&include_adult=false';
            } else {
                requestcredits.open("GET", "https://api.themoviedb.org/3/tv/" + tvID + "/credits?api_key=" + apiToken) + '&include_adult=false';
            }
            requestcredits.send();
            requestcredits.onload = () => {
                if (requestcredits.status === 200) {
                    let credits = JSON.parse(requestcredits.response);
                    let castingItem = "";
                    for(let i = 0; i < 4; i++) {
                        let resObj = credits.cast[i];
                        castingItem += resObj.name +' ('+ resObj.character + ')';
                        if(i!=3){
                            castingItem += ', ';
                        };
                     }
                     document.getElementsByClassName("movie-detail__casting")[0].innerHTML  = 'Casting: ' + castingItem;
                } else {
                    console.error('error ${requestcredits.status} ${requestcredits.statusText}');
                }
            };

            // GET SIMILAR MOVIES
            let requestsimilar = new XMLHttpRequest();
            if(movieMode) {
                requestsimilar.open("GET", "https://api.themoviedb.org/3/movie/" + movID + "/similar?api_key=" + apiToken) + '&include_adult=false';
            } else {
                requestsimilar.open("GET", "https://api.themoviedb.org/3/tv/" + tvID + "/similar?api_key=" + apiToken) + '&include_adult=false';
            }
            requestsimilar.send();
            requestsimilar.onload = () => {
                if (requestsimilar.status === 200) {
                    let container = document.querySelector('.catalogue-content--similares');
                    let similarItem = "";
                    let similarItems = JSON.parse(requestsimilar.response);
                    for(let i = 0; i < 8; i++) {
                        let resObj = similarItems.results[i];
                        let movieTitle = resObj.title || resObj.name;
                        similarItem += '<div class="catalogue-item">'+
                                        '<a href="detail.html?movID='+ resObj.id +'" class="catalogue-image-link">'+
                                            '<img src="https://image.tmdb.org/t/p/w500/'+ resObj.poster_path +'" alt="'+ movieTitle +'" class="catalogue-image" />'+
                                        '</a>'+
                                        '<p><a href="detail.html" class="link">'+ movieTitle +'</a></p>'+
                                    '</div>';
                    }
                    container.innerHTML = similarItem;
                    $(".scroll").getNiceScroll().resize();
                } else {
                    console.error('error ${requestsimilar.status} ${requestsimilar.statusText}');
                }
            };

        } else {
            console.error('error ${requestMovie.status} ${requestMovie.statusText}');
        }
    };
}


//  Nice Scroll init
function getScroll() {
    $(".scroll").niceScroll({
        cursorcolor: "#ffffff", // change cursor color in hex
        cursorborder: "1px solid #fff", // css definition for cursor border
        cursoropacitymax: .5,
        autohidemode: true,
    });
};


// Validate FORM in case HTML5 doesnt work
function validateForm() {
    //Nombre
    if( document.contactForm.nombre.value == "" ) {
       alert( "Por favor, complete su nombre." );
       document.contactForm.nombre.focus() ;
       return false;
    }
    //EMail
    if( document.contactForm.email.value == "" ) {
       alert( "Por favor, complete su email." );
       document.contactForm.email.focus() ;
       return false;
    }

    var emailID = document.contactForm.email.value;
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");

    if (atpos < 1 || ( dotpos - atpos < 2 )) {
       alert("Por favor, ingrese un email correcto")
       document.contactForm.email.focus() ;
       return false;
    }

    // Mensaje
    if( document.contactForm.mensaje.value == "" ) {
       alert( "Por favor, escriba un mensaje." );
       document.contactForm.mensaje.focus() ;
       return false;
    }
    //return( true );
    // document.getElementsByClassName("success-message")[0].classList.add('success-message--active');
    // document.contactForm.nombre.value = "";
    // document.contactForm.email.value = "";
    // document.contactForm.mensaje.value = "";
    // return true;

    // SEND MESSAGE
    var form = document.getElementById("contact-form");

    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementsByClassName("success-message")[0];
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.classList.add('success-message--active');
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)
 }

 // HEART BUTTON
 var heartBtn = document.getElementsByClassName('fa-heart')[0];

 //heartBtn.style.cursor = 'pointer';
 heartBtn.onclick = function() {
    heartBtn.classList.toggle('fa-solid');
};