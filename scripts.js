// cache DOM Elements
const btn = document.getElementById('search-button');
const input = document.getElementById('search-input');
const articleContainer = document.getElementById('articles-container');
const scrollbtn = document.getElementById('scrollTopBtn');

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let articlesArray = [];

// News API Key
const apiKey = '9c050c13b95741fdb3321c206ab04925';
let apiUrl = '';


// Fetch article data from News API
async function getArticles() {
    try {
        const response = await fetch(apiUrl);
        articlesArray = await response.json();
        displayArticles();

    } catch (error) {
        // do something with error here
    }
}

// Create and Display Article Element inside Articles Container
function displayArticles() {
    // Run Function for each object in Articles Array
    articlesArray.articles.forEach((article)=> {
        // Create article Div 
        const container = document.createElement('div');
        container.classList.add('article-container');
        // Create Title Element
        const title = document.createElement('h2');
        title.textContent = article.title;
        // Create Img Element
        const img = document.createElement('img');
        img.setAttribute('src', article.urlToImage)
        // Create P Element
        const content = document.createElement('p');
        content.textContent = article.content;
        //Create Anchor Element
        const link = document.createElement('a');
        link.setAttribute('href', article.url);
        link.setAttribute('target', '_blank');
        link.textContent = "Read More";
        // Add the Elements inside container Element
        articleContainer.appendChild(container);
        container.appendChild(title);
        container.appendChild(img);
        container.appendChild(content);
        container.appendChild(link);

    })
}


// Add Click Event Listener to search button
btn.addEventListener('click', ()=> {
// check valid input after user searches and sets the query par
    if(input.value !== ''){
        apiUrl = `https://newsapi.org/v2/everything?q=${input.value}&from=${year}-${month}-${day}&sortBy=popularity&apiKey=${apiKey}`;
        // Get articles and display them.
        getArticles();
    }

// Clear Input Field after search
    input.value = ""
})


// Add Return Keypress Event Listener to search button
input.addEventListener('keypress', (event) => {
    // check valid input after user searches and sets the query par
        if(input.value !== '' && event.keyCode === 13){
            apiUrl = `https://newsapi.org/v2/everything?q=${input.value}&from=${year}-${month}-${day}&sortBy=popularity&apiKey=${apiKey}`;
            // Get articles and display them.
            getArticles();
            input.value = ""
        }
    })

// Add Event Listener for scroll button
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollbtn.style.display = "block";
  } else {
    scrollbtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
scrollbtn.addEventListener('click', ()=> {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}) 
  