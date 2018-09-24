function Module(name, url) {
  this.name = name;
  this.url = url;
}

var modules = {
  loginpage: new Module(
	'loginpage',
    'http://edge.stats.com'
  ), 
  teamsummary: new Module(
    'teamsummary',
    'http://edge.stats.com'
  ),
  matchviewer: new Module(
    'matchviewer',
    'http://edge.stats.com'
  ),
  setplay: new Module(
    'setplay',
    'http://edge.stats.com'
  ),
  findvideo: new Module(
    'findvideo',
    'http://edge.stats.com'
  ),
  playlists: new Module(
	'playlists',
	'http://edge.stats.com'
  ),
  downloads: new Module(
	'downloads',
	'http://edge.stats.com'
  ),
		  
  
}
