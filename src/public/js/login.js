const form = document.getElementById("form");
const messageBox = document.querySelector(".messageBox");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (data.redirect == "/login") {
    alert("User not found");
    window.location.href = data.redirect;
  } else if (data.redirect == "/") window.location.href = data.redirect;
  else {
    messageBox.style.display = "block";
    messageBox.textContent = "Invalid email or password";
  }
});
