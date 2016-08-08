/* global $:true */
'use strict';

var templateString = `
  <article class="dex-item push--bottom">
    <button class="js-toggle-cat-edit remove-button dex-item__remove text--small">Edit</button>
    <h1 class="zeta flush dex-item__title"><%- name %></h1>
    <p class="dex-item__text"></p>
    <div class="js-item-cats dex-item__categories hidden">
      <form action="">
        <label class="block" for="cat2">
          <input class="custom custom-input" id="cat2" type="checkbox"> <span class="custom-input__label"></span>Category
        </label>
      </form>
    </div>
  </article>
`;

var template = _.template(templateString);

function createTagElement(element){
  return $(element).selectize({
      plugins: ['remove_button'],
      delimiter: ',',
      persist: false,
      create: function(input) {
          return {
              value: input,
              text: input
          };
      }
  });
}

$(() => {
  $('.js-new-question').magnificPopup({
    type: 'inline',
    items: {
      src: '#new-item-popup'
    },
    mainClass: 'mfp-zoom-in',
    removalDelay: 150,
    callbacks: {
      open: function() {
        var elements = this.content.find('.js-tags');
        createTagElement(elements);
      }
    }
  });

  $('.js-response-editor').trumbowyg({
    resetCss: true,
    btns: [
      ['viewHTML', 'bold', 'italic', 'unorderedList', 'orderedList'],
      ['link', 'insertImage', 'fullscreen']
    ]
  });

  $('.slider').slick({
    slidesToShow: 3,
    variableWidth: true,
    infinite: false,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><span class="sr-only">Previous</span><svg class="sicon sicon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="symbol-defs.svg#sicon-arrow-left"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"><span class="sr-only">Next</span><svg class="sicon sicon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="symbol-defs.svg#sicon-arrow-right"></use></svg></button>'
  });

  $('.js-toggle-add-location').on('click', function(e){
    e.preventDefault();
    $('.js-add-location-form').toggleClass('hidden');
  });

  var $locationsInput = $('.js-locations');
  var $userList = $('#user-knows');

  $locationsInput.easyAutocomplete({
    data: ['New York', 'Barranquilla', 'Las vegas'],
    placeholder: 'Select a location',
    list: {
      onChooseEvent: function(){
        var item = {
          name : $locationsInput.getSelectedItemData()
        };
        var rendered = template(item);
        $userList.append(rendered);
        $locationsInput.val('');
      }
    }
  });

  $userList.on('click', '.js-toggle-cat-edit', function(e){
    e.preventDefault();
    var $el = $(this);
    $el.parent().find('.js-item-cats').toggleClass('hidden');
  });

  var $moreList = $('.js-more');
  $moreList.each(function(ind, el){
    var isOpen = false;
    var $el = $(el);
    var $trigger = $el.next('.js-show-more-trigger');
    var $items = $('.js-more-item');
    var wrapperHeight = getItemsHeight(5, $items);
    $el.height(wrapperHeight);
    $trigger.on('click', function(e){
      e.preventDefault();
      if(isOpen){
        $el.height(wrapperHeight);
        isOpen = false;
      }else{
        $el.height('auto');
        isOpen = true;
      }
    })
  })

});

function getItemsHeight(number, items){
  var h = 0;
  for(var i = 0; i < number; i++){
    h = h + $(items[i]).outerHeight()
  }
  return h;
}