function Config(user, key, url) {
  this.user = user;
  this.key = key;
  this.url = 'http://' + user + ':' + key + '@hub.browserstack.com/wd/hub';
}

var config = {
  browserstack: new Config('stephenmoran3', 'CFYUKpfCmcoFTQXRZzXQ')
  //browserstack: new Config('timlantz2', 'ss66ANCVQ8yXydAKkyUp')
}
