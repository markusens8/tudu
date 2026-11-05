const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");



registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const response = await fetch("backend/register.php", {
    method: "POST",
    body: new FormData(e.target)
  });
  

  const data = await response.json();

  message.textContent = data.message;
  e.target.reset();
});



loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const response = await fetch("backend/login.php", {
    method: "POST",
    body: new FormData(e.target)
  });


  if (!response.ok) {
    const data = await response.json();
    message.textContent = data.message;
    e.target.reset();
  }
  else
    window.location.href = "app.php";
  
});