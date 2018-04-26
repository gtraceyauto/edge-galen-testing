function Platform(browser, os) {
  this.browser = browser;
  this.os = os;
}

var platforms = {
  chromeMac: new Platform('chrome', 'OS X'),
  safariMac: new Platform('safari', 'OS X')
};
