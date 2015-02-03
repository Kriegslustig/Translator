module.exports = {
  progressReporter: {
    max: 100
  , stepSize: 1
  , current: 0
  , lastUpdate: 0
  , autoSetStepSize: function () {
      var self = this
      self.stepSize = Math.round(max / 100)
      return self.stepSize
    }
  , add: function (addThis) {
      var self = this
      self.current += addThis
      self.update()
    }
  , update: function () {
      var self = this
      if(self.lastUpdate + stepSize < self.current) {
        self.printStatus(Math.round(self.current / self.stepSize))
        self.lastUpdate = self.current
      }
    }
  , printStatus: function (status) {
      var self = this
      console.log('We are at ' + self.status + '%')
    }
  }
}