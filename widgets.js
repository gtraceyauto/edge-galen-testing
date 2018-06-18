function Widget(name, url) {
  this.name = name;
  this.url = url;
}

var widgets = {
  teamstats: new Widget(
    'teamstats',
    'http://prod-stats-hosted-demo.us-east-1.elasticbeanstalk.com/msn/baseball/mlb/teams/multistat'
  ),
  scoreboard: new Widget(
    'scoreboard',
    'http://prod-stats-hosted-demo.us-east-1.elasticbeanstalk.com/msn/baseball/mlb/scores'
  ),
  standings: new Widget(
    'standings',
    'http://prod-stats-hosted-demo.us-east-1.elasticbeanstalk.com/msn/baseball/mlb/standings'
  )
}
