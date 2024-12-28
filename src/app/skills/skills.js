fetch("src/app/skills/skills.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("skills-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading skills:', error));