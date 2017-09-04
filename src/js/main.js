let DeviceDetection = require("./components/device-detection");
let Togglers = require("./components/togglers");
let Carousel = require("./components/carousel");
let Tabs = require("./components/tabs");
let Animation = require("./components/animation");

$(document).ready(function(){
  
  DeviceDetection.run();
  Togglers.init();
  Carousel.init();
  Animation.init();
  Tabs.init();
  
});


/**
 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
 * @example
 * Main.Form.isFormValid();
 */
module.exports = {
   DeviceDetection,
   Togglers,
   Carousel,
   Tabs
};