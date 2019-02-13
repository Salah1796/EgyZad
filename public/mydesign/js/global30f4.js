$(document).ready(function(){

  // AJAX ITEM CONTACT SELLER
  $('body').on('click', 'button#item-message', function(){
    if(ajaxForms == 1) {

      // Validate form first
      $('form#contact_form input, form#contact_form select').each(function(){
        $('form#contact_form').validate().element($(this));
      });


      if($('form#contact_form').valid()) {
        $('button#item-message').addClass('disabled').attr('disabled', true);
        $('button#item-message i').addClass('fa-spin fa-spinner').removeClass('fa-envelope');


        $.ajax({
          url: $('form#contact_form').attr('action'),
          type: "POST",
          data: $('form#contact_form').find(':input[value!=""]').serialize(),
          success: function(response){
            $('button#item-message').removeClass('disabled').attr('disabled', false);
            $('button#item-message i').removeClass('fa-spin fa-spinner').addClass('fa-envelope');
            var type = $(response).contents().find('.flashmessage');

            var message = $(response).contents().find('.flash-wrap').text().trim();
            message = message.substring(1, message.length);
            $('form#contact_form fieldset').find('input, select, textarea').val("").removeClass('valid');
            if ($('form#contact_form #recaptcha').length) { grecaptcha.reset(); }
            $('.message-block').hide(0);

            if(type.hasClass('flashmessage-error')) {
              $('.message-not-sent').fadeIn(300);
              $('.message-not-sent').find('.title').text(message);
            } else {
              $('.message-sent').fadeIn(300);
              $('.message-sent').find('.title').text(message);
            }

            $('html, body').animate({ scrollTop: $('#more-info.contact-seller').offset().top - 80 }, 300);

          }
        });
      }
    }
  });


  // AJAX PUBLIC PROFILE CONTACT SELLER
  $('body').on('click', 'button#send-public-message', function(){
    if(ajaxForms == 1) {

      // Validate form first
      $('form#contact_form_public input, form#contact_form_public select').each(function(){
        $('form#contact_form_public').validate().element($(this));
      });


      if($('form#contact_form_public').valid()) {
        $('button#send-public-message').addClass('disabled').attr('disabled', true);

        $.ajax({
          url: $('form#contact_form_public').attr('action'),
          type: "POST",
          data: $('form#contact_form_public').find(':input[value!=""]').serialize(),
          success: function(response){
            $('button#send-public-message').removeClass('disabled').attr('disabled', false);
            var message = $(response).contents().find('.flash-wrap').html();
            $('.flash-wrap', window.parent.document).html(message);
            $('html, body', window.parent.document).animate({ scrollTop: $('body', window.parent.document).offset().top }, 300);

            parent.$.fancybox.close();
          }
        });
      }
    }
  });



  // AJAX SEND TO FRIEND
  $('body').on('click', 'button#send-message', function(){
    if(ajaxForms == 1) {

      // Validate form first
      $('form[name="sendfriend"] input, form[name="sendfriend"] select').each(function(){
        $('form[name="sendfriend"]').validate().element($(this));
      });


      if($('form[name="sendfriend"]').valid()) {
        $('button#send-message').addClass('disabled').attr('disabled', true);

        $.ajax({
          url: $('form#sendfriend').attr('action'),
          type: "POST",
          data: $('form#sendfriend').find(':input[value!=""]').serialize(),
          success: function(response){
            $('button#send-message').removeClass('disabled').attr('disabled', false);
            var message = $(response).contents().find('.flash-wrap').html();
            $('.flash-wrap', window.parent.document).html(message);
            $('html, body', window.parent.document).animate({ scrollTop: $('body', window.parent.document).offset().top }, 300);

            parent.$.fancybox.close();
          }
        });
      }
    }
  });


  // AJAX SEND COMMENT
  $('body').on('click', 'button#send-comment', function(){
    if(ajaxForms == 1) {

      // Validate form first
      $('form[name="comment_form"] input, form[name="comment_form"] select').each(function(){
        $('form[name="comment_form"]').validate().element($(this));
      });


      if($('form[name="comment_form"]').valid()) {
        $('button#send-comment').addClass('disabled').attr('disabled', true);

        $.ajax({
          url: $('form#comment_form').attr('action'),
          type: "POST",
          data: $('form#comment_form').find(':input[value!=""]').serialize(),
          success: function(response){
            $('button#send-comment').removeClass('disabled').attr('disabled', false);
            var message = $(response).contents().find('.flash-wrap').html();
            $('.flash-wrap', window.parent.document).html(message);
            $('html, body', window.parent.document).animate({ scrollTop: $('body', window.parent.document).offset().top }, 300);

            parent.$.fancybox.close();
          }
        });
      }
    }
  });


  // AJAX SEARCH
  $('body#body-search').on('change click', 'form.search-side-form input:not(.term), form.search-side-form select, #search-sort .list-grid a, #search-sort .sort-content a, #search-items .paginate a, #category-navigation a', function(event) {
    if (($(window).width() + scrollCompensate()) >= 768) {
      var block = $('form.search-side-form');
      var ajaxSearchUrl = '';
      var sidebarReload = false;

      if (event.type == 'click') {
        if(typeof $(this).attr('href') !== typeof undefined && $(this).attr('href') !== false) {
          ajaxSearchUrl = $(this).attr('href');
        }

        
        if(event.currentTarget.id == 'cat-link') {
          sidebarReload = true;
        }
      } else if (event.type == 'change') {
        ajaxSearchUrl = baseDir + "index.php?" + block.find(':input[value!=""]').serialize();
      }


      if(ajaxSearch == 1 && $('input[name="ajaxRun"]').val() != "1" && (ajaxSearchUrl != '#' && ajaxSearchUrl != '') ) {
        if(ajaxSearchUrl == $(location).attr('href')) {
          return false;
        }

        block.find('#search-button').addClass('disabled').attr('disabled', true);
        block.find('#search-button i').addClass('fa-spinner fa-spin').removeClass('fa-search');
        block.find('input[name="ajaxRun"]').val("1");
        block.find('input[name="cookieAction"]').val("done");
        $('#search-items').addClass('loading');


        $.ajax({
          url: ajaxSearchUrl,
          type: "GET",
          success: function(response){
            var length = response.length;

            var data = $(response).contents().find('#search-items').html();
            var counter = $(response).contents().find('#search-sort .counter').html();
            var viewType = $(response).contents().find('#search-sort .list-grid').html();
            var sortType = $(response).contents().find('#search-sort .sort-it').html();
            var topCat = $(response).contents().parent('#category-navigation').html();
            var hooks = $(response).contents().find('#sidebar-search .sidebar-hooks').html();
            var sidebar = $(response).contents().find('#sidebar-search .search-wrap').html();

            //console.log(topCat);
            //console.log(counter);
            //console.log(baseDir + "index.php?" + block.serialize());

            block.find('#search-button').removeClass('disabled').attr('disabled', false);
            block.find('#search-button i').removeClass('fa-spinner fa-spin').addClass('fa-search');
            block.find('input[name="ajaxRun"]').val("");

            $('#search-items').fadeOut(200, function(){ 
              $('#search-items').removeClass('loading');
              $('#search-items').html(data).fadeIn(300); 
            });

            $('#search-sort .counter').fadeOut(200, function(){ $('#search-sort .counter').html(counter).fadeIn(300); });
            $('#search-sort .list-grid').fadeOut(200, function(){ $('#search-sort .list-grid').html(viewType).fadeIn(300); });
            $('#search-sort .sort-it').fadeOut(200, function(){ $('#search-sort .sort-it').html(sortType).fadeIn(300); });
 
            if(sidebarReload) {
              $('#category-navigation').fadeOut(200, function(){ $('#category-navigation').html(topCat).fadeIn(300); });
              $('#sidebar-search .search-wrap').html(sidebar);
              $('#sidebar-search .sidebar-hooks').fadeOut(200, function(){ $('.sidebar-hooks').html(hooks).fadeIn(300); });
            } else {
              $('#category-navigation').fadeOut(0, function(){ $('#category-navigation').html(topCat).fadeIn(0); });
            }

            $('.search-side-form input[name="sCategory"]').val( $(response).contents().find('input[name="sCategory"]').val() );            
            $('.search-side-form input[name="sOrder"]').val( $(response).contents().find('input[name="sOrder"]').val() );            
            $('.search-side-form input[name="iOrderType"]').val( $(response).contents().find('input[name="iOrderType"]').val() );            
            $('.search-side-form input[name="sShowAs"]').val( $(response).contents().find('input[name="sShowAs"]').val() );            

            // Price slider update values
            $('#ajax-help input[name="ajax-price-format-prefix"]').val( $(response).contents().find('input[name="ajax-price-format-prefix"]').val() );            
            $('#ajax-help input[name="ajax-price-format-suffix"]').val( $(response).contents().find('input[name="ajax-price-format-suffix"]').val() );            
            $('#ajax-help input[name="ajax-price-format-sep"]').val( $(response).contents().find('input[name="ajax-price-format-sep"]').val() );            
            $('#ajax-help input[name="ajax-price-max-price"]').val( $(response).contents().find('input[name="ajax-price-max-price"]').val() );            
            $('#ajax-help input[name="ajax-price-min-price-search"]').val( $(response).contents().find('input[name="ajax-price-min-price-search"]').val() );            
            $('#ajax-help input[name="ajax-price-max-price-search"]').val( $(response).contents().find('input[name="ajax-price-max-price-search"]').val() );  

            window.setTimeout(function(){ veronikaAjaxReload(); }, 250);
            
            


            // Update URL
            window.history.pushState(null, null, ajaxSearchUrl);
          },

          error: function(response){
            block.find('#search-button').removeClass('disabled').attr('disabled', false);
            block.find('#search-button i').removeClass('fa-spinner fa-spin').addClass('fa-search');
            block.find('input[name="ajaxRun"]').val("");

            response = response.responseText;
            var data = $(response).contents().find('#search-items').html();
            var counter = $(response).contents().find('#search-sort .counter').html();
            var viewType = $(response).contents().find('#search-sort .list-grid').html();
            var sortType = $(response).contents().find('#search-sort .sort-it').html();
            var topCat = $(response).contents().parent('#category-navigation').html();
            var hooks = $(response).contents().find('#sidebar-search .sidebar-hooks').html();
            var sidebar = $(response).contents().find('#sidebar-search .search-wrap').html();



            $('#search-items').fadeOut(200, function(){ 
              $('#search-items').removeClass('loading');
              $('#search-items').html(data).fadeIn(300); 
            });

            $('#search-sort .counter').fadeOut(200, function(){ $('#search-sort .counter').html(counter).fadeIn(300); });
            $('#search-sort .list-grid').fadeOut(200, function(){ $('#search-sort .list-grid').html(viewType).fadeIn(300); });
            $('#search-sort .sort-it').fadeOut(200, function(){ $('#search-sort .sort-it').html(sortType).fadeIn(300); });

            if(sidebarReload) {
              $('#category-navigation').fadeOut(200, function(){ $('#category-navigation').html(topCat).fadeIn(300); });
              $('#sidebar-search .search-wrap').html(sidebar);
              $('#sidebar-search .sidebar-hooks').fadeOut(200, function(){ $('.sidebar-hooks').html(hooks).fadeIn(300); });
            } else {
              $('#category-navigation').fadeOut(0, function(){ $('#category-navigation').html(topCat).fadeIn(0); });
            }

            $('.search-side-form input[name="sCategory"]').val( $(response).contents().find('input[name="sCategory"]').val() );            
            $('.search-side-form input[name="sOrder"]').val( $(response).contents().find('input[name="sOrder"]').val() );            
            $('.search-side-form input[name="iOrderType"]').val( $(response).contents().find('input[name="iOrderType"]').val() );  
            $('.search-side-form input[name="sShowAs"]').val( $(response).contents().find('input[name="sShowAs"]').val() );            

            // Price slider update values
            $('#ajax-help input[name="ajax-price-format-prefix"]').val( $(response).contents().find('input[name="ajax-price-format-prefix"]').val() );            
            $('#ajax-help input[name="ajax-price-format-suffix"]').val( $(response).contents().find('input[name="ajax-price-format-suffix"]').val() );            
            $('#ajax-help input[name="ajax-price-format-sep"]').val( $(response).contents().find('input[name="ajax-price-format-sep"]').val() );            
            $('#ajax-help input[name="ajax-price-max-price"]').val( $(response).contents().find('input[name="ajax-price-max-price"]').val() );            
            $('#ajax-help input[name="ajax-price-min-price-search"]').val( $(response).contents().find('input[name="ajax-price-min-price-search"]').val() );            
            $('#ajax-help input[name="ajax-price-max-price-search"]').val( $(response).contents().find('input[name="ajax-price-max-price-search"]').val() );        

            window.setTimeout(function(){ veronikaAjaxReload(); }, 250);


            // Update URL
            window.history.pushState(null, null, ajaxSearchUrl);
          }
        });

        return false;
      }
    }
  });


 
  // NEXT MESSAGE SEND - TOGGLE BOXES
  $('body').on('click', '.next-message', function(e){
    e.preventDefault();

    $('.message-status').slideUp(300, function(){
      $('.message-block').slideDown(300);
    });

    return false;
  });


  // INITIALIZE IS TOUCH DEVICE
  if(is_touch_device()) {
    //$('body').addClass('is_touch');
  }

  // ADD BROWSER & DEVICE INFORMATION TO BODY CLASS
  $('body').addClass(getMobileOperatingSystem());


  // ITEM CONTACT SELLER - ENSURE TEL: IS WORKING
  $('.phone-block, .phone-show').click(function(e){
    var itemId = $(this).attr('data-item-id');
    var itemUserId = $(this).attr('data-item-user-id');

    if( $(this).attr('href') != '#' ) {
      window.location.href = $(this).attr('href');
    } else {
      $.ajax({
        url: baseAjaxUrl + "&ajaxPhoneClick=1&itemId=" + itemId + "&itemUserId=" + itemUserId,
        type: "GET",
        success: function(response){
          //console.log(response);
        }
      });
    }
  });

  // FIX MCE PRICE - PUT IT INTO 1 LINE
  if( $('#side-right #price .MCtooltip').length ) {
    var mcePrice = $('#side-right #price .MCtooltip').html();
    mcePrice = mcePrice.replace('<br>', ' / ').replace('</br>', '');
    $('#side-right #price .MCtooltip').html(mcePrice);
  }


  // ELLIPSIS FUNCTION
  $('.ellipsis-h, .ellipsis-v').click(function(){
    var block = $(this);

    block.addClass('active');
    setTimeout(function(){ 
      block.removeClass('active');
    }, 600);
  });


  // LAZY LOAD PLUGIN
  if(cleanLazy == "1" && cleanMasonry == "0" ) {
    $("img.lazy").lazyload({
      effect : "fadeIn"
    });
  }


  // ITEM PAGE FOR MOBILE VIEW - Details / Contact
  $('#swap a').click(function(e){
    e.preventDefault();

    $('#swap a').removeClass('active');
    $(this).addClass('active');

    if( $(this).hasClass('details') ) {
      $('.is_detail').show(0);
      $('.is_contact').hide(0);
    } else {
      $('.is_contact').show(0);
      $('.is_detail').hide(0);
    }
  });



  // SIMPLE SORT FOR MOBILE
  $('#orderSelect').change(function(){
    $('input[name="sOrder"]').val($('#orderSelect option:selected').attr('data-type'));
    $('input[name="iOrderType"]').val($('#orderSelect option:selected').attr('data-order'));
  });



  // PUBLISH - MOVE BETWEEN STEPS
  $('.post-navigation .btn').click(function(e){
    e.preventDefault();

    var current = $(this).attr('data-current-step');
    var next = $(this).attr('data-next-step');
    var prev = $(this).attr('data-prev-step');
    var total = parseInt($('fieldset.general .total-steps').text());


    $('html, body').animate({
      scrollTop: $('body').offset().top
    }, 300);


    if( $(this).hasClass('post-next') ) {

      // Check for required fields
      $('fieldset[data-step-id="' + current + '"] input, fieldset[data-step-id="' + current + '"] select').each(function(){
        $("form[name=item]").validate().element($(this));
      });


      if($("form[name=item]").valid()) {
        $('fieldset[data-step-id="' + current + '"]').animate({marginLeft: "-1000px", opacity:0}, 300, function(){
          $('fieldset[data-step-id="' + current + '"]').hide(0);
          $('fieldset[data-step-id="' + next + '"]').css('display', 'inline-block').css('margin-left', '1000px').css('opacity', '0');
          $('fieldset[data-step-id="' + next + '"]').animate({marginLeft: "0px", opacity:1}, 300);

          // Show submit button
          if(parseInt(current) == (total-1) && parseInt(next) == total) {
            $('.buttons-block').css('display', 'inline-block').css('margin-left', '1000px').css('opacity', '0');
            $('.buttons-block').animate({marginLeft: "0px", opacity:1}, 300);
          }

          // If there are only 2 steps, hide next button on 2nd step
          if(total < 3) {
            $('fieldset.photos .post-next').hide(0);
          } else {
            $('fieldset.photos .post-next').show(0);
          }
        }); 
      }
    } else if ( $(this).hasClass('post-prev') ) {
      $('fieldset[data-step-id="' + current + '"]').animate({marginLeft: "1000px", opacity:0}, 300, function(){
        $('fieldset[data-step-id="' + current + '"]').hide(0);
        $('fieldset[data-step-id="' + prev + '"]').css('display', 'inline-block').css('margin-left', '-1000px').css('opacity', '0');
        $('fieldset[data-step-id="' + prev + '"]').animate({marginLeft: "0px", opacity:1}, 300);
      }); 

      // Hide submit button
      $('.buttons-block').animate({marginLeft: "1000px", opacity:1}, 300, function() {
        $('.buttons-block').hide(0);
      });
    }

  });



  // FLAT CATEGORY SELECT ON PUBLISH PAGE
  $('body').on('click', '.flat-wrap .single:not(.info)', function() {
    var id = $(this).attr('data-id');
    var sub = false;

    if( $('.flat-wrap[data-parent-id="' + id + '"]').length ) {

      // Has subcategories
      $('.flat-wrap[data-parent-id="' + id + '"]').show(0);
      $('.flat-wrap.root').animate({"left": '-=100%'}, 300, 'swing');

    } else {

      // No subcategories
      $('input#catId').val(id).trigger('click');;
      $('.flat-cat-box .single').removeClass('selected');
      $(this).addClass('selected');

      $('#flat-cat-fancy .single').removeClass('selected');
      $('#flat-cat-fancy .single[data-id="' + $(this).attr('data-id') + '"]').addClass('selected');

      $('.add_item .row.category label').html( $(this).find('span').text() ).addClass('done');
      parent.$.fancybox.close();
    }

  });

  // Go back to parent category
  $('body').on('click', '.flat-wrap .back', function() {
    var hideId = parseInt($(this).closest('.flat-wrap').attr('data-parent-id'));

    $('.flat-wrap.root').animate({"left": '+=100%'}, 300, 'swing', function(){
      $('.flat-wrap[data-parent-id="' + hideId + '"]').hide(0);
    });
  });


  // On load go to category
  if( parseInt($('input[name="catId"]').val()) > 0 ) {
    var cat_id = parseInt($('input[name="catId"]').val());
    var parents_count = parseInt($('.flat-wrap .single[data-id="' + cat_id + '"]').parents('.flat-wrap').length) - 1;


    $('.flat-wrap .single[data-id="' + cat_id + '"]').parents('.flat-wrap').show(0);
    $('.flat-wrap.root').animate({"left": -(100*parents_count) + '%'}, 300, 'swing');
  }



  // ALERTS - SHOW PARAMETERS
  $('.alert-show-detail').click(function(e) {
    $(this).parent().parent().find('.hed-param').slideDown(200);
    $(this).fadeOut(200);
  });



  // SEARCH - PREMIUM LIST - SHOW MORE
  $('#premium-more .push').click(function(){
    $('.premium-list-block').slideUp(300, function() {
      $('.premium-list-block').css('height', 'auto').css('overflow', 'initial').css('max-height', 'initial');
      $('.premium-list-block').slideDown(300);
      $('#premium-more .push').fadeOut(200);
    });
  });  



  // LOGIN-REGISTER FUNCTIONALITY
  $('.swap-log-reg').click(function(e){
    e.preventDefault();

    if( $(this).hasClass('to-reg') ) {
      $(".box#login").animate({marginLeft: "-1000px", opacity:0}, 300, function(){
        $(".box#login").hide(0);
        $('.box#register').css('display', 'inline-block').css('margin-right', '-1000px').css('opacity', '0');
        $('.box#register').animate({marginRight: "0px", opacity:1}, 300);
      });    
    } else {
      $(".box#register").animate({marginRight: "-1000px", opacity:0}, 300, function(){
        $(".box#register").hide(0);
        $('.box#login').css('display', 'inline-block').css('margin-left', '-1000px').css('opacity', '0');
        $('.box#login').animate({marginLeft: "0px", opacity:1}, 300);
      });  
    }
  });



  // CONTACT SELLER - ITEM RIGHT SIDEBAR BUTTON
  $('.contact-button').click(function(e){
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $('#more-info.contact-seller').offset().top - 30
    }, 1000);

    $('#contact_form input[type="text"]').first().focus();
    return false;
  });



  // CONTACT SELLER - FILE NAME
  $('input[name="attachment"]').change(function() {
    if( $(this)[0].files[0]['name'] != '' ) {
      $('.attachment .att-box .status .wrap span').text( $(this)[0].files[0]['name'] );
    }
  });



  // LOCATION PICKER FUNCTIONALITY
  $('body').on('click', '#location-picker .shower .option', function() {

    if( !$(this).hasClass('empty-pick') && !$(this).hasClass('more-pick') && !$(this).hasClass('service') ) {

      $('#location-picker .shower .option').removeClass('selected');
      $(this).addClass('selected');
      $('#location-picker .shower').fadeOut(200);
      $('#location-picker .term').removeClass('open');
      $('input[name="cookieAction"], input[name="cookieActionMobile"]').val('done');


      var term = $(this).html();
      term = term.replace('<span>', '- ');
      term = term.replace('</span>', '');
      $('input.term').val( term );


      $('input[name="sCountry"], input.sCountry').val( $(this).attr('data-country') );
      $('input[name="sRegion"], input.sRegion').val( $(this).attr('data-region') );
      $('input[name="sCity"], input.sCity').val( $(this).attr('data-city') );
      $('input[name="sCity"]').change();
    }
  });


  // ITEM AUTOCOMPLETE FUNCTIONALITY
  $('body').on('click', '#item-picker .shower .option', function() {
    if( !$(this).hasClass('empty-pick') && !$(this).hasClass('more-pick') && !$(this).hasClass('service') ) {
      $('#item-picker .shower').fadeOut(200);
      $('#item-picker .pattern').removeClass('open');
    }
  });


  // SIMPLE SELECT FUNCTIONALITY
  $('body').on('click', '.simple-select:not(.disabled) .option:not(.info)', function() {
    $(this).parent().parent().find('input.input-hidden').val( $(this).attr('data-id') ).change();
    $(this).parent().parent().find('.text span').html( $(this).html() );
    $(this).parent().parent().find('.option').removeClass('selected');
    $(this).addClass('selected');
    $(this).parent().fadeOut(200);
    $('input[name="cookieAction"], input[name="cookieActionMobile"]').val('done');
  });


  $('body').on('mouseenter', '.simple-select', function() {
    if( !$(this).hasClass('disabled') ) {
      $(this).find('.list').fadeIn(200); 
    }
  }).on('mouseleave', '.simple-select', function() {
    if( !$(this).hasClass('disabled') ) {
      $(this).find('.list').fadeOut(200);
    }
  });




  // SHOW LIST OF LOCATIONS WHEN CLICK ON TERM
  $('body').on('click', '#location-picker .term', function() {
    $('#location-picker .shower').fadeIn(200);
    $('#location-picker .term').addClass('open');
  });


  // SHOW LIST OF ITEMS WHEN CLICK ON PATTERN
  $('body').on('click', '#item-picker .pattern', function() {
    $('#item-picker .shower').fadeIn(200);
    $('#item-picker .pattern').addClass('open');
  });


  // WHEN SIMPLE CATEGORY CLICKED, UPDATE ALL sCategory INPUTS
  $('body').on('change', 'select[name="sCategory"]', function() {
    $('input[name="sCategory"]').val( $(this).val() );
  });


  // WHEN CLICK OUTSIDE LOCATION PICKER, HIDE SELECTION
  $(document).mouseup(function (e){
    var container = $("#location-picker");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if($('#location-picker .term').val() == '' && ( $('input[name="sCountry"]').val() != '' || $('input.sCountry').val() != '' || $('input.sCountry').val() != '' || $('input[name="sRegion"]').val() != '' || $('input.sRegion').val() != '' || $('input[name="sCity"]').val() != '' || $('input.sCity').val() != '' )) {
        $('input[name="sCountry"], input.sCountry, input[name="sRegion"], input.sRegion, input[name="sCity"], input.sCity').val("");
        $('input[name="sCity"]').change();
      }

      $('#location-picker .shower').fadeOut(200);
      $('#location-picker .term').removeClass('open');
    }
  });


  // WHEN CLICK OUTSIDE ITEM PICKER, HIDE SELECTION
  $(document).mouseup(function (e){
    var container = $("#item-picker");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('#item-picker .shower').fadeOut(200);
      $('#item-picker .pattern').removeClass('open');
    }
  });




  // MASONRY - CREATE GRID WHEN IMAGES HAS DIFFERENT SIZE (height)
  if(cleanMasonry == "1") {
    var $grid = $('.white .block').masonry({
      itemSelector: '.simple-prod'
    });

    $grid.imagesLoaded().progress( function() {
      $grid.masonry('layout');
    });
  }



  // STICKY SIDEBAR
  if (($(window).width()+scrollCompensate()) >= 768) {
    if (cleanItemStick == "1") {
      $('#side-right').stick_in_parent({
        parent: $("#listing"), offset_top: 0
      }).on("sticky_kit:stick", function(e) {
        // Do something on stick
      });
    }
  }



  // STICKY SEARCH SIDEBAR
  if (($(window).width()+scrollCompensate()) >= 768) {
    if (cleanSearchStick == "1") {
      $('.list #sidebar').stick_in_parent({
        parent: $(".content"), offset_top: 0
      }).on("sticky_kit:stick", function(e) {
        // Do something on stick
      });
    }
  }


  // SET COLOR OF SEARCH BUTTON AFTER IMAGE IS LOADED
  var image = new Image();

  image.onload = function () {
    $('.header-menu span').css('opacity', '1');
  }

  image.src = cleanHeaderImg;



  // HEADER FUNCTIONALITY
  $('#uniform-Locator, .top-my, #uniform-sCategory').hover(function(){
    $(this).css('z-index', 99999);
  }, function(){
    $(this).css('z-index', 9);
  });


  idTabsMultiLine();


  // -------------------------------------------------------
  // SCRIPTS FOR RESPONSIVE DESIGN: 0 - 767px
  // -------------------------------------------------------


  if (($(window).width() + scrollCompensate()) <= 767) { 

    // STICK DETAILS & CONTACT LINKS FOR MOBILE VIEW
    $('#swap').stick_in_parent({
      parent: $("#main"), offset_top: 50
    }).on("sticky_kit:stick", function(e) {
      // Do something on stick
    });


    // SET HEIGHT TO ROOT CATEGORIES SO THEY ARE SQUARES
    $('#top-cat ul li').css('height', $('#top-cat ul li').width() + 'px');


    // IF DESCRIPTION OF ITEM IS TOO LONG, SHORTEN IT
    if( $('.item-desc .text').height() > 300 ) {
      $('.item-desc .text').attr('data-original-height', $('.item-desc .text').height()).addClass('shorten');
    }
 
    $('body').on('click', '.item-desc .text.shorten .show-desc', function() {
      $('.item-desc .text').animate({height: $('.item-desc .text').attr('data-original-height') + 'px'}, 300, function(){
        $('.item-desc .text').removeClass('shorten').css('height', 'auto');
      });
    });



    // IF LIST OF LATEST ITEMS IS TOO LONG, SHORTEN IT
    if( $('.hc-latest #latest .simple-prod:last-child .img-link img').length ) {
      var image_latest = new Image();

      image_latest.onload = function () {
        if( $('.hc-latest #latest').height() > 900 ) {
          $('.hc-latest #latest').attr('data-original-height', $('.hc-latest #latest').height()).addClass('shorten');
        }
 
        $('body').on('click', '.hc-latest #latest.shorten .show-more-latest', function() {
          $('.hc-latest #latest').animate({height: $('.hc-latest #latest').attr('data-original-height') + 'px'}, 300, function(){
            $('.hc-latest #latest').removeClass('shorten').css('height', 'auto');
          });
        });
      }

      image_latest.src = $('.hc-latest #latest .simple-prod:last-child .img-link img').attr('src');
    }





    var close_btn = true;

    $('.list #sidebar').remove();


    if($('#s-box .sidebar-hooks').length) {
      if($('#s-box .sidebar-hooks').html().trim() == '') {
        $('#s-box .s-hooks').remove();
      }
    }


    // ITEM BX-SLIDER
    if(cleanBxSlider == "1") {
      $('.item-bxslider').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        slideWidth: $(window).outerWidth(),
        infiniteLoop: false,
        slideMargin: 0,
        pager: true,
        onSlideBefore: function($elem, oldIndex, newIndex){
          $('#photo-count .p-from').text(parseInt(newIndex) + 1);
          $('#photo-count .p-to').text(parseInt(newIndex) + parseInt(cleanBxSliderSlides));
        },
        onSlidePrev: function($elem, oldIndex, newIndex) {
          $('a.bx-next').css('opacity', '1');

          if( newIndex == 0 ) {
            $('a.bx-prev').css('opacity', '0.2');
          } else {
            $('a.bx-prev').css('opacity', '1');
          }
        },
        onSlideNext: function($elem, oldIndex, newIndex) {
          $('a.bx-prev').css('opacity', '1');

          if( newIndex == parseInt($('.item-bxslider').find('li').length) - 1 ) {
            $('a.bx-next').css('opacity', '0.2');
          } else {
            $('a.bx-next').css('opacity', '1');
          }
        }
      });
    }


    // SHOW HIDE FUNCTIONALITY
    $('.sc-click').on('click', function(e){
      e.preventDefault();

      if(!$(this).hasClass('opened') || !$(this).hasClass('closed')) {
        $(this).addClass('closed');
      }

      $(this).toggleClass('opened closed');

      $(this).parent().find('.sc-block').slideToggle(300).toggleClass('is-opened');

      if($(this).parent('#location').length) {
        google.maps.event.trigger(map, 'resize');
      }
    });

  } 

 
  veronikaAjaxReload();


  // -------------------------------------------------------
  // SCRIPTS FOR RESPONSIVE DESIGN: 768 - 1200px
  // -------------------------------------------------------

  if (($(window).width() + scrollCompensate()) >= 768 && ($(window).width() + scrollCompensate()) <= 1200) {
    var close_btn = false;
    top_cat_move();

    if (typeof veronikaPriceSlider !== 'undefined' && $.isFunction(veronikaPriceSlider)) {
      veronikaPriceSlider();
    }

    // ITEM BX-SLIDER
    if(cleanBxSlider == "1") {
      $('.item-bxslider').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        slideWidth: $(window).outerWidth(),
        infiniteLoop: false,
        slideMargin: 0,
        pager: true,
        onSlideBefore: function($elem, oldIndex, newIndex){
          $('#photo-count .p-from').text(parseInt(newIndex) + 1);
          $('#photo-count .p-to').text(parseInt(newIndex) + parseInt(cleanBxSliderSlides));
        },
        onSlidePrev: function($elem, oldIndex, newIndex) {
          $('a.bx-next').css('opacity', '1');

          if( newIndex == 0 ) {
            $('a.bx-prev').css('opacity', '0.2');
          } else {
            $('a.bx-prev').css('opacity', '1');
          }
        },
        onSlideNext: function($elem, oldIndex, newIndex) {
          $('a.bx-prev').css('opacity', '1');

          if( newIndex == parseInt($('.item-bxslider').find('li').length) - 1 ) {
            $('a.bx-next').css('opacity', '0.2');
          } else {
            $('a.bx-next').css('opacity', '1');
          }
        }
      });
    }
  }




  // -------------------------------------------------------
  // SCRIPTS FOR RESPONSIVE DESIGN: 1201px or more
  // -------------------------------------------------------

  if (($(window).width() + scrollCompensate()) > 1200) {
    $('#s-box').remove();
    var close_btn = false;
    top_cat_move();

    if (typeof veronikaPriceSlider !== 'undefined' && $.isFunction(veronikaPriceSlider)) {
      veronikaPriceSlider();
    }

    // ITEM BX-SLIDER
    if(cleanBxSlider == "1") {
      $('.item-bxslider').bxSlider({
        minSlides: parseInt(cleanBxSliderSlides),
        maxSlides: parseInt(cleanBxSliderSlides),
        moveSlides: 1,
        slideWidth: $('#listing #pictures').outerWidth()/parseInt(cleanBxSliderSlides),
        infiniteLoop: false,
        slideMargin: 15,
        pagerCustom: '#item-bx-pager',
        onSlideBefore: function($elem, oldIndex, newIndex){
          $('#photo-count .p-from').text(parseInt(newIndex) + 1);
          $('#photo-count .p-to').text(parseInt(newIndex) + parseInt(cleanBxSliderSlides));
        },
        onSlidePrev: function($elem, oldIndex, newIndex) {
          $('a.bx-next').css('opacity', '1');

          if( newIndex == 0 ) {
            $('a.bx-prev').css('opacity', '0.2');
          } else {
            $('a.bx-prev').css('opacity', '1');
          }
        },
        onSlideNext: function($elem, oldIndex, newIndex) {
          $('a.bx-prev').css('opacity', '1');

          if( newIndex == parseInt($('.item-bxslider').find('li').length) - cleanBxSliderSlides ) {
            $('a.bx-next').css('opacity', '0.2');
          } else {
            $('a.bx-next').css('opacity', '1');
          }
        }
      });
    } 
  }





  // SHOW HIDE HEADER MENU RESPONSIVE OPTIONS
  $('.header-menu').on('click', function(e){
    e.preventDefault();

    var id = $(this).attr('data-link-id');
    var otherOpened = false


    // Check if another menu is not already opened 

    if( $('.header-menu.opened').length && $('.header-menu.opened').attr('data-link-id') != id ) {
      otherOpened = true;
      $('.header-menu.opened').removeClass('opened').addClass('closed');
  

      $('.header-slide.opened').animate({right: '-70%'}, 500, function() { 
        $(this).css('width', '0'); 
      });

      $('.header-slide.opened').removeClass('opened').addClass('closed');

    }


    $(this).toggleClass('opened closed');
   
    if( $(id).hasClass('closed') ) {
      $(id).css('width', '80%');
      $(id).animate({right: '0px'}, 500);
      $('body').animate({marginLeft: '-80%'}, 500);
    } else {
      $(id).animate({right: '-80%'}, 500, function() { 
        $(id).css('width', '0'); 
      });
      $('body').animate({marginLeft: '0%'}, 500);
    }

    $(id).toggleClass('opened closed');

    if(!otherOpened) {
      $('#menu-cover').fadeToggle(200);
      $('body').toggleClass('no-scroll');
      $('html').toggleClass('no-scroll');
    }
  });



  $('#menu-cover').on('click', function(e){
    e.preventDefault();

    $(this).fadeOut(200);

    $('.header-slide.opened').animate({right: '-80%'}, 500, function() { 
      $('.header-slide.opened').css('width', '0'); 
    });
    $('body').animate({marginLeft: '0%'}, 500);

    $('.header-menu').removeClass('opened').addClass('closed');
    $('.header-slide').removeClass('opened').addClass('closed');
    $('body').removeClass('no-scroll');
    $('html').removeClass('no-scroll');
  });


  $('.open-h-search').click(function(){
    $('#h-search').click();
  });




  // FANCYBOX - SEND TO FRIEND FUNCTIONALITY
  $(document).on('click', '#send-friend', function(e){
    e.preventDefault();
    var url = this.href;
    var anchor = '';

    if (url.indexOf('#') != -1) {
      anchor = url.substring(url.indexOf('#'), url.length);
      url = url.substring(0, url.indexOf('#'));
    }

    if (url.indexOf('?') != -1) {
      url += '&';
    } else {
      url += '?';
    }

    if (!!$.prototype.fancybox) {
      $.fancybox({
        'padding':  0,
        'width':    380,
        'height':   490,
        'wrapCSS':  'send-friend-func',
        'closeBtn' : close_btn,
        'type':     'iframe',
        'href':     url + 'type=send_friend' + anchor
     });
    }
  });



  // FANCYBOX - POST COMMENT FORM
  $(document).on('click', '.add-com', function(e){
    e.preventDefault();
    var url = this.href;
    var anchor = '';

    if (url.indexOf('#') != -1) {
      anchor = url.substring(url.indexOf('#'), url.length);
      url = url.substring(0, url.indexOf('#'));
    }

    if (url.indexOf('?') != -1) {
      url += '&';
    } else {
      url += '?';
    }

    if (!!$.prototype.fancybox) {
      $.fancybox({
        'padding':  0,
        'width':    380,
        'height':   490,
        'wrapCSS':  'add-com-func',
        'closeBtn' : close_btn,
        'type':     'iframe',
        'href':     url + 'type=add_comment' + anchor
     });
    }
  });



  // FANCYBOX - PUBLIC PROFILE CONTACT SELLER FORM
  $(document).on('click', '#pub-contact', function(e){
    e.preventDefault();
    var url = this.href;
    var anchor = '';
    var user_id = $(this).attr('rel');

    if (url.indexOf('#') != -1) {
      anchor = url.substring(url.indexOf('#'), url.length);
      url = url.substring(0, url.indexOf('#'));
    }

    if (url.indexOf('?') != -1) {
      url += '&';
    } else {
      url += '?';
    }

    if (!!$.prototype.fancybox) {
      $.fancybox({
        'padding':  0,
        'width':    380,
        'height':   490,
        'wrapCSS':  'pub-contact-func',
        'closeBtn' : close_btn,
        'type':     'iframe',
        'href':     url + 'type=publicContact&userId=' + user_id + anchor
     });
    }
  });


  // FANCYBOX - SUBCATEGORY OPEN ON HOMEPAGE
  $(document).on('click', '.open-home-cat', function(e){
    e.preventDefault();

    // Check if contains subcategories
    var subcatCount = $('#ct' + $(this).attr('rel')).find('.middle > a').length;
    var catUrl = $('#ct' + $(this).attr('rel')).find('.head > a').attr('href');
    
    if(subcatCount > 0) {
      if (!!$.prototype.fancybox) {
        $.fancybox({
          'padding':  0,
          'width':    640,
          'height':   430,
          'autoSize': false,
          'autoDimensions': false,
          'wrapCSS':  'home-cat',
          'content':  '<div class="cat-tab">' + $('#ct' + $(this).attr('rel')).html() + '</div>'
        });
      }
    } else {
      window.location.href = catUrl;
    }
  });




  // FANCYBOX - OPEN CATEGORIES ON PUBLISH PAGE
  $(document).on('click', '#flat-cat .category-box', function(e){
    e.preventDefault();

    if (!!$.prototype.fancybox) {
      $.fancybox({
        'padding':  0,
        'width':    380,
        'height':   460,
        'autoSize': false,
        'autoDimensions': false,
        'wrapCSS':  'flat-cat-box',
        'content':  $('#flat-cat-fancy').html()
      });
    }
  });


  // FANCYBOX - UPATE PROFILE PICTURE
  $(document).on('click', '#pict-update, #pict-update-secondary', function(e){
    e.preventDefault();

    if (!!$.prototype.fancybox) {
      $.fancybox({
        'padding':  0,
        'width':    640,
        'height':   490,
        'autoSize': false,
        'autoDimensions': false,
        'closeBtn' : close_btn,
        'wrapCSS':  'pict-func',
        'content':  $('#show-update-picture-content').html()
      });
    }
  });




  // FANCYBOX - CLOSE BUTTON
  $(document).on('click', '.fw-close-button', function(e){
    e.preventDefault();

    parent.$.fancybox.close();
  });



  // FANCYBOX - QUICK VIEW FUNCTIONALITY FOR LISTINGS
  $(document).on('click', '.orange-but.open-image:not(.disabled)', function(e){
    e.preventDefault();
    var url = this.href;
    var anchor = '';

    if (url.indexOf('#') != -1) {
      anchor = url.substring(url.indexOf('#'), url.length);
      url = url.substring(0, url.indexOf('#'));
    }

    if (url.indexOf('?') != -1) {
      url += '&';
    } else {
      url += '?';
    }

    var windowsWidth = parseInt($(window).outerWidth()) - 50;
    var windowsHeight = parseInt($(window).outerHeight()) - 50;
    var adjustWidth = dimNormalWidth;
    var adjustHeight = dimNormalHeight;

    if( windowsWidth < adjustWidth ) {
      adjustHeight = dimNormalHeight / (dimNormalWidth / windowsWidth);
      adjustWidth = windowsWidth;
    }

    if( windowsHeight < adjustHeight ) {
      adjustWidth = adjustWidth / (adjustHeight / windowsHeight);
      adjustHeight = windowsHeight;
    }

    if (!!$.prototype.fancybox) {
      $.fancybox({
        'padding':   0,
        'width':     adjustWidth,
        'height':    adjustHeight,
        'scrolling': 'no',
        'wrapCSS':   'quick-view',
        'type':      'iframe',
        'href':      url + 'content_only=1' + anchor
     });
    }
  });


  // Handle no pictures
  $(document).on('click', '.orange-but.open-image.disabled', function(e){
    e.preventDefault();
    return false;
  });



  if (($(window).width() + scrollCompensate()) > 767) {

    // NICE TOOLTIPS FOR ITEM BUTTONS
    $(function() {
      $('#item-buttons').tooltip({
        position: { my: "center top-58", at: "center" }
      });
    });


    // NICE TOOLTIPS FOR DEMO BANNERS
    $(function() {
      $('.banner-theme.is-demo.blank').tooltip({
        position: { my: "center top-58", at: "center" }
      });
    });


    // NICE TOOLTIPS FOR ITEM STATS IN USER ACCOUNT
    $(function() {
      $('.user_account .card.item .stats > div').tooltip({
        position: { my: "center top-40", at: "center" }
      });
    });


    // NICE TOOLTIPS FOR HOME PAGE CATEGORIES
    $(function() {
      $('.open-home-cat').tooltip({
        position: { my: "center top-95", at: "center" }
      });
    });
  
  }


  // FANCY BOX FUNCTIONALITY FOR IMAGES ON ITEM PAGE
  $("a[rel=image_group]").fancybox({
    'padding': 0,
    'openEffect' : 'elastic',
    'closeEffect' : 'elastic',
    'nextEffect' : 'fade',
    'prevEffect' : 'fade',
    'loop' : false,
    'margin': [20, 20, 55, 20],
    'helpers' : { title : {type : 'inside'} }
  });




  // RECAPTCHA WIDTH FIX
  var wi = $('#recaptcha_image').width();
  $('#recaptcha_image, #recaptcha_image img').css('max-width', wi + 'px');




  // SEARCH LIST IMG CLICK - CHANGE SOURCE
  $('.small-img').click(function(){
    // Without fade effect
    //$(this).parent().siblings('.big-img').find('img').attr('src', $(this).find('img').prop('src'));

    // With fade effect
    var small_img_wrapper = $(this).parent();
    var small_img = $(this).find('img');
    var small_img_src = $(this).find('img').prop('src');
    var big_img = $(this).parent().siblings('.big-img').find('img');

    big_img.fadeOut(200, function() { 
      big_img.attr('src', small_img_src);
    }).fadeIn(200);

    small_img_wrapper.find('.small-img').removeClass('selected');
    $(this).addClass('selected');
  });



  // --------------------------------------------------------
  // ADDITIONAL SCRIPTS FOR RESPONSIVE DESIGN: 0 - 1200px
  // --------------------------------------------------------

  if (($(window).width() + scrollCompensate()) <= 1200) {

    // SEARCH PAGE - SORT FUNCTIONALITY
    $('body').on('click', '#search-sort .sort-title', function(e) {
      $(this).stop( true, true ).toggleClass('hovered');
      $(this).find('#sort-wrap').stop(true,true).fadeToggle(0);
      $('#search-sort').toggleClass('opened');
    });

    $(document).click(function(event) { 
      if(!$(event.target).closest('#search-sort .sort-title').length) {
        if($('#search-sort .sort-title #sort-wrap').is(":visible")) {
          $('#search-sort .sort-title #sort-wrap').hide();
          $('#search-sort .sort-title').stop( true, true ).toggleClass('hovered');
          $('#search-sort').toggleClass('opened');
        }
      }        
    });


    // CORRECT INPUT TYPES
    $('input#zip, input#price').prop('type', 'number');
    $('input#contactEmail, input#yourEmail, input#friendEmail, input#s_email, input#new_email, input#authorEmail').prop('type', 'email');
    $('input#s_phone_mobile, input#s_phone_land').prop('type', 'tel');



    // ITEM PAGE - REPORT BUTTON
    $('#report').click(function(){
      $(this).stop( true, true ).toggleClass('hovered');
      $(this).find('.cont-wrap').stop(true,true).fadeToggle(0);
      $(this).toggleClass('opened');
    });

    $(document).click(function(event) { 
      if(!$(event.target).closest('#report').length) {
        if($('#report .cont-wrap').is(":visible")) {
          $('#report .cont-wrap').hide();
          $('#report').stop( true, true ).toggleClass('hovered');
          $('#report').toggleClass('opened');
        }
      }        
    });



    // MB TOOL BOX FUNCTIONALITY
    $('#lang-open-box, .top-info').click(function(){
      $(this).stop( true, true ).toggleClass('hovered');
      $(this).find('.ea-tool-wrap').stop(true,true).fadeToggle(0);
      $(this).toggleClass('opened');
    });

    $(document).click(function(event) { 
      if(!$(event.target).closest('#lang-open-box').length) {
        if($('#lang-open-box .ea-tool-wrap').is(":visible")) {
          $('#lang-open-box .ea-tool-wrap').hide();
          $('#lang-open-box').stop( true, true ).toggleClass('hovered');
          $('#lang-open-box').toggleClass('opened');
        }
      }        
    });

    $(document).click(function(event) { 
      if(!$(event.target).closest('.top-info').length) {
        if($('.top-info .ea-tool-wrap').is(":visible")) {
          $('.top-info .ea-tool-wrap').hide();
          $('.top-info').stop( true, true ).toggleClass('hovered');
          $('.top-info').toggleClass('opened');
        }
      }        
    });


    
    // USER LINKS - HEADER
    $('.top-my').click(function(){
      $(this).stop( true, true ).toggleClass('hovered');
      $(this).find('.my-wrap').stop(true,true).fadeToggle(0);
      $(this).toggleClass('opened');
    });

    $(document).click(function(event) { 
      if(!$(event.target).closest('.top-my').length) {
        if($('.top-my .my-wrap').is(":visible")) {
          $('.top-my .my-wrap').hide();
          $('.top-my').stop( true, true ).toggleClass('hovered');
          $('.top-my').toggleClass('opened');
        }
      }        
    });



    // HEADER FUNCTIONALITY
    $('#uniform-sCategory').click(function(){
      $(this).stop( true, true ).toggleClass('hovered');
      $(this).find('#inc-cat-box').stop(true,true).fadeToggle(0);
      $(this).find('#inc-cat-list').css('overflow-y', 'scroll');
      $(this).toggleClass('opened');
    });

    $(document).click(function(event) { 
      if(!$(event.target).closest('#uniform-sCategory').length) {
        if($('#uniform-sCategory #inc-cat-box').is(":visible")) {
          $('#uniform-sCategory #inc-cat-box').hide();
          $('#uniform-sCategory').stop( true, true ).toggleClass('hovered');
          $('#uniform-sCategory').toggleClass('opened');
        }
      }        
    });

  } 



  // --------------------------------------------------------
  // ADDITIONAL SCRIPTS FOR RESPONSIVE DESIGN: 1201px or more
  // --------------------------------------------------------

  if (($(window).width() + scrollCompensate()) > 1200) {

    // HEADER FUNCTIONALITY
    $('#uniform-sCategory').hover(function() {
      $(this).find('#inc-cat-box').stop(true, true).fadeIn(time);
      $(this).find('#inc-cat-list').css('overflow-y', 'scroll');
    }, function() {
      $(this).find('#inc-cat-box').stop(true, true).delay(delay).fadeOut(time);
    });



    // OPTION BUTTON IN HEADER
    $('.top-my').hover(function(){
      $(this).stop( true, true ).addClass('hovered');
      $(this).find('.my-wrap').stop(true,true).fadeIn(200);
      $(this).find('.my-wrap').css('overflow', 'visible');
      $(this).css('z-index', '99999');
      $(this).addClass('hovered');

    }, function(){
      $(this).find('.my-wrap').stop( true, true ).delay(700).fadeOut(200);
      $(this).find('.my-wrap').css('overflow', 'visible');
      $(this).css('z-index', '9999');

      $(this).delay(700).queue(function() { $(this).removeClass('hovered'); $(this).dequeue(); });
    });



    // SORTING FUNCTIONALITY
    $('#search-sort').on('mouseenter', '.sort-title', function() {
      $(this).stop( true, true ).addClass('hovered');
      $(this).find('#sort-wrap').stop(true,true).fadeIn(200);
      $(this).find('#sort-wrap').css('overflow', 'visible');
      $(this).css('z-index', '99999');
    }).on('mouseleave', '.sort-title', function() {
      $(this).find('#sort-wrap').stop( true, true ).delay(700).fadeOut(200);
      $(this).find('#sort-wrap').css('overflow', 'visible');
      $(this).css('z-index', '9999');

      $(this).delay(700).queue(function() { $(this).removeClass('hovered'); $(this).dequeue(); });
    });



    // MB TOOL BOX FUNCTIONALITY
    $('#lang-open-box, .top-info').hover(function(){
      $(this).stop( true, true ).addClass('hovered');
      $(this).find('.ea-tool-wrap').stop(true,true).fadeIn(200);
      $(this).find('.ea-tool-wrap').css('overflow', 'visible');
      $(this).css('z-index', '99999');
    }, function(){
      $(this).find('.ea-tool-wrap').stop( true, true ).delay(700).fadeOut(200);
      $(this).find('.ea-tool-wrap').css('overflow', 'visible');
      $(this).css('z-index', '9998');

      $(this).delay(700).queue(function() { $(this).removeClass('hovered'); $(this).dequeue(); });
    });



    // ITEM PAGE - REPORT BUTTON
    $('#report').hover(function(){
      $(this).stop( true, true ).addClass('hovered');
      $(this).find('.cont-wrap').stop(true,true).fadeIn(200);
      $(this).find('.cont-wrap').css('overflow', 'visible');
      $(this).css('z-index', '99999');
      $(this).addClass('hovered');

    }, function(){
      $(this).find('.cont-wrap').stop( true, true ).delay(700).fadeOut(200);
      $(this).find('.cont-wrap').css('overflow', 'visible');
      $(this).css('z-index', '9999');

      $(this).delay(700).queue(function() { $(this).removeClass('hovered'); $(this).dequeue(); });
    });

  }




  // --------------------------------------------------------
  // ADDITIONAL SCRIPTS FOR RESPONSIVE DESIGN: 0 - 767px
  // --------------------------------------------------------

  if (($(window).width() + scrollCompensate()) <= 767) {

    // HEADER OPTIONS BUTTON
    $('.top-my').hover(function(){
      $(this).stop( true, true ).addClass('hovered');
      $(this).find('.my-wrap').stop(true,true).fadeIn(0);
      $(this).find('.my-wrap').css('overflow', 'visible');
      $(this).css('z-index', '99999');
      $(this).addClass('hovered');

    }, function(){
      $(this).find('.my-wrap').stop( true, true ).delay(0).fadeOut(0);
      $(this).find('.my-wrap').css('overflow', 'visible');
      $(this).css('z-index', '9999');

      $(this).delay(0).queue(function() { $(this).removeClass('hovered'); $(this).dequeue(); });
    });



    // SIMPLE SELECT TRANSFORM TO CLASSIC SELECT
    $('.simple-select').each(function(){
      var block = $(this);
      var html = '';

      if( block.find('input[type="hidden"]').length ) {
        html += '<select class="text" name="' + block.find('input[type="hidden"]').attr('name') + '">';
      } else {
        html += '<select class="text">';
      }

      block.find('.list > div:not(.info)').each(function(){
        var selected = '';

        if($(this).hasClass('selected')) {
          selected = ' selected="selected"';
        }

        html += '<option value="' + $(this).attr('data-id') + '"' + selected + '>' + $(this).text() + '</option>';
      });

      html += '</select>';

      block.append(html);
      block.find('input[type="hidden"], span.text, div.list').remove();
      //block.prev('i').remove();
    });


    // ON MOBILE DEVICES WHEN CLICK ON HOMEPAGE CATEGORY, SCROLL TO SUBCATEGORY LIST
    $("#home-cat .top li a").click(function(event) {
      if(event.originalEvent !== undefined) {
        $('html, body').animate({
          scrollTop: $('.cat-box').offset().top
        }, 1000);
      }
    });


    // DISABLE CREATING FANCYBOX ON IMAGE CLICK FOR MOBILE VIEW
    $("a[rel=image_group]").click(function(e){
      e.preventDefault();
      return false;
    });
  }



  // SEARCH PAGE - FILTER BY ALL / COMPANY / PERSONAL
  $('.user-company-change > div').click(function() {
    if($(this).hasClass('all')) {
      $('input#sCompany').val('').change();
    }

    if($(this).hasClass('individual')) {
      $('input#sCompany').val(0).change();
    }

    if($(this).hasClass('company')) {
      $('input#sCompany').val(1).change();
    }

    if( ajaxSearch == 1 ) {
      $('.user-company-change > div').removeClass('active');
      $(this).addClass('active');
    } 

    if( ajaxSearch != 1 ) {
      $('input#cookieAction').val('done');
      $('#sidebar-search form.search-side-form').submit();
    }
  });



  // RICHEDIT PLUGIN FIX FOR RESPONSIVE DESIGN AND ONE MORE FIX
  if($('.mceLayout').length) {
    $('.mceLayout').css('width', '100%');
  }

  $('a.MCtooltip').click(function(){
    return false;
  });

  $('a.MCtooltip').contents().filter(function(){ return this.nodeType === 3; }).remove();


  $('body').on('click', '#tip_close2, .ico-close', function(e){
    e.preventDefault();
    $("#flashmessage").fadeOut(200);
  });



  // USER MENU HIGHLIGHT ACTIVE
  var url = window.location.toString();

  $('.user_account #sidebar li a').each(function(){
    var myHref= $(this).attr('href');
    if( url == myHref) {
      $(this).parent('li').addClass('active');
    }
  });



  // ADD - EDIT LISTING - ALLOW ONLY DECIMALS IN PRICE INPUT
  $('.add_item input#price').keypress(function(event) {
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
    }
  });



  // CHECK IF IS TOUCH DEVICE
  function is_touch_device() {
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
  }


  
  // IDTABS - MULTI LINE FIX
  function idTabsMultiLine(){
    if( $('ul.tabbernav').height() > 55 ) {
      setTimeout(function(){ 
        $('ul.tabbernav').addClass('multi-line');
      }, 500);

      setTimeout(function(){ 
        $('ul.tabbernav').addClass('multi-line');
      }, 3000);
    }
  }



  // CALCULATE SCROLL WIDTH
  function scrollCompensate() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
  }



  // SCROLL TOP PLUGIN
  if($("#back-top-left").length) {
    $("#back-top-left").hide();
    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $('#back-top-left').fadeIn();
        } else {
          $('#back-top-left').fadeOut();
        }
      });
      $('#back-top-left a').click(function () {
        $('body,html').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
    });
  }

  if($("#back-top-right").length) {
    $("#back-top-right").hide();
    $(function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $('#back-top-right').fadeIn();
        } else {
          $('#back-top-right').fadeOut();
        }
      });
      $('#back-top-right a').click(function () {
        $('body,html').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
    });
  }


  // DO NOT FADE WHEN RESPONSIVE
  if(($(window).width()+scrollCompensate()) > 767) {
    var time = 200;
    var delay = 500;
  } else {
    var time = 0;
    var delay = 0;
  }


  // SEARCH - CLEAR COOKIES AND INPUTS
  $('.clear-cookie').click(function(e){
    e.preventDefault()

    $.ajax({
      url: baseAjaxUrl + "&clearCookieAll=done",
      type: "GET",
      success: function(response){
        //alert(response);
        $("#location-picker, #item-picker").removeClass('searching');
      }
    });


    $('#header-search, #sidebar-search, #menu-search .search-mobile').find('input[name!="page"]').val("");
    $('#header-search .simple-select, #sidebar-search .simple-select, #menu-search .search-mobile .simple-select').each(function(){
      $(this).find('.text span').text( $(this).find('.list .option.bold').text() );
    });

    $('#header-search select, #sidebar-search select, #menu-search .search-mobile select').val();
    $('#header-search select, #sidebar-search select, #menu-search .search-mobile select').each(function(){
      $(this).find('option').attr('selected', false);
    });


    var originalUrl = window.location.href;
    var newUrl = baseDir;

    if( originalUrl.indexOf('?page=search') !== -1 ) {
      newUrl = baseSearchUrl;
    }

    if( originalUrl.indexOf(searchRewrite) !== -1 ) {
      newUrl = baseSearchUrl;
    }

    window.history.pushState(null, null, newUrl);

    $('#cookieAction, #cookieActionMobile').val('done');
  });
});


