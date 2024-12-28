fetch("src/app/mainSection/mainSection.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("mainSection-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading the main Section:', error));