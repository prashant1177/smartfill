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
      if (field) mappings[field.toLowerCase()] = value;
    });
  }

  // Autofill logic for any form control
  const allFields = document.querySelectorAll("input, select, textarea");

  allFields.forEach(field => {
    const key = (
      field.name || 
      field.id || 
      field.placeholder || 
      field.getAttribute("aria-label") || 
      ""
    ).toLowerCase().trim();

    let matchedValue = null;

    if (mappings[key]) {
      matchedValue = mappings[key];
    } else {
    
      for (const mapKey in mappings) {
        if (key.includes(mapKey)) {
          matchedValue = mappings[mapKey];
          break;
        }
      }
    }

    if (matchedValue != null) {
      if (field.type === "radio" || field.type === "checkbox") {
        if (field.value.toLowerCase() === matchedValue.toString().toLowerCase()) {
          field.checked = true;
        }
      } else {
        field.value = matchedValue;
      }

      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
});
