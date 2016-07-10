$(() => {
  $(".js-new-question").magnificPopup({
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

  $(".js-response-editor").trumbowyg({
    resetCss: true,
    btns: [
      ['viewHTML', 'bold', 'italic', 'unorderedList', 'orderedList'],
      ['link', 'insertImage', 'fullscreen']
    ]
  });
});

function createTagElement(element){
  return $(element).selectize({
      plugins: ['remove_button'],
      delimiter: ',',
      persist: false,
      create: function(input) {
          return {
              value: input,
              text: input
          }
      }
  });
}