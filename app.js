// Fetch meals from TheMealDB API
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function fetchMeals(query) {
    try {
        const response = await fetch(`${API_URL}${query}`);
        const data = await response.json();
        return data.meals;  // Return the fetched meals
    } catch (error) {
        console.error("Error fetching meals:", error);
        return null;
    }
}

async function displayMeals(query) {
    const meals = await fetchMeals(query);

    if (!meals || meals.length === 0) {
        alert("No meals found.");
        return;
    }

    meals.slice(0, 5).forEach((meal, index) => {
        // Set meal image and name
        document.getElementById(`meal-image-${index + 1}`).src = meal.strMealThumb;
        document.getElementById(`meal-name-${index + 1}`).textContent = meal.strMeal;

        // Get ingredients and display them below the meal name
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }

        // Create or update the ingredients element below the meal name
        const ingredientList = ingredients.join(', ');
        let ingredientElement = document.getElementById(`meal-ingredients-${index + 1}`);
        if (!ingredientElement) {
            ingredientElement = document.createElement('p');
            ingredientElement.id = `meal-ingredients-${index + 1}`;
            document.getElementById(`meal-name-${index + 1}`).parentNode.appendChild(ingredientElement);
        }
        ingredientElement.textContent = `Ingredients:${ingredientList}`;

        // Recipe instruction button functionality
        const recipeButton = document.getElementById(`meal-button-${index + 1}`);
        recipeButton.onclick = function() {
            const instructions = meal.strInstructions;
            document.getElementById("recipe-instructions").textContent = instructions;
        };
    });

    // Clear any remaining unused containers
    for (let i = meals.length; i < 5; i++) {
        document.getElementById(`meal-image-${i + 1}`).src = "";
        document.getElementById(`meal-name-${i + 1}`).textContent = "";
        const ingredientElement = document.getElementById(`meal-ingredients-${i + 1}`);
        if (ingredientElement) {
            ingredientElement.textContent = "";
        }
    }
}

// Search functionality - on button click
document.querySelector(".search-button").addEventListener("click", function () {
    const query = document.querySelector(".input").value;
    if (query) {
        displayMeals(query);
    } else {
        alert("Please enter a search term.");
    }
});

function HideContent(){
    document.getElementById('container1').style.display = 'block';
    document.getElementById('container2').style.display = 'none';
}
function showContent(){
    document.getElementById('container1').style.display = 'none';
    document.getElementById('container2').style.display = 'block';
}

function callChi() {
    document.getElementById('container1').style.display = 'none';
    document.getElementById('container2').style.display = 'block';
    displayMeals("chicken");
}
function callPot() {
    document.getElementById('container1').style.display = 'none';
    document.getElementById('container2').style.display = 'block';
    displayMeals("potato");
}
function callEgg() {
    document.getElementById('container1').style.display = 'none';
    document.getElementById('container2').style.display = 'block';
    displayMeals("egg");
}
function callCak() {
    document.getElementById('container1').style.display = 'none';
    document.getElementById('container2').style.display = 'block';
    displayMeals("cake");
}
