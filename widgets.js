function Widget(name, url) {
  this.name = name;
  this.url = url;
}

var widgets = {
  multistat: new Widget(
    'multistat',
    'http://dev-stats-hosted-demo.us-east-1.elasticbeanstalk.com/baseball/mlb/teams/multistat'
  ),
  scoreboard: new Widget(
    'scoreboard',
    'http://prod-stats-hosted-demo.us-east-1.elasticbeanstalk.com/baseball/mlb/scores'
  ),
  standings: new Widget(
    'standings',
    'http://dev-stats-hosted-demo.us-east-1.elasticbeanstalk.com/baseball/mlb/standings'
  )
}
