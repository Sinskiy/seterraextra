const setting = document.querySelector(".game-footer_settingsButton__6xv0w");
const rootStyle = document.querySelector(":root").style;
const header = document.querySelector(".game-header_wrapper__82t4V");
const label = document.querySelector(".game-tooltip_tooltip__iJM_6");

let darkmodeInput;
let darkLabelInput;
let dakrMapInput;
let nolabelInput;

let nolabel_interval;

let settingsCheckboxes;

let darkmode = false;
let darkLabel = false;
let darkMap = false;
let nolabel = false;

const dark = "#232323";
const black = "#000"
const light = "#fff";

function addElements()
{
    setTimeout(() => {
        settingsCheckboxes = document.querySelector(".game-footer_checkboxes__Mn_cg");

        const darkmodeLabel = document.createElement("label");
        darkmodeInput = document.createElement("input");
        const darkmodeSpan = document.createElement("span");
        
        const darkLabelLabel = document.createElement("label");
        darkLabelInput = document.createElement("input");
        const darkLabelSpan = document.createElement("span");

        const darkMapLabel = document.createElement("label");
        dakrMapInput = document.createElement("input");
        const darkMapSpan = document.createElement("span");

        const nolabelLabel = document.createElement("label");
        nolabelInput = document.createElement("input");
        const nolabelSpan = document.createElement("span");
        
        if (darkmode)
        {
            darkmodeInput.checked = true;
        }

        if (darkLabel)
        {
            darkLabelInput.checked = true;
        }

        if (darkMap)
        {
            dakrMapInput.checked = true;
        }

        if (nolabel)
        {
            nolabelInput.checked = true;
        }

        createElements(darkmodeLabel, darkmodeInput, darkmodeSpan, "Darkmode");
        createElements(darkLabelLabel, darkLabelInput, darkLabelSpan, "Dark label");
        createElements(darkMapLabel, dakrMapInput, darkMapSpan, "Dark map");
        createElements(nolabelLabel, nolabelInput, nolabelSpan, "No label");

        darkmodeInput.name = "enable-dark-mode";
        darkLabelInput.name = "enable-dark-label";
        dakrMapInput.name = "enable-dark-map";
        nolabelInput.name = "enable-no-label";

        darkmodeInput.addEventListener("change", darkmodeListener);
        darkLabelInput.addEventListener("change", darkLabelListener);
        dakrMapInput.addEventListener("change", darkMapListener);
        nolabelInput.addEventListener("change", nolabelListener);
    }, 100);
}

function createElements(label, input, span, name)
{
    label.classList.add("checkbox_checkbox__ohl1V");
    input.type = "checkbox";
    input.classList.add("checkbox_input__na3pr");
    span.classList.add("checkbox_mark__5JNT4");
    span.classList.add("checkbox_variantLight__QBiSn");
    settingsCheckboxes.appendChild(label);
    label.innerHTML = name;
    label.appendChild(input);
    label.appendChild(span);
    input.addEventListener("change", darkmodeListener);
}

