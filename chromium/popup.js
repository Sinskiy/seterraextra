const checkboxes = document.querySelectorAll('input[type="checkbox"');
const radios = document.querySelectorAll('input[name="labels"]');
const slider = document.querySelector('input[type="range"]');

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs[0].title.includes("Seterra") || tabs[0].url.includes("pdf")) {
    document
      .querySelectorAll("input")
      .forEach((input) => (input.disabled = true));
    const p = document.createElement("p");
    p.innerText = "Can't use; not a Seterra quiz";
    p.style.display = "flex";
    p.style.justifyContent = "center";
    document.querySelector("#options-wrapper").appendChild(p);
  }
});

checkboxes.forEach((element) => getStorage(element));
// get checked radio and slider value
getStorage(null, true);

async function getStorage(element, nonCheckboxes = false) {
  // if radio is true, this is a radio button
  if (!nonCheckboxes) {
    // if there is true in local storage for button, it'll be checked
    // (true means that button has been checked)
    const isChecked = await chrome.storage.local.get(element.id);
    element.checked = isChecked[element.id];
  } else {
    const checkedRadioID = await chrome.storage.local.get(["labels"]);
    const checkedRadioElement = document.getElementById(
      checkedRadioID["labels"]
    );
    checkedRadioElement.checked = true;

    let sliderValue = await chrome.storage.local.get(["label_opacity"]);
    slider.value = sliderValue["label_opacity"];
  }
}

function setStorageCheckbox() {
  const isChecked = this.checked;

  /* if user checked button 'no_quiz_header',
  there will be 'no_quiz_header': true in local storage
  if user unchecked button 'dark_mode',
  then there will be 'dark_mode': false in local storage */
  chrome.storage.local.set({ [this.id]: isChecked });
  sendMessage(this.id, isChecked);
}

function setStorageRadio() {
  /* if user checked button 'no_label,
  there will be 'labels': 'no_label' in local storage */
  chrome.storage.local.set({ ["labels"]: this.id });
  sendMessage("labels", this.id);
}

function setStorageSlider() {
  chrome.storage.local.set({ ["label_opacity"]: this.value });
  sendMessage("label_opacity", this.value);
}

function sendMessage(identificator, state) {
  // boilerplate to get current user tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      id: identificator,
      state: state,
    });
  });
}

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", setStorageCheckbox)
);
radios.forEach((radio) => radio.addEventListener("change", setStorageRadio));
slider.addEventListener("change", setStorageSlider);
