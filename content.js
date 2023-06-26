// run this every page load to make header dark if user chose dark quiz header
const storageDarkHeaderOnUpdate = chrome.storage.local.get("dark_quiz_header")
  .then((item) => {
    acceptMessage("dark_quiz_header", item.dark_quiz_header)
  });
const storageWaterOnUpdate = chrome.storage.local.get("custom_water")
  .then((item) => {
    acceptMessage("custom_water", item.custom_water)
  });


let clickEventListener;
let anotherClickEvenListener;
let keyboardEventListener;

let exactTimeOnScreen = false;
let blockExactTime = false;

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
  if (changedInputID === "exact_time") {
    if (inputValue === true) {
      // first remove every listener to not create duplicates
      removeEventListener("click", clickEventListener);
      removeEventListener("mousedown", anotherClickEvenListener);
      removeEventListener("keydown", keyboardEventListener);
      // add event listeners again
      clickEventListener = window.addEventListener("click", getExactTime);
      keyboardEventListener = window.addEventListener("keydown", resetExactTimeWasShown);
      anotherClickEvenListener = window.addEventListener("mousedown", resetExactTimeWasShown);
      blockExactTime = false;
    } else {
      // remove every event listener
      removeEventListener("click", clickEventListener);
      removeEventListener("mousedown", anotherClickEvenListener);
      removeEventListener("keydown", keyboardEventListener);
      // if true, exact time will not be shown
      blockExactTime = true;
    }
  }

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

  if (changedInputID === "custom_water") {
    manageWater(inputValue);
  }
}

function getExactTime() {
  const modalWindow = ".modal_content__mrR0Q";
  // if there are no modal window, or exact time was shown, or exact time need to be blocked, user won't see exact time
    if (document.querySelector(modalWindow) !== null && exactTimeOnScreen === false && blockExactTime === false) {
        const everyElementInModal = document.querySelectorAll(".initial-score-view_cell__or6bz");
        everyElementInModal.forEach((element) => {
          // the only element with title keep exact time in its title
            if (element.title !== "") {
                const exactTime = element.title;
                addElementExactTime(exactTime);
            }
        })
    }
}

function resetExactTimeWasShown() {
  const modalWindow = ".modal_content__mrR0Q";
  // if no modal window, set exact time on screehn to false, because user already restarted the quiz
  if (document.querySelector(modalWindow) === null) {
    exactTimeOnScreen = false;
  }
}

// creates element with exact time
function addElementExactTime(exactTime) {
  const exactTimeWrapper = document.createElement("div");
  exactTimeWrapper.classList.add("initial-score-view_cell__or6bz");
  const exactTimeName = document.createElement("div");
  exactTimeName.innerText = "Exact time";
  exactTimeName.classList.add("body-text_sizeSmall__hhbe1");
  const exactTimeTime = document.createElement("div");
  exactTimeTime.innerText = exactTime;
  exactTimeTime.classList.add("label_sizeSmall__nPGP5");

  const modalInfo = document.querySelector(".initial-score-view_info__zJdwU");
  modalInfo.appendChild(exactTimeWrapper);
  exactTimeWrapper.appendChild(exactTimeName);
  exactTimeWrapper.appendChild(exactTimeTime);
  // if element was created, then exact time is on screen
  exactTimeOnScreen = true;

  keyboardEventListener = window.addEventListener("keydown", resetExactTimeWasShown);
  anotherClickEvenListener = window.addEventListener("mousedown", resetExactTimeWasShown);
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

function manageWater(value) {
  const water = document.querySelector(".map-styles_water__W49Gr");
  if (water !== null) water.style.fill = value;
}

function onResponseExactTime(item) {
  if (item.exact_time === true) {
    removeEventListener("click", clickEventListener);
    clickEventListener = window.addEventListener("click", getExactTime);
    blockExactTime = false;
  }
  else if (item.exact_time === false) {
    removeEventListener("click", clickEventListener);
    removeEventListener("mousedown", anotherClickEvenListener);
    removeEventListener("keydown", keyboardEventListener);
    blockExactTime = true;
  }
}

function onResponseNoLabel(item) {
  // if no_label is true it'll remove. else it'll add label 
  manageLabel(item.no_label);
}

function onResponseDarkLabel(item) {
  // if no_label is true it'll remove. else it'll add label 
  manageDarkLabel(item.dark_label);
}

function onResponseDarkMode(item) {
  manageDarkMode(item.dark_mode, true);
}

function onReject(error) {
  console.error(error);
}

// WARNING! SETTED MANUALLY!
setInterval(() => {
  const storageCheckboxExactTime = chrome.storage.local.get("exact_time")
  .then(onResponseExactTime, onReject);
  const storageDarkHeader = chrome.storage.local.get("dark_quiz_header")
  .then((item) => manageHeader(item.dark_quiz_header))

  const storageCornerFlag = chrome.storage.local.get("no_corner_flag")
  .then((item) => manageCornerFlag(item.no_corner_flag));

  const storageCustomWater = chrome.storage.local.get("custom_water")
  .then((item) => manageWater(item.custom_water));

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
setInterval(() => {
  const storageCheckboxNoLabel = chrome.storage.local.get("no_label")
  .then(onResponseNoLabel, onReject);
  const storageDarkLabel = chrome.storage.local.get("dark_label")
  .then(onResponseDarkLabel, onReject);
  const storageDarkMode = chrome.storage.local.get("dark_mode")
  .then(onResponseDarkMode, onReject);
}, 100);