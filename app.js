const mealBtn = document.getElementById("mealBtn");

function getRecipe() {
    axios
        .get("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res) => res)
        .then((res) => {
            console.log(res);
            showOutput(res);
        })
        .catch((err) => {
            console.error(err);
        });
}

function showOutput(res) {
    let recipe = JSON.stringify(res);
    document.getElementById("result").innerHTML = `
    <div class="card card-body mb-4 mt-3">
    <pre>Recipe:${recipe}</pre>
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