
chrome.storage.sync.get(null, (data) => {
  const mappings = {
    "name": data.fullName,
    "full-name": data.fullName,
    "first-name": data.firstName,
    "firstname": data.firstName,
    "last-name": data.lastName,
    "lastname": data.lastName,
    "email": data.email,
    "e-mail": data.email,
    "phone": data.phone,
    "mobile": data.phone
  };

  if (data.customFields) {
    data.customFields.forEach(({ field, value }) => {
      mappings[field.toLowerCase()] = value;
    });
  }

  const inputs = document.querySelectorAll("input");

  inputs.forEach(input => {
    const key = (input.name || input.id || input.placeholder || "").toLowerCase();
    for (const field in mappings) {
      if (key.includes(field)) {
        input.value = mappings[field];
        input.dispatchEvent(new Event('input', { bubbles: true }));
        break;
      }
    }
  });
});