function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var device = '';
  var browser = '';

  if (/windows phone/i.test(userAgent)) {
    device = "device-windows-phone";
  } else if (/android/i.test(userAgent)) {
    device = "device-android";
  } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    device = "device-ios";
  } else {
    device = "device-other";
  }

  if($.browser.msie) {
    browser = "browser-msie";
  } else if($.browser.mozilla) {
    browser = "browser-mozilla";
  } else if($.browser.opera) {
    browser = "browser-opera";
  } else if($.browser.safari) {
    browser = "browser-safari";
  } else if($.browser.webkit) {
    browser = "browser-webkit";
  } else {
    browser = "browser-other";
  }

  return device + " " + browser;
}



// TOP CATEGORIES ARROWS
function top_cat_move() {
  var pos = 0;
  var prev = $('.left-arrow');
  var next = $('.right-arrow');
  var scroller = $('.top-cat-ul-wrap .ul-box');

  var scroller_width = scroller.width();
  var ul_width = $('#top-cat ul').width();
  var elem_order = Math.max($('.cat-highlight').index('#top-cat ul li') - 2, 0);

  if(scroller_width < ul_width) {
    // RESCALE CATEGORY BOXES
    var elem_show = Math.floor(scroller_width / 130);
    var elem_count = $('#top-cat ul li').length;
    var elem_width = scroller_width / elem_show;
    var ul_width = elem_width * elem_count;

    $('#top-cat ul').css('width', ul_width + 'px');
    $('#top-cat ul li').css('width', (elem_width - 10) + 'px');  // substract margin 5 + 5px

    next.fadeIn(200);

    scroller.stop(true, false).animate({scrollLeft: elem_order * elem_width}, 0, 'swing', function(){
      // SHOW LEFT ARROW
      if(parseInt(scroller.scrollLeft()) + scroller_width < ul_width + 10) {
        prev.fadeIn(200);
      }

      // HIDE RIGHT ARROW
      if(parseInt(scroller.scrollLeft()) + scroller_width >= ul_width - 10) {
        next.fadeOut(200);
      }
    });
  }


  // NEXT BUTTON
  next.click(function() {
    var pos = scroller.scrollLeft() + elem_width*2;
    scroller.stop(true, false).animate({scrollLeft: pos}, 300, 'swing', function(){

      // SHOW LEFT ARROW
      if(parseInt(scroller.scrollLeft()) + scroller_width < ul_width + 10) {
        prev.fadeIn(200);
      }

      // HIDE RIGHT ARROW
      if(parseInt(scroller.scrollLeft()) + scroller_width >= ul_width - 10) {
        next.fadeOut(200);
      }
    });
  });


  // PREVIOUS BUTTON
  prev.click(function() { 
    var pos = scroller.scrollLeft() - elem_width*2;
    scroller.stop(true, false).animate({scrollLeft: pos}, 300, 'swing', function(){

      // SHOW RIGHT ARROW
      if(parseInt(scroller.scrollLeft()) + scroller_width < ul_width + 10) {
        next.fadeIn(200);
      }

      // HIDE LEFT ARROW
      if(parseInt(scroller.scrollLeft()) <= 10) {
        prev.fadeOut(200);
      }
    });
  });
}


