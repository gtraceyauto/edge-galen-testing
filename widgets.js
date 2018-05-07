function Widget(name, url) {
  this.name = name;
  this.url = url;
}

var widgets = {
  boxscoreStats: new Widget(
    'boxscore_stats',
    'http://prod-stats-hosted-demo.us-east-1.elasticbeanstalk.com/baseball/mlb/boxscores/1996445'
  ),
  multistat: new Widget(
    'multistat',
    'http://dev-stats-hosted-demo.us-east-1.elasticbeanstalk.com/baseball/mlb/teams/multistat'
  ),
  scoreboard: new Widget(
    'scoreboard',
    'http://prod-stats-hosted-demo.us-east-1.elasticbeanstalk.com/baseball/mlb/scores'
  )
}
