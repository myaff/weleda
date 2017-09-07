/**
 * Переключение классов по различным событиям
 * @module Animation
 */

let scrollAnimationBlocks = $('.section');
let stickyBlocks = $('.sticky');
 
function addClassTogglerScene (el, controller) {
  new ScrollMagic.Scene({
    triggerElement: el,
    triggerHook: 0.5
  })
  .setClassToggle(el, 'animation-start')
  .addTo(controller);
}
function addClassTogglerController (animationBlocks) {
  let controller = new ScrollMagic.Controller();
  animationBlocks.each(function(){
    let aDelay = 0;
    if ($(this).attr('data-a-delay') !== undefined) {
      aDelay = Number($(this).attr('data-a-delay')) * 1000;
    }
    setTimeout(addClassTogglerScene, aDelay, this, controller);
  });
}


function addStickyScene (el, controller) {
  //setTimeout(console.dir($(el).closest('.sticky-wrapper')[0]), 2000);
  setTimeout(function (el, controller) {
    let headerHeight = $('.header').height();
    let durationHeight = $(el).closest('.sticky-wrapper')[0].offsetHeight - $(window).height() + headerHeight;
    let offsetHeight = -1 * headerHeight;
    new ScrollMagic.Scene({
      triggerElement: el,
      triggerHook: 0,
      offset: offsetHeight,
      //duration: durationHeight
      duration: 100%
    })
    .setPin(el)
    .addTo(controller);
  }, 500, el, controller);
}

function addStickyController (stickyBlocks) {
  let controller = new ScrollMagic.Controller();
  stickyBlocks.each(function(){
    addStickyScene(this, controller);
  });
}

function init () {
  if (scrollAnimationBlocks.length > 0 && $(window).width() > 1024){
    addClassTogglerController(scrollAnimationBlocks);
  }
  if (stickyBlocks.length > 0 && Main.DeviceDetection.isMobile()){
    addStickyController(stickyBlocks);
  }
}

module.exports = {init};