function Platform(browser, os) {
  this.browser = browser;
  this.os = os;
}

//Refer to https://www.browserstack.com/automate/capabilities to config capabilities
var platforms = {
  chromeMac: new Platform('chrome', 'OS X'),
  safariMac: new Platform('safari', 'OS X')
};