function darkmodeListener()
{
    const html = document.querySelector("html");
    const seterraMain = document.querySelector(".seterra_main__EGcCa");
    const mapQuizGame = document.querySelector(".game-page_titleSecondary__eJvPc");
    const seterraRoot = document.querySelector(".seterra_root__5mvZs");
    const table = document.querySelector(".highscore_table__MNojq");
    const adText = document.querySelector(".sn_ad_label");
    const tipIcon = document.querySelector(".game-footer_infoIcon__pwBav");
    const linksBottom = document.querySelectorAll(".anchor_variantNoUnderline__SPwsd");
    const links = document.querySelectorAll(".games-list_linkItem__V_M6y");
    const type = document.querySelector(".game-type-map-input_form__VgUbS");
    const typeButton = document.querySelector(".game-type-map-input_button__1K9uM");
    if (darkmodeInput.checked)
    {
        darkmode = true;
        html.style.colorScheme = "dark";
        rootStyle.setProperty("--ds-color-white", dark);
        rootStyle.setProperty("--color-white", dark);
        rootStyle.setProperty("--ds-color-black", light);
        rootStyle.setProperty("--color-black", light);
        rootStyle.setProperty("--ds-color-black-90", light);
        setting.style.filter = "none";
        seterraMain.style.background = dark;
        mapQuizGame.style.color = light;
        seterraRoot.style.color = light;
        header.style.background = "hsl(0deg 0% 0% / 50%)";
        linksBottom.forEach((element) => element.style.color = light);
        links.forEach((element) => element.style.setProperty("color", light, "important"));
        if (table?.style)
        {
            table.style.backgroundColor = dark;
        }
        if (adText?.style)
        {
            adText.style.color = light;
        }
        if (type?.style)
        {
            type.style.background = dark;
            typeButton.style.backgroundColor = dark;
        }
        tipIcon.style.filter = "none";
    }
    else if (!darkmodeInput.checked)
    {
        darkmode = false;
        html.style.colorScheme = "light";
        rootStyle.setProperty("--ds-color-white", light);
        rootStyle.setProperty("--color-white", light);
        rootStyle.setProperty("--ds-color-black", dark);
        rootStyle.setProperty("--color-black", dark);
        rootStyle.setProperty("--ds-color-black-90", dark);
        rootStyle.setProperty("--seterra-color-link", dark);
        setting.style.filter = "invert(1)";
        seterraMain.style.background = light;
        mapQuizGame.style.color = dark;
        seterraRoot.style.color = dark;
        linksBottom.forEach((element) => element.style.setProperty("color", light, "important"));
        links.forEach((element) => element.style.setProperty("color", "--seterra-link-color", "important"));
        if (table?.style)
        {
            table.style.backgroundColor = light;
        }
        header.style.background = "hsla(0,0%,100%,.5)";
        if (adText?.style)
        {
            adText.style.color = dark;
        }
        if (type?.style)
        {
            type.style.background = light;
            typeButton.style.backgroundColor = light;
        }
        tipIcon.style.filter = "brightness(100) invert(100%)";
    }
}

function darkLabelListener()
{
    if (darkLabelInput.checked)
    {
        darkLabel = true;
        label.style.background = dark;
        label.style.color = light;
    }
    else if (!darkLabelInput.checked)
    {
        darkLabel = false;
        label.style.background = light;
        label.style.color = black;
    }
}

function darkMapListener()
{
    const water = document.querySelectorAll(".map-styles_water__W49Gr");
    const land = document.querySelectorAll(".map-styles_land__jrZtq");
    if (dakrMapInput.checked)
    {
        darkMap = true;
        water.forEach((waterElement) => waterElement.style.fill = "#0c2151");
        land.forEach((landElement) => landElement.style.setProperty("stroke", "#a59dde", "important"));
        header.style.background = "hsl(0deg 0% 0% / 20%)";
        header.style.color = light;
    }
    else if (!dakrMapInput.checked)
    {
        darkMap = false;
        water.forEach((waterElement) => waterElement.style.fill = "#a4d1dc");
        land.forEach((landElement) => landElement.style.setProperty("stroke", "--seterra-color-gray", "important"));
        header.style.background = "hsla(0,0%,100%,.5)";
        header.style.color = black;
    }
}

function nolabelListener()
{
    if (nolabelInput?.checked)
    {
        nolabel = true;
        if (label?.style)
        {
            label.style.opacity = "0";
        }
        intervalChecker();
    }
    else if (!nolabelInput?.checked)
    {
        clearInterval(nolabel_interval);
        nolabel = false;
        label.style.opacity = ".8"; 
    }
}

function intervalChecker()
{
    nolabel_interval = setInterval(() => {
        let updatedLabel = document.querySelector(".game-tooltip_tooltip__iJM_6");
        if (updatedLabel?.style)
        {
            updatedLabel.style.opacity = "0";
        }
    }, 100);
}

function gamemodeChangeListener()
{
    if (darkmode)
    {
        darkmodeListener();
    }
}

const gamemods = document.querySelectorAll('input[name="game-mode"]');
gamemods.forEach((gamemode) => gamemode.addEventListener("change", gamemodeChangeListener));
setting.addEventListener("click", addElements);