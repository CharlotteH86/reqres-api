//Variabler med querySelector och länk.
const formEl = document.querySelector("#loginForm");
const showUsersButtonEl = document.querySelector(".showUsersButton");
const apiUrl = "https://reqres.in";
const usersListEl = document.querySelector(".usersList");
const userInfoContainer = document.querySelector(".userInfoContainer");

//EventListener som är kopplat till inloggning med email och password via formuläret.
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(apiUrl + "/api/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: formEl["email"].value,
      password: formEl["password"].value,
    }),
  })
    .then((res) => res.json())
    .then((jsonData) => {
      if (jsonData.error) {
        const errorMessageEl = document.querySelector("#loginErrorMessage");
        errorMessageEl.innerText = jsonData.error;
        errorMessageEl.classList.remove("hide");
      } else {
        showUsersButtonEl.classList.remove("hide");
      }
      console.log(jsonData);
    });
});

//Vad som skrev när man klickar på "Show users" knappen. Visar användare som är kopplade till api länken.
showUsersButtonEl.addEventListener("click", (e) => {
  fetch(apiUrl + "/api/users")
    .then((res) => res.json())
    .then((data) => {
      const users = data.data;

      const usersListString = users
        .map((user) => {
          return `<li class="user" data-userid="${user.id}">${user.first_name}</li>`;
        })
        .join("");

      usersListEl.innerHTML = usersListString;
    });
});

//Vid klick på namn dyker ytterligare information upp så som för- och efternamn, avatar/bild och epost.
usersListEl.addEventListener("click", (e) => {
  const userid = e.target.dataset.userid;

  fetch(apiUrl + "/api/users/" + `${userid}`)
    .then((res) => res.json())
    .then((jsonData) => {
      const user = jsonData.data;

      console.log(jsonData);
      console.log(jsonData.data);

      const name = document.createElement("p");
      userInfoContainer.innerHTML = "";
      name.innerText = user.first_name + " " + user.last_name;
      userInfoContainer.appendChild(name);

      const avatarImg = document.createElement("img");
      avatarImg.src = user.avatar;
      userInfoContainer.appendChild(avatarImg);

      const email = document.createElement("p");
      email.innerText = user.email;
      userInfoContainer.append(name, avatarImg, email);
    });
});
