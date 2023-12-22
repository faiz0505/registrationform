let user = {};
let inputValues = {};
let isValid = true;
const inputs = document.querySelectorAll(".input");
const form = document.querySelector("#form");
const error = document.querySelectorAll(".error");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log(user);
  if (
    user.name == "" ||
    user.email == "" ||
    user.password == "" ||
    user.confirmPass == ""
  ) {
    alert("please fill all fields");
  } else {
    if (user.pass === user.confirmPass) {
      try {
        const res = await fetch("http://localhost:3000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (res.ok) {
          alert("success");
        } else if (res.status == 409) {
          alert("User already exists");
        } else {
          alert("failed");
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("password and confirm password doen not match");
    }
  }
});
inputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    user = { ...user, [e.target.name]: e.target.value };
  });

  input.addEventListener("keyup", (e) => {
    if (e.target.name == "name") {
      if (e.target.value.length > 3) {
        error[0].classList.remove("notvalid");
      }
    } else if (e.target.name == "pass") {
      if (e.target.value.length >= 6) {
        error[2].classList.remove("notvalid");
      }
    } else if (e.target.name === "confirmPass") {
      if (e.target.value === user.pass) {
        error[3].classList.remove("notvalid");
      }
    }
  });

  input.addEventListener("blur", (e) => {
    if (e.target.name === "name") {
      if (e.target.value?.length < 3) {
        error[0].classList.add("notvalid");
      }
    } else if (e.target.name == "pass") {
      if (e.target.value.length <= 6) {
        error[2].classList.add("notvalid");
      }
    } else if (e.target.name === "confirmPass") {
      if (e.target.value !== user.pass) {
        error[3].classList.add("notvalid");
      }
    }
  });
});
