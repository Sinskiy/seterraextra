const allCheckboxes = document.querySelectorAll("input[type=checkbox]");
// const colorPickers = document.querySelectorAll("input[type=color]");
// const buttons = document.querySelectorAll("button");

chrome.tabs.query({ active: true, currentWindow: true }).then((item) => {
  // if user is not on seterra
  if (item[0].url.includes("/vgp/") === false && item[0].url.includes("/fl/") === false) {
    // add text that he isn't on seterra
    const body = document.querySelector("body");
    const nourl = document.createElement("h1");
    nourl.innerHTML = "current URL does not contain /vgp/ or /fl/";
    body.appendChild(nourl);

    // disable checkboxes, buttons and colorpickers
    allCheckboxes.forEach((checkbox) => checkbox.disabled = true);
    // colorPickers.forEach((colorPicker) => colorPicker.disabled = true);
    // buttons.forEach((button) => button.disabled = true);

    // make text gray
    const allText = document.querySelectorAll("h2");
    allText.forEach((textItem) => textItem.style.color = "#424242");
  }
})

allCheckboxes.forEach((checkbox) => {
  const checkboxID = checkbox.id;

  // if there is true in local storage for checkbox, it'll be checked
  // (true means that checkbox has been checked)
  chrome.storage.local.get(checkboxID).then((item) => {
    checkbox.checked = item[[checkboxID]];
  });
})

// colorPickers.forEach((colorPicker) => {
//   const colorPickerID = colorPicker.id;

//   if there is value in local storage for color picker, it'll has color of this value
//   chrome.storage.local.get(colorPickerID).then((item) => {
//     colorPicker.value = item[[colorPickerID]];
//   });
// })

function setStorage() {
  // dark label and no label can't be enabled at the same time
  conflictCheckboxes();
  
  const id = this.id;
  const checkboxChecked = this.checked;

  // for example, if user checked checkbox "no_label", 
  // then there will be "no_label": true in local storage
  // if user unchecked checkbox "dark_mode", 
  // then there will be "dark_mode": false in local storage
  chrome.storage.local.set({[id]: checkboxChecked});

  // boilerplate to get current user tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        // command sends id of checkbox, value sends boolean of state (true - checked, false - unchecked)
        command: this.id,
        value: checkboxChecked
      }
    );
  });
}

// function setStorageColor() {
//   const id = this.id;
//   const color = this.value;

//   for example, if user set custom water color to #BADA55, 
//   then there will be "custom_water": "#BADA55" in local storage
//   chrome.storage.local.set({[id]: color});

//   boilerplate to get current user tab
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       {
//         command sends id of colorpicker and color value
//         command: this.id,
//         value: this.value
//       }
//     );
//   });
// }

// button that resets water color
// const resetWater = document.querySelector("#reset_water");

// resetWater.onclick = function resetWater() {

//   colorpicker
//   const customWater = document.querySelector("#custom_water");

//   standart water color
//   customWater.value = "#a4d1dc";

//   chrome.storage.local.set({"custom_water": customWater.value});

//   boilerplate to get current tab
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       {
//         command sends id of colorpicker, value sends standart water color
//         command: "custom_water",
//         value: this.value 
//       }
//     );
//   });
// }


// if user has changed value or state in colorpicker or checkbox, these functions will be triggered
// colorPickers.forEach((colorPicker) => colorPicker.addEventListener("change", setStorageColor))
allCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", setStorage))

function conflictCheckboxes() {
  // checkboxes
  const noLabel = document.querySelector("#no_label");
  const darkLabel = document.querySelector("#dark_label");

  // make no label unchecked and impossible to check,
  // if dark label is checked
  if (darkLabel.checked === true) {
    noLabel.disabled = true;
    noLabel.checked = false;

    // and change local storage state of no label
    chrome.storage.local.set({"no_label": false});
  }
  else noLabel.disabled = false;

  // make dark label unchecked and impossible to check,
  // if no label is checked
  if (noLabel.checked === true) {
    darkLabel.disabled = true;
    darkLabel.checked = false;

    // and change local storage state of dark label
    chrome.storage.local.set({"dark_label": false});
  }

  // enable dark label if no label isn't checked
  else darkLabel.disabled = false;
}

// run this function on popup open
conflictCheckboxes();