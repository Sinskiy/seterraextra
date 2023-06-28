// run this every page load to make header dark if user chose dark quiz header and custom water
const storageDarkHeaderOnUpdate = chrome.storage.local.get("dark_quiz_header")
  .then((item) => {
    acceptMessage("dark_quiz_header", item.dark_quiz_header)
  });

// const storageWaterOnUpdate = chrome.storage.local.get("custom_water")
//   .then((item) => {
//     acceptMessage("custom_water", item.custom_water)
//   });


let clickEventListener;
let anotherClickEvenListener;
let keyboardEventListener;

let darkHeader = false;
let darkMode = false;

let white = "#fff";
let dark = "#232323";
let lightGray = "#A0A0A0";
let black = "#000";

// listens to messages (messages can only be send from popup.js on check)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      acceptMessage(message.command, message.value);
});

// check message data
function acceptMessage(changedInputID, inputValue) {
  if (changedInputID === "no_label") {
    if (inputValue === true) {
      manageLabel(inputValue);
    }
  }

  if (changedInputID === "no_corner_flag") {
    manageCornerFlag(inputValue);
  }

  if (changedInputID === "dark_label") {
    manageDarkLabel(inputValue);
  }

  if (changedInputID === "dark_quiz_header") {
    manageHeader(inputValue);
  }

  if (changedInputID === "dark_mode") {
    manageDarkMode(inputValue);
  }

  // if (changedInputID === "custom_water") {
  //   manageWater(inputValue);
  // }
}

function manageLabel(boolean) {
  const label = ".game-tooltip_tooltip__iJM_6";
  if (document.querySelector(label) !== null && boolean === true) {
    document.querySelector(label).style.display = "none";
  }
}

function manageCornerFlag(boolean) {
  const cornerFlag = ".corner-image_wrapper__6gzbe";
  if (document.querySelector(cornerFlag) !== null && boolean === true) {
    document.querySelector(cornerFlag).style.display = "none";
  }
  else if (document.querySelector(cornerFlag) !== null && boolean === false) {
    document.querySelector(cornerFlag).style.display = "flex";
  }
}

function manageDarkLabel(boolean) {
  const label = ".game-tooltip_tooltip__iJM_6";;
  if (document.querySelector(label) !== null && boolean === true) {
    document.querySelector(label).style.color = "white";
    document.querySelector(label).style.background = "hsla(0,0%,0%,.7)";
  }
  else if (document.querySelector(label) !== null && boolean === false) {
    document.querySelector(label).style.color = "black";
    document.querySelector(label).style.background = "hsla(0,0%,100%,.9)";
  }
}

function manageHeader(boolean) {
  const header = document.querySelector(".game-header_wrapper__82t4V");
  if (boolean === true && header !== null) {
    header.style.background = "hsla(0,0%,0%,.3)";
    header.style.color = "white";
    darkHeader = true;
  }
  else if (boolean === false && header !== null) {
    header.style.background = "hsla(0,0%,100%,.5)"
    header.style.color = "black";
    darkHeader = false;
  }
}

