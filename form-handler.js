(function () {
  // get form element and error message container element
  const formElement = document.getElementsByClassName("form");
  const errorMsgContainers = Array.from(document.querySelectorAll(".error-msg-container"));

  /**
    * check if form element already existed
    * (maybe element not existed or have not loaded yet at the time this block of code running)
    */
  if (formElement && formElement[0]) {
    // get all available input element
    let emailInput, passwordInput, reenterPasswordInput;
    const isRegisterPage = formElement[0].className.includes("register");
    if (isRegisterPage) {
      reenterPasswordInput = document.getElementById("reenter-password");
    }

    emailInput = document.getElementById("email");
    passwordInput = document.getElementById("password");

    formElement[0].addEventListener("submit", (e) => {
      // prevent html form process it's default action: submit form to action endpoint
      e.preventDefault();
      if (isRegisterPage) {
        const emailTestingRegex = /\S+@\S+\.\S+/;
        const errorMsgContainerForEmailInput = errorMsgContainers.find(
          (container) => !!(container.parentElement?.querySelector("#email"))
        );
        if (errorMsgContainerForEmailInput) {
          if (!emailInput || !emailTestingRegex.test(emailInput.value)) {
            if (errorMsgContainerForEmailInput) {
              errorMsgContainerForEmailInput.textContent = "Invalid email";
            }

            return;
          }

          errorMsgContainerForEmailInput.textContent = "";
        }

        const errorMsgContainerForPasswordInput = errorMsgContainers.find(
          (container) => !!(container.parentElement?.querySelector("#password"))
        );
        if (errorMsgContainerForPasswordInput) {
          if (!passwordInput || !(/[A-Z]/.test(passwordInput.value) &&
            /[a-z]/.test(passwordInput.value) &&
            /[0-9]/.test(passwordInput.value) &&
            /[^A-Za-z0-9]/.test(passwordInput.value) &&
            passwordInput.value.length > 8)) {
            if (errorMsgContainerForPasswordInput) {
              errorMsgContainerForPasswordInput.textContent
                = "Invalid password. Password must contain uppercase letter, lowercase letter, digit, special character and have at least 8 characters";
            }

            return;
          }

          errorMsgContainerForPasswordInput.textContent = "";
        }

        const errorMsgContainerForReenterPasswordInput = errorMsgContainers.find(
          (container) => !!(container.parentElement?.querySelector("#reenter-password"))
        );
        if (errorMsgContainerForReenterPasswordInput) {
          if (isRegisterPage && (!reenterPasswordInput || !passwordInput || reenterPasswordInput.value !== passwordInput.value)) {
            if (errorMsgContainerForReenterPasswordInput) {
              errorMsgContainerForReenterPasswordInput.textContent = "Re-enter password must match with password";
            }

            return;
          }

          errorMsgContainerForReenterPasswordInput.textContent = "";
        }
      }

      window.location.pathname = "/success.html";
    })
  }
})()