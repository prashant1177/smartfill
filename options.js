
const customFieldsContainer = document.getElementById('custom-fields');
const addFieldBtn = document.getElementById('add-field');

chrome.storage.sync.get(null, (data) => {
  document.getElementById('firstName').value = data.firstName || '';
  document.getElementById('lastName').value = data.lastName || '';
  document.getElementById('fullName').value = data.fullName || '';
  document.getElementById('email').value = data.email || '';
  document.getElementById('phone').value = data.phone || '';

  if (data.customFields) {
    data.customFields.forEach(({ field, value }) => {
      addCustomField(field, value);
    });
  }
});

document.getElementById('autofill-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const customFieldData = [];
  document.querySelectorAll('.custom-field').forEach(row => {
    const field = row.querySelector('.field-name').value.trim();
    const value = row.querySelector('.field-value').value.trim();
    if (field) customFieldData.push({ field, value });
  });

  const data = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    customFields: customFieldData
  };

  chrome.storage.sync.set(data, () => alert('Saved successfully!'));
});

addFieldBtn.addEventListener('click', () => addCustomField());

function addCustomField(field = '', value = '') {
  const row = document.createElement('div');
  row.className = 'field-row custom-field'; // Add custom-field class here
  row.innerHTML = `
    <input class="field-name" placeholder="Field name" value="${field}">
    <input class="field-value" placeholder="Field value" value="${value}">
    <button type="button" class="remove-button">✕</button>
  `;
  row.querySelector('button').addEventListener('click', () => row.remove());
  customFieldsContainer.appendChild(row);
}
