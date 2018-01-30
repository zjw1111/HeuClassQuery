function formatTime(date) {
  var Week = ['Sun','Mon','Tue','Wen','Thu','Fri','Sat']
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var week = date.getDay()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':') + ' ' + Week[week]
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber
}
