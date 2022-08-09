
/*--arrays of citations and authors-----*/
var cite = ['“I drink to make other people more interesting”', '“I cook with wine, sometimes I even add '+'<br>'+' it to the food”', '“I’m on a whisky diet. I’ve lost three '+'<br>'+' days already”', '“Candy is dandy, but liquor is quicker”', '“Alcohol may be man’s worst enemy,'+'<br>'+' but the bible says love your enemy”']
var aut = ['- Ernest Hemingway', '- W.C. Fields', '- Tommy Cooper', '- Ogden Nash', '- Frank Sinatra']
var counter = 0;
/*-------------------------------------*/

/*---styling of citations--------------*/
document.getElementById("citation").style.font = "2.5em times new roman, serif";
document.getElementById("author").style.fontSize = "2em";
document.getElementById("citation").style.padding = "60px 0px 0px 0px";
/*-------------------------------------*/

/*--function for changing citations every 5sec, looped--*/
 (function text() {
    document.getElementById("citation").innerHTML = cite[counter];
    document.getElementById("author").innerHTML = aut[counter];
      if (counter == 4) { counter = 0; }
        counter += 1;
        setTimeout(text, 5000);
    })();
/*------------------------------------------------------------------*/

/*---function for 'main' button for scrolling to the top-----------*/
async function scroll_to_top() {
  document.getElementById("citation").scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }

var button_main = document.getElementById("main");
button_main.addEventListener("click", scroll_to_top);
/*------------------------------------------------------------------*/

/*---search input aggregating--------------------------------------*/
const searchInput = document.getElementById("search_area");
let search_string = "";
searchInput.addEventListener('keyup', e => { search_string = e.target.value; });
/*-----------------------------------------------------------------*/

/*---variables for the rest of buttons---------------*/
var button_rand = document.getElementById("random");
var button_search = document.getElementById("search");
/*---------------------------------------------------*/

/*----function for button 'random' and 'search' for scrolling down to container---*/
async function scroll_to_bottom() { document.getElementById("container").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); }
button_rand.addEventListener("click", scroll_to_bottom);
button_search.addEventListener("click", scroll_to_bottom);

/*----functions for setting right url depending on 'random' or 'search'-- */
let url = "";
function random_clicked() {url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';};
function search_clicked() {url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+search_string;};
/*------------------------------------------------------------------------*/

/*---block of function for formatting and displaying data taken from url--*/
    async function get_Data() {
      let response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (!data.drinks) {
        document.getElementById("container").innerHTML = `<div class='error_block'>
                                                            <h1 class='not_found'> <big>Cocktail not found :(<big></h1>
                                                            <h2 class='cheers'> Try again, cheers!</h2>
                                                            <img class='error_img' src='error.png' width='400px'>
                                                          </div>`
        return false;
      } else {
          document.getElementById("container").innerHTML = `<div class='cocktail_block'>
                                                              <h1> <i> ${data.drinks[0].strDrink} </i></h1>
                                                              <h2> Glass: ${data.drinks[0].strGlass} </h2>
                                                              <h2> <small> Ingredients </small> </h2>
                                                              <p class='lists'>
                                                                <ul id='Ingredient'>
                                                                  <li>${data.drinks[0].strIngredient1}</li>
                                                                  <li>${data.drinks[0].strIngredient2}</li>
                                                                  <li>${data.drinks[0].strIngredient3}</li>
                                                                  <li>${data.drinks[0].strIngredient4}</li>
                                                                  <li>${data.drinks[0].strIngredient5}</li>
                                                                  <li>${data.drinks[0].strIngredient6}</li>
                                                                  <li>${data.drinks[0].strIngredient7}</li>
                                                                  <li>${data.drinks[0].strIngredient8}</li>
                                                                  <li>${data.drinks[0].strIngredient9}</li>
                                                                  <li>${data.drinks[0].strIngredient10}</li>
                                                                  <li>${data.drinks[0].strIngredient11}</li>
                                                                  <li>${data.drinks[0].strIngredient12}</li>
                                                                  <li>${data.drinks[0].strIngredient13}</li>
                                                                  <li>${data.drinks[0].strIngredient14}</li>
                                                                  <li>${data.drinks[0].strIngredient15}</li>
                                                                </ul>

                                                                <ul type="none" id='Measure'>
                                                                  <li>${data.drinks[0].strMeasure1}</li>
                                                                  <li>${data.drinks[0].strMeasure2}</li>
                                                                  <li>${data.drinks[0].strMeasure3}</li>
                                                                  <li>${data.drinks[0].strMeasure4}</li>
                                                                  <li>${data.drinks[0].strMeasure5}</li>
                                                                  <li>${data.drinks[0].strMeasure6}</li>
                                                                  <li>${data.drinks[0].strMeasure7}</li>
                                                                  <li>${data.drinks[0].strMeasure8}</li>
                                                                  <li>${data.drinks[0].strMeasure9}</li>
                                                                  <li>${data.drinks[0].strMeasure10}</li>
                                                                  <li>${data.drinks[0].strMeasure11}</li>
                                                                  <li>${data.drinks[0].strMeasure12}</li>
                                                                  <li>${data.drinks[0].strMeasure13}</li>
                                                                  <li>${data.drinks[0].strMeasure14}</li>
                                                                  <li>${data.drinks[0].strMeasure15}</li>
                                                                </ul> </p>

                                                            <h2 id="instruction_header"> <small> Instructions </small> </h2>
                                                            <p class="inst"> ${data.drinks[0].strInstructions} </p>
                                                          </div>
                                                            <div class='photo'>
                                                             <img src=${data.drinks[0].strDrinkThumb} width='440px'>
                                                            </div>`

    /*---block to erase null values for Ingredients and Measures---*/
    $("ul li").each(function() {
      var $this = $(this);
      if($this.text() == "null") { $this.remove(); }
      });
    }
  }
/*-----------------------------------------------------------------------*/

/*-----running get_Data function-----------------------------------------*/
    button_rand.addEventListener("click", get_Data);
    button_search.addEventListener("click", get_Data);
