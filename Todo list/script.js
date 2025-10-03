const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const countrySelect = document.getElementById("countrySelect");

// Store countries
let countries = [];

// Add new country
addBtn.addEventListener("click", () => {
  const country = taskInput.value.trim();

  if (country === "") {
    alert("Please enter a country name!");
    return;
  }

  // Prevent duplicates
  if (!countries.includes(country)) {
    countries.push(country);

    // Add to dropdown
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  } else {
    alert("Country already exists!");
  }

  taskInput.value = "";
});

// Show selected country in list
countrySelect.addEventListener("change", () => {
  const selected = countrySelect.value;
  renderSelectedCountry(selected);
});

// Render only the selected country
function renderSelectedCountry(country) {
  taskList.innerHTML = "";

  if (!country) return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = country;
  li.appendChild(span);

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit";
  editBtn.onclick = () => editCountry(country);
  li.appendChild(editBtn);

  // Delete Button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete";
  delBtn.onclick = () => deleteCountry(country);
  li.appendChild(delBtn);

  taskList.appendChild(li);
}

// Edit country
function editCountry(oldCountry) {
  const newCountry = prompt("Edit Country:", oldCountry);

  if (newCountry && newCountry.trim() !== "") {
    const index = countries.indexOf(oldCountry);
    countries[index] = newCountry.trim();

    // Update dropdown option
    [...countrySelect.options].forEach(opt => {
      if (opt.value === oldCountry) {
        opt.value = newCountry.trim();
        opt.textContent = newCountry.trim();
      }
    });

    renderSelectedCountry(newCountry.trim());
    countrySelect.value = newCountry.trim();
  }
}

// Delete country
function deleteCountry(country) {
  countries = countries.filter(c => c !== country);

  // Remove from dropdown
  [...countrySelect.options].forEach(opt => {
    if (opt.value === country) {
      opt.remove();
    }
  });

  taskList.innerHTML = "";
  countrySelect.value = "";
}
