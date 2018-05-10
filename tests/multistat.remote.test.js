load('/devices.js');
load('/widgets.js');
load('/remote-platforms.js');
load('/cloud-service.conf.js');

var widgetToTest = widgets.multistat;
var widgetName = widgetToTest.name;

this.MultistatPage = function(driver) {
  GalenPages.extendPage(this, driver, 'multistat', {
    mainContainer: '.main-container',
    pitchingTab: '.player-category-toggle > div.toggle-container > div:nth-child(2)'
  });
};

forAll(platforms, function() {
  forAll(devices, function() {
    test(widgetName + ' layout on ${deviceName} - ${browser} - ${os}', function(platform, device) {
      var testName = widgetName + ' layout on ' + device.deviceName;
      var driver = createGridDriver(config.browserstack.url, {
        desiredCapabilities: {
          browser: platform.browser,
          os: platform.os,
          os_version: platform.osVersion,
          name: testName.toString(),
          'browserstack.debug': 'true'
        }
      });
      session.put('driver', driver);
      driver.get(widgetToTest.url);
      var multistatPage = new MultistatPage(driver);
      resize(driver, device.size);
      multistatPage.mainContainer.waitToBeShown('2s');
      checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
      multistatPage.pitchingTab.clickAt(5, 5);
      GalenPages.sleep(1000);
      checkLayout(driver, 'specs/multistat.pitching.gspec', device.tag);
    });
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
