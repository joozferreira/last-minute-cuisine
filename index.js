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

const test = {
  recipes: [
    {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      lowFodmap: false,
      weightWatcherSmartPoints: 8,
      gaps: "no",
      preparationMinutes: -1,
      cookingMinutes: -1,
      aggregateLikes: 2,
      healthScore: 11,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 140.34,
      extendedIngredients: [
        {
          id: 1004,
          aisle: "Cheese",
          image: "blue-cheese.png",
          consistency: "SOLID",
          name: "cheese",
          nameClean: "blue cheese",
          original: "1/2 cup (125g 4 oz) Blue Cheese crumbled",
          originalName: "(125g 4 oz) Blue Cheese crumbled",
          amount: 0.5,
          unit: "cup",
          meta: ["blue", "crumbled", "(125g 4 oz)"],
          measures: {
            us: { amount: 0.5, unitShort: "cups", unitLong: "cups" },
            metric: { amount: 67.5, unitShort: "g", unitLong: "grams" },
          },
        },
        {
          id: 11156,
          aisle: "Produce",
          image: "fresh-chives.jpg",
          consistency: "SOLID",
          name: "chives",
          nameClean: "chives",
          original: "2 teaspoons chopped Chives",
          originalName: "chopped Chives",
          amount: 2.0,
          unit: "teaspoons",
          meta: ["chopped"],
          measures: {
            us: {
              amount: 2.0,
              unitShort: "tsps",
              unitLong: "teaspoons",
            },
            metric: {
              amount: 2.0,
              unitShort: "tsps",
              unitLong: "teaspoons",
            },
          },
        },
        {
          id: 11152,
          aisle: "Produce",
          image: "frisee.jpg",
          consistency: "SOLID",
          name: "salad leaves curly endive",
          nameClean: "curly endive",
          original:
            "4 cups (90g 3 oz) mixed salad leaves curly endive, 3 stk Celery, sliced",
          originalName:
            "(90g 3 oz) mixed salad leaves curly endive, 3 stk Celery, sliced",
          amount: 4.0,
          unit: "cups",
          meta: ["mixed", "sliced", "(90g 3 oz)"],
          measures: {
            us: { amount: 4.0, unitShort: "cups", unitLong: "cups" },
            metric: { amount: 200.0, unitShort: "g", unitLong: "grams" },
          },
        },
        {
          id: 9152,
          aisle: "Produce",
          image: "lemon-juice.jpg",
          consistency: "LIQUID",
          name: "lemon juice",
          nameClean: "lemon juice",
          original: "2 teaspoons Lemon Juice",
          originalName: "Lemon Juice",
          amount: 2.0,
          unit: "teaspoons",
          meta: [],
          measures: {
            us: {
              amount: 2.0,
              unitShort: "tsps",
              unitLong: "teaspoons",
            },
            metric: {
              amount: 2.0,
              unitShort: "tsps",
              unitLong: "teaspoons",
            },
          },
        },
        {
          id: 9252,
          aisle: "Produce",
          image: "pears-bosc.jpg",
          consistency: "SOLID",
          name: "pears",
          nameClean: "pear",
          original: "3 pears peeled, cored,",
          originalName: "pears peeled, cored",
          amount: 3.0,
          unit: "",
          meta: ["cored", "peeled"],
          measures: {
            us: { amount: 3.0, unitShort: "", unitLong: "" },
            metric: { amount: 3.0, unitShort: "", unitLong: "" },
          },
        },
        {
          id: 4511,
          aisle: "Oil, Vinegar, Salad Dressing",
          image: "vegetable-oil.jpg",
          consistency: "LIQUID",
          name: "safflower oil",
          nameClean: "safflower oil",
          original: "1/4 cup (60 mL/2 fl oz) Safflower Oil",
          originalName: "(60 mL/2 fl oz) Safflower Oil",
          amount: 0.25,
          unit: "cup",
          meta: ["(60 mL/2 fl oz)"],
          measures: {
            us: { amount: 0.25, unitShort: "cups", unitLong: "cups" },
            metric: {
              amount: 54.5,
              unitShort: "ml",
              unitLong: "milliliters",
            },
          },
        },
        {
          id: 4528,
          aisle: "Oil, Vinegar, Salad Dressing",
          image: "walnut-oil.jpg",
          consistency: "LIQUID",
          name: "walnut oil",
          nameClean: "walnut oil",
          original: "1/4 cup (60mL/2fl oz) Walnut oil",
          originalName: "(60mL/2fl oz) Walnut oil",
          amount: 0.25,
          unit: "cup",
          meta: ["(60mL/2fl oz)"],
          measures: {
            us: { amount: 0.25, unitShort: "cups", unitLong: "cups" },
            metric: {
              amount: 54.5,
              unitShort: "ml",
              unitLong: "milliliters",
            },
          },
        },
        {
          id: 12155,
          aisle: "Baking",
          image: "walnuts.jpg",
          consistency: "SOLID",
          name: "walnuts",
          nameClean: "walnuts",
          original: "1/2 cup (60g 2 oz) walnuts, chopped",
          originalName: "(60g 2 oz) walnuts, chopped",
          amount: 0.5,
          unit: "cup",
          meta: ["chopped", "(60g 2 oz)"],
          measures: {
            us: { amount: 0.5, unitShort: "cups", unitLong: "cups" },
            metric: { amount: 58.5, unitShort: "g", unitLong: "grams" },
          },
        },
      ],
      id: 655438,
      title: "Pear Salad With Walnuts and Blue Cheese",
      readyInMinutes: 45,
      servings: 6,
      sourceUrl:
        "http://www.foodista.com/recipe/FZD4Z5S5/pear-salad-with-walnuts-and-blue-cheese",
      image: "https://img.spoonacular.com/recipes/655438-556x370.jpg",
      imageType: "jpg",
      summary:
        'Pear Salad With Walnuts and Blue Cheese might be just the hor d\'oeuvre you are searching for. This recipe serves 6 and costs $1.4 per serving. One portion of this dish contains approximately <b>5g of protein</b>, <b>28g of fat</b>, and a total of <b>323 calories</b>. 2 people were impressed by this recipe. It is a good option if you\'re following a <b>gluten free and lacto ovo vegetarian</b> diet. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. A mixture of lemon juice, chives, pears, and a handful of other ingredients are all it takes to make this recipe so yummy. All things considered, we decided this recipe <b>deserves a spoonacular score of 52%</b>. This score is pretty good. Users who liked this recipe also liked <a href="https://spoonacular.com/recipes/pear-salad-with-walnuts-and-blue-cheese-1202373">Pear Salad With Walnuts and Blue Cheese</a>, <a href="https://spoonacular.com/recipes/persimmon-and-blue-cheese-salad-with-walnuts-1202375">Persimmon and Blue Cheese Salad With Walnuts</a>, and <a href="https://spoonacular.com/recipes/persimmon-and-blue-cheese-salad-with-walnuts-221133">Persimmon and Blue Cheese Salad With Walnuts</a>.',
      cuisines: [],
      dishTypes: [
        "side dish",
        "antipasti",
        "salad",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre",
      ],
      diets: ["gluten free", "lacto ovo vegetarian"],
      occasions: [],
      instructions:
        "<ol><li>Cut base of pears so as to strand straight. Arrange a pear and salad leaves in individual bowls. Scatter an amount of celery in each bowl. Combine all dressing ingredients and pour over the salads. Sprinkle cheese and walnuts on top of each salad equally.</li></ol>",
      analyzedInstructions: [
        {
          name: "",
          steps: [
            {
              number: 1,
              step: "Cut base of pears so as to strand straight. Arrange a pear and salad leaves in individual bowls. Scatter an amount of celery in each bowl.",
              ingredients: [
                {
                  id: 11143,
                  name: "celery",
                  localizedName: "celery",
                  image:
                    "https://spoonacular.com/cdn/ingredients_100x100/celery.jpg",
                },
                {
                  id: 9252,
                  name: "pear",
                  localizedName: "pear",
                  image:
                    "https://spoonacular.com/cdn/ingredients_100x100/pears-bosc.jpg",
                },
                {
                  id: 0,
                  name: "base",
                  localizedName: "base",
                  image: "",
                },
              ],
              equipment: [
                {
                  id: 404783,
                  name: "bowl",
                  localizedName: "bowl",
                  image:
                    "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg",
                },
              ],
            },
            {
              number: 2,
              step: "Combine all dressing ingredients and pour over the salads.",
              ingredients: [],
              equipment: [],
            },
            {
              number: 3,
              step: "Sprinkle cheese and walnuts on top of each salad equally.",
              ingredients: [
                {
                  id: 12155,
                  name: "walnuts",
                  localizedName: "walnuts",
                  image:
                    "https://spoonacular.com/cdn/ingredients_100x100/walnuts.jpg",
                },
                {
                  id: 1041009,
                  name: "cheese",
                  localizedName: "cheese",
                  image:
                    "https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png",
                },
              ],
              equipment: [],
            },
          ],
        },
      ],
      originalId: null,
      spoonacularScore: 55.87309646606445,
      spoonacularSourceUrl:
        "https://spoonacular.com/pear-salad-with-walnuts-and-blue-cheese-655438",
    },
  ],
};

