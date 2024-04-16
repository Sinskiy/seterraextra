const labelBackgroundColor = "#333333";
const lightGray = "#999999";
const darkGray = "#333333";
const gray = "#ebebeb";
const background = "#232323";

const labelAreaSelector = ".game-area_tooltip__Ns9Yi:not(#createdLabelArea)";
const labelSelector = labelAreaSelector + ">div";
let manageLabelsInterval;
let manageLabelsTime = 10;

const cornerFlag = '[data-qa="game-map-header"]+div';
let manageFlagInterval;
let manageFlagTime = 100;

const quizHeader = '[data-qa="game-map-header"]';
let manageHeaderInterval;
let manageHeaderTime = 100;

let manageThemeBigInterval;
let manageThemeBigTime = 300;
let manageThemeSmallInterval;
let manageThemeSmallTime = 100;

let manageLabelOpacityInterval;
let manageLabelOpacityTime = 100;

let manageBoldnessInterval;
let manageBoldnessTime = 50;

chrome.runtime.onMessage.addListener((message) => {
  acceptMessage(message.id, message.state);
});

function getOptions() {
  chrome.storage.local.get(null).then((options) => {
    for (let option in options) {
      console.log(option);
      acceptMessage(option, options[option]);
    }
  });
}

function acceptMessage(id, state) {
  if (id == "labels") {
    manageLabels(state);
  } else if (id == "no_corner_flag") {
    manageFlag(state);
  } else if (id == "dark_quiz_header") {
    manageHeader(state);
  } else if (id == "dark_mode") {
    manageTheme(state);
  } else if (id == "label_opacity") {
    manageLabelOpacity(state);
  } else if (id == "remove_boldness") {
    manageBoldness(state);
  } else if (id == "low_pc_specs") {
    manageLowSpecs(state);
  }
}

function manageLabels(state) {
  clearInterval(manageLabelsInterval);
  manageLabelsInterval = setInterval(changeLabels, manageLabelsTime, state);
}

function changeLabels(state) {
  if (!checkExistence(labelAreaSelector) || !checkExistence(labelSelector)) {
    return;
  }

  document.documentElement.style.setProperty("--labelDisplay", "flex");
  document.querySelector(labelAreaSelector).style.display =
    "var(--labelDisplay)";
  document.documentElement.style.setProperty("--labelColor", "black");
  document.querySelector(labelSelector).style.color = "var(--labelColor)";
  document.documentElement.style.setProperty("--labelBackgroundColor", "white");
  document.querySelector(labelSelector).style.background =
    "var(--labelBackgroundColor)";

  if (state == "dark_label") {
    document.documentElement.style.setProperty(
      "--labelBackgroundColor",
      labelBackgroundColor
    );
    document.documentElement.style.setProperty("--labelColor", "white");
  } else if (state == "no_label") {
    document.documentElement.style.setProperty("--labelDisplay", "none");
  }
}

function manageFlag(state) {
  clearInterval(manageFlagInterval);
  manageFlagInterval = setInterval(changeFlag, manageFlagTime, state);
}

function changeFlag(state) {
  if (!checkExistence(cornerFlag)) return;

  if (state) {
    document.querySelector(cornerFlag).style.display = "none";
  } else {
    document.querySelector(cornerFlag).style.display = "flex";
  }
}

function manageHeader(state) {
  clearInterval(manageHeaderInterval);
  manageHeaderInterval = setInterval(changeHeader, manageHeaderTime, state);
}

function changeHeader(state) {
  if (!checkExistence(quizHeader)) return;

  if (state) {
    document.querySelector(quizHeader).style.backgroundColor =
      "rgb(0 0 0 / 40%)";
    document.querySelector(quizHeader).style.color = "white";
  } else {
    document.querySelector(quizHeader).style.backgroundColor =
      "rgb(255 255 255 / 50%)";
    document.querySelector(quizHeader).style.color = "black";
  }
}

function manageTheme(state) {
  clearInterval(manageThemeBigInterval);
  clearInterval(manageThemeSmallInterval);
  manageThemeBigInterval = setInterval(
    changeThemeConstant,
    manageThemeBigTime,
    state
  );
  manageThemeSmallInterval = setInterval(
    changeThemeVariables,
    manageThemeSmallTime,
    state
  );
}

