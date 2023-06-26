const allCheckboxes = document.querySelectorAll("input[type=checkbox]");
const colorPickers = document.querySelectorAll("input[type=color]");
const buttons = document.querySelectorAll("button");

// if user is not on seterra
chrome.tabs.query({ active: true, currentWindow: true }).then((item) => {
  if (item[0].url.includes("geoguessr.com/vgp/") === false && item[0].url.includes("geoguessr.com/fl/") === false) {

    // add text
    const body = document.querySelector("body");
    const nourl = document.createElement("h1");
    nourl.innerHTML = "current URL does not contain /vgp/ or /fl/";
    body.appendChild(nourl);

    // disable checkboxes
    allCheckboxes.forEach((checkbox) => checkbox.disabled = true);
    colorPickers.forEach((colorPicker) => colorPicker.disabled = true);
    buttons.forEach((button) => button.disabled = true);

    const allText = document.querySelectorAll("h2");
    allText.forEach((textItem) => textItem.style.color = "#424242");
  }
})

allCheckboxes.forEach((checkbox) => {
  const checkboxID = checkbox.id;
  // if there is true in local storage for checkbox, it'll be checked
  chrome.storage.local.get(checkboxID).then((item) => {
    checkbox.checked = item[[checkboxID]];
  });
})

colorPickers.forEach((colorPicker) => {
  const colorPickerID = colorPicker.id;
  // if there is value in local storage for color picker, it'll has color of this value
  chrome.storage.local.get(colorPickerID).then((item) => {
    colorPicker.value = item[[colorPickerID]];
  });
})

function setStorage() {
  conflictCheckboxes();
  
  const id = this.id;
  const checkboxChecked = this.checked;
  chrome.storage.local.set({[id]: checkboxChecked});
  // boilerplate to get current user tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        // command sends id of checkbox, value sends boolean if it's checked
        command: this.id,
        value: checkboxChecked
      }
    );
  });
}

function setStorageColor() {
  const id = this.id;
  const color = this.value;
  chrome.storage.local.set({[id]: color});
  // boilerplate to get current user tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        // command sends id of checkbox, value sends boolean if it's checked
        command: this.id,
        value: this.value
      }
    );
  });
}

const resetWater = document.querySelector("#reset_water");

resetWater.onclick = function resetWater() {
  const customWater = document.querySelector("#custom_water");
  customWater.value = "#a4d1dc";
  chrome.storage.local.set({"custom_water": customWater.value});;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        // command sends id of checkbox, value sends boolean if it's checked
        command: "custom_water",
        value: this.value 
      }
    );
  });
}



colorPickers.forEach((colorPicker) => colorPicker.addEventListener("change", setStorageColor))
allCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", setStorage))

function conflictCheckboxes() {
  const noLabel = document.querySelector("#no_label");
  const darkLabel = document.querySelector("#dark_label");

  if (darkLabel.checked === true) {
    noLabel.disabled = true;
    noLabel.checked = false;
    chrome.storage.local.set({"no_label": false});
  }
  else noLabel.disabled = false;

  if (noLabel.checked === true) {
    darkLabel.checked = false;
    darkLabel.disabled = true;
    chrome.storage.local.set({"dark_label": false});
  }
  else darkLabel.disabled = false;
}


conflictCheckboxes();