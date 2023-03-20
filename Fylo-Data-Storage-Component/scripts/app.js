function ProgressBar(node) {
    this.root = node;
    this.min = 0;
    this.max = this.root.getAttribute("aria-valuemax");
    this.updateValue();
}

ProgressBar.prototype.updateValue = function () {
    const value = this.root.getAttribute("aria-valuenow");
    const percentage = ((value - this.min) / (this.max - this.min)) * 100;
    this.root.style.setProperty(
        "--value",
        `${percentage > 100 ? 100 : percentage}%`,
    );
};

document
    .querySelectorAll(".progressbar")
    .forEach((node) => new ProgressBar(node));
