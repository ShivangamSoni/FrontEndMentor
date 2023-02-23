class FormField {
    constructor(fieldNode, validators) {
        // Elements
        this.root = fieldNode;
        this.label = this.root.querySelector(".field-label");
        this.input = this.root.querySelector(".field-input");
        this.error = this.root.querySelector(".field-error");

        // Input Validator
        this.validator = validators[this.input.name];

        // Methods
        this.toggleLabel = this.toggleLabel.bind(this);
        this.validate = this.validate.bind(this);
        this.resetError = this.resetError.bind(this);
        this.setError = this.setError.bind(this);

        // Input Change
        this.input.addEventListener("change", this.toggleLabel);
    }

    toggleLabel() {
        if (this.input.value.length > 0) {
            this.label.classList.add("hidden");
        } else {
            this.label.classList.remove("hidden");
        }
    }

    validate() {
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
    }

    resetError() {
        this.error.textContent = "";
        this.root.classList.remove("error");
    }

    setError(error) {
        this.error.textContent = error;
        this.root.classList.add("error");
    }
}

class Form {
    constructor(formNode, validators) {
        this.root = formNode;

        this.fields = [];
        this.root.querySelectorAll(".form-field").forEach((field) => {
            this.fields.push(new FormField(field, validators));
        });

        this.valid = true;

        // Methods
        this.handleSubmit = this.handleSubmit.bind(this);

        // Submit Handler
        this.root.addEventListener("submit", this.handleSubmit);
    }

    handleSubmit(e) {
        e.preventDefault();

        // Reset Validation Boolean
        this.valid = true;

        // Validate All Fields
        this.fields.forEach((field) => {
            if (!field.validate()) {
                this.valid = false;
            }
        });

        // If not Valid Return
        if (!this.valid) return;

        const formData = new FormData(this.root);
        for (let [key, value] of formData.entries()) {
            console.log(`${key} : ${value}`);
        }
    }
}

const form = document.querySelector(".signup-form");
new Form(form, {
    first_name: (value) => {
        let errors = "";
        if (empty(value)) {
            errors = "First Name cannot be empty";
        }
        return errors;
    },
    last_name: (value) => {
        let errors = "";
        if (empty(value)) {
            errors = "Last Name cannot be empty";
        }
        return errors;
    },
    email: (value) => {
        let errors = "";
        if (empty(value)) {
            errors = "Email cannot be empty";
        } else if (!validEmail(value)) {
            errors = "Looks like this is not an email";
        }
        return errors;
    },
    password: (value) => {
        let errors = "";
        if (empty(value)) {
            errors = "Password cannot be empty";
        } else if (!validPassword(value)) {
            errors =
                "Password Should be between 8-20 Characters, containing:\n1 Lower-Case Character\n1 Upper-Case Character\n1 Number\n1 Special Character";
        }
        return errors;
    },
});

function empty(value) {
    return !value || value.trim().length === 0;
}

function validEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
}

function validPassword(password) {
    return password.match(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
    );
}
