LOGAN MIMS PORTFOLIO - HOW TO EDIT
==================================

This is a plain HTML / CSS / JavaScript website. It does not use any AI service,
build tools, or accounts. You can edit it with any text editor (Notepad, TextEdit
in plain-text mode, VS Code).

FOLDER MAP
  index.html        The page shell. You don't need to edit it.
  js/content.js     ALL your text, projects, links, and image paths. Edit this.
  js/main.js        Builds the page from content.js. Don't edit.
  css/style.css     Colors and fonts. Edit the values at the top if you want.
  images/           Your logo, photo, and project images.

TO PREVIEW
  Double-click index.html. It opens in your browser. After editing a file, save
  it and refresh the browser.

COMMON EDITS (all in js/content.js)
  Change your name, bio, or tools     Edit the text inside the quote marks.
  Change the top navigation labels    Edit the "label" values under nav.
  Change contact links                Edit the links list under contact.

  Add a project
    1. Put the image in the images/ folder (JPG or PNG, ideally under 500 KB).
    2. In content.js, copy one whole project block, from { to }, including the
       comma after it, and paste it below the last project.
    3. Change title, category, description, image ("images/your-file.jpg"), and
       link. Use "" for no image or no link.

  Add or rename a category (Industrial design / UI/UX / Other)
    Edit the categories list. Each project's "category" must match one "id".

  Remove a project
    Delete its whole block, from { to }, including the comma.

  Change the photo or logo
    Replace images/portrait.jpg or images/logo.png with a new file of the same
    name, or change the path in content.js.

  Remove the faded drawings behind the headline
    Set backgroundSketches to "" in content.js.

  Change colors
    Open css/style.css and edit the hex codes at the top (for example
    --accent:#E60F4C;).

IF THE PAGE GOES BLANK
  You most likely deleted a quote mark or a comma in content.js. Undo the last
  change and check that every line inside a { } block ends with a comma except
  the last one, and that text is wrapped in matching "quote marks".

PUTTING IT ONLINE (free options)
  - Netlify Drop (app.netlify.com/drop): drag this whole folder onto the page.
  - GitHub Pages: upload the folder to a repository and turn on Pages.
  - Any web host: upload the folder's contents to the site's public folder.

NOTES
  - The fonts (Bricolage Grotesque and Instrument Sans) load from Google Fonts.
    If they can't load, the site falls back to your device's default fonts.
  - Everything else works offline.
