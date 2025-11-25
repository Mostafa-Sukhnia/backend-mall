export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const vallidatePassword = (password) => {
    const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
}

export const validateUsername = (username) => {
    const regex =  /^[a-zA-Z\u0600-\u06FF\s'-]{2,30}$/;
    return regex.test(username);
}

export const validateDateOfBirth = (dateOfBirth) => {
    const regEx = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d\.\d{3}Z$/;
    return regEx.test(dateOfBirth);
}

export const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phoneNumber);
}

export const validateLocation = (coords) => {
  const { latitude, longitude, accuracy } = coords;

  if (!latitude || !longitude) {
    return { valid: false, message: "Missing location data" };
  }

  const isLatValid = latitude >= -90 && latitude <= 90;
  const isLongValid = longitude >= -180 && longitude <= 180;

  if (!isLatValid || !isLongValid) {
    return { valid: false, message: "Invalid latitude or longitude range" };
  }

  if (accuracy && accuracy <= 0) {
    return { valid: false, message: "Invalid accuracy value" };
  }

  return { valid: true };
};
