const logout = document.getElementById("logout");

logout.addEventListener("click", async (event) => {
  event.preventDefault();
  const response = await fetch("/logout");
  const data = await response.json();

  window.location.href = data.redirect;
});
