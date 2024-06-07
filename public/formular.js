document.addEventListener('DOMContentLoaded', function () {
    // Cod pentru pagina "grunge"
    if (document.body.dataset.page === "grunge") {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const titleElement = document.querySelector("h1");
        if (titleElement) {
            titleElement.dataset.value = titleElement.innerText;

            titleElement.onmouseover = event => {
                let iterations = 0;
                const interval = setInterval(() => {
                    event.target.innerText = event.target.innerText.split("").map((letter, index) => {
                        if (index < iterations) {
                            return event.target.dataset.value[index];
                        }

                        return letters[Math.floor(Math.random() * 26)];
                    }).join("");

                    if (iterations >= event.target.dataset.value.length) clearInterval(interval);

                    iterations += 1 / 3;
                }, 50);
            };
        }
    }

    const form = document.querySelector('form');
    if (form) {
        const numeInput = document.getElementById('nume');
        const telefonInput = document.getElementById('telefon');
        const errorContainer = document.getElementById('errorContainer');

        if (!numeInput || !telefonInput || !errorContainer) {
            console.error('Unul dintre elemente nu a fost găsit în DOM.');
            return;
        }

        form.addEventListener('submit', function (event) {
            errorContainer.innerHTML = ''; // Clear previous errors

            let hasError = false;

            // Funcție pentru a afișa și elimina mesajele de eroare
            function showError(message) {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = message;
                errorContainer.appendChild(errorMessage);
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }

            // Validare pentru nume
            if (!/^[a-zA-Z\s]{3,25}$/.test(numeInput.value)) {
                event.preventDefault();
                showError('Numele trebuie să conțină doar litere și să aibă între 3 și 25 de caractere.');
                hasError = true;
            }

            // Validare pentru număr de telefon
            if (!/^07[0-9]{8}$/.test(telefonInput.value)) {
                event.preventDefault();
                showError('Numărul de telefon trebuie să înceapă cu 07 și să aibă exact 10 cifre.');
                hasError = true;
            }

            // Oprește trimiterea formularului dacă există erori
            if (hasError) {
                event.preventDefault();
            } else {
                // Salvarea datelor în localStorage dacă nu sunt erori
                localStorage.setItem('nume', numeInput.value);
                localStorage.setItem('telefon', telefonInput.value);
            }
        });

        // Afișarea valorii din input-ul range
        const ratingInput = document.getElementById('rating');
        const ratingOutput = document.getElementById('value');
        if (ratingInput && ratingOutput) {
            ratingInput.addEventListener('input', function () {
                ratingOutput.textContent = ratingInput.value;
            });
        }
    }

    // Folosirea getComputedStyle și stopPropagation
    const h2Element = document.querySelector('h2');
    if (h2Element) {
        h2Element.addEventListener('click', function (event) {
            const style = getComputedStyle(event.target);
            console.log(style.fontSize);
            event.stopPropagation();
        });
    }

    // Select all elements with the "i" tag and store them in a NodeList called "stars"
    const stars = document.querySelectorAll(".stars i");
    // Loop through the "stars" NodeList
    stars.forEach((star, index1) => {
        // Add an event listener that runs a function when the "click" event is triggered
        star.addEventListener("click", () => {
            // Loop through the "stars" NodeList Again
            stars.forEach((star, index2) => {
                // Add the "active" class to the clicked star and any stars with a lower index
                // and remove the "active" class from any stars with a higher index
                index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
            });
        });
    });
});
