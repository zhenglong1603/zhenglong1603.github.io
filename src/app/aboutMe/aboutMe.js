fetch("src/app/aboutMe/aboutMe.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("aboutMe-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading aboutMe:', error));