function manageDarkMode(boolean, fromTimer) {
  darkMode = boolean;

  const backgroundBorders = document.querySelector(".seterra_content__IQ6lE");
  const mainBackground = document.querySelector(".seterra_main__EGcCa");

  const root = document.querySelector(":root");

  const settings = document.querySelector(".game-footer_cog__ZBpOb");
  const info = document.querySelector(".game-footer_infoIcon__pwBav");

  const blueLinks = document.querySelectorAll(".games-list_linkItem__V_M6y a");
  const buttons = document.querySelectorAll(".button_button__CnARx.button_variantSecondaryInverted__9kX_w, .button_link__xHa3x.button_variantSecondaryInverted__9kX_w");
  if (boolean === true) {
    backgroundBorders.style.background = dark;
    backgroundBorders.style.color = white;
    mainBackground.style.background = dark;

    root.style.colorScheme = "dark";

    blueLinks.forEach((link) => link.style.color = lightGray);
    buttons.forEach((button) => {
      button.style.color = white;
      button.style.border = `.0625rem solid ${white}`;
    })

    if (fromTimer === true) {
      const buttonType = ".game-type-map-input_button__1K9uM"
      const modal = ".modal_colorWhite__4hqsv";
      const close = ".modal_closeButton__rq9h_ img";
      const table = ".highscore_table__MNojq";

      if (document.querySelector(buttonType) !== null) document.querySelector(buttonType).style.color = dark;

      if (document.querySelector(modal) !== null) {
        document.querySelector(modal).style.background = dark;
        document.querySelector(modal).style.color = white;
        document.querySelector(close).style.filter = "none";
      }

      if (document.querySelector(table) !== null) document.querySelector(table).style.backgroundColor = dark;

      if (settings !== null) {
        settings.style.filter = "invert(1)";
        info.style.filter = "none";
      }
    }
  }
  
  else {
    backgroundBorders.style.background = white;
    backgroundBorders.style.color = black;
    mainBackground.style.background = white;

    root.style.colorScheme = "light";

    blueLinks.forEach((link) => link.style.color = "var(--seterra-color-link)");
    buttons.forEach((button) => {
      button.style.color = "var(--ds-color-black-90)";
      button.style.border = ".0625rem solid rgb(255 255 255 / 90%)"
    })


    if (fromTimer === true) {
      const buttonType = ".game-type-map-input_button__1K9uM"
      const modal = ".modal_colorWhite__4hqsv";
      const close = ".modal_closeButton__rq9h_ img";
      const table = ".highscore_table__MNojq";

      if (document.querySelector(buttonType) !== null) document.querySelector(buttonType).style.color = white;

      if (document.querySelector(modal) !== null) {
        document.querySelector(modal).style.background = white;
        document.querySelector(modal).style.color = black;
        document.querySelector(close).style.filter = "invert(1)";
      }

      if (document.querySelector(table) !== null) document.querySelector(table).style.backgroundColor = white;

      if (settings !== null) {
        settings.style.filter = "none";
        info.style.filter = "brightness(100) invert(100%)";
      }
    }
  }
}

// function manageWater(value) {
//   const water = document.querySelector(".map-styles_water__W49Gr");
//   if (water !== null) water.style.fill = value;
// }

function onResponseNoLabel(item) {
  // if no_label is true it'll remove. else it'll add label 
  manageLabel(item.no_label);
}

function onResponseDarkLabel(item) {
  // if dark_label is true it'll change label to dark. else it'll change label to light
  manageDarkLabel(item.dark_label);
}

function onResponseDarkMode(item) {
  let sendFromTimer = true;
  // if darkmode is true, it'll add dark mode. else it'll bring back light mode
  manageDarkMode(item.dark_mode, sendFromTimer);
}

function onReject(error) {
  // if error in response
  console.error(error);
}

// WARNING! SETTED MANUALLY!
setInterval(() => {
  const storageDarkHeader = chrome.storage.local.get("dark_quiz_header")
  .then((item) => manageHeader(item.dark_quiz_header))

  const storageCornerFlag = chrome.storage.local.get("no_corner_flag")
  .then((item) => manageCornerFlag(item.no_corner_flag));

  // const storageCustomWater = chrome.storage.local.get("custom_water")
  // .then((item) => manageWater(item.custom_water));

  const header = document.querySelector(".game-header_wrapper__82t4V");
  if (darkHeader === false && header !== null) {
    header.style.color = "black";
    header.style.background = "hsla(0,0%,100%,.5)";
  }
  else if (darkHeader === true && header !== null) {
    header.style.color = "white";
    header.style.background = "hsla(0,0%,0%,.3)";
  }


}, 1000);

// WARNING! SETTED MANUALLY!
setInterval(() => {
  const storageCheckboxNoLabel = chrome.storage.local.get("no_label")
  .then(onResponseNoLabel, onReject);
  const storageDarkLabel = chrome.storage.local.get("dark_label")
  .then(onResponseDarkLabel, onReject);
  const storageDarkMode = chrome.storage.local.get("dark_mode")
  .then(onResponseDarkMode, onReject);
}, 100);