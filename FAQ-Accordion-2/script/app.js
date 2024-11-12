const narrow = {
    transform: ["scaleY(0.5)", "scaleY(1)"],
    opacity: [0, 1],
    maxHeight: ["0px", "50px"],
};

class Accordion {
    constructor(domNode) {
        this.root = domNode;
        this.button = this.root.querySelector(".accordion__toggle");
        this.content = this.root.querySelector(".accordion__text");
        this.open = this.button.getAttribute("aria-expanded") == "true";

        this.button.addEventListener("click", () => this.toggle());
    }

    toggle() {
        this.open = !this.open;
        this.button.setAttribute("aria-expanded", this.open);
        if (this.open) {
            this.content.setAttribute("aria-hidden", !this.open);
            this.content.animate(narrow, {
                duration: 250,
                easing: "ease-in-out",
                iterations: 1,
                direction: "normal",
            });
        } else {
            this.content
                .animate(narrow, {
                    duration: 250,
                    easing: "ease-in-out",
                    iterations: 1,
                    direction: "reverse",
                })
                .addEventListener("finish", () =>
                    this.content.setAttribute("aria-hidden", !this.open)
                );
        }
    }
}

const accordions = document.querySelectorAll(".accordion");
accordions.forEach((acc) => new Accordion(acc));
