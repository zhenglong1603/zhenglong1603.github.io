fetch("src/app/navBar/navBar.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("topbar-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading the top bar:', error));