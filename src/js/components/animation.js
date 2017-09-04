/**
 * Переключение классов по различным событиям
 * @module Animation
 */

let scrollAnimationBlocks = $('.section');
let stickyBlocks = $('.sticky');
let parallaxBlocks = $('.a-parallax-box');
 
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
      duration: durationHeight
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

function getFromPosition (el, defaultPosition = 0){
  return (el.attr('data-parallax-from') !== undefined) ? Number(el.attr('data-parallax-from')) : defaultPosition;
}
function getToPosition (el, defaultPosition = 0){
  return (el.attr('data-parallax-to') !== undefined) ? Number(el.attr('data-parallax-to')) : defaultPosition;
}

function getParallaxTimeline (el) {
  let tween = new TimelineMax();
  let tweensArr = [];
  if ($(el).find('.a-parallax-back')) {
    let targetEl = $(el).find('.a-parallax-back');
    let fromPos = getFromPosition(targetEl, -20);
    let toPos = getToPosition(targetEl);
    tweensArr.push(TweenMax.fromTo(targetEl, 1, {yPercent: fromPos}, {yPercent: toPos, ease: Linear.easeNone}));
  }
  if ($(el).find('.a-parallax-middle')) {
    let targetEl = $(el).find('.a-parallax-middle');
    let fromPos = getFromPosition(targetEl, -15);
    let toPos = getToPosition(targetEl);
    tweensArr.push(TweenMax.fromTo(targetEl, 1, {yPercent: fromPos}, {yPercent: toPos, ease: Linear.easeNone}));
  }
  if ($(el).find('.a-parallax-front')) {
    let targetEl = $(el).find('.a-parallax-front');
    let fromPos = getFromPosition(targetEl, -10);
    let toPos = getToPosition(targetEl, 10);
    tweensArr.push(TweenMax.fromTo(targetEl, 1, {yPercent: fromPos}, {yPercent: toPos, ease: Linear.easeNone}));
  }
  tween.add(tweensArr);
  return tween;
}

function addParallaxScene (el, tween, controller) {
  new ScrollMagic.Scene({
    triggerElement: el,
    duration: $(el).height()
  })
  .setTween(tween)
  .addTo(controller);
}

function addParallaxController (animationBlocks) {
  let controller = new ScrollMagic.Controller();
  animationBlocks.each(function(){
    let tween = getParallaxTimeline(this);
    addParallaxScene(this, tween, controller);
  });
}

function init () {
  if (scrollAnimationBlocks.length > 0 && $(window).width() > 1024){
    addClassTogglerController(scrollAnimationBlocks);
  }
  if (parallaxBlocks.length > 0 && $(window).width() > 1024){
    addParallaxController(parallaxBlocks);
  }
  if (stickyBlocks.length > 0 && Main.DeviceDetection.isMobile()){
    addStickyController(stickyBlocks);
  }
}

module.exports = {init};