const randomImg = document.getElementById("random-img");
const randomName = document.getElementById("random-name");
const randomIngredients = document.getElementById("random-ingredients");
const randomSteps = document.getElementById("random-steps");
const randomClock = document.getElementById("random-clock");
const randomTime = document.getElementById("random-time");

async function randomRecipe() {
  // const response = await fetch(
  //   "https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}"
  // );
  // const details = await response.json();
  // const recipes = details.recipes;

  const recipes = test.recipes;

  const ingredientsList = new Map();
  const stepsList = new Set();

  recipes[0].extendedIngredients.forEach((ingredient) => {
    ingredientsList.set(
      ingredient.nameClean,
      ingredient.measures.metric.amount + ingredient.measures.metric.unitShort
    );
  });

  recipes[0].analyzedInstructions[0].steps.forEach((step) => {
    stepsList.add(step.step);
  });

  randomImg.setAttribute("src", recipes[0].image);
  randomName.textContent = `${recipes[0].title}`;

  for (const ingredient of ingredientsList) {
    const li = document.createElement("li");
    li.textContent = `${ingredient[0]} | ${ingredient[1]}`;
    randomIngredients.appendChild(li);
  }

  for (step of stepsList) {
    const li = document.createElement("li");
    li.textContent = `${step}`;
    randomSteps.appendChild(li);
  }

  if (recipes[0].readyInMinutes <= 15) {
    randomClock.setAttribute("src", "./assets/clock-lines-svgrepo-com.svg");
  } else {
    randomClock.setAttribute("src", "./assets/clock-twelve-svgrepo-com.svg");
  }
  randomTime.textContent = `${recipes[0].readyInMinutes}'`;
}

randomRecipe();
