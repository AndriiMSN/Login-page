const tabs = document.querySelectorAll(".login_block__form__tabs li");
const changeInput = document.querySelector(
  ".login_block__form input[type=email]"
);
const changeLabel = document.querySelector(
  ".login_block__form label[for=user_email]"
);

const togglePasswordBtn = document.querySelector(
  ".login_block__form .login_block__form__password div"
);

const EnterButton = document.querySelector(
  ".login_block__form button[type=submit]"
);

const ErrorChangeInput = document.querySelector(
  ".login_block__form .changed_input_error"
);

const regEmail = /\S+@\S+\.\S+/;

// Tabs
let emailValue, telValue;
tabs.forEach((el) => {
  el.addEventListener("click", () => {
    let currentTab = el;

    // if click phone tab
    if (
      el.classList.contains("login_block__form__tabs__phone") &&
      !el.classList.contains("active")
    ) {
      changeInput.classList.remove("error");
      changeInput.classList.remove("valid");
      // Remove error message
      ErrorChangeInput.innerHTML = "";
      // save Email value
      emailValue = changeInput.value;
      // Change input attributes
      changeInput.type = "tel";
      changeInput.name = "user_phone";
      changeInput.id = "user_phone";
      changeInput.placeholder = "Ваш номер телефона";
      changeInput.value = telValue || "";
      // Change label text
      changeLabel.setAttribute("for", "user_phone");
      changeLabel.innerHTML = "<p>Телефон</p>";
      // Add mask
      Inputmask({
        mask: "+38 (999) 999-99-99",
        showMaskOnHover: true,
        placeholder: "_",
      }).mask(document.getElementById("user_phone"));
    }
    // if click email tab
    else if (
      el.classList.contains("login_block__form__tabs__email") &&
      !el.classList.contains("active")
    ) {
      changeInput.classList.remove("error");
      changeInput.classList.remove("valid");
      // Remove Error message
      ErrorChangeInput.innerHTML = "";
      // Save Phone value
      telValue = changeInput.value;
      // Change input attributes
      changeInput.type = "email";
      changeInput.name = "user_email";
      changeInput.id = "user_email";
      // Remove mask
      Inputmask.remove(document.getElementById("user_email"));
      changeInput.placeholder = "Ваша электронная почта";
      changeInput.value = emailValue || "";
      // Change label text
      changeLabel.setAttribute("for", "user_email");
      changeLabel.innerHTML = "<p>Эл. почта</p>";
    }

    // Make active clicked tab
    tabs.forEach((el) => {
      el.classList.remove("active");
    });
    currentTab.classList.add("active");
  });
});

// OnInput validation
changeInput.addEventListener("input", () => {
  if (changeInput.id == "user_email" && !regEmail.test(changeInput.value)) {
    // Add error border
    changeInput.classList.remove("valid");
    changeInput.classList.add("error");
    if (changeInput.value.toString().length == 0) {
      ErrorChangeInput.innerHTML = "Введите email";
    } else {
      ErrorChangeInput.innerHTML = "Неккоректный email";
    }
  } else {
    if (changeInput.id == "user_email") {
      // Remove error border
      changeInput.classList.remove("error");
      changeInput.classList.add("valid");
    }

    ErrorChangeInput.innerHTML = "";
  }
  // Phone Validation
  if (
    changeInput.id == "user_phone" &&
    (changeInput.value.toString().includes("_") ||
      changeInput.value.length == 0)
  ) {
    changeInput.classList.remove("valid");
    changeInput.classList.add("error");
    ErrorChangeInput.innerHTML = "Неккоректный телефон";
  } else {
    if (changeInput.id == "user_phone") {
      // Remove error border
      changeInput.classList.remove("error");
      changeInput.classList.add("valid");
    }
  }
});

// Blur show Errors

changeInput.addEventListener("blur", () => {
  // Email validation
  if (changeInput.id == "user_email" && !regEmail.test(changeInput.value)) {
    // Add error border
    changeInput.classList.remove("valid");
    changeInput.classList.add("error");
    if (changeInput.value.toString().length == 0) {
      ErrorChangeInput.innerHTML = "Введите email";
    } else {
      ErrorChangeInput.innerHTML = "Неккоректный email";
    }
  } else {
    if (changeInput.id == "user_email") {
      // Remove error border
      changeInput.classList.remove("error");
      changeInput.classList.add("valid");
    }

    ErrorChangeInput.innerHTML = "";
  }
  // Phone Validation
  if (
    changeInput.id == "user_phone" &&
    (changeInput.value.toString().includes("_") ||
      changeInput.value.length == 0)
  ) {
    changeInput.classList.remove("valid");
    changeInput.classList.add("error");
    ErrorChangeInput.innerHTML = "Неккоректный телефон";
  } else {
    if (changeInput.id == "user_phone") {
      // Remove error border
      changeInput.classList.remove("error");
      changeInput.classList.add("valid");
    }
  }
});
// Show hide password

togglePasswordBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let passwordInput = document.querySelector(
    ".login_block__form .login_block__form__password input"
  );

  passwordInput.type == "password"
    ? ((passwordInput.type = "text"), togglePasswordBtn.classList.add("hide"))
    : ((passwordInput.type = "password"),
      togglePasswordBtn.classList.remove("hide"));
});

// Validate form
EnterButton.addEventListener("click", (e) => {
  e.preventDefault();
  let emailOrPhone = document.querySelector(
    ".login_block__form input.changed_input"
  );
  let password = document.querySelector(
    ".login_block__form .login_block__form__password input"
  );

  // Reg exp

  if (emailOrPhone.type == "email" && !regEmail.test(emailOrPhone.value)) {
    alert("Неккоректный email");
  } else if (
    emailOrPhone.type == "tel" &&
    (emailOrPhone.value.toString().includes("_") ||
      emailOrPhone.value.length == 0)
  ) {
    alert("Неккоректный телефон");
  } else if (password.value.toString().length == 0) {
    alert("Введите пароль");
  } else {
    alert("OK!");
  }
});