function changeThemeConstant(state) {
  let originallyLight = ".seterra_content__nGh5_,.seterra_main__mwfLw";
  document.querySelectorAll(originallyLight).forEach((element) => {
    element.style.backgroundColor = "var(--originallyLight)";
  });

  let originallyDark =
    "body,.seterra_root__NV8MT,.button_button__aR6_e.button_variantSecondaryInverted__6G2ex";
  document.querySelectorAll(originallyDark).forEach((element) => {
    element.style.color = "var(--originallyDark)";
  });

  document.querySelectorAll(".games-list_linkItem__YHl_Y a").forEach((link) => {
    link.style.color = "var(--links)";
  });

  document
    .querySelectorAll(
      ".button_button__aR6_e.button_variantSecondaryInverted__6G2ex"
    )
    .forEach((button) => {
      button.style.border = ".0625rem solid var(--originallyDark)";
    });

  if (state) {
    document.documentElement.style.setProperty("--originallyLight", background);
    document.documentElement.style.setProperty("--originallyDark", "white");
    document.documentElement.style.setProperty("--links", lightGray);
    document.documentElement.style.setProperty("--gray", darkGray);
  } else {
    document.documentElement.style.setProperty("--originallyLight", "white");
    document.documentElement.style.setProperty("--originallyDark", background);
    document.documentElement.style.setProperty(
      "--links",
      "var(--seterra-color-links)"
    );
    document.documentElement.style.setProperty("--gray", gray);
  }
}

function changeThemeVariables(state) {
  if (checkExistence(".game-footer_settingsButton__qIHi5")) {
    if (state) {
      document.querySelector(
        ".game-footer_settingsButton__qIHi5"
      ).style.filter = "none";
    } else {
      document.querySelector(
        ".game-footer_settingsButton__qIHi5"
      ).style.filter = "invert(1)";
    }
  }

  if (checkExistence(".audio-player_playButton__vwNa2")) {
    if (state) {
      document.querySelector(".audio-player_playButton__vwNa2").style.filter =
        "none";
    } else {
      document.querySelector(".audio-player_playButton__vwNa2").style.filter =
        "invert(1)";
    }
  }

  if (checkExistence(".highscore_table__oKrYg")) {
    document.querySelector(".highscore_table__oKrYg").style.backgroundColor =
      "var(--originallyLight)";
  }

  if (checkExistence(".game-type-map-input_form__TuvQM")) {
    document.querySelector(
      ".game-type-map-input_form__TuvQM"
    ).style.backgroundColor = "var(--originallyLight)";

    document.querySelector('[data-qa="typing-mode-input"]').style.color =
      "var(--originallyDark)";
    document.querySelector(
      '[data-qa="typing-mode-input"]'
    ).style.backgroundColor = "var(--originallyLight)";
    document.querySelector(".game-type-map-input_button__MuD1c").style.color =
      "var(--originallyDark)";
  }

  if (checkExistence(".game-flags_gameAreaContainer__tU8wK")) {
    document.querySelector(
      ".game-flags_gameAreaContainer__tU8wK"
    ).style.backgroundColor = "var(--gray)";
  }

  if (checkExistence('[data-qa="show-more-gamemodes-button"]')) {
    document.querySelector(
      '[data-qa="show-more-gamemodes-button"]'
    ).style.color = "var(--originallyDark)";
  }
}

function manageLabelOpacity(state) {
  clearInterval(manageLabelOpacityInterval);
  manageLabelOpacityInterval = setInterval(
    changeLabelOpacity,
    manageLabelOpacityTime,
    state
  );
}

function changeLabelOpacity(state) {
  if (checkExistence(labelSelector)) {
    document.querySelector(labelSelector).style.opacity = state;
  }
}

function manageBoldness(state) {
  clearInterval(manageBoldnessInterval);
  manageBoldnessInterval = setInterval(
    changeBoldness,
    manageBoldnessTime,
    state
  );
}

function changeBoldness(state) {
  document.querySelectorAll("strong").forEach((element) => {
    if (state) {
      element.style.fontWeight = "normal";
    } else {
      element.style.fontWeight = "bold";
    }
  });
}

function manageLowSpecs(state) {
  const times = [
    manageLabelsTime,
    manageFlagTime,
    manageHeaderTime,
    manageThemeBigTime,
    manageThemeSmallTime,
    manageLabelOpacityTime,
    manageBoldnessTime,
  ];
  if (state === true) {
    times.forEach((time) => (time *= 10));
  } else {
    times.forEach((time) => (time /= 10));
  }
}

function checkExistence(element) {
  return document.querySelector(element);
}

// get all options on page load and pass it to the function
window.addEventListener("load", getOptions);
