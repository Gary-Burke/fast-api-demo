/* jshint esversion: 11 */

// Wait for the DOM to load before executing functions
document.addEventListener("DOMContentLoaded", function () {

    // Call function '/unique-numbers' from main.py with JS Fetch API
    document.getElementById("unique-form").addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent the page from navigating to the form action URL

        // Get params from form
        const params = new URLSearchParams({
            "unique_amount": document.getElementById("unique_amount").value,
            "unique_min": document.getElementById("unique_min").value,
            "unique_max": document.getElementById("unique_max").value,
        });

        // HTML p element where results will be displayed
        const resultEl = document.getElementById("unique-result");

        // Use try/catch to handle Network-, JSON parse- and HTTP errors
        try {
            const response = await fetch(`/unique-numbers?${params}`); // call function from main.py

            // HTTP errors
            if (!response.ok) {
                resultEl.textContent = "Something went wrong. Please try again."; // Display friendly error message to user
                console.error("Bad response:", response.status);
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
});