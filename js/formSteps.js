/*
 * Created on: 3rd Feb 2016
 * 
 * author   :   musafar006
 * project  :   dreamNav
 * company  :   musafar.in
 * 
 * inherited from dreamNav.js
 * 
 */

$(document).ready(function () {
//  $('textarea').autosize();
  var ta = $('textarea');
  ta.on('focus', function () {
    ta.autosize();
  });

  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: '-100:+0'
  });

  var maxHeight = -1;
  $('.formSteps').each(function () {
    maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
  });
  $("#applyForm").height(maxHeight);

  window.formProcessing = false;
  $(".proceed").click(function () {
    formScroll("next");
  });
  $(".back").click(function () {
    formScroll("prev");
  });

  function formScroll(direction) {
    var active = $(".formSteps.active");

    if (direction === "next") {
//      Validation
      var inputs = active.find(".form-control");
      flag = false;
      inputs.each(function () {
        if (this.checkValidity() === false && false) { // remove AND condition to include validation
          $("#applyForm").find(':submit').click();
          flag = true;
        }
      });
      if (flag === true) {
        return false;
      }

      var next = active.next(".formSteps");
      if (next.attr('id') === undefined) {
        formProcessing = false;
        return false;
      }
      active.removeAttr('style');
      next.removeAttr('style');
      active.animate({
        left: "-200%"
      });
      next.css({"right": "-100%", "display": "block"});
      next.animate({
        right: "1%"
      }, 400).animate({
        right: "-1%"
      }, 100).animate({
        right: 0
      }, 50, function () {
        active.removeClass("active");
        next.addClass("active");
        formProcessing = false;
      });
      $(".bs-wizard-step.active").first().removeClass("active").addClass("complete");
      $(".bs-wizard-step.disabled").first().removeClass("disabled").addClass("active");
    } else if (direction === "prev") {
      var next = active.prev(".formSteps");
      if (next.attr('id') === undefined) {
        formProcessing = false;
        return false;
      }
      active.removeAttr('style');
      next.removeAttr('style');
      active.animate({
        right: "-200%"
      });
      next.css({"left": "-100%", "display": "block"});
      next.animate({
        left: "1%"
      }, 400).animate({
        left: "-1%"
      }, 100).animate({
        left: 0
      }, 50, function () {
        active.removeClass("active");
        next.addClass("active");
        formProcessing = false;
      });
      $(".bs-wizard-step.active").last().removeClass("active").addClass("disabled");
      $(".bs-wizard-step.complete").last().removeClass("complete").addClass("active");
    }
  }
});

$(document).on('change', '.btn-file :file', function () {
  var input = $(this),
          numFiles = input.get(0).files ? input.get(0).files.length : 1,
          label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [numFiles, label]);
});

$(document).ready(function () {
  $('.btn-file :file').on('fileselect', function (event, numFiles, label) {

    var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

    if (input.length) {
      input.val(log);
    } else {
      if (log)
        alert(log);
    }

  });
});