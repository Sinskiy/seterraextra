const labelBackgroundColor = '#333333'
const lightGray = '#999999'
const darkGray = '#333333'
const gray = '#ebebeb'
const background = '#232323'

const labelAreaSelector = '.game-area_tooltip__uwKTk:not(#createdLabelArea)'
const labelSelector = labelAreaSelector + '>div'
let manageLabelsInterval
let manageLabelsTime = 10

const cornerFlag = '.corner-image_wrapper__6gzbe'
let manageFlagInterval
let manageFlagTime = 100

const quizHeader = '[data-qa="game-map-header"]'
let manageHeaderInterval
let manageHeaderTime = 100

let manageThemeBigInterval
let manageThemeBigTime = 300
let manageThemeSmallInterval
let manageThemeSmallTime = 100

let manageLabelOpacityInterval
let manageLabelOpacityTime = 100

let manageBoldnessInterval
let manageBoldnessTime = 50

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      acceptMessage(message.id, message.state);
})

function getOptions() {
  chrome.storage.local.get(null)
    .then(options => {
      for (let option in options) {
        acceptMessage(option, options[option])
      }
    })
}

function acceptMessage(id, state) {
  if (id == 'labels') {
    manageLabels(state)
  }
  else if (id == 'no_corner_flag') {
    manageFlag(state)
  }
  else if (id == 'dark_quiz_header') {
    manageHeader(state)
  }
  else if (id == 'dark_mode') {
    manageTheme(state)
  }
  else if (id == 'label_opacity') {
    manageLabelOpacity(state)
  }
  else if (id == 'remove_boldness') {
    manageBoldness(state)
  }
  else if (id == 'low_pc_specs') {
    manageLowSpecs(state)
  }
}

function manageLabels(state) {
  clearInterval(manageLabelsInterval)
  manageLabelsInterval = setInterval(changeLabels, manageLabelsTime, state);
}

function changeLabels(state) {
  if (!checkExistence(labelAreaSelector) || !checkExistence(labelSelector)) return

  document.documentElement.style.setProperty('--labelDisplay', 'flex')
  document.querySelector(labelAreaSelector).style.display = 'var(--labelDisplay)'
  document.documentElement.style.setProperty('--labelColor', 'black')
  document.querySelector(labelSelector).style.color = 'var(--labelColor)'
  document.documentElement.style.setProperty('--labelBackgroundColor', 'white')
  document.querySelector(labelSelector).style.background = 'var(--labelBackgroundColor)'

  if (state == 'dark_label') {
    document.documentElement.style.setProperty('--labelBackgroundColor', labelBackgroundColor)
    document.documentElement.style.setProperty('--labelColor', 'white')
  }
  else if (state == 'no_label') {
    document.documentElement.style.setProperty('--labelDisplay', 'none')
  }
}

function manageFlag(state) {
  clearInterval(manageFlagInterval)
  manageFlagInterval = setInterval(changeFlag, manageFlagTime, state);
}

function changeFlag(state) {
  if (!checkExistence(cornerFlag)) return

  if (state) {
    document.querySelector(cornerFlag).style.display = 'none'
  }
  else {
    document.querySelector(cornerFlag).style.display = 'flex'
  }
}

function manageHeader(state) {
  clearInterval(manageHeaderInterval)
  manageHeaderInterval = setInterval(changeHeader, manageHeaderTime, state);
}

function changeHeader(state) {
  if (!checkExistence(quizHeader)) return

  if (state) {
    document.querySelector(quizHeader).style.backgroundColor = 'rgb(0 0 0 / 40%)'
    document.querySelector(quizHeader).style.color = 'white'
  }
  else {
    document.querySelector(quizHeader).style.backgroundColor = 'rgb(255 255 255 / 50%)'
    document.querySelector(quizHeader).style.color = 'black'
  }
}

function manageTheme(state) {
  clearInterval(manageThemeBigInterval)
  clearInterval(manageThemeSmallInterval)
  manageThemeBigInterval = setInterval(changeThemeConstant, manageThemeBigTime, state)
  manageThemeSmallInterval = setInterval(changeThemeVariables, manageThemeSmallTime, state)
}

