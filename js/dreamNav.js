/*
 * Created  :   1st Feb 2016
 * 
 * author   :   musafar006
 * project  :   dreamNav
 * website  :   musafar.in
 * 
 */

(function ($) {

  var settings;
  $.fn.dreamNav = function (options) {

    settings = $.extend({
      // These are the defaults.
      directions: ["top", "bottom", "right", "left"],
      mousewheel: true
    }, options);

//  Global variables.
//  start: for iterating through four different directions.
//  processing: for ignoring all other events if an event is currently processing.
    window.start = settings.directions[settings.directions.length - 1];
    window.processing = false;

//  Multiple events. Same function: scroll().

//  #1 mouseWheelDown - navigates to next page.
//     mouseWheelUp - navigates to prev page.
//     e.deltaY determines down(-1) or up(1) mousewheel direction.
//     plugin used: "mousewheel"
//     - - - NEED IMPROVEMENT FOR RESPONSIVENESS - - -
    $(window).mousewheel(function (e) {
      if (processing === false && !($(".dn-current").hasClass("dn-noScroll")) && settings.mousewheel === true) {
        e.preventDefault();
        processing = true;
        scroll(e.deltaY, '');
      }
    });

//  #2 onClick anchors
    $(this).click(function (e) {
      e.preventDefault();
      if (processing === true) {
        return false;
      } else {
        processing = true;
        var next = $(this).attr('href');
        scroll(0, next);
      }
    });


//  direction: next or prev. Doesn't consider if nextClick is not empty.
//  nextClick: '' for mousewheel; scroll to next/prev step.
//             id of block for anchor clicks; scroll to the div block containing the passed id.

    return this;
  };


  function scroll(direction, nextClick) {
    var current = $(".dn-current");
    if (direction < 0) {
      var next = current.next(".dreamSteps");
    } else if (direction > 0) {
      var next = current.prev(".dreamSteps");
    } else if (nextClick !== '') {
      var next = $("#" + nextClick);
    }
//    if there is no next/prev page or the same page is clicked, produces a "shake" effect.
    if (next.attr('id') === undefined || next.hasClass("dn-current")) {
      current.animate({
        width: "101%"
      }, 100).animate({
        width: "99%"
      }, 50).animate({
        width: "100%"
      }, 100, function () {
        setTimeout(function () {
          processing = false;
        }, 250);
      });
      return false;
    }

//    iterating through 4 different directions.
    var directions = settings.directions;
    var from = directions[($.inArray(start, directions) + 1) % directions.length];
    start = from;

    if (next.attr('id') !== undefined) {
      current.removeAttr('style');
      next.removeAttr('style');

      if (from === "right") {
        current.animate({
          left: "-100%"
        });
        next.css({"right": "-100%", "display": "block"});
        next.animate({
          right: "1%"
        }, 400).animate({
          right: "-1%"
        }, 100).animate({
          right: 0
        }, 50, afterScroll(current, next));
      }

      if (from === "left") {
        current.animate({
          right: "-100%"
        });
        next.css({"left": "-100%", "display": "block"});
        next.animate({
          left: "1%"
        }, 400).animate({
          left: "-1%"
        }, 100).animate({
          left: 0
        }, 50, afterScroll(current, next));
      }

      if (from === "bottom") {
        current.animate({
          top: "-200%"
        });
        next.css({"top": "100%", "display": "block"});
        next.animate({
          top: "-1%"
        }, 400).animate({
          top: "1%"
        }, 100).animate({
          top: 0
        }, 50, afterScroll(current, next));
      }

      if (from === "top") {
        current.animate({
          top: "200%"
        });
        next.css({"top": "-100%", "display": "block"});
        next.animate({
          top: "1%"
        }, 400).animate({
          top: "-1%"
        }, 100).animate({
          top: 0
        }, 50, afterScroll(current, next));
      }
    }
  }

  function afterScroll(current, next) {
    current.removeClass("dn-current");
    next.addClass("dn-current");
    if (current.hasClass('dn-once')) {
      current.hide().removeClass('dreamSteps');
    }
    setTimeout(function () {
      processing = false;
    }, 250);
  }

}(jQuery));