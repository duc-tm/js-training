(function () {
  const redirectLinkElement = document.querySelector(".redirect-link");
  if (redirectLinkElement) {
    const href = redirectLinkElement.href;
    if (typeof href !== "string") {
      return;
    }

    redirectLinkElement.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = (href.includes("login") ? href.replace("login", "index") : href) + ".html";
    })
  }
})()