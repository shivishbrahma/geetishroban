# ![icon](images/icons/geetishroban_light.png) GeetiShroban
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A jQuery and html based music playing app with a python scraper and youtube downloader

## Features

- Playlist (switch to any song on double click)
- Play, Pause and Step Back and Forward on click and Next and Prev Song on double click
- Volume increase and decrease
- Added keyboard shortcuts
- Added lyrics and song info

## Keyboard ShortCuts

| Shortcuts           | Action                           |
| ------------------- | -------------------------------- |
| Direction Key Up    | Previous song in playlist        |
| Direction Key Down  | Next song in playlist            |
| Direction Key Left  | Step 10s backward song duration  |
| Direction Key Right | Step 10s forward song duration   |
| Enter key           | Play or pause a song             |
| Key V               | Volume up by 10%                 |
| Key M               | Volume down by 10%               |
| Key R               | Repeat in loop or song or normal |

## Steps

- Clone the entire repository

  `git clone https://github.com/shivishbrahma/geetishroban`

- Install the requirements of the python (Python 3)

  `cd geetishroban`

  `pip install -r -I requirements.txt`

- Download the tracks using spotdl package

  `spotdl -s "Alone Alan Walker`

- Extract images and metadata into songs.json using metadata.py script

  `python metadata.py`

- Run the index.html in your browser (if problems occurs use node server or serve using vscode servers).

## New Features to be added

- Lyrics play along with the songs
- New themes for the player
- Player skins
- Playlist add and delete optionsll
