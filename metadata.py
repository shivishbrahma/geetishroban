from mutagen.easyid3 import EasyID3
from mutagen.id3 import ID3, TORY, TYER, TPUB, APIC, USLT, COMM

import os
from PIL import Image
from PIL import ImageDraw
import io
import pandas as pd
#%%
def convJson(string):
    string = str(string).replace('\n','<br>').replace('\"','&quot;').replace("\'","&apos;")
    return string
#%%

music = os.listdir('../music')
music = sorted(music)
s = "["
for m in music:
    src=m
    m = '../music/'+m
    audiofile = EasyID3(m)
    audio = ID3(m)

    src = m[2:]
    s = s + "{"
    # src
    s = s + "\"{0}\":\"{1}\",".format('src', convJson(src))
    for i in audiofile:
        print(i, ": ", audiofile[i][0])
        s = s + "\"{0}\":\"{1}\",".format(i, convJson(audiofile[i][0]))
    # Lyrics
    if 'USLT:Lyrics:XXX' in audio:
        s = s + "\"{0}\":\"{1}\",".format('lyrics', convJson(audio['USLT:Lyrics:XXX']))
        print(audio['USLT:Lyrics:XXX'])
    else:
        s = s + "\"{0}\":\"{1}\",".format('lyrics', '')
    # Cover
    imgurl = "../images/{0}-{1}.jpeg".format(convJson(audiofile['title'][0]),convJson(audiofile['artist'][0]))
    
    stream = io.BytesIO(audio['APIC:Cover'].data)
    img = Image.open(stream)
    img.save(imgurl)
    draw = ImageDraw.Draw(img)
    imgurl = imgurl[3:]
    s = s + "\"{0}\":\"{1}\"".format('img', imgurl)
    s = s + "},"

s = s + "]"
with open('../js/songs.json', 'w') as fp:
    fp.write(s)
#%%
def joinJson(file1, file2):
    s=""