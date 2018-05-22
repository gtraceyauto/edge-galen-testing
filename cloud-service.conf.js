function Config(user, key, url) {
  this.user = user;
  this.key = key;
  this.url = 'http://' + user + ':' + key + '@hub.browserstack.com/wd/hub';
}

var config = {
  browserstack: new Config('statsllc1', 'q7NYPcoMstxXBarYzfcy')
}
