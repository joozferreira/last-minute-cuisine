/\*
Logic:

1. Run query with ingredients (https://api.spoonacular.com/recipes/findByIngredients?ingredients=spaghetti,+cheese,+mushrooms)
2. For result, filter the ones with 0 to max missing ingredients
3. For each result, query readyInMinutes and filter by those smaller than defined by user using
   https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&addWinePairing=false&addTasteData=false
4. Once filtered, a card can be built and presented to user
5. For each recipe opened, run https://api.spoonacular.com/recipes/{id}/analyzedInstructions
   \*/

/_ Logic 2:
Store criteria from user in an object and retrieve recipes for the current query.
Return results in a modal window.
_/

// async function getRecipes() {
// const response = await fetch(
// "https://api.spoonacular.com/recipes/1182871/analyzedInstructions?apiKey=054a77294b57404ebabaf53116dd17b1"
// );
// const instructions = await response.json();
// console.log(instructions);
// }

// getRecipes();
