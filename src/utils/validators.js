export function validateContactForm(data) {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  const phoneRegex = /^[\d\s+\-()]{7,20}$/;
  if (!data.phone?.trim()) {
    errors.phone = 'Phone is required';
  } else if (!phoneRegex.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!data.message?.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}
