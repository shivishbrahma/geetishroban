// Player Object
const player = {};
// Set the index to the player
player.index = 0;
player.loop = 0;
// Load audio element
player.song = $('audio').get(0);
// Load Song of Index (index)
player.loadSong = () => {
  $('.playlist .list-group-item').removeClass('active');
  $($('.playlist .list-group-item').get(player.index)).addClass('active');
  player.song.src = songs[player.index]['src'];
  $('.picture').attr('src', songs[player.index]['img']);
  $('.metadata').text(
    songs[player.index]['title'] + ' - ' + songs[player.index]['artist']
  );
  player.song.loop = false;
  player.song.autoplay = true;
  player.song.load();
};
//Load Playlist
player.loadPlaylist = () => {
  const playlist = $('.playlist');
  songs.forEach((item, index) => {
    text = item['title'] + ' - ' + item['artist'];
    songListItem = $('<div></div>').text('');
    span = $('<span></span>').text(text);
    songListItem.append(span);
    songListItem.attr('class', 'marquee-list');
    divwrap = $('<li></li>').text('');
    divwrap.attr('class', 'list-group-item bg-transparent');
    divwrap.append(songListItem);
    divwrap.dblclick(() => {
      player.index = index;
      player.loadSong();
    });
    playlist.append(divwrap);
  });
};
// Play pause
player.playPause = () => {
  $(event.target).toggleClass('fa-play');

  $(event.target).toggleClass('fa-pause');
  if (player.song.paused) {
    player.song.play();
    // console.log(song.textTracks);
  } else {
    player.song.pause();
  }
};
// Convert seconds to Time
convertSecToTime = s => {
  let date = new Date(null);
  date.setSeconds(s); // specify value for SECONDS here
  return date.toISOString().substr(11, 8);
};
// Go to the next song
player.nextSong = () => {
  player.index = (player.index + 1) % songs.length;
  player.loadSong();
  // player.song.play();
};
// Go to the prev song
player.prevSong = () => {
  player.index = (player.index + songs.length - 1) % songs.length;
  player.loadSong();
  // player.song.play();
};

$(document).ready(() => {
  player.loadPlaylist();
  player.loadSong();
  let shift = 0;
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
  $('audio').bind('loadeddata', () => {
    $('.play-pause').addClass('fa-play');
    $('.play-pause').removeClass('fa-pause');
  });
  $('audio').bind('ended', () => {
    $('.play-pause').addClass('fa-play');
    $('.play-pause').removeClass('fa-pause');
    if (player.loop <= 1) {
      if (!(player.index == songs.length - 1 && player.loop == 0))
        player.nextSong();
    }
  });
  $('audio').bind('playing', () => {
    $('.play-pause').removeClass('fa-play');
    $('.play-pause').addClass('fa-pause');
  });
  $('audio').bind('timeupdate', () => {
    const element = event.target;
    $('.volume-slider').val(element.volume);
    $('.music-slider').val(element.currentTime);
    $('.start-time').text(convertSecToTime(element.currentTime));
    if (!isNaN(element.duration)) {
      $('.music-slider').attr('max', element.duration);
      $('.end-time').text(convertSecToTime(element.duration));
    }
  });
  if (!player.song.canPlayType('audio/mpeg')) {
    $('.msg-txt').removeClass('alert-success');
    $('.msg-txt').addClass('alert-danger');
    $('.msg-txt').text("Can't play mp3");
  } else {
    $('.msg-txt').addClass('alert-success');
    $('.msg-txt').removeClass('alert-danger');
    $('.msg-txt').text('Can play mp3');
  }
  $('.play-pause').click(player.playPause);
  $('.music-slider').on('input', () => {
    player.song.currentTime = $(event.target).val();
  });

  $('.volume-slider').on('input', () => {
    player.song.volume = $(event.target).val();
  });
  $('.fa-step-backward').click(() => {
    player.song.currentTime -= 10;
  });
  $('.fa-step-forward').click(() => {
    player.song.currentTime += 10;
  });

  $('.fa-step-backward').dblclick(() => {
    player.prevSong();
  });
  $('.fa-step-forward').dblclick(() => {
    player.nextSong();
  });
  $('.fa-repeat').click(() => {
    player.loop = (player.loop + 1) % 3;
    className = $(event.target).attr('class');
    className = className.replace('gray-loop', '').replace('green-loop', '');
    if (player.loop == 2) {
      player.song.loop = true;
      className = className + ' gray-loop';
    } else {
      player.song.loop = false;
      if (player.loop == 1) className = className + ' green-loop';
    }
    $(event.target).attr('class', className);
  });
});
