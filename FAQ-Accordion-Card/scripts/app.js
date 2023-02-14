class Accordion {
    constructor(domNode) {
        this.root = domNode;

        this.button = this.root.querySelector("button[aria-expanded]");

        const panelId = this.button.getAttribute("aria-controls");
        this.panel = this.root.querySelector(`#${panelId}`);

        this.open = this.button.getAttribute("aria-expanded") === true;

        this.button.addEventListener("click", () => {
            this.toggle(!this.open);
        });
    }

    toggle(open) {
        if (open === this.open) {
            return;
        }

        this.open = open;

        this.button.setAttribute("aria-expanded", this.open);
        if (this.open) {
            this.panel.setAttribute("aria-hidden", "false");
        } else {
            this.panel.setAttribute("aria-hidden", "true");
        }
    }
}

const accordions = document.querySelectorAll(".accordion");
accordions.forEach((accordion) => new Accordion(accordion));
