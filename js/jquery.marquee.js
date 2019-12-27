(function($) {
  $.fn.textWidth = function() {
    var calc = document.createElement('span');
    $(calc).text($(this).text());
    $(calc).css({
      position: 'absolute',
      visibility: 'hidden',
      height: 'auto',
      width: 'auto',
      'white-space': 'nowrap'
    });
    $('body').append(calc);
    var width = $(calc).width();
    $(calc).remove();
    return width;
  };

  $.fn.marquee = function(args) {
    var that = $(this);
    var textWidth = that.textWidth(),
      offset = that.width(),
      width = offset,
      css = {
        'text-indent': that.css('text-indent'),
        overflow: that.css('overflow'),
        'white-space': that.css('white-space')
      },
      marqueeCss = {
        'text-indent': width,
        overflow: 'hidden',
        'white-space': 'nowrap'
      },
      args = $.extend(
        true,
        {
          count: -1,
          speed: 1e1,
          leftToRight: false
        },
        args
      ),
      i = 0,
      stop = textWidth * -1,
      dfd = $.Deferred();

    function go() {
      if (that.css('overflow') != 'hidden') {
        that.css('text-indent', width + 'px');
        return false;
      }
      if (!that.length) return dfd.reject();

      if (width <= stop) {
        i++;
        if (i == args.count) {
          that.css(css);
          return dfd.resolve();
        }
        if (args.leftToRight) {
          width = textWidth * -1;
        } else {
          width = offset;
        }
      }
      that.css('text-indent', width + 'px');
      if (args.leftToRight) {
        width++;
      } else {
        width--;
      }
      setTimeout(go, args.speed);
    }

    if (args.leftToRight) {
      width = textWidth * -1;
      width++;
      stop = offset;
    } else {
      width--;
    }
    that.css(marqueeCss);
    go();
    return dfd.promise();
  };
  // $('h1').marquee();
  $('.marquee').marquee();
  $('.marquee')
    .mouseover(function() {
      $(this).removeAttr('style');
    })
    .mouseout(function() {
      $(this).marquee();
    });
})(jQuery);