function changeThemeConstant(state) {
  document.documentElement.style.setProperty('--originallyLight', 'white')
  let originallyLight = '.seterra_content__IQ6lE,.seterra_main__EGcCa'
  document.querySelectorAll(originallyLight).forEach(element => {
    element.style.backgroundColor = 'var(--originallyLight)'
  })

  document.documentElement.style.setProperty('--originallyDark', 'black')
  let originallyDark = 'body,.seterra_root__5mvZs,.button_button__CnARx.button_variantSecondaryInverted__9kX_w,.button_link__xHa3x.button_variantSecondaryInverted__9kX_w'
  document.querySelectorAll(originallyDark).forEach(element => {
    element.style.color = 'var(--originallyDark)'
  })

  document.documentElement.style.setProperty('--links', 'var(--seterra-color-links)')
  document.querySelectorAll('.games-list_linkItem__V_M6y a').forEach(link => {
    link.style.color = 'var(--links)'
  })

  document.documentElement.style.setProperty('--gray', '#ebebeb')

  document.querySelectorAll('.button_button__CnARx.button_variantSecondaryInverted__9kX_w, .button_link__xHa3x.button_variantSecondaryInverted__9kX_w').forEach(button => {
    button.style.border = '.0625rem solid var(--originallyDark)'
  })

  if (state) {
    document.documentElement.style.setProperty('--originallyLight', background)
    document.documentElement.style.setProperty('--originallyDark', 'white')
    document.documentElement.style.setProperty('--links', lightGray)
    document.documentElement.style.setProperty('--gray', darkGray)
  }
  else {
    document.documentElement.style.setProperty('--originallyLight', 'white')
    document.documentElement.style.setProperty('--originallyDark', background)
    document.documentElement.style.setProperty('--links', 'var(--seterra-color-links)')
    document.documentElement.style.setProperty('--gray', gray)
  }
}

function changeThemeVariables(state) {
  if (checkExistence('.game-footer_settingsButton__6xv0w')) {
    if (state) {
      document.querySelector('.game-footer_settingsButton__6xv0w').style.filter = 'none'
    }
    else {
      document.querySelector('.game-footer_settingsButton__6xv0w').style.filter = 'invert(1)'
    }
  }

  if (checkExistence('.highscore_table__MNojq')) {
    document.querySelector('.highscore_table__MNojq').style.backgroundColor = 'var(--originallyLight)'
  }

  if (checkExistence('.modal_colorWhite__4hqsv')) {
    document.querySelector('.modal_colorWhite__4hqsv').style.color = 'var(--originallyDark)'
    document.querySelector('.modal_colorWhite__4hqsv').style.backgroundColor = 'var(--originallyLight)'
    document.querySelector('.modal_closeButton__rq9h_').style.border = '.0625rem solid var(--Dark)'
    if (state) {
      document.querySelector('.modal_closeButton__rq9h_').style.filter = 'invert(1)'
    }
    else {
      document.querySelector('.modal_closeButton__rq9h_').style.filter = 'none'
    }
    if (checkExistence('[data-qa="score-modal-review-button"]')) {
      document.querySelector('[data-qa="score-modal-review-button"]').style.color = 'var(--originallyDark)'
      document.querySelector('[data-qa="score-modal-review-button"]').style.border = '.0625rem solid var(--originallyDark)'
    }
  }

  if (checkExistence('.game-type-map-input_form__VgUbS')) {
    document.querySelector('.game-type-map-input_form__VgUbS').style.backgroundColor = 'var(--originallyLight)'

    document.querySelector('[data-qa="typing-mode-input"]').style.color = 'var(--originallyDark)'
    document.querySelector('[data-qa="typing-mode-input"]').style.backgroundColor = 'var(--originallyLight)'
    if (checkExistence('.game-type-map-input_hint__AFJ47')) {
      document.querySelector('.game-type-map-input_hint__AFJ47').style.color = 'var(--originallyDark)'
      document.querySelector('.game-type-map-input_hint__AFJ47').style.backgroundColor = 'var(--originallyLight)'
    }
  }

  if (checkExistence('.game-flags_gameAreaContainer__tU8wK')) {
    document.querySelector('.game-flags_gameAreaContainer__tU8wK').style.backgroundColor = 'var(--gray)'
  }
}

function manageLabelOpacity(state) {
  clearInterval(manageLabelOpacityInterval)
  manageLabelOpacityInterval = setInterval(changeLabelOpacity, manageLabelOpacityTime, state)
}

function changeLabelOpacity(state) {
  if (checkExistence(labelSelector)) {
    document.querySelector(labelSelector).style.opacity = state
  }
}

function manageBoldness(state) {
  clearInterval(manageBoldnessInterval)
  manageBoldnessInterval = setInterval(changeBoldness, manageBoldnessTime, state);
}

function changeBoldness(state) {
  document.querySelectorAll('strong').forEach(element => {
    element.style.fontWeight = 'normal'
  })
}

function manageLowSpecs(state) {
  const times = [manageLabelsTime, manageFlagTime, manageHeaderTime, manageThemeBigTime, manageThemeSmallTime, manageLabelOpacityTime, manageBoldnessTime]
  if (state) {
    times.forEach(time => time *= 10)
  }
  else {
    times.forEach(time => time /= 10)
  }
}

function checkExistence(element) {
  return document.querySelector(element)
}

// get all options on page load and pass it to the function
window.addEventListener('load', getOptions)