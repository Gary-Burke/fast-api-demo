/* jshint esversion: 11 */

// Wait for the DOM to load before executing functions
document.addEventListener("DOMContentLoaded", function () {

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
        })

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

});