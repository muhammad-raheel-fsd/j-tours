const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;

  const response = await fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  window.location.href = data.redirect;
});
