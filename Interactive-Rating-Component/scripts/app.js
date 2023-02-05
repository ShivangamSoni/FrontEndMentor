const card = document.querySelector(".card");
const ratingButtons = document.querySelectorAll(".rating-btn");
const submitButton = document.querySelector("#submit");

ratingButtons.forEach((button) => {
    button.addEventListener("click", styleSelectedButton);
});

submitButton.addEventListener("click", (e) => {
    const rating = document.querySelector(".rating-btn.selected").innerText;
    renderThankYou(rating);
});

function styleSelectedButton(e) {
    ratingButtons.forEach((button) => {
        if (button.isEqualNode(e.currentTarget)) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
}

function renderThankYou(rating) {
    const template = document.querySelector("template#thankYou");
    const cardContents = template.content.cloneNode(true);
    const ratingText = cardContents.querySelector(".rating");
    ratingText.innerText = `You selected ${rating} out of 5`;

    // Clear Card
    card.innerHTML = "";

    // Add Thank You
    card.classList.add("card--thankyou");
    card.append(cardContents);
}
