// Step 2: The search words page
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const historyBtn = document.getElementById('historyBtn');
const historyPage = document.getElementById('historyPage');
const historyContainer = document.getElementById('historyContainer');

// Event listeners
searchBtn.addEventListener('click', searchWord);
historyBtn.addEventListener('click', showHistoryPage);

// Initialize search history from localStorage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Function to handle word search
function searchWord() {
  const word = searchInput.value.trim();
  if (word !== '') {
    fetchMeaning(word)
      .then((meaning) => {
        createWordCard(word, meaning);
        addToSearchHistory(word, meaning);
        searchInput.value = '';
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
}

// Function to fetch word meaning from the API
function fetchMeaning(word) {
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0 && data[0].meanings && data[0].meanings.length > 0) {
        return data[0].meanings[0].definitions[0].definition;
      }
      throw new Error('Word not found');
    });
}

// Function to create a word card
function createWordCard(word, meaning) {
  const wordCard = document.createElement('div');
  wordCard.classList.add('wordCard');
  wordCard.innerHTML = `
    <p><strong>${word}</strong></p>
    <p>${meaning}</p>
    <button class="deleteBtn" data-word="${word}">Delete</button>
  `;
  document.getElementById('searchPage').appendChild(wordCard);

  // Add event listener for delete button
  const deleteBtn = wordCard.querySelector('.deleteBtn');
  deleteBtn.addEventListener('click', deleteWordCard);
}

// Function to handle word card deletion
function deleteWordCard(event) {
  const word = event.target.dataset.word;
  const wordCard = event.target.parentElement;
  wordCard.remove();
  removeFromSearchHistory(word);
}

// Function to add word to search history
function addToSearchHistory(word, meaning) {
  const wordObject = { word, meaning };
  searchHistory.push(wordObject);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Function to remove word from search history
function removeFromSearchHistory(word) {
  searchHistory = searchHistory.filter((item) => item.word !== word);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Step 3: The history page
function showHistoryPage() {
  document.getElementById('searchPage').style.display = 'none';
  document.getElementById('historyPage').style.display = 'flex';
  displaySearchHistory();
}

// Function to display search history
function displaySearchHistory() {
  historyContainer.innerHTML = '';
  for (const wordObject of searchHistory) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('wordCard');
    wordCard.innerHTML = `
      <p><strong>${wordObject.word}</strong></p>
      <p>${wordObject.meaning}</p>
      <button class="deleteBtn" data-word="${wordObject.word}">Delete</button>
    `;
    historyContainer.appendChild(wordCard);

    // Add event listener for delete button
    const deleteBtn = wordCard.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', deleteWordCard);
  }
}

// Initialize the search history on page load
displaySearchHistory();
