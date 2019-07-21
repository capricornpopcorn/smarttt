(function ($) {
    "use strict";

    // // Preloader
    $(window).on('load', function () {
      if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
          $(this).remove();
        });
      }
    });
  
    // Back to top button
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });
    $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
      return false;
    });
    
      // $(document).ready(function() {
      //   $('.toggle-nav').click(function(e) {
      //     $(this).toggleClass('active');
      //     $('.navbar ul').toggleClass('active');
      
      //     e.preventDefault();
      //   });
      // });

  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    if( ! action ) {
      action = 'contactform/contactform.php';
    }
    $.ajax({
      type: "POST",
      url: action,
      data: str,
      success: function(msg) {
        // alert(msg);
        if (msg == 'OK') {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }

      }
    });
    return false;
  });


// thermostat
var gradi = 19;
var max = 34;
var min = 2;

function updateGr(){
  $(".heat").text("" + gradi);
  $(".ext").text("" + gradi);
  $(".number").css("transform", "translate(-50%, -50%) rotate("+ (-180 + gradi * 10)+"deg)");
  $(".shadow").css("transform", "translate(-50%, -50%) rotate("+ (-180 + gradi * 10)+"deg)");
  $(".fill").css("animation", "none");
  $(".shadow").css("animation", "none");
}


$(".minus").mousedown(function(){ 
  if(gradi > min){
    gradi--;
    updateGr();
    if(gradi >= 18){
      $(".fill1").css("transform", "rotate("+ (gradi - 18) * 10 +"deg)").css("transition-delay", "0s");
    }else if(gradi == 17){
      $(".fill2").css("transform", "rotate("+ gradi * 10 +"deg)").css("transition-delay", "0.5s");  
    }else{
      $(".fill2").css("transform", "rotate("+ gradi * 10 +"deg)").css("transition-delay", "0s");
    }
  }
});

$(".plus").mousedown(function(){
  if(gradi < max){
    gradi++;
    updateGr();
    if(gradi > 19){
      $(".fill1").css("transform", "rotate("+ (gradi - 18) * 10 +"deg)").css("transition-delay", "0s");
    }else if(gradi == 19){
      $(".fill1").css("transform", "rotate("+ (gradi - 18) * 10 +"deg)").css("transition-delay", "1s"); 
    }else{
      $(".fill2").css("transform", "rotate("+ gradi * 10 +"deg)").css("transition-delay", "0s");
    }
  }  
});

$('#close').click(function() {
  $.ajax({
    url: '/savechanges' + $(this).parent('tr').find('.name-api').text(),
    type: 'POST',
    success: printTask,
  });
});


  })(jQuery);