/* jshint esversion: 11 */

// Wait for the DOM to load before executing functions
document.addEventListener("DOMContentLoaded", function () {

    // Toggle between hidden class upon element click
    const legends = document.querySelectorAll("form legend");
    legends.forEach(legend => {
        legend.addEventListener("click", function () {
            const isAlreadyOpen = !legend.nextElementSibling.classList.contains("hidden"); // check if already displayed

            legends.forEach(el => {
                el.nextElementSibling.classList.add("hidden"); // hide all
            });

            if (!isAlreadyOpen) {
                legend.nextElementSibling.classList.remove("hidden"); // only open if it wasn't already
            }
        });
    });

    // Call function '/unique-numbers' from main.py with JS Fetch API
    // Generate unique numbers
    document.getElementById("unique-form").addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent the page from navigating to the form action URL

        // HTML p element where results will be displayed
        const resultEl = document.getElementById("unique-result");

        // Get values for params from HTML form
        const amount = document.getElementById("unique_amount").value;
        const min = document.getElementById("unique_min").value;
        const max = document.getElementById("unique_max").value;
        const exclude = document.getElementById("unique_exclude").value;

        // Prevent empty fields from being submitted
        if (!amount || !min || !max) {
            resultEl.textContent = "Please fill in all fields.";
            return; // stops the fetch from being called at all
        }

        // Define params and assign values
        const params = new URLSearchParams({
            "unique_amount": amount,
            "unique_min": min,
            "unique_max": max,
            "unique_exclude": exclude,
        });

        // Use try/catch to handle Network-, JSON parse- and HTTP errors
        try {
            const response = await fetch(`/unique-numbers?${params}`); // call function from main.py

            // HTTP errors
            if (!response.ok) {
                const errorData = await response.json(); // Parse data returned from backend to JSON
                resultEl.textContent = errorData.error || "Something went wrong. Please try again."; // Display friendly error message to user
                console.error("Bad response:", response.status, errorData);
                return;
            }

            const data = await response.json(); // Parse data returned from backend to JSON
            resultEl.textContent = data.result.join(" "); // Display result from function

            // Network/Parse errors
        } catch (err) {
            resultEl.textContent = "Network error. Please check your connection."; // Display friendly error message to user
            console.error("Fetch error:", err);
        }
    });


    // Call function '/prime-numbers' from main.py with JS Fetch API
    // Generate prime numbers
    document.getElementById("prime-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const min = document.getElementById("prime_min").value;
        const max = document.getElementById("prime_max").value;
        const primeResult = document.getElementById("prime-result");

        if (parseInt(min) > parseInt(max)) {
            primeResult.textContent = "Min must be less than max";
            return;
        }

        if (!min || !max) {
            primeResult.textContent = "Please fill out all fields";
            return;
        }

        const params = new URLSearchParams({
            "prime_min": min,
            "prime_max": max
        });

        try {
            const response = await fetch(`/prime-numbers?${params}`);

            if (!response.ok) {
                const errorData = await response.json();
                primeResult.textContent = errorData.error || "Something went wrong. Please try again.";
                console.error("Bad response:", response.status, errorData);
                return;
            }

            const data = await response.json();
            primeResult.textContent = data.result.join(" ");

        } catch (err) {
            primeResult.textContent = "Network error. Please check your connection.";
            console.error("Fetch error:", err);
        }

    });


    // Calculate values of a circle based on radius/diameter
    document.getElementById("circle-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const circleType = (document.querySelector("#circle-form input[name='circle_input']:checked")).value;
        const size = document.getElementById("circle_size").value;
        const displaySize = document.getElementById("circle-size");
        const displayArea = document.getElementById("circle-area");
        const displayCircum = document.getElementById("circle-circum");

        if (!circleType || !size) {
            displayCircum.textContent = "Please fill out all fields";
            return;
        }

        const params = new URLSearchParams({
            "circleType": circleType,
            "size": size,
        });

        try {
            const response = await fetch(`/circle-values?${params}`);

            if (!response.ok) {
                const errorData = await response.json();
                displayCircum.textContent = errorData.error || "Something went wrong. Please try again.";
                console.error("Bad response:", response.status, errorData);
                return;
            }

            const data = await response.json();

            displaySize.textContent = data.size;
            displayArea.textContent = data.area;
            displayCircum.textContent = data.circum;

        } catch (err) {
            displayCircum.textContent = "Network error. Please check your connection.";
            console.error("Fetch error:", err);
        }

    });

    // Change HTML text based on user selection radius/diameter
    const circleOptions = document.querySelectorAll("#circle-form input[name='circle_input']");
    circleOptions.forEach(radio => {
        radio.addEventListener("change", e => {
            const circleType = e.target.value;
            const typeFriendly = capitalize(circleType);
            document.querySelector("#circle-form label[for='circle_size']").textContent = `${typeFriendly} of Circle:`;

            if (circleType === "diameter") {
                document.getElementById("circle-size-label").innerHTML = `<strong>Radius:</strong>`;
            } else {
                document.getElementById("circle-size-label").innerHTML = `<strong>Diameter:</strong>`;
            }
        });
    });


    // Handle range value and display for password length
    const passwInput = document.getElementById("passw_len");
    const passwOutput = document.getElementById("passw_output");
    passwInput.addEventListener("change", function () {
        const inputValue = Number(this.value); // this keyword returns a string, convert to number
        const lengths = [8, 12, 16, 32]; 
        const passwLength = lengths[inputValue - 1]; // match indexing of array start 0
        passwOutput.textContent = `${passwLength} Characters`;        
    })

    

    /**
     * Function to capitalize a string (str => Str)
     */
    function capitalize(data) {
        return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    }

});