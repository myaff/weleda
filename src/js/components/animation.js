/**
 * Переключение классов по различным событиям
 * @module Animation
 */

let scrollAnimationBlocks = $('.section');
let stickyBlocks = $('.sticky');
let stickyBlock = $('.sticky');
var stickyController = new ScrollMagic.Controller();
 
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


function addStickyScene () {
    let offsetHeight = -1 * $('.header').height();
    let durationHeight = $('.sticky-wrapper').outerHeight() - $(window).height() - offsetHeight;
    console.log(durationHeight);
    return new ScrollMagic.Scene({
      triggerElement: '#sticky',
      triggerHook: 0,
      offset: offsetHeight,
      duration: durationHeight
    })
    .setPin('#sticky')
    //.addIndicators()
    .addTo(stickyController);
}

function init () {
  if (scrollAnimationBlocks.length > 0 && $(window).width() > 1024){
    addClassTogglerController(scrollAnimationBlocks);
  }
  /*if (Main.DeviceDetection.isMobile()){
    var stickyScene = addStickyScene();
    let resizeTimeout = null;
    $(window).on('resize', function () {
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(function() {
          stickyScene.destroy(true);
          addStickyScene();
        }, 500);
    });
  }*/
}

module.exports = {init};