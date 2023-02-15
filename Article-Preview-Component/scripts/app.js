class PopUp {
    constructor(domNode) {
        this.root = domNode;

        this.button = this.root.querySelector("button[aria-expanded]");

        const popupId = this.button.getAttribute("aria-controls");
        this.popup = this.root.querySelector(`#${popupId}`);

        this.open = this.button.getAttribute("aria-expanded") === true;

        this.button.addEventListener("click", (e) => {
            this.toggle(!this.open);
        });

        // Close on Click Outside
        document.addEventListener("click", (e) => {
            const target = e.target;
            if (!this.root.contains(target) && !this.root.isEqualNode(target)) {
                this.toggle(false);
            }
        });
    }

    toggle(open) {
        if (open === this.open) {
            return;
        }

        this.open = open;

        this.button.setAttribute("aria-expanded", this.open);
        if (this.open) {
            this.popup.setAttribute("aria-hidden", "false");
        } else {
            this.popup.setAttribute("aria-hidden", "true");
        }
    }
}

const popupWrapper = document.querySelector(".article-share");
new PopUp(popupWrapper);
