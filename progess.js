module.exports = {
  progressReporter: {
    max: 100
  , stepSize: 1
  , current: 0
  , lastUpdate: 0
  , autoSetStepSize: function () {
      var self = this
      self.stepSize = Math.round(self.max / 100)
      return self.stepSize
    }
  , add: function (addThis) {
      var self = this
      self.current += addThis
      self.update()
    }
  , update: function () {
      var self = this
      if(self.lastUpdate + self.stepSize < self.current) {
        self.printStatus(Math.round(self.current / self.stepSize))
        self.lastUpdate = self.current
      }
    }
  , printStatus: function (status) {
      var self = this
      status = status > 100 ? 100 : status
      console.log('We are at ' + status + '%')
    }
  }
}