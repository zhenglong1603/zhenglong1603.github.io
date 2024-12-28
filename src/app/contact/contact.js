fetch("src/app/contact/contact.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("contact-placeholder").innerHTML = data;
        })
        .catch(error => console.error('Error loading contct:', error));