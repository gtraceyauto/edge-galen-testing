function Platform(browser, os, osVersion) {
  this.browser = browser;
  this.os = os;
  this.osVersion = osVersion ? osVersion : '';
}

//Refer to https://www.browserstack.com/automate/capabilities to config capabilities
var platforms = {
  chromeMac: new Platform('chrome', 'OS X', 'High Sierra'),
  safariMac: new Platform('safari', 'OS X', 'High Sierra')
};
