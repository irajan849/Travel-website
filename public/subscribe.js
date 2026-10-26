
const form = document.getElementById("newsletterForm");
const emailInput = document.getElementById("newsletterEmail");
const message = document.getElementById("newsletterMessage");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  message.textContent = "Submitting...";

  try {
    const response = await fetch(
      "http://localhost:5000/api/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emailInput.value
        })
      }
    );

    const result = await response.json();

    message.textContent = result.message;

    if (response.ok) {
      form.reset();
    }
  } catch (error) {
    message.textContent =
      "Unable to connect. Please try again.";
  }
});
