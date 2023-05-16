function FormField(field, validators) {
  // Elements
  this.root = field;
  this.input = this.root.querySelector('input');
  this.icon = this.root.querySelector('.field__icon');
  this.error = this.root.querySelector('.field__error');

  // Validator
  this.validator = validators ? validators[this.input.name] : null;
}

FormField.prototype.resetError = function resetError() {
  this.icon.classList.add('hidden');
  this.error.textContent = '';
  this.error.setAttribute('aria-hidden', true);
};

FormField.prototype.setError = function setError(error) {
  this.icon.classList.remove('hidden');
  this.error.textContent = error;
  this.error.setAttribute('aria-hidden', false);
};

FormField.prototype.validate = function validate() {
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

function Form(formNode, validators, onSubmit) {
  this.root = formNode;
  this.fields = [...this.root.querySelectorAll('.form__field')].map(
    (field) => new FormField(field, validators),
  );

  this.valid = true;
  this.onSubmit = onSubmit;

  this.root.addEventListener('submit', (e) => this.handleSubmit(e));
}

Form.prototype.handleSubmit = function handleSubmit(e) {
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
  this.onSubmit(formData);
};

function empty(value) {
  return !value || value.trim().length === 0;
}

function validEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

const contentForm = new Form(
  document.querySelector('.content__form'),
  {
    email(value) {
      let errors = '';
      if (empty(value)) {
        errors = 'Email cannot be Empty';
      } else if (!validEmail(value)) {
        errors = 'Please provide a Valid Email';
      }
      return errors;
    },
  },
  (formData) => {
    for (let [key, value] of formData.entries()) {
      console.log(`${key} : ${value}`);
    }
  },
);
