document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });

  const result = await response.json();

  const msg = document.getElementById("message");
  if (response.ok) {
    msg.style.color = "green";
    msg.innerText = result.message;
    document.getElementById("registerForm").reset();
  } else {
    msg.style.color = "red";
    msg.innerText = result.message || "Registration failed";
  }
});
