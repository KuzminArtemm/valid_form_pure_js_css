const $form = document.querySelector(".form");
const $input = document.querySelectorAll(".input");
const $button = document.querySelector(".button");
const $span = Array.from(document.querySelectorAll(".span"));
const nameRegexp = new RegExp("^[a-zA-Zа-яА-ЯёЁ]{1,15}$");
const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegexp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^ws]|[_]).{8,}$"
);
const $password = document.querySelector("#password");
const $password_confirm = document.querySelector("#password-confirm");
let result = false;

function ageValidate(date) {
  let changedDate = date.replace(/-/g, "/");
  let birthday = new Date(changedDate);
  let dateNow = new Date().toJSON().slice(0, 10) + " 01:00:00";
  let finallAge = ~~((Date.now(dateNow) - birthday) / 31557600000);
  if (finallAge >= 18) {
    return true;
  } else {
    return false;
  }
}

for (let i = 0; i < $input.length; i++) {
  $input[i].addEventListener("blur", function () {
    if ($input[i].name === "name") {
      if (!nameRegexp.test($input[i].value)) {
        $input[i].classList.remove("valid");
        $input[i].classList.add("invalid");
        $input[i].nextElementSibling.textContent =
          "Только буквы, киррилица или латиница, минимум 1 буква, максимум 15";
        $span[i].style.display = "inline";
      } else if (nameRegexp.test($input[i].value)) {
        $input[i].classList.remove("invalid");
        $input[i].classList.add("valid");
        $span[i].style.display = "none";
      }
    } else if ($input[i].name === "last-name") {
      if (!nameRegexp.test($input[i].value)) {
        $input[i].classList.remove("valid");
        $input[i].classList.add("invalid");
        $input[i].nextElementSibling.textContent =
          "Только буквы, киррилица или латиница, минимум 1 буква, максимум 15";
        $span[i].style.display = "inline";
      } else if (nameRegexp.test($input[i].value)) {
        $input[i].classList.remove("invalid");
        $input[i].classList.add("valid");
        $span[i].style.display = "none";
      }
    } else if ($input[i].name === "birth-day") {
      if ($input[i].value === "") {
        $input[i].classList.remove("valid");
        $input[i].classList.add("invalid");
        $input[i].nextElementSibling.textContent = "поле не заполнено!";
        $span[i].style.display = "inline";
      } else if (!ageValidate($input[i].value)) {
        $input[i].classList.remove("valid");
        $input[i].classList.add("invalid");
        $input[i].nextElementSibling.textContent = "Минимум 18 лет";
        $span[i].style.display = "inline";
      } else if (ageValidate($input[i].value)) {
        $input[i].classList.remove("invalid");
        $input[i].classList.add("valid");
        $span[i].style.display = "none";
      }
    } else if ($input[i].name === "email") {
      if (!emailRegexp.test($input[i].value)) {
        $input[i].classList.remove("valid");
        $input[i].classList.add("invalid");
        $input[i].nextElementSibling.textContent =
          "Корректный email: ivanov@gmail.com (пример)";
        $span[i].style.display = "inline";
      }
      if (emailRegexp.test($input[i].value)) {
        $input[i].classList.remove("invalid");
        $input[i].classList.add("valid");
        $span[i].style.display = "none";
      }
    } else if ($input[i].name === "password") {
      if (!passwordRegexp.test($input[i].value)) {
        $input[i].classList.remove("valid");
        $input[i].classList.add("invalid");
        $input[i].nextElementSibling.textContent =
          "Минимальная длина 8 символов, минимум одна буква, цифра, символ";
        $span[i].style.display = "inline";
      }
      if (passwordRegexp.test($input[i].value)) {
        $input[i].classList.remove("invalid");
        $input[i].classList.add("valid");
        $span[i].style.display = "none";
      }
    } else if ($input[i].name === "password-confirm") {
      if (passwordRegexp.test($input[i].value)) {
        console.log(passwordRegexp.test($input[i].value));
        $input[i].classList.remove("valid");
        $input[i].classList.add("invalid");
        $input[i].nextElementSibling.textContent = "Пароли должны совпадать";
        $span[i].style.display = "inline";
      }
      if ($password.value === $password_confirm.value) {
        console.log(passwordRegexp.test($input[i].value));
        $input[i].classList.remove("valid");
        $input[i].classList.add("invalid");
        $input[i].nextElementSibling.textContent =
          "Минимальная длина 8 символов, минимум одна буква, цифра, символ";
        $span[i].style.display = "inline";
      }
      if (
        passwordRegexp.test($input[i].value) &&
        $password.value === $password_confirm.value
      ) {
        $input[i].classList.remove("invalid");
        $input[i].classList.add("valid");
        $span[i].style.display = "none";
      }
    }
    const everyValid = Array.from($input).every((el) =>
      el.classList.contains("valid")
    );
    console.log(everyValid);
    if (!everyValid) {
      $form.classList.add("invalid");
      $form.classList.remove("valid");
      $button.disabled = true;
      $button.style.cursor = "not-allowed";
    } else if (everyValid) {
      console.log({ everyValid });
      $form.classList.remove("invalid");
      $form.classList.add("valid");
      $button.disabled = false;
      $button.style.cursor = "pointer";
      result = true;
    }
  });
}

function handleSubmit(e) {
  e.preventDefault();
  if (result) {
    let nodeArray = Array.from($form.elements);
    nodeArray.forEach((el) => {
      el.value = "";
      el.classList.remove("valid");
    });
    alert("Спасибо, ваша форма принята!");
  }
}

$form.addEventListener("submit", handleSubmit);
