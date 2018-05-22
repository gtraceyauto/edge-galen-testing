function Platform(browser, browserVersion, os, osVersion) {
  this.browser = browser;
  this.browserVersion = browserVersion ? browserVersion : '';
  this.os = os;
  this.osVersion = osVersion ? osVersion : '';
}

//Refer to https://www.browserstack.com/automate/capabilities to config capabilities
var platforms = {
  ie_win_7: new Platform('IE', '11.0', 'Windows', '7'),
  safari_OSX_highsierra: new Platform('safari', '11.1', 'OS X', 'High Sierra')
};
