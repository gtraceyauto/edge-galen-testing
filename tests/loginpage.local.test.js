load('/devices.js');
load('/modules.js');

var moduleToTest = modules.loginpage;
var moduleName = moduleToTest.name;

this.Loginpage = function(driver) {
  GalenPages.extendPage(this, driver, 'loginpage', {
    moduleContainer: '.login-header',
    emailTextBox: '#email',
    passwordTextBox: '<input type="password" id="password">'	
  });
};

forAll(devices, function() {
  test(moduleName + ' layout on ${deviceName}', function(device) {
    var driver = createDriver(moduleToTest.url, '1920x1080');
    session.put('driver', driver);
    var loginpage = new Loginpage(driver);
    resize(driver, device.size);
    loginpage.emailTextBox.waitToBeShown('10s');
    checkLayout(driver, 'specs/' + moduleName + '.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});

