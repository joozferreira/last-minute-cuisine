/*
Logic:

1. Run query with ingredients (https://api.spoonacular.com/recipes/findByIngredients?ingredients=spaghetti,+cheese,+mushrooms)
2. For result, filter the ones with 0 to max missing ingredients
3. For each result, query readyInMinutes and filter by those smaller than defined by user using
https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&addWinePairing=false&addTasteData=false
4. Once filtered, a card can be built and presented to user
5. For each recipe opened, run https://api.spoonacular.com/recipes/{id}/analyzedInstructions
*/

/* Logic 2:
Store criteria from user in an object and retrieve recipes for the current query.
Return results in a modal window.
*/

// async function getRecipes() {
//   const response = await fetch(
//     "https://api.spoonacular.com/recipes/1182871/analyzedInstructions?apiKey=054a77294b57404ebabaf53116dd17b1"
//   );
//   const instructions = await response.json();
//   console.log(instructions);
// }

// getRecipes();

async function randomRecipe() {
  const response = await fetch(
    "https://api.spoonacular.com/recipes/random?number=1&apiKey=${APIKEY}"
  );
  const details = await response.json();

  const recipeDetails = {
    title: details.recipes[0].title,
    timeToCook: details.recipes[0].readyInMinutes,
    image: details.recipes[0].image,
    ingredientsList: details.recipes[0].extendedIngredients,
    stepsList: details.recipes[0].analyzedInstructions[0].steps,
  };

  createRecipeCard(recipeDetails, "random");
}

function createRecipeCard(recipe, location) {
  if ("content" in document.createElement("template")) {
    const template = document.getElementById("recipe-template");
    const clone = template.content.cloneNode(true);
    clone.querySelectorAll(".name")[0].textContent = recipe.title;
    if (recipe.timeToCook <= 15) {
      clone
        .querySelectorAll(".img")[0]
        .setAttribute("src", "./assets/clock-lines-svgrepo-com.svg");
    } else {
      clone
        .querySelectorAll(".img")[0]
        .setAttribute("src", "./assets/clock-twelve-svgrepo-com.svg");
    }
    clone.querySelectorAll(".time")[0].textContent = recipe.timeToCook;
    clone.querySelectorAll(".img")[1].setAttribute("src", recipe.image);
    recipe.ingredientsList.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = `${ingredient.nameClean} | ${ingredient.measures.metric.amount}${ingredient.measures.metric.unitShort}`;
      clone.querySelectorAll(".ingredients")[0].appendChild(li);
    });
    recipe.stepsList.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = `${step.step}`;
      clone.querySelectorAll(".steps")[0].appendChild(li);
    });

    if (location === "random") {
      document.getElementsByClassName("random-recipe")[0].appendChild(clone);
    }
  }
}

randomRecipe();
