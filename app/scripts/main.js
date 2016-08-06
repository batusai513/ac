/* global $:true */
'use strict';

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
  })

});
