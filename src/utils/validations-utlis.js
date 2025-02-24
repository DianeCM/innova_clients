export const createValidator = (value, errors = []) => ({
  getValue: () => value,
  getErrors: () => errors,
  isValid: () => errors.length === 0,
  chain: (fn) => {
    const result = fn(value);
    const newValue = result.getValue();
    const newErrors = result.getErrors();

    // Acumula errores de forma extensible
    return createValidator(newValue, newErrors.length === 0 ? errors : [...errors, ...newErrors]);
  }
});

// Validador genérico para validar una longitud mínima
export const validateMinLength = (minLength) => (value) => {
  return value.length >= minLength
    ? createValidator(value)
    : createValidator(value, [`La longitud debe ser mayor o igual a ${minLength}`]);
};

// Validador genérico para validar una longitud máxima
export const validateMaxLength = (maxLength) => (value) => {
  return value.length <= maxLength
    ? createValidator(value)
    : createValidator(value, [`La longitud debe ser menor o igual a ${maxLength}`]);
};

// Validador genérico para verificar si contiene al menos un número
export const validateContainsNumber = (value) => {
  const hasNumber = /\d/;
  return hasNumber.test(value)
    ? createValidator(value)
    : createValidator(value, ['Debe contener al menos un número']);
};

// Validador genérico para verificar si contiene al menos una letra mayúscula
export const validateContainsUppercaseLetter = (value) => {
  const hasLetter = /[A-Z]/;
  return hasLetter.test(value)
    ? createValidator(value)
    : createValidator(value, ['Debe contener al menos una letra mayúscula']);
};

// Validador genérico para verificar si contiene al menos una letra minúscula
export const validateContainsLowercaseLetter = (value) => {
  const hasLetter = /[a-z]/;
  return hasLetter.test(value)
    ? createValidator(value)
    : createValidator(value, ['Debe contener al menos una letra minúscula']);
};

// Validador de formato de correo electrónico
export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email)
    ? createValidator(email)
    : createValidator(email, ['Formato de correo electrónico inválido']);
};

// Validador compuesto para la contraseña con reglas estándar
export const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 20;

  return createValidator(password)
    .chain(validateMinLength(minLength))
    .chain(validateMaxLength(maxLength))
    .chain(validateContainsNumber)
    .chain(validateContainsUppercaseLetter)
    .chain(validateContainsLowercaseLetter);
};

// Validador simple para nombre de usuario
export const validateUsername = (username) => {
  return username.length === 0
    ? createValidator(username, ["El usuario es requerido"])
    : createValidator(username);
};
