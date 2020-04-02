const STARTED = 'started'
const NO_STARTED = 'no-started'
const FINISHED = 'finished'
const PAUSED = 'paused'
const RESTARTED = 'restarted'

const timeFormat = require('./TimeFormat')

module.exports = function taskTime(status, startedIn, finishedIn) {

  var timeNow = new Date().getTime()
  var timeStart = new Date(startedIn.replace(' ', 'T'))
  var timeFinish = new Date(finishedIn.replace(' ', 'T'))

  switch (status) {
    case STARTED:
    case RESTARTED:
      return timeFormat.timeToClock(String(timeNow - timeStart))
    case FINISHED:
      return timeFormat.timeToClock(String(timeFinish - timeStart))
    case PAUSED:
      return timeFormat.timeToClock(String(timeFinish - timeStart))
    case NO_STARTED:
    default:
      return '00:00:00'
  }
}