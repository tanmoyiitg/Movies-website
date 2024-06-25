
let toggleMenu = document.querySelector(".toggle");
toggleMenu.addEventListener("click", () => {
  console.log("clicked");
  let ul = document.querySelector(".bottomHeader");
  ul.classList.toggle("show");
  toggleMenu.classList.toggle("fa-xmark");
  ul.classList.add("bg");
});

let tv = document.getElementById("tv");
let i=1;
let api_key = '50e49373c2098323b103d3c5f02f42c8';
let url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${i}`;

let z=0;
fetchData();
let search = document.querySelector('#searchBtn');
search.addEventListener('click',search_movie);

let popular = document.querySelector('#popular');
popular.addEventListener('click',popular_data);

let showMore = document.querySelector('#showMore');
showMore.addEventListener('click',nextData);

let upcomingMovies = document.querySelector('#upcoming');
upcomingMovies.addEventListener('click',upcoming);

let newMovies = document.querySelector('#new');
newMovies.addEventListener('click',newmovies);

let tvShows = document.querySelector('#tv');
tvShows.addEventListener('click',tvshows);

function search_movie(){
  let query=document.querySelector('#query').value;
  console.log(query);
  z=-1;
  url="https://api.themoviedb.org/3/search/movie?api_key=50e49373c2098323b103d3c5f02f42c8&language=en-US&query="+query+"&page=1&include_adult=false";
  fetchData();
}

function nextData(){
  console.log('clicked');
  i++;
  z=0;
  url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${i}`;

  fetchData();
}


function upcoming(){
  console.log('clicked');
  i++;
  z=1;
  fetchData();
}

function newmovies(){
  console.log('clicked');
  i++;
  z=2;
  fetchData();
}

function tvshows(){
  console.log('clicked');
  i++;
  fetchDatatv();
}
function popular_data(){
  console.log('clicked');
  i++;
  z=3;
  fetchData();
}

function fetchData(){
  if(z===0){
    url=`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${i}`;
  } else if(z===1){
    url=`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=${i}`;
  } else if(z===2 || z===3){
    url=`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${i}`;
  }
    console.log(url);
    fetch(url)
    .then((response)=>{
        if(!response.ok){
            i++;
            const message = `A error occured ${response.status}`
            throw new Error(message);
            console.log(Error(message));
        }
        return response.json();
    })
    .then((movies)=>{
        let container = document.querySelector(".container");
      //console.log(url);
      console.log(movies);
      let myLen = movies.results.length;
      if(z===1 || z===2 || z===3 || z==-1){
        container.innerHTML=``;
      }
      if(z===3){
        i=1;
      }
      showMovies();

      function showMovies() {
        if(myLen===0){
          container.innerHTML=`<div class="moviesDetails">
          <div class="leftDetails">
            <h5>No Results Found</h5>
          </div>
        </div>
      </div>`
        }
        for (var j = 0; j < myLen; j++) {
          let movie = movies.results[j];
          container.innerHTML += `<div class="box">
      <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="poster" />
  <div class="moviesDetails">
    <div class="leftDetails">
      <h5>${movie.original_title}</h5>
      <p>${movie.release_date}</p>
    </div>
    <div class="rightDetails rating">${movie.vote_average}</div>
  </div>
</div>`;
        }
      }
    })
    .catch((error)=>{
        error.message;
        console.log(error);
    })
}

function fetchDatatv(){
  url=`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=${i}`;
  console.log(url);
  fetch(url)
  .then((response)=>{
      if(!response.ok){
          i++;
          const message = `A error occured ${response.status}`
          throw new Error(message);
          console.log(Error(message));
      }
      return response.json();
  })
  .then((tv)=>{
      let container = document.querySelector(".container");
    //console.log(url);
    console.log(tv);
    let myLen = tv.results.length;
    container.innerHTML = ``;
    showtv();
    function showtv() {
      for (var j = 0; j < myLen; j++) {
        let tvi = tv.results[j];
        container.innerHTML += `<div class="box">
    <img src="http://image.tmdb.org/t/p/w500/${tvi.poster_path}" alt="img" />
<div class="moviesDetails">
  <div class="leftDetails">
    <h5>${tvi.name}</h5>
    <p>${tvi.first_air_date}</p>
  </div>
  <div class="rightDetails rating">${tvi.vote_average}</div>
</div>
</div>`;
      }
    }
  })
  .catch((error)=>{
      error.message;
      console.log(error);
  })
}