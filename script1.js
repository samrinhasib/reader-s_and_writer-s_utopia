'use strict';


//Study section
//This function defines what happens when the user clicks the study button in the navigation bar.
function studySection(){
  $('#study').on(`click keypress`, function(event){
    event.preventDefault();
    $('#container3').removeClass('uptick');
    $('.nytimes').addClass('wpstuff');
    $('.homepage').addClass('wpstuff');
    $('.peers').addClass('wpstuff');
    $('.getTextbooks').removeClass('wpstuff');
    $('.promotepeers').empty();
  })
}

//This function fetches a textbook by the name of the book and/or the name of the author from Google Books.
function getTextbook(){
  $("#preview").on(`click keypress`, function(event){
  const textURL = `https://www.googleapis.com/books/v1/volumes?id=63858393839-miumggrkjkjjrsie880suo12q4iq0sl2.apps.googleusercontent.com`

  let theBook = {
    q: String(document.getElementById(`textname`).value),
    inauthor:String(document.getElementById(`bookauthor`).value)
  }
  
  function mappingBooks(tan){
    let parameters = Object.keys(tan);
    let inputFromUser = Object.values(tan);
    let completeURL = '';
    if (inputFromUser[0].length==0){
      alert("You must enter the name")
    }
    else if (inputFromUser[1].length<=1){
      completeURL = completeURL+`${parameters[0]}=${encodeURIComponent(inputFromUser[0])  }`;
      }
      else{
        completeURL = completeURL+`${parameters[0]}=${encodeURIComponent(inputFromUser[0])}+${parameters[1]}=${encodeURIComponent(inputFromUser[1])}`
        }
        
        return completeURL;
        }
        
        
        function findTextorPreview(){
          const searchURL = `${textURL}&${mappingBooks(theBook)}`;
          console.log(searchURL);
          fetch (searchURL)
          .then(response=> response.json())
          .then(responseJson => showUserRequest(responseJson));
          }
          
          function showUserRequest(responseJson){
            $(`.promotepeers`).empty();
            const totalResults = Number(responseJson.totalItems);
            $('#container3').addClass('uptick');
            if (totalResults>=5){
              for (let i=0; i<5; i++){
                $('.promotepeers').append(`
                <h1>${i+1}: ${responseJson.items[i].volumeInfo.title}</h1>
                <img src = "${responseJson.items[i].volumeInfo.imageLinks.thumbnail}"" alt = 'book image' class = "googleImages">
                <p><span><b>Author: </b></span>${responseJson.items[i].volumeInfo.authors}</p>
                <p><span><b>Publisher:</b></span>  ${responseJson.items[i].volumeInfo.publisher}</p>
                <p><span><b>Published Date:</b></span> ${responseJson.items[i].volumeInfo.publishedDate}</p>
                <p><span><b>Description:</b></span> ${responseJson.items[i].volumeInfo.description}</p>
                <p><span><b>Check it out:</b></span> <a href = "${responseJson.items[i].volumeInfo.previewLink}" target = "_blank">Preview it here</a></p>
                <p><span><b>Purchasing Options:</b></span> ${responseJson.items[i].saleInfo.saleability}</p>`)
                }
                }else {
                  for (let i=0; i<totalResults; i++){
                    $('.promotepeers').append(`
                    <h1>Title: ${responseJson.items[i].volumeInfo.title}</h1>
                    <p><span><b>Author:</b></span> ${responseJson.items[i].volumeInfo.authors}</p>
                    <p><span><b>Publisher: </b></span> ${responseJson.items[i].volumeInfo.publisher}</p>
                    <p><span><b>Published Date:</b></span> ${responseJson.items[i].volumeInfo.publishedDate}</p>
                    <p>Description: ${responseJson.items[i].volumeInfo.description}</h5>
                    <p><span><b>Check it out:</b></span> <a href = "${responseJson.items[i].volumeInfo.previewLink}" target = "_blank">Preview it here:</a></p>
                    <p><span><b>Purchasing Options:</b></span> ${responseJson.items[i].saleInfo.saleability}</p>`)
                    }}}
                    
                    $(findTextorPreview());
                    
                    })
}


//Help Peers Out section
//This function defines what happens when the reader clicks the "Help Peers Out" button in the navigation bar.
function helpPeersOutSection(){
$('#peers').on('click keypress', function(event){
  event.preventDefault();
  $('.nytimes').addClass('wpstuff');
  $('.homepage').addClass('wpstuff');
  $('.peers').removeClass('wpstuff');
  $('.getTextbooks').addClass('wpstuff');
  $('.promotepeers').empty();
  $('#container3').removeClass('uptick');
})}

//This function allows readers to search using a single tag and retrieve five articles from WordPress containing that tag.
function helpPeersOut() {

$('#searchit').on('click keypress', function(event){
  $(`.promotepeers`).empty();
  const tag = document.getElementById("keyword").value;
  console.log(tag);
  const url = `https://public-api.wordpress.com/rest/v1.1/read/tags/${tag}/posts?number=5&pretty=true`;
  console.log(url);
  function getWork(){
    fetch(url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Enter one word!"));
  }

  function displayResults(responseJson){
    console.log(responseJson);
    const j = responseJson.posts.length;
    console.log(j);
    if (j==0){
      alert (`No results found`);
    }
    else if (j>=5){
      for (let i=0; i<5; i++){
        $('.promotepeers').append(`
        <h3>${i+1}: ${responseJson.posts[i].title}</h3>
        <p><b>Author</b>: ${responseJson.posts[i].author.name}</p>
        <p><b>Excerpt</b>: ${responseJson.posts[i].excerpt}</p>
        <p><a href = "${responseJson.posts[i].URL}" target = "_blank">Check out the article!</a></p>`)}
        $('#container3').addClass('uptick');
        } else{
            for (let i=0; i<j; i++){
              $('.promotepeers').append(`
              <h3>${i+1}: ${responseJson.posts[i].title}</h3>
              <p><b>Author</b>: ${responseJson.posts[i].author.name}</p>
              <p><b>Excerpt</b>: ${responseJson.posts[i].excerpt}</p>
              <p><a href = "${responseJson.posts[i].URL}" target = "_blank">Check out the article!</a></p>
              `)
            }
            $('#container3').addClass('uptick')
            }}
            
            $(getWork);
            })}


function makeCapstoneWork(){
  helpPeersOutSection();
  helpPeersOut();
  readSection();
  populateList();
  populateBooks();
  bookReviews();
  studySection();
  getTextbook();
  homePageSection();
  };

$(makeCapstoneWork())