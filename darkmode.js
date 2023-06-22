const setting = document.querySelector(".game-footer_settingsButton__6xv0w");
let settingsCheckboxes;
let darkmode = false;
function addElements()
{
    setTimeout(() => {
        settingsCheckboxes = document.querySelector(".game-footer_checkboxes__Mn_cg");
        const darkmodeLabel = document.createElement("label");
        const darkmodeInput = document.createElement("input");
        const darkmodeSpan = document.createElement("span");
        
        if (darkmode)
        {
            darkmodeInput.checked = true;
        }
        createElements(darkmodeLabel, darkmodeInput, darkmodeSpan, "Darkmode");
        darkmodeInput.name = "enable-dark-mode";
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
    const rootStyle = document.querySelector(":root").style;
    const seterraRoot = document.querySelector(".seterra_root__5mvZs");
    const table = document.querySelector(".highscore_table__MNojq");
    const header = document.querySelector(".game-header_wrapper__82t4V");
    const adText = document.querySelector(".sn_ad_label");
    const tipIcon = document.querySelector(".game-footer_infoIcon__pwBav");
    const linksBottom = document.querySelectorAll(".anchor_variantNoUnderline__SPwsd");
    const dark = "#232323";
    const light = "#fff";
    if (this.checked)
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
        linksBottom.forEach((element) => element.style.color = light);
        if (table?.style)
        {
            table.style.background = dark;
        }
        header.style.background = "hsl(0deg 0% 0% / 50%)";
        if (adText?.style)
        {
            adText.style.color = light;
        }
        tipIcon.style.filter = "none";
    }
    else 
    {
        darkmode = false;
        html.style.colorScheme = "light";
        rootStyle.setProperty("--ds-color-white", light);
        rootStyle.setProperty("--color-white", light);
        rootStyle.setProperty("--ds-color-black", dark);
        rootStyle.setProperty("--color-black", dark);
        rootStyle.setProperty("--ds-color-black-90", dark);
        setting.style.filter = "invert(1)";
        seterraMain.style.background = light;
        mapQuizGame.style.color = dark;
        seterraRoot.style.color = dark;
        linksBottom.forEach((element) => element.style.setProperty("color", light, "important"));
        if (table?.style)
        {
            table.style.background = light;
        }
        header.style.background = "hsla(0,0%,100%,.5)";
        if (adText?.style)
        {
            adText.style.color = dark;
        }
        tipIcon.style.filter = "brightness(100) invert(100%)";
    }
}

setting.addEventListener("click", addElements);