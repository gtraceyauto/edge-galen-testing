load('/devices.js');
load('/widgets.js');

var widgetToTest = widgets.boxscoreStats;
var widgetName = widgetToTest.name;

this.PlayerComponent = $page('Player', {
  playerName: '.player-name.show-for-large'
});

this.PlayerStats = $page('Player Stats', {
  list: $list(PlayerComponent, '.player-stat-line')
});

beforeTest(function() {
  var driver = createDriver(widgetToTest.url, '1920x1080');
  session.put('driver', driver);
});

forAll(devices, function() {
  test(widgetName + ' layout on ${deviceName}', function(device) {
    var driver = session.get('driver');
    var playerStats = new PlayerStats(driver);
    resize(driver, device.size);
    console.log("HERE: " + playerStats.list.get(1).playerName.getText());
    checkLayout(driver, 'specs/' + widgetName + '.gspec', device.tag);
  });
});

afterTest(function() {
  var driver = session.get('driver');
  driver.quit();
});
