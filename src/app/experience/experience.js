fetch("src/app/experience/experience.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("experience-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading experience:', error));