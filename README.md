# geetishroban

A jQuery and html based music playing app with a python scraper and youtube downloader

## Features

- Playlist (switch to any song on double click)

- Play, Pause and Step Back and Forward on click and Next and Prev Song on double click

- Volume increase and decrease

- Added keyboard shortcuts

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

- Download the songs using songscraper.py

  `python songscraper.py`

  [Note : You can install any other songs by changing songs array where you insert the song search queries. Here I used my own blog... [Geetilipi](http://geetilipi.tk), so many songs are not there, kindly check there.]

- Run the index.html in your browser.

## New Features to be added

- Lyrics play along with the songs
- New themes for the player
- Player skins
- Playlist add and delete options
