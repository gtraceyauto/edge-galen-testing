function Platform(browser, browserVersion, os, osVersion) {
  this.browser = browser;
  this.browserVersion = browserVersion ? browserVersion : '';
  this.os = os;
  this.osVersion = osVersion ? osVersion : '';
}

//Refer to https://www.browserstack.com/automate/capabilities to config capabilities
var supportedPlatforms = {
  Chrome_Latest_Win10: new Platform('Chrome', '', 'Windows', '10'),
  Firefox_Latest_Win10: new Platform('FireFox', '', 'Windows', '10'),
  IE11_Latest_Wind10: new Platform('IE', '', 'Windows', '10'),
  Edge_Latest_Win10: new Platform('Edge', '', 'Windows', '10'),
  Safari_Latest_MacOS: new Platform('Safari', '', 'OS X', 'High Sierra')
};

// Supported platforms
// ------------------------------------------------------
// + Chrome - latest stable version
// + Firefox - latest stable version
// + IE11
// + Edge - latest stable version
// + iOS Safari (or macOS)
// + Android Chrome
//
// MSN Proposal (proposed above but this was requested) - their original request was tier 1 and 2 but they also admitted the list was probably outdated.
//
// + Tier 1
// + Edge
// + IE11
// + Chrome
// + iPhone Safari
// + Android Chrome
// + Windows Phone IE (some devices not many)
// + Tier 2
// + Firefox
// + MAC Safari
// + iPad Safari
// + Windows Phone IE (most devices)
// + Xbox Edge
// + Android Tablet Chrome
// + IE10 (if high percentage of users still use on their site)
// + Tier 3
// + IE9
// + IE8
// + IE7
// + Opera
// + most of their tier 3 is device specific and related to mobile and tablet
