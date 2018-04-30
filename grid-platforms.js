function Platform(browser, os) {
  this.browser = browser;
  this.os = os;
}

var platforms = {
  firefox: new Platform('firefox', 'WINDOWS'),
  chrome: new Platform('chrome', 'WINDOWS')  
}
