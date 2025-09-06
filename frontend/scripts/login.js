document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();

  const msg = document.getElementById("loginMessage");
  if (response.ok) {
    msg.style.color = "green";
    msg.innerText = result.message;

    
    localStorage.setItem("user", JSON.stringify(result.user));
     localStorage.setItem("token", result.token);
     
    
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    msg.style.color = "red";
    msg.innerText = result.message || "Login failed";
  }
});
