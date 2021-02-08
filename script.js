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
            const [...meal] = document.querySelectorAll('h6');
            const mealName = meal.map(element => element.innerText);
            if (mealName.indexOf(searchText) === -1) {
                fetchData(url2)
            }
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
        document.getElementById('msg').innerText = `Item Not Found`
    }
    meals.forEach(meals => {
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
                        <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${element.strMeal}</h5>
                            <h3>Category : ${element.strCategory}</h3>
                            <p>${element.strIngredient1} : ${element.strMeasure1}</p>
                            <p>${element.strIngredient2} : ${element.strMeasure2}</p>
                            <p>${element.strIngredient3} : ${element.strMeasure3}</p>
                            <p>${element.strIngredient4} : ${element.strMeasure4}</p>
                            <p>${element.strIngredient5} : ${element.strMeasure5}</p>
                            <p>${element.strIngredient6} : ${element.strMeasure6}</p>
                        </div>
                    </div>`
                mealDetails.appendChild(singleMeals);
            })
}
