const randomBtn = document.getElementById('random-btn');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const cocktailContainer = document.getElementById('cocktail-container');

const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

const generateCocktail = () => {
  fetch(`${apiUrl}/random.php`)
    .then(response => response.json())
    .then(data => {
      const cocktail = data.drinks[0];
      renderCocktail(cocktail);
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while generating the cocktail recipe. Please try again later.');
    });
};

const searchCocktail = () => {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    alert('Please enter a search term.');
    return;
  }
  fetch(`${apiUrl}/search.php?s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      if (data.drinks) {
        const cocktail = data.drinks[0];
        renderCocktail(cocktail);
      } else {
        alert('No cocktails found. Please try a different search term.');
      }
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while searching for the cocktail recipe. Please try again later.');
    });
};

const renderCocktail = cocktail => {
  cocktailContainer.innerHTML = `
    <div style="text-align: center">
      <h2 style="margin-bottom: 20px;">${cocktail.strDrink}</h2>
      <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" style="max-width: 60%;">
    </div>
    <div>
      <p style=" width: 70%; margin-top: 10px; margin-bottom: 5px; font-size: 1.7rem;"><strong>Ingredients:</strong></p>
      <ul style="font-size: 1.5rem;">
        ${Object.keys(cocktail)
          .filter(key => key.startsWith('strIngredient') && cocktail[key])
          .map(key => `<li>${cocktail[key]}</li>`)
          .join('')
        }
      </ul>
      <p style="width: 70%; margin-top: 10px; margin-bottom: 5px; font-size: 1.7rem;"><strong>Instructions:<br></strong> ${cocktail.strInstructions}</p>
    </div>
  `;
};

randomBtn.addEventListener('click', generateCocktail);
searchBtn.addEventListener('click', searchCocktail);