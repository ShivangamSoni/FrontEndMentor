function FormField(node, validator) {
    this.root = node;
    this.input = this.root.querySelector(".field__input");
    this.error = this.root.querySelector(".field__error");
    this.validator = validator;
}

FormField.prototype.setError = function (error) {
    this.input.setAttribute("aria-invalid", true);
    this.error.textContent = error;
    this.error.setAttribute("aria-hidden", false);
};

FormField.prototype.resetError = function () {
    this.input.setAttribute("aria-invalid", false);
    this.error.textContent = "";
    this.error.setAttribute("aria-hidden", true);
};

FormField.prototype.validate = function () {
    if (!this.validator) {
        return true;
    }

    this.resetError();
    const error = this.validator(this.input.value);
    if (!error) {
        return true;
    }

    this.setError(error);
    return false;
};

const emailField = new FormField(
    document.querySelector(".notify__field"),
    (value) => {
        let errors = "";
        if (empty(value)) {
            errors = "Whoops! It looks like you forgot to add your email";
        } else if (!validEmail(value)) {
            errors = "Please provide a valid Email Address";
        }
        return errors;
    },
);

const notifyForm = document.querySelector(".notify__form");
notifyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const valid = emailField.validate();

    if (!valid) return;

    const formData = new FormData(e.target);
    for (let [key, value] of formData.entries()) {
        console.log(`${key} : ${value}`);
    }

    e.target.reset();
});

function empty(value) {
    return !value || value.trim().length === 0;
}

function validEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
}
