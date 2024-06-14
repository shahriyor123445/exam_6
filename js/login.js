const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");

window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();
  if (hasToken) {
    redirect("/admin.html");
  }
});

const credentials = {
  email: "",
  password: "",
};

function tekshirish() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  loginButton.disabled = !(email && password);
}

emailInput.addEventListener("input", function (event) {
  credentials.email = event.target.value;
  tekshirish();
});

passwordInput.addEventListener("input", function (event) {
  credentials.password = event.target.value;
  tekshirish();
});

form.onsubmit = function (event) {
  event.preventDefault();
  if (!loginButton.disabled) {
    login();
  }
};

async function login() {
  const api_url = "https://api.escuelajs.co/api/v1/auth/login";
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    const { access_token, refresh_token } = data;

    if (access_token && refresh_token) {
      sessionStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      const hasToken = checkToken();
      if (hasToken) {
        redirect("/admin.html");
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function checkToken() {
  const refresh_token = localStorage.getItem("refresh_token");
  return Boolean(refresh_token);
}

function redirect(path) {
  window.location.href = path;
}

tekshirish();
