# Home Base

An [Übersicht](http://tracesof.net/uebersicht/) widget. Built for OSX (MacOS).

![Screenshot](screenshot.png)

## Features

* Displays the date and time.
  * Choice between between 12 hr clock and 24 hr clock.
* Displays a search bar.
  * 2 modes: search mode (configurable search engine), and URL mode.
  * Autocomplete suggestions when in search mode through the [Datamuse API](https://www.datamuse.com/api/).
  * Uses local search history.
  * Easily navigable with keyboard (see [Controls](#Controls)).

## Controls
  * Toggle between modes with <kbd>tab</kbd>.
  * Scroll through suggestions with <kbd>↑</kbd> and <kbd>↓</kbd>.
  * Remove an item from local history with <kbd>delete</kbd>.
  * Exit search with <kbd>esc</kbd>.

## Installation

1. Install and run [Übersicht](http://tracesof.net/uebersicht/).
2. In the menu bar, under the Übersicht icon, click **Open Widgets Folder**.
3. Move this folder into the Übersicht widgets folder.
5. (Optional) In the menu bar, under the Übersicht icon, click **Preferences...** and check **Launch Übersicht when I login**.

To customize Home Base's appearance, modify parameters at the top of `index.jsx` and in `themes.json`.
