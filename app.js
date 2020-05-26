const mealBtn = document.getElementById("mealBtn");

function getRecipe() {
    axios
        .get("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res) => res)
        .then((res) => {
            let recipe = res.data.meals[0];
            console.log(res);
            showOutput(recipe);
        })
        .catch((err) => {
            console.error(err);
        });
}

function showOutput(recipe) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
            ingredients.push(`${recipe[`strIngredient${i}`]}`);
            console.log(ingredients);
        } else {
            break;
        }
    }
    document.getElementById("result").innerHTML = `
    <div class = "container">
    <div class=" mb-4 mt-3">
    <h3 class="text-center">Recipe: ${recipe.strMeal}</h3>
    <ul class = "center">
    <li>Country: ${recipe.strArea}</li>
    <li>Tag: ${recipe.strTags}</li>
    <li>Category: ${recipe.strCategory}</li>
    </ul>
    </div>

    <div id = "img-container">

    <div id = "dish">
    <img src = ${recipe.strMealThumb} alt = "image of a recipe>
    </div>

    <div class="instruction">
    <h2 class = "text-center">Instruction</h2>
    <p id="text">
    ${recipe.strInstructions}</p>
    </div>

    </div>
    <hr>

    <div class = "media">
    <div class="">
    <h5>Ingredients:</h5>
    <ul>
    ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
    </ul>
    </div>
   
    <div class="video">
    <h5>Recipe Video</h5>
    <iframe src = "https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}" width = "500" height = "420"></iframe>
    </div>

    </div>
    
    
    
    </div>
    </div>
    `;
}

// logging

axios.interceptors.request.use(
    (config) => {
        console.log(`${config.method.toUpperCase()} request sent to ${config.url} at
    ${new Date().getTime()}`);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

mealBtn.addEventListener("click", getRecipe);
