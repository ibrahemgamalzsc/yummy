let dataContainer = document.getElementById("data-container");
let searchContainer = document.getElementById("search-container");
let submitBtn;




$(document).ready(async function () {
    closeSideNav();
    $('.loader').fadeOut("slow");
    $('.loader').attr('style', 'display: none !important');
    $(".open-close-icon").click(() => {
        if ($(".side-nav-menu").css("left") == "0px") {
            closeSideNav()
        } else {
            openSideNav()
        }
    })

    let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
});


function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-bars");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {

    $(".side-nav-menu").animate({
        left: -245
    }, 500)

    $(".open-close-icon").addClass("fa-bars");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 150
    }, 500)
}





function displayMeals(res) {
    let mealsDiv = "";

    for (let i = 0; i < res.length; i++) {
        mealsDiv += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${res[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${res[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-overlay position-absolute d-flex align-items-center justify-content-center text-black p-2">
                        <h3>${res[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    dataContainer.innerHTML = mealsDiv
}



async function getCategories() {
    dataContainer.innerHTML = ""
    closeSideNav()
    $(".loader").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $('.loader').attr('style', 'display: none !important');

}

function displayCategories(res) {
    let finalDiv = "";

    for (let i = 0; i < res.length; i++) {
        finalDiv += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${res[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${res[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-overlay position-absolute text-center text-black p-2">
                        <h3>${res[i].strCategory}</h3>
                        <p>${res[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    dataContainer.innerHTML = finalDiv
}


async function getArea() {
    dataContainer.innerHTML = ""
    closeSideNav()
    $(".loader").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()

    displayArea(respone.meals)
    $('.loader').attr('style', 'display: none !important');
}


function displayArea(res) {
    let finalDiv = "";
    for (let i = 0; i < res.length; i++) {
        finalDiv += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${res[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${res[i].strArea}</h3>
                </div>
        </div>
        `
    }

    dataContainer.innerHTML = finalDiv
}


async function getIngredients() {
    dataContainer.innerHTML = ""
    closeSideNav()
    $(".loader").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $('.loader').attr('style', 'display: none !important');

}


function displayIngredients(res) {
    let finalDiv = "";
    closeSideNav()
    for (let i = 0; i < res.length; i++) {
        finalDiv += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${res[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${res[i].strIngredient}</h3>
                        <p>${res[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    dataContainer.innerHTML = finalDiv
}


async function getCategoryMeals(category) {
    dataContainer.innerHTML = ""
    closeSideNav()
    $(".loader").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $('.loader').attr('style', 'display: none !important');

}



async function getAreaMeals(area) {
    dataContainer.innerHTML = ""
    closeSideNav()
    $(".loader").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $('.loader').attr('style', 'display: none !important');

}


async function getIngredientsMeals(ingredients) {
    dataContainer.innerHTML = ""
    closeSideNav()
    $(".loader").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $('.loader').attr('style', 'display: none !important');

}

async function getMealDetails(mealID) {
    closeSideNav()
    dataContainer.innerHTML = ""
    $(".loader").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $('.loader').attr('style', 'display: none !important');

}


function displayMealDetails(meal) {
    closeSideNav()
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    let tagsDiv = ''
    for (let i = 0; i < tags.length; i++) {
        tagsDiv += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let finalDiv = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsDiv}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    dataContainer.innerHTML = finalDiv
}


function showSearchInputs() {
    closeSideNav()
    searchContainer.innerHTML = `
    <div class="row py-4">
  <div class="col-md-6">
    <input class="form-control bg-transparent text-white" type="text" placeholder="Search By Name" onkeyup="searchByName(this.value)">
  </div>
  <div class="col-md-6">
    <input class="form-control bg-transparent text-white" type="text" maxlength="1" placeholder="Search By First Letter" onkeyup="searchByFLetter(this.value)">
  </div>
</div>
`

    dataContainer.innerHTML = ""
}



async function searchByFirstLetter(letter) {
    closeSideNav()
    dataContainer.innerHTML = ""
    $(".loader").fadeIn(300)

    letter == "" ? letter = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $('.loader').attr('style', 'display: none !important');

}

async function searchByName(name) {
    closeSideNav()
    dataContainer.innerHTML = ""
    $(".loader").fadeIn(300)

    $('.loader').attr('style', 'display: none !important');

}



function showContacts() {
    closeSideNav()
    dataContainer.innerHTML =

        `
	<div class="d-flex justify-content-center align-items-center">
		<div style="width:100%">
			<form>
				<div class="form-group">
					<label for="user">
						Username:
					</label>
					<input type="text"
						name="username"
						id="usernames"
						class="form-control">
					<div id="usercheck"
						style="color: red;">
						Username is missing
					</div>
				</div>

				<div class="form-group">
					<label for="user">
						Email:
					</label>
					<input type="email"
						name="email"
						id="email" required
						class="form-control">
					<small id="emailvalid"
						class="form-text text-muted invalid-feedback">
						Your email must be a valid email
					</small>
				</div>

				<div class="form-group">
					<label for="password">
						Password:
					</label>
					<input type="password"
						name="pass"
						id="password"
						class="form-control">
					<div id="passcheck"
						style="color: red;">
						Please Fill the password
					</div>
				</div>

				<div class="form-group">
					<label for="conpassword">
						Confirm Password:
					</label>
					<input type="password"
						name="username"
						id="conpassword"
						class="form-control">
					<div id="conpasscheck"
						style="color: red;">
						Password didn't match
					</div>
				</div>

				<input type="submit"
					id="submitbtn"
					value="Submit"
					class="btn btn-primary">
			</form>
		</div>
	</div>`
    submitBtn = document.getElementById("submitBtn")



    $("#usercheck").hide();
    let usernameError = true;
    $("#usernames").keyup(function () {
        validateUsername();
    });

    function validateUsername() {
        let usernameValue = $("#usernames").val();
        if (usernameValue.length == "") {
            $("#usercheck").show();
            usernameError = false;
            return false;
        } else if (usernameValue.length < 3 || usernameValue.length > 10) {
            $("#usercheck").show();
            $("#usercheck").html("length of username must be between 3 and 10");
            usernameError = false;
            return false;
        } else {
            $("#usercheck").hide();
        }
    }

    const email = document.getElementById("email");
    email.addEventListener("blur", () => {
        let regex =
            /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
        let s = email.value;
        if (regex.test(s)) {
            email.classList.remove("is-invalid");
            emailError = true;
        } else {
            email.classList.add("is-invalid");
            emailError = false;
        }
    });

    $("#passcheck").hide();
    let passwordError = true;
    $("#password").keyup(function () {
        validatePassword();
    });
    function validatePassword() {
        let passwordValue = $("#password").val();
        if (passwordValue.length == "") {
            $("#passcheck").show();
            passwordError = false;
            return false;
        }
        if (passwordValue.length < 3 || passwordValue.length > 10) {
            $("#passcheck").show();
            $("#passcheck").html(
                "length of your password must be between 3 and 10"
            );
            $("#passcheck").css("color", "red");
            passwordError = false;
            return false;
        } else {
            $("#passcheck").hide();
        }
    }

    $("#conpasscheck").hide();
    let confirmPasswordError = true;
    $("#conpassword").keyup(function () {
        validateConfirmPassword();
    });
    function validateConfirmPassword() {
        let confirmPasswordValue = $("#conpassword").val();
        let passwordValue = $("#password").val();
        if (passwordValue != confirmPasswordValue) {
            $("#conpasscheck").show();
            $("#conpasscheck").html("Password didn't Match");
            $("#conpasscheck").css("color", "red");
            confirmPasswordError = false;
            return false;
        } else {
            $("#conpasscheck").hide();
        }
    }

    $("#submitbtn").click(function () {
        validateUsername();
        validatePassword();
        validateConfirmPassword();
        validateEmail();
        if (
            usernameError == true &&
            passwordError == true &&
            confirmPasswordError == true &&
            emailError == true
        ) {
            return true;
        } else {
            return false;
        }
    });

}