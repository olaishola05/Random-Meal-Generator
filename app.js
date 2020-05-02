const mealBtn = document.getElementById("mealBtn");

function getRecipe() {
    axios
        .get("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res) => res)
        .then((res) => {
            let recipe = res.data.meals[0];
            console.log(recipe);
            showOutput(res.data.meals[0]);
        })
        .catch((err) => {
            console.error(err);
        });
}

function showOutput(recipe) {
    // console.log(recipe);
    document.getElementById("result").innerHTML = `
    <div class = "container">
    <div class="card card-body mb-4 mt-3">
    <h3>Recipe: ${recipe.strMeal}</h3>
    <pre>Country: ${recipe.strArea}</pre>
    </div>
    <div class = "card" id = "img-container">
    <img src = ${recipe.strMealThumb} id = "dish" alt = "image of a recipe>
    
    <div class="mt-3 text-center" id="instruction">
   
    ${recipe.strInstructions}
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
