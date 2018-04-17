test("boxscore layout test", function() {
  var url = 'http://prod-stats-hosted-demo.us-east-1.elasticbeanstalk.com/baseball/mlb/boxscores/1996445';
  var driver = createDriver(url, '1280x1024');
  checkLayout(driver, 'tests/specs/boxscore.gspec');
  driver.quit();
});

// function Device(deviceName, size, tags) {
//     this.deviceName = deviceName;
//     this.size = size;
//     this.tags = tags;
// }
// var devices = {
//     mobile:  new Device('mobile', '450x700', ['mobile']),
//     tablet:  new Device('tablet', '600x800', ['tablet']),
//     desktop: new Device('desktop', '1280x1024', ['desktop'])
// };
//
// forAll(devices, function() {
//   test('boxscore layout test', function(device) {
//     var url = 'http://prod-stats-hosted-demo.us-east-1.elasticbeanstalk.com/baseball/mlb/boxscores/1996445';
//     var driver = createDriver(url, device.size);
//     checkLayout(driver, 'tests/specs/boxscore.gspec', device.tags);
//     driver.quit();
//   });
// });
