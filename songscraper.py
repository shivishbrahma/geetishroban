
from __future__ import unicode_literals
from bs4 import BeautifulSoup
import requests
import youtube_dl
import re

songs = ['me! taylor swift',
         'let me love you justin',
         'love me like you do',
         'shape of you',
         'closer halsey',
         'perfect',
         'believer imagine',
         'Faded',
         'Girls Like You',
         'i don\'t wanna live forever',
         'Señorita',
         'something just like this']

ydl_opts = {
    'format': 'bestaudio/best',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '128',
    }],
    'outtmpl': 'music/%(id)s.%(ext)s'
    # 'outtmpl': '%(title)s-%(id)s.%(ext)s'
}
json_write = 'let songs=['
for i in songs:
    url = 'https://www.geetilipi.tk/search?q={0}'.format(i)
    req = requests.get(url)
    soup = BeautifulSoup(req.content, 'lxml')
    post_title = soup.findAll("h3", {'class': 'post-title'})
    post_url = post_title[0].find('a')['href']
    req = requests.get(post_url)
    soup = BeautifulSoup(req.content, 'lxml')
    title = post_title[0].text.split('-')[0].replace("\n", '').strip()
    artist = soup.find('p', {'class': 'artist'}).text
    artist = artist.replace('Singer:', '').strip()
    album = soup.find('p', {'class': 'album'}).text
    album = album.replace('Album:', '').strip()
    vid_link = soup.find('iframe')['src']
    vid_link = vid_link.replace('https://www.youtube.com/embed/', '')
    print(title)
    print(artist)
    print(album)
    print(vid_link)
    song = "./music/"+vid_link+".mp3"
    json_write = json_write+"{"+'''
        title:"{0}",
        artist:"{1}",
        album:"{2}",
        src:"{3}"
    '''.format(title, artist, album, song)+"},"
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download(['https://www.youtube.com/watch?v={0}'.format(vid_link)])
json_write = json_write+"]"
with open('./js/songs.js', 'w+') as file:
    file.write(json_write)
