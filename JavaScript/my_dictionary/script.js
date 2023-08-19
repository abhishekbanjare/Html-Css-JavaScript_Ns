// Step 2: The search words page
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const historyBtn = document.getElementById("historyBtn");
const historyPage = document.getElementById("historyPage");
const historyContainer = document.getElementById("historyContainer");

//Event listeners
searchBtn.addEventListener('click', searchWord);
historyBtn.addEventListener('click', showHistoryPage);

//Initialize search history from localStorage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

//Function to handle word search
function searchWord(){
    const word = searchInput.value.trim();
    if(word !==""){
        fetchMeaning(word).then((meaning) =>{
            createWordCard(word, meaning);
            addToSearchHistory(word, meaning);
            searchInput.value ="";
        })
        .catch((error) =>{
            console.log('Error:', error);
        });
    }
}

//Function to fetch word meaning from the API
function fetchMeaning(word){
    return fetch('https://api.dictionaryapi.dev/api/v2/entries/en/${word}')
       .then((response) => response.json())
       .then((data)=>{
            if(data && data.length > 0 && data[0].meanings.lenth > 0){
                return data[0].meanings[0].definitions[0].definition;
            }
        throw new Error("Word not found");
       });
}

//Function to create a word card 
function createWordCard(word, meaning){
    const wordCard = document.createElement('div');
    wordCard.classList.add('wordCard');
    wordCard.innerHTML = `
                          <p><strong>${word}</strong></p>
                          <p>${meaning}</p>
                          <button class="deleteBtn" data-word="${word}">Delete</button>`;
                          document.getElementById('searchPage').appendChild(wordCard);

                          //Add event listener for delete button
                          const deleteBtn = wordCard.querySelector('.deleteBtn');
                          deleteBtn.addEventListener('click', deleteWordCard);
}

//Function to handle word card deletion
