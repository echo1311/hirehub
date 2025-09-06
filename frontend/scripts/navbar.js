document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const navLinks = document.getElementById("navLinks");
  const userProfile = document.getElementById("userProfile");
  const userCircle = document.getElementById("userCircle");
  const userName = document.getElementById("userName");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const navLocation = document.getElementById("navLocation");
  const popupOverlay = document.getElementById("popupOverlay");

  // Show user if logged in
  if (user && token) {
    navLinks.style.display = "none";
    userProfile.style.display = "flex";
    userCircle.innerText = user.name.charAt(0).toUpperCase();
    userName.innerText = user.name;
  } else {
    navLinks.style.display = "flex";
    userProfile.style.display = "none";
  }

  navLocation.addEventListener("click", () => {
    popupOverlay.style.display = "flex";
  });

  window.closePopup = function () {
    popupOverlay.style.display = "none";
  };

  window.useCurrentLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
          .then(res => res.json())
          .then(data => {
            navLocation.value = data.display_name || `${lat}, ${lon}`;
            closePopup();
          });
      }, (error) => {
        alert("Error getting location: " + error.message);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  window.useManualLocation = function () {
    let address = document.getElementById("manualAddress").value;
    if (!address) {
      alert("Please enter a location.");
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          navLocation.value = data[0].display_name;
          closePopup();
        } else {
          alert("Location not found.");
        }
      });
  };

  userCircle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!userProfile.contains(e.target)) {
      dropdownMenu.classList.remove("show");
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });
  }
});
