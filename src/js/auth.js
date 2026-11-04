const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  const response = await fetch(form.action, {
    method: form.method,
    body: new FormData(form)
  });

  const data = await response.json();

  message.textContent = data.message;
});