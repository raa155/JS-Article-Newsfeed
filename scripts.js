// cache DOM Elements
const btn = document.getElementById('search-button');
const input = document.getElementById('search-input');
const articleContainer = document.getElementById('articles-container');


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
        // Create Title Element
        const title = document.createElement('h2');
        title.textContent = article.title;
        // Create Img Element
        const img = document.createElement('img');
        img.setAttribute('src', article.urlToImage)
        // Create P Element
        const content = document.createElement('p');
        content.textContent = article.content;
        // Add the Elements inside container Element
        articleContainer.appendChild(container);
        container.appendChild(title);
        container.appendChild(img);
        container.appendChild(content);

    })
}


// Add Event Listener to search button
btn.addEventListener('click', ()=> {
// check valid input after user searches and sets the query par
    if(input.value !== ''){
        apiUrl = `https://newsapi.org/v2/everything?q=${input.value}&from=${year}-${month}-${day}&sortBy=popularity&apiKey=${apiKey}`;
    }
// Get articles and display them.
    getArticles();

// Clear Input Field after search
    input.value = ""
})