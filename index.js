const API_URL = "https://reqres.in/api/users";

let userInfoData = [];
const userContainer = document.getElementById("user-container");
const getDetailButton = document.getElementById("user-clicked-info");

async function getUserInfo() {
    try {
        const data = await fetch(API_URL);
        const dataInJson = await data.json();
        userInfoData = dataInJson.data;
        generateAllCards(userInfoData);
    } catch (error) {
        console.log("There was an error", error);
        userInfoData = [];
    }
}

function createCardUI(user) {
    let cardUI = `
        <div class="card m-4" style="width: 18rem;">
            <img src=${user.avatar} class="card-img-top" alt="...">
            <div class="card-body">
                <h5>${user.first_name} ${user.last_name}</h5>
                <p class="card-text">${user.email}</p>
                <button class="btn btn-primary" onclick="getUserDetail(${user.id})">Get Details</button>
            </div>
        </div>
    `;

    userContainer.innerHTML += cardUI;
}


function generateAllCards(userData = []) {
  for(let i = 0 ; i < userData.length; i++) {
      createCardUI(userData[i]);
  }
}


async function getUserDetail(userId) {
    try {
        const data = await fetch(`${API_URL}/${userId}`);
        const dataInJson = await data.json();
        displayUserDetail(dataInJson.data);
    } catch (error) {
        console.log("Error fetching user detail:", error);
    }
}

function displayUserDetail(user) {
    let userDetailsUI = `
        <div class="card border-primary mb-3" style="max-width: 20rem;">
            <div class="card-header">User Details</div>
            <div class="card-body">
                <h4 class="card-title">${user.first_name} ${user.last_name}</h4>
                <p class="card-text">Email: ${user.email}</p>
            </div>
        </div>
    `;

    getDetailButton.innerHTML = userDetailsUI;
}

getUserInfo();
