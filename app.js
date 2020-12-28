const mealBtn = document.getElementById("mealBtn");
const toggleBtn = document.getElementById("myBtn");

function getRecipe() {
    axios
        .get(
            "https://www.themealdb.com/api/json/v1/1/random.php"
        )
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

    // let instruction, moreInfo, lessInfo;
    // function readLess() {
    //     instruction = recipe.strInstructions;
    //     // if (instruction.length > 300) {
    //     //     lessInfo = document.getElementById(
    //     //         "text"
    //     //     ).innerHTML = instruction.substring(0, 300);
    //     // }

    //     return instruction;
    // }

    // function readMore() {
    //     instruction = recipe.strInstructions;
    //     if (instruction.length === 300) {
    //         moreInfo = document.getElementById(
    //             "text"
    //         ).innerHTML = instruction;
    //     }

    //     return instruction;
    // }

    function toggleText() {
        let dots = document.getElementById("dots");
        let moreInfo = document.getElementById("more");
        let btnInfo = document.getElementById("myBtn");

        if (dots.style.display === "none") {
            dots.style.display = "inline";
            btnInfo.innerHTML = "Read More";
            moreInfo.style.display = "none";
        } else {
            dots.style.display = "none";
            btnInfo.innerHTML = "Read less";
            moreInfo.style.display = "inline";
        }
    }

    document.getElementById("result").innerHTML = `
    <div class="container main"> 
    
    <div class="mb-2 mt-2 border recipe-container">
    <h3 class="text-center">Recipe: ${recipe.strMeal}</h3>
    <ul class="recipe-info">
    <li>Country: ${recipe.strArea}</li>
    <li>Tag: ${recipe.strTags}</li>
    <li>Category: ${recipe.strCategory}</li>
    </ul>
    </div>

    <div class="img-container">
   
    <img src = ${recipe.strMealThumb} alt = "image of a recipe />
    

    <div class="instruction">
   
    <p id="text" class="howto border">
    ${recipe.strInstructions.substr(
        0,
        300
    )} <span id='dots'>...</span> <span id='more'>${
        recipe.strInstructions
    }</span>
    </p>
    </div>

    <div>
        <button class="btn btn-success" id="myBtn" onclick = '${(onclick = () =>
            toggleText())}'>
            ReadMore
    </button>
    </div>
    
</div>
    


    
    </div>
    `;

    document.getElementById("vid-content").innerHTML = `
<div class = "ingredient-container mt-4"> 
    <div class = "ingredient border">
    <h5>Ingredients:</h5>
    <ul>
    ${ingredients
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join("")}
    </ul>
    </div>

    <div class = "video ">
   <h5>Recipe Video</h5>
   <p class='lead vid-tag'>If you prefer watching how it is done, watch video below</p>
    <iframe src = "https://www.youtube.com/embed/${recipe.strYoutube.slice(
        -11
    )}" width = "500"height = "250"></iframe>
    </div>
    </div>
    
`;
}

// logging

axios.interceptors.request.use(
    (config) => {
        console.log(`${config.method.toUpperCase()} request sent to ${
            config.url
        } at
    ${new Date().getTime()}`);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

mealBtn.addEventListener("click", getRecipe);
// toggleBtn.addEventListener("click", () => {
//     toggleText;
// });