// PAGINATION FONTAWESOME FIX FOR NEXT, LAST, PREV AND FIRST
function veronikaAjaxReload(){
  $('.searchPaginationNext').html('<i class="fa fa-angle-right"></i>');
  $('.searchPaginationLast').html('<i class="fa fa-angle-double-right"></i>');
  $('.searchPaginationPrev').html('<i class="fa fa-angle-left"></i>');
  $('.searchPaginationFirst').html('<i class="fa fa-angle-double-left"></i>');

  // ADD DELIMITER TO H3 TAG IN SEARCH SIDEBAR, BECAUSE H3 IS ABSOLUTE
  if( !$('.h3-side-absolute').length ) {
    $('#sidebar-search fieldset h3').before('<div class="h3-side-absolute"></div>');
  }

  // ADD ARROWS TO TOP CATEGORIES
  top_cat_move();

  // CREATE PRICE SLIDER
  if (typeof veronikaPriceSlider !== 'undefined' && $.isFunction(veronikaPriceSlider)) {
    veronikaPriceSlider();
  }
}



// PRICE SLIDER
function veronikaPriceSlider() {
  // if not search, do nothing
  if( !$('body#body-search').length ) {
    return false;
  }

  var formatPrefix = $('input[name="ajax-price-format-prefix"]').val();
  var formatSuffix = $('input[name="ajax-price-format-suffix"]').val();
  var formatSep = $('input[name="ajax-price-format-sep"]').val();
  var priceMax = parseInt($('input[name="ajax-price-max-price"]').val());
  var priceSearchMin = parseInt($('input[name="ajax-price-min-price-search"]').val());
  var priceSearchMax = parseInt($('input[name="ajax-price-max-price-search"]').val());
  
  if(priceMax == '' || priceMax < 0 || isNaN(priceMax)) {
    priceMax = 0;
  }

  if(priceSearchMin == '' || priceSearchMin < 0 || isNaN(priceSearchMin)) {
    priceSearchMin = 0;
  }

  if(priceSearchMax == '' || priceSearchMax < 0 || isNaN(priceSearchMax)) {
    priceSearchMax = priceMax;
  }
 
  
  $( "#slider-range" ).slider({
    range: true,
    step: Math.round(priceMax/25),
    min: 0,
    max: priceMax,
    values: [priceSearchMin, priceSearchMax ],
    slide: function( event, ui ) {
      if(ui.values[ 0 ] <= 0) {
        $( "#amount-min" ).text( formatPrefix + '0' + formatSuffix);
        $( "#amount-max" ).text( ui.values[ 1 ] );
        $( "#amount-max" ).priceFormat({prefix: formatPrefix, suffix: formatSuffix, thousandsSeparator: formatSep, centsLimit: 0});
      } else {
        $( "#amount-min" ).text( ui.values[ 0 ] );
        $( "#amount-max" ).text( ui.values[ 1 ] );
        $( "#amount-min" ).priceFormat({prefix: formatPrefix, suffix: formatSuffix, thousandsSeparator: formatSep, centsLimit: 0});
        $( "#amount-max" ).priceFormat({prefix: formatPrefix, suffix: formatSuffix, thousandsSeparator: formatSep, centsLimit: 0});
      }

      if(ui.values[ 0 ] <= 0) { 
        $( "#priceMin" ).val('');
      } else {
        $( "#priceMin" ).val(ui.values[ 0 ]);
      }

      if(ui.values[ 1 ] >= priceMax) {
        $( "#priceMax" ).val('');
      } else {
        $( "#priceMax" ).val(ui.values[ 1 ]);
      }

      $("#cookieAction").val('done');
    },

    stop: function( event, ui ) {
      if($('input[name="ajaxRun"]').val() != "1") {
        $( "#priceMin" ).change();
      }
    }
  });
  

  if( $( "#slider-range" ).slider( "values", 0 ) <= 0 ) {
    if( $( "#slider-range" ).slider( "values", 1 ) <= 0 ) {
      $( "#amount-min" ).text( formatPrefix + '0' + formatSuffix );
      $( "#amount-max" ).text( "" );
      $( "#amount-del" ).hide(0);
    } else {
      $( "#amount-min" ).text( formatPrefix + '0' + formatSuffix );
      $( "#amount-max" ).text( $( "#slider-range" ).slider( "values", 1 ) );
      $( "#amount-del" ).show(0);
      $( "#amount-max" ).priceFormat({prefix: formatPrefix, suffix: formatSuffix, thousandsSeparator: formatSep, centsLimit: 0});
    }
  } else {
    $( "#amount-min" ).text( $( "#slider-range" ).slider( "values", 0 ) );
    $( "#amount-max" ).text( $( "#slider-range" ).slider( "values", 1 ) );
    $( "#amount-min" ).priceFormat({prefix: formatPrefix, suffix: formatSuffix, thousandsSeparator: formatSep, centsLimit: 0});
    $( "#amount-max" ).priceFormat({prefix: formatPrefix, suffix: formatSuffix, thousandsSeparator: formatSep, centsLimit: 0});
  }
}
