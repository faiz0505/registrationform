let user = {};
let inputValues = {};
let isValid = true;
const inputs = document.querySelectorAll(".input");
const form = document.querySelector("#form");
const error = document.querySelectorAll(".error");
const toggleShowPass = document.querySelectorAll("i");
const pass = document.querySelector("#pass");
const conPass = document.querySelector("#conPass");
const loadingSpinner = document.querySelector("#loading");
let toggle = false;
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
        loadingSpinner.style.display = "block";
        const res = await fetch("http://localhost:3000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (res.ok) {
          alert("success");
          loadingSpinner.style.display = "none";
        } else if (res.status == 409) {
          alert("User already exists");
          loadingSpinner.style.display = "none";
        } else {
          alert("failed");
          loadingSpinner.style.display = "none";
        }
      } catch (error) {
        alert(error.message);
        loadingSpinner.style.display = "none";
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

const togglePass = () => {
  if (pass.type === "password") {
    pass.type = "text";
    toggleShowPass[0].classList.add("fa-eye");
    toggleShowPass[0].classList.remove("fa-eye-slash");
  } else {
    pass.type = "password";
    toggleShowPass[0].classList.remove("fa-eye");
    toggleShowPass[0].classList.add("fa-eye-slash");
  }
};
const toggleConPass = () => {
  if (conPass.type === "password") {
    conPass.type = "text";
    toggleShowPass[1].classList.add("fa-eye");
    toggleShowPass[1].classList.remove("fa-eye-slash");
  } else {
    conPass.type = "password";
    toggleShowPass[1].classList.remove("fa-eye");
    toggleShowPass[1].classList.add("fa-eye-slash");
  }
};
