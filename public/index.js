"use strict";

// Creation of database to store daily random recipe
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  push,
  update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Initialization of DB

const appSettings = {
  databaseURL:
    "https://lastminutecuisine-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const randomRecipeInDB = ref(database, "randomRecipe");

// Random recipe generation
async function randomRecipe() {
  let recipeDetails = {};
  const currentDate = getCurrentDateString();

  const snapshot = await get(randomRecipeInDB);

  if (snapshot.exists()) {
    const recipeArr = Object.entries(snapshot.val());

    if (currentDate === recipeArr[0][1].date) {
      // No update to the random recipe if current date matches the date in the DB
      recipeDetails = recipeArr[0][1].details;
    } else {
      // Case where recipe in the DB is in the past
      const fetchedDetails = await fetchAndStoreRandomRecipe();
      recipeDetails = recipeObject(fetchedDetails);
      const currentRandomRecipe = {
        date: currentDate,
        details: recipeDetails,
      };
      update(
        ref(database, `randomRecipe/${recipeArr[0][0]}`),
        currentRandomRecipe
      );
    }
  } else {
    // Case where nothing exists in DB
    const fetchedDetails = await fetchAndStoreRandomRecipe();
    recipeDetails = recipeObject(fetchedDetails);
    const currentRandomRecipe = {
      date: currentDate,
      details: recipeDetails,
    };
    push(randomRecipeInDB, currentRandomRecipe);
  }
  createRecipeCard(recipeDetails, "random");
}

function getCurrentDateString() {
  return `${new Date().getFullYear()}${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}`;
}

async function fetchAndStoreRandomRecipe() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`
  );
  const fetchedRecipe = await response.json();
  return fetchedRecipe;
}

// Creation of recipe object
function recipeObject(input) {
  return {
    title: input.recipes[0].title,
    timeToCook: input.recipes[0].readyInMinutes,
    image: input.recipes[0].image,
    ingredientsList: input.recipes[0].extendedIngredients,
    stepsList: input.recipes[0].analyzedInstructions[0].steps,
    type: input.recipes[0].dishTypes,
  };
}

// Creation of recipe cards to be presented in the browser
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
