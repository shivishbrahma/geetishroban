$(() => {
  // Player Object
  const player = {};
  player.settings = {
    volume: 1,
    track: 2
  };
  player.fn = {};

  //Setting containers
  player.container = {
    playpause: $('#play-pause'),
    volumeSlider: $('#volume-slider'),
    musicSlider: $('#music-slider'),
    lyrics: $('#lyrics'),
    picture: $('#picture'),
    playlist: $('#playlist'),
    endTime: $('#end-time'),
    startTime: $('#start-time'),
    repeat: $('#repeat'),
    forward: $('#step-forward'),
    backward: $('#step-backward'),
    songInfo: $('#song-info')
  };

  player.fn.saveItems = () => {
    localStorage.setItem('volume', player.settings.volume);
    localStorage.setItem('track', player.settings.track);
  };
  player.fn.loadItems = () => {
    player.settings.volume = localStorage.getItem('volume');
    player.settings.track = localStorage.getItem('track');
  };
  // Set the index to the player
  player.index = 0;
  player.loop = 0;
  // Load audio element
  player.song = new Audio();

  // Convert seconds to Time
  convertSecToTime = s => {
    let date = new Date(null);
    date.setSeconds(s); // specify value for SECONDS here
    return date.toISOString().substr(11, 8);
  };

  // Load Song of Index (index)
  player.fn.loadSong = () => {
    player.container.playlist
      .children('.list-group-item')
      .removeClass('active');
    $(
      player.container.playlist.children('.list-group-item').get(player.index)
    ).addClass('active');
    player.container.playlist
      .children('.list-group-item')
      .get(player.index)
      .scrollIntoView();
    player.playlist[player.index]['lyrics'] = player.playlist[player.index][
      'lyrics'
    ].replace(/(?:\r\n|\r|\n)/g, '<br>');
    player.container.endTime.text(
      convertSecToTime(player.playlist[player.index]['length'])
    );
    player.container.lyrics.html(player.playlist[player.index]['lyrics']);
    player.song.src = player.playlist[player.index]['src'];
    player.container.picture.attr('src', player.playlist[player.index]['img']);
    $('.metadata').text(
      player.playlist[player.index]['title'] +
        ' - ' +
        player.playlist[player.index]['artist']
    );
    player.fn.loadSongInfo();
    player.song.loop = false;
    player.song.autoplay = true;
    player.song.load();
  };

  //Load Playlist
  player.fn.loadPlaylist = () => {
    player.playlist.forEach((item, index) => {
      text = item['title'] + ' - ' + item['artist'];
      songListItem = $('<div></div>').text('');
      span = $('<span></span>').html(text);
      songListItem.append(span);
      songListItem.attr('class', 'marquee-list');
      divwrap = $('<li></li>').text('');
      divwrap.attr('class', 'list-group-item bg-transparent');
      divwrap.append(songListItem);
      divwrap.dblclick(() => {
        player.index = index;
        player.fn.loadSong();
      });
      player.container.playlist.append(divwrap);
    });
  };

  // Play pause
  player.fn.playPause = () => {
    player.container.playpause.toggleClass('fa-play');

    player.container.playpause.toggleClass('fa-pause');
    if (player.song.paused) {
      player.song.play();
      // console.log(song.textTracks);
    } else {
      player.song.pause();
    }
  };

  // Go to the next song
  player.fn.nextSong = () => {
    player.index = (player.index + 1) % player.playlist.length;
    player.fn.loadSong();
    // player.song.play();
  };
  // Go to the prev song
  player.fn.prevSong = () => {
    player.index =
      (player.index + player.playlist.length - 1) % player.playlist.length;
    player.fn.loadSong();
    // player.song.play();
  };
  // Step forward
  player.fn.stepForward = () => {
    player.song.currentTime += 10;
  };
  // Step backward
  player.fn.stepBackward = () => {
    player.song.currentTime -= 10;
  };

  // Volume up
  player.fn.volumeUp = () => {
    if (player.song.volume < 1) {
      player.song.volume = player.song.volume + 0.1;
      player.container.volumeSlider.val(player.song.volume);
    }
  };

  // Volume down
  player.fn.volumeDown = () => {
    if (player.song.volume > 0) {
      player.song.volume = player.song.volume - 0.1;
      player.container.volumeSlider.val(player.song.volume);
    }
  };

  // Repeat
  player.fn.repeat = () => {
    player.loop = (player.loop + 1) % 3;
    className = player.container.repeat.attr('class');
    className = className.replace('gray-loop', '').replace('green-loop', '');
    if (player.loop == 2) {
      player.song.loop = true;
      className = className + ' gray-loop';
    } else {
      player.song.loop = false;
      if (player.loop == 1) className = className + ' green-loop';
    }
    player.container.repeat.attr('class', className);
  };

  // Load Song Info
  player.fn.loadSongInfo = () => {
    let table = $('<table>').addClass('table songinfotable');
    rowHeads = [
      'Title',
      'Album',
      'Date',
      'TrackNumber',
      'Performer',
      'Lyricist',
      'Organization',
      'Genre',
      'Copyright',
      'Website'
    ];
    for (i = 0; i < rowHeads.length; i++) {
      let row = $('<tr>').html(
        '<td> <b>' +
          rowHeads[i] +
          '</b></td>' +
          '<td>' +
          player.playlist[player.index][rowHeads[i].toString().toLowerCase()] +
          '</td>'
      );
      table.append(row);
    }
    player.container.songInfo.html(table);
  };

  // Init Player
  $(player.song).bind('loadeddata', () => {
    player.container.playpause.addClass('fa-play');
    player.container.playpause.removeClass('fa-pause');
  });
  $(player.song).bind('ended', () => {
    player.container.playpause.addClass('fa-play');
    player.container.playpause.removeClass('fa-pause');
    if (player.loop <= 1) {
      if (!(player.index == player.playlist.length - 1 && player.loop == 0))
        player.fn.nextSong();
    }
  });
  $(player.song).bind('playing', () => {
    player.container.playpause.removeClass('fa-play');
    player.container.playpause.addClass('fa-pause');
  });
  // Update with progress
  $(player.song).bind('timeupdate', () => {
    const element = event.target;
    player.container.volumeSlider.val(element.volume);
    player.container.musicSlider.val(element.currentTime);
    player.container.startTime.text(convertSecToTime(element.currentTime));
    if (!isNaN(element.duration)) {
      player.container.musicSlider.attr('max', element.duration);
      player.container.endTime.text(convertSecToTime(element.duration));
    }
  });

  // Shortcut keys
  $(document).bind('keydown', evt => {
    switch (evt.keyCode) {
      case 13:
        player.fn.playPause(); // Enter Keypress
        break;
      case 37:
        player.fn.stepBackward(); // Left Direction Key
        break;
      case 38:
        player.fn.prevSong(); // Up Direction keypress
        break;
      case 39:
        player.fn.stepForward(); // Right Direction Keypress
        break;
      case 40:
        player.fn.nextSong(); // Down Direction keypress
        break;
      case 77:
        player.fn.volumeDown(); // Key M press
        break;
      case 82:
        player.fn.repeat(); // Key R press
        break;
      case 86:
        player.fn.volumeUp(); // Key V press
        break;
    }
  });

  $(document).ready(() => {
    $.ajax({
      dataType: 'json',
      success: function(data) {
        player.playlist = data;
        player.fn.loadPlaylist();
        player.fn.loadSong();
        console.log(player.playlist.length);

        // console.log($('.metadata').innerWidth());

        width = $('.metadata').innerWidth() + 10;
        $('.marquee').css('transform', `translateX(${width / 2}px)`);
        const marquee = anime({
          targets: '.marquee',
          autoplay: true,
          delay: 0,
          translateX: -width,
          duration: width * 55,
          loop: true,
          easing: 'linear'
        });
        const marqueeList = anime({
          targets: '.marquee-list',
          autoplay: true,
          delay: (el, i, l) => {
            return i * 200;
          },
          endDelay: (el, i, l) => {
            return (l - i) * 200;
          },
          translateX: -width,
          duration: width * 55,
          loop: true,
          easing: 'linear'
        });
        $('.marquee-list').hover(
          () => {
            marqueeList.restart();
            marqueeList.pause();
          },
          () => {
            marqueeList.play();
          }
        );

        if (!player.song.canPlayType('audio/mpeg')) {
          $('.msg-txt').removeClass('alert-success');
          $('.msg-txt').addClass('alert-danger');
          $('.msg-txt').text("Can't play mp3");
        } else {
          $('.msg-txt').addClass('alert-success');
          $('.msg-txt').removeClass('alert-danger');
          $('.msg-txt').text('Can play mp3');
        }

        player.container.playpause.click(player.fn.playPause);
        player.container.musicSlider.on('input', () => {
          player.song.currentTime = $(event.target).val();
        });

        player.container.volumeSlider.on('input', () => {
          player.song.volume = $(event.target).val();
        });

        player.container.backward.click(player.fn.stepBackward);
        player.container.forward.click(player.fn.stepForward);

        player.container.backward.dblclick(player.fn.prevSong);

        player.container.forward.dblclick(player.fn.nextSong);

        player.container.repeat.click(player.fn.repeat);
      },
      url: '/js/songs.json'
    });
  });
});
