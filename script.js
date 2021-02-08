const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    const searchText = document.getElementById('searchText').value;
    if (searchText !== '') {
        const url1 = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`
        const url2 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        if (searchText.length === 1) {
            document.getElementById('allCards').innerHTML = ''
            fetchData(url1)
        }
        if (searchText.length > 1) {
            document.getElementById('allCards').innerHTML = ''
            fetchData(url2)
        }
    }
    else {
        document.getElementById('msg').innerText = `You should insert text`
    }
})


const fetchData = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data))
        .catch(error => {
            document.getElementById('allCards').style.display = 'none';
            console.log(error);
        })
}

const displayMeal = data => {
    const meals = data.meals;
    if (meals === null) {
        document.getElementById('msg').innerText = `Recipe Not Found`
    }
    meals.forEach(meals => {
        document.getElementById('mealDetails').innerHTML = ''
        const allCards = document.getElementById('allCards')
        const card = document.createElement('div')
        card.classList.add('card', 'col-md-6', 'col-lg-3', 'mb-3', 'border-0')
        card.innerHTML = `
        <div class="meal-card" onclick="displayIngredient(${meals.idMeal})">
        <img src="${meals.strMealThumb}" class="card-img-top rounded mx-auto d-block" alt="image not found">
        <div class="card-body">
            <h6 class="card-title">${meals.strMeal}</h6>
        </div>
        </div>`
        allCards.appendChild(card);

    })
}

const displayIngredient = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealInfo(data))

}

const displayMealInfo = data => {
    const mealDetails = document.getElementById('mealDetails')
    mealDetails.innerHTML = ''
    data.meals.forEach(element => {
        const singleMeals = document.createElement('div')
        singleMeals.className = 'col-md-12'
        singleMeals.innerHTML = `
                    <div class="card ingredients-card">
                        <img src="${element.strMealThumb}" class="card-img-top rounded-top" alt="...">
                        <div class="card-body" id = "ingredient-body">
                            <h5 class="card-title fw-bold">${element.strMeal}</h5>
                            <h6 class="fw-bold my-4">Category : ${element.strCategory}</h6>
                            <p class="fw-bold">ingredients</p>
                        </div>
                    </div>`
        mealDetails.appendChild(singleMeals);


        const ingredient = ingredients(element)
        const ingredientBody = document.getElementById('ingredient-body')


        for (let i = 0; i < ingredient.strIngredient.length; i++) {
            if(ingredient.strIngredient[i] === null){console.log('not');}
            for (let j = i; j <= i; j++) {
                if (ingredient.strIngredient[i] !== '' && ingredient.strIngredient[i] !== null) {
                    const p = document.createElement('p')
                    p.innerHTML = `<i class="far fa-check-circle" style="color: tomato"></i> ${ingredient.strIngredient[i]} : ${ingredient.strMeasure[j]}`
                    ingredientBody.appendChild(p)
                }
            }
        }
    })
}

const ingredients = element => {

    const ingredient = {
        strIngredient: [element.strIngredient1, element.strIngredient2, element.strIngredient3, element.strIngredient4, element.strIngredient5, element.strIngredient6, element.strIngredient7, element.strIngredient8, element.strIngredient9, element.strIngredient10],
        strMeasure: [element.strMeasure1, element.strMeasure2, element.strMeasure3, element.strMeasure4, element.strMeasure5, element.strMeasure6, element.strMeasure7, element.strMeasure8, element.strMeasure9, element.strMeasure10]
    }
    return ingredient;
}
