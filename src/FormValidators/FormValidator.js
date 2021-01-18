export function textFormValidator() {
  return {
    required: 'This field is required',
    minLength: { value: 4, message: 'min length of this field is 4' },
    maxLenght: { value: 20, message: 'max length of this field is 20' },
  }
}

export function emailFormValidator() {
  return {
    required: 'This field is required',
    maxLength: {
      value: 30,
      message: 'Email shouldnot be more than 30 characters long',
    },
    validate: (value) => {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'Email is invalid'
    },
  };
}
export function passwordFormValidator() {
  return {
    required: 'This field is required',
    minLength: { value: 8, message: 'Password must be minimum 8 letters long' },
    validate: (value) => {
      return [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
        pattern.test(value)
      ) || 'Password must include a-z, A-Z, @..and 0-9';
    },
  };
}
export function confirmPasswordValidator(getValues) {
  return {
    required: 'This field is required',
    validate: (value) => value === getValues().password || 'passwords doesnt match',
  };
}

export function numberValidator() {
  return {
    required: 'price is required',
    min: { value: 1, message: 'min price is 1 rupee' },
  }
}
