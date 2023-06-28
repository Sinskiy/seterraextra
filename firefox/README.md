### Installation guide
First of all, there is already uploaded extension in Firefox Add-on store, but it's outdated. There's only nocursor and exact time (that should be removed)

[Extension](https://addons.mozilla.org/en-US/firefox/addon/seterraextra/)

1. Download ZIP file of my repo or clone my repo. 

    Also you can download my repo through Google Drive

    [Google drive link](https://drive.google.com/drive/folders/1XYGCOgVajFCmjEfepXV15uPLTsE-RWYX?usp=drive_link)

    <details>
    <summary>GitHub clone repo</summary>

    ```
    git clone https://github.com/Sinskiy/seterraextra.git
    ```

    with github cli
    ```
    gh repo clone Sinskiy/seterraextra
    ```
    </details>

2. Extract your zip file

3. Go to url [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)

4. Choose "Load Temporary Add-on..."

6. Load **manifest.json** inside of **firefox** folder

7. I suggest to pin Seterra extra. 

    Click on extensions icon, then click settings icon next to the *Seterra extra* extension, and choose *pin to toolbar*

### Usage guide
#### General notes:
- If something isn't working, try to restart the page. If it didn't help, create an issues on GitHub repo, or contact me about issue in Discord: @sinskiy_
- Extention works only on pages, that contain */vgp/*, */fl/* or */ in their url

This extensions adds following features for Seterra:
- **No label**. When enabled, you don't have label with the name of the country you need to click and flag of that country.

    **Notes**:
    - To return your label you either need to finish your quiz or restart the page.
    - Can't be enabled when dark label is enabled

    <br/>

- **No corner flag**. When enabled, flag in the top right corner of the quiz is invisible

- **Dark label**. When enabled, background of label with the name of the country you need to click and flag of that country turns dark, and text on the label turns white.

    **Notes**:
    - Can't be enabled when no label is enabled

    <br/>

- **Dark quiz header**. When enabled, header of the current quiz (that thing on the top of the quiz that displays the timer and more) turns dark

- **Darkmode**. When enabled, background turns dark, and color turns white (actually there were a lot of small issues to fix, so that's not as simple as sounds)

There is a custom water feature in Chrome version of extension, but Firefox version doesn't have this feature because Firefox color picker works really different. Probably I'll add this feature in Firefox soon
