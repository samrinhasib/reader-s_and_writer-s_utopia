'use strict';

//Read Section from the New York Times API

//This function adds the 55 categories the user can select from to look up bestsellers.
function populateList() {

  function getNYTlists() {
    fetch(`https://api.nytimes.com/svc/books/v3/lists/names?api-key=r25rkPiNJphGIYapIY8eLU3XiOb3dZGE`)
      .then(response => response.json())
      .then(responseJson => displayNYTResults(responseJson));
  }

  function displayNYTResults(responseJson) {
    for (let i = 0; i < 55; i++) {
      $('#typeofbook').append(`
        <option id = "${responseJson.results[i].list_name_encoded}" class = "${responseJson.results[i].display_name}">${responseJson.results[i].display_name}</option>`
      )
    }
  }

  $(getNYTlists());
}


//This function defines what happens when the user clicks the Read Button in the navigation bar.
function readSection() {
  $('#read').on(`click keypress`, function (event) {
    event.preventDefault();
    $('#container3').removeClass('uptick');
    $('.nytimes').removeClass('wpstuff');
    $('.homepage').addClass('wpstuff');
    $('.peers').addClass('wpstuff');
    $('.getTextbooks').addClass('wpstuff');
    $('.promotepeers').empty();
  })
}

//This function fetches the ten books from the appropriate bestsellers' list from the New York Times according to the user's request.
function populateBooks() {

  $("#nyt").on(`click keypress`, function (event) {
    event.preventDefault();
    const genre = document.getElementById("typeofbook").value;
    const findlist = document.getElementsByClassName(genre)[0].id;

    const nytURL = `https://api.nytimes.com/svc/books/v3/lists/current/${findlist}.json?api-key=r25rkPiNJphGIYapIY8eLU3XiOb3dZGE&offset=(0,20)`;

    function getNYTGenreList() {
      fetch(nytURL)
        .then(response => response.json())
        .then(responseJson => displayNYTResultsToUser(responseJson));
    }

    function displayNYTResultsToUser(responseJson) {
      let total = Number(`${responseJson.num_results}`);
      $('.promotepeers').empty();
      $('#container3').addClass('uptick');
      if (total >= 10) {
        for (let i = 0; i < 10; i++) {

          $('.promotepeers').append(`
            <h2 class = "titlesNYT">${responseJson.results.books[i].rank}: ${responseJson.results.books[i].title}</h2>
            <img src = "${decodeURI(responseJson.results.books[i].book_image)}" alt = "image of book" class = "nytBookImages">
            <h3 class = "titlesNYT">Author: ${responseJson.results.books[i].author}</h3>
            <p class = "titlesNYT"><b>Preview:</b> ${responseJson.results.books[i].description}</p>
            <p class = "titlesNYT"><a href = '${responseJson.results.books[i].buy_links[0].url}' target = "_blank">Check it out!</a></p>
            `);
        }
      } else {
        for (let i = 0; i < total; i++) {
          $('.promotepeers').append(`
                <h2 class = "titlesNYT">${responseJson.results.books[i].rank}: ${responseJson.results.books[i].title}</h2>
                <img src = "${decodeURI(responseJson.results.books[i].book_image)}" alt = "image of book" class = "nytBookImages">
                <h3 class = "titlesNYT">Author: ${responseJson.results.books[i].author}</h3>
                <p class = "titlesNYT"><b>Preview:</b> ${responseJson.results.books[i].description}</p>
                <p class = "titlesNYT"><a href = '${responseJson.results.books[i].buy_links[0].url}' target = "_blank">Check it out!</a></p>
                `);
        }
      }
    }

    $(getNYTGenreList());

  }
  )
}

//This function looks for book reviews according to title from the New York Times; highly popular books can be found easily.
function bookReviews() {
  $('#findreview').on(`click keypress`, function (event) {
    event.preventDefault();
    $('.promotepeers').empty();
    function getNYTReviews() {
      const bookForReview = document.getElementById('bookreview').value;
      const bookAPI = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${bookForReview}&api-key=r25rkPiNJphGIYapIY8eLU3XiOb3dZGE`;
      fetch(bookAPI)
        .then(response => response.json())
        .then(responseJson => displayNYTReviews(responseJson));
    }

    function displayNYTReviews(responseJson) {
      $(`.promotepeers`).empty();
      let m = Number(responseJson.num_results);
      if (m > 0) {
        let r = (document.getElementById('bookreview').value).toUpperCase();
        $('#container3').addClass('uptick');
        for (let i = 0; i < m; i++) {
          $('.promotepeers').append(`
            <h1>${i + 1}:${responseJson.results[i].book_title}</h1>
            <p><b>Author:</b> ${responseJson.results[i].book_author}</p>
            <p><b>See Review Here:</b> <a href = "${responseJson.results[i].url}" target = "_blank"> ${r} </a></p>`
          )
        }
      } else {
        $('#container3').removeClass('uptick');
        alert(`Sorry: no reviews available for this book`);
      }
    }

    $(getNYTReviews());

  })
}

//Home Page
//This function defines what happens if the user clicks the home button on the navigation bar.
function homePageSection() {
  $("#home").on(`click keypress`, function (event) {
    event.preventDefault();
    $('#container3').removeClass('uptick');
    $('.nytimes').addClass('wpstuff');
    $('.homepage').removeClass('wpstuff');
    $('.peers').addClass('wpstuff');
    $('.getTextbooks').addClass('wpstuff');
    $('.promotepeers').empty();

  })
}


