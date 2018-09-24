load('/devices.js');
load('/modules.js');

var moduleToTest = modules.teamsummary;
var moduleName = moduleToTest.name;

 

this.TeamsummaryPage = function(driver) {
  GalenPages.extendPage(this, driver, 'teamsummary', {
	emailTextfield: "xpath: //*[@id=\"email\"]", // xpath locator
	passwordTextfield: "xpath: //*[@id=\"password\"]", // xpath locator
	submitButton: "#btn-login", // id locator
	moduleContainer: '#root .team-masthead-container',
    STATSLogo: "xpath: //*[@id=\"root\"]/div[1]/img", // xpath locator 	
    teamMenu: "xpath: //*[@id=\"root\"]/div[2]/div[2]/div[2]/div[2]/div/div[1]/span[1]"	

  });

};


forAll(devices, function() {
  test(moduleName + ' layout on ${deviceName}', function(device) {
    var driver = createDriver(moduleToTest.url, '1920x1080');
    session.put('driver', driver);
    var teamsummarypage = new TeamsummaryPage(driver);
    teamsummarypage.emailTextfield.typeText("gtracey@stats.com");
    teamsummarypage.passwordTextfield.typeText("testing123");
    teamsummarypage.submitButton.click(); 
    resize(driver, device.size);
    teamsummarypage.STATSLogo.waitToBeShown('10s');
    teamsummarypage.teamMenu.click(); 
    checkLayout(driver, 'specs/' + moduleName + '.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});

