// These two values are passed from Galen test
var userLogin = arg.login;
var userPassword = arg.password

this.LoginPage = function (driver) {
	  GalenPages.extendPage(this, driver, {
	    emailTextfield: "xpath: //*[@id=\"email\"]", // xpath locator
	    passwordTextfield: "xpath: //*[@id=\"password\"]", // xpath locator
	    submitButton: "#btn-login", // id locator

	    loginAs: function (userName, password) {
	      this.emailTextfield.typeText(userName);
	      this.passwordTextfield.typeText(password);
	      this.submitButton.click();
	    }
	  });
	};
	// now you can do it like this
	var loginPage = new LoginPage(driver);
	loginPage.loginAs("gtracey@stats.com", "testing123");


// Here we type user login and password on our login page
driver.findElement(By.xpath("//*[@id=\"email\"]")).sendKeys(userLogin);
driver.findElement(By.xpath("//*[@id=\"password\"]")).sendKeys(userPassword);

// Submitting the login page
driver.findElement(By.cssSelector("#btn-login")).click();

// Waiting till user profile page is shown 
function pageIsLoaded() {
    return driver.findElement(By.id("root")) != null;
}


waitFor(pageIsLoaded);

function waitFor(func) {
    var timeout = 10;

    while(timeout > 0 && !func()) {
        timeout = timeout - 1;
        Thread.sleep(1000);
    }

    if (!func()) {
        throw new Error("Wait timeout");
    }
}


