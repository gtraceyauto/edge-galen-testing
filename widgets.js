function Widget(name, url) {
  this.name = name;
  this.url = url;
}

var widgets = {
  boxscoreStats: new Widget(
    'boxscore_stats',
    'http://prod-stats-hosted-demo.us-east-1.elasticbeanstalk.com/baseball/mlb/boxscores/1996445'
  ),
  standings: new Widget(
    'standings',
    'http://prod-stats-hosted-demo.us-east-1.elasticbeanstalk.com/baseball/mlb/standings'
  )
}
