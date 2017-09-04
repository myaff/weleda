/**
 * Табы
 * @module Tabs
 */

function run(tabs){
  let activeControl = tabs.find('.js-tab.is-active');
  let activeTab = $(activeControl.attr('data-target'));
  //tabs.find('.tabs__content-item').addClass('invisible');
  openTab(activeTab);
}
 
function openTab(tab) {
  //tab.removeClass('invisible');
  tab.addClass('is-active');
  tab.trigger('openTab');
}

function closeTab(tab) {
  tab.removeClass('is-active');
  //tab.addClass('invisible');
  tab.trigger('closeTab');
}

/**
 * инициализация событий для табов
 * @example
 * Tab.run();
 */
function init(){
  let tabs = $('.tabs');
  run(tabs);
    
  $('.js-tab').click(function(e){
      e.preventDefault();
      $(this).siblings('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
      let target = $(this).attr('data-target');
      let tab = $(target);
      if (!tab.hasClass('is-active')) {
        tab.siblings('.is-active').each(function(){
          closeTab($(this));
        });
        if (Main.DeviceDetection.isMobile()) {
          openTab(tab);
        } else {
          setTimeout(openTab, 500, tab);
        }
      }
  });
}

module.exports = {run, init, openTab, closeTab};