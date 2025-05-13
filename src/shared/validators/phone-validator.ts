export function phoneValidator(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length !== 11) {
    return false;
  }

  const isValid = /^(\d{2})9\d{8}$/.test(cleaned);
  return isValid;
}
