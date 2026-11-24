// Client-side validation helper functions

export const validateFoodDonation = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'Please provide a descriptive title (at least 5 characters).';
  }

  if (!data.foodType) {
    errors.foodType = 'Please select a food category.';
  }

  if (!data.quantity || Number(data.numericQuantity) <= 0) {
    errors.quantity = 'Please enter a valid quantity.';
  }

  if (!data.description || data.description.trim().length < 15) {
    errors.description = 'Please provide details about preparation, packaging, or diet notes (at least 15 characters).';
  }

  if (!data.availableUntil) {
    errors.availableUntil = 'Please specify when this food is available until.';
  } else {
    const selectedDate = new Date(data.availableUntil);
    const now = new Date();
    if (selectedDate <= now) {
      errors.availableUntil = 'Available-until time must be in the future.';
    }
  }

  if (!data.location || data.location.trim().length < 3) {
    errors.location = 'Please provide a valid pickup location or neighborhood.';
  }

  if (!data.contactPhone && !data.contactEmail) {
    errors.contact = 'Please provide contact information (phone or email).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateMedicineDonation = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'Please enter the brand or full item name (at least 5 characters).';
  }

  if (!data.medicineType) {
    errors.medicineType = 'Please select the medication form (Tablets, Syrup, etc.).';
  }

  if (!data.quantity || Number(data.numericQuantity) <= 0) {
    errors.quantity = 'Please enter a valid quantity.';
  }

  if (!data.expiryDate) {
    errors.expiryDate = 'Expiration date is strictly required for safety verification.';
  } else {
    const expiry = new Date(data.expiryDate);
    const today = new Date();
    // Add 1 month minimum buffer for safety
    const minBuffer = new Date();
    minBuffer.setMonth(today.getMonth() + 1);

    if (expiry <= today) {
      errors.expiryDate = '⛔ CRITICAL: Expired medicines cannot be donated on RescueConnect under any circumstances.';
    } else if (expiry < minBuffer) {
      errors.expiryDate = '⚠️ Warning: Medicine expires within 30 days. Donations must have at least 1 month remaining shelf life.';
    }
  }

  if (!data.batchNumber || data.batchNumber.trim().length < 3) {
    errors.batchNumber = 'Batch / Lot number from packaging is required for safety verification.';
  }

  if (!data.storageRequirements) {
    errors.storageRequirements = 'Please select or specify storage instructions.';
  }

  if (!data.description || data.description.trim().length < 15) {
    errors.description = 'Please describe the seal condition and packaging details (at least 15 characters).';
  }

  if (!data.location || data.location.trim().length < 3) {
    errors.location = 'Please enter the pickup or drop-off location.';
  }

  if (!data.agreedToTerms) {
    errors.agreedToTerms = 'You must confirm that this item is unexpired, un-tampered, and legally eligible for community redistribution.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
