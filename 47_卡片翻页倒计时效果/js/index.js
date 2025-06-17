;(function() {
  // 总倒计时
  var totalTime = 8640000
  var clockContainer = $('.clock-container')
  var before
  var current
  
  /**
   * 解析数字
   * @param {*} timeTotal 
   * @returns 
   */
  function parseTime(timeTotal) {
    // 分总秒速
    var minuteTotal = 60
    // 时总秒数
    var hourTotal = 60 * minuteTotal
    // 天总秒数
    var dayTotal = 24 * hourTotal
    // 月秒总数
    var monthTotal = 30 * dayTotal
    // 年总秒数
    var yearTotal = 12 * monthTotal

    var result = {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    }

    if (timeTotal >= yearTotal) {
      result.year = parseInt(timeTotal / yearTotal)
      totalTime = timeTotal - result.year * yearTotal
    }

    if (timeTotal < yearTotal && timeTotal >= monthTotal) {
      result.month = parseInt((timeTotal) / monthTotal)
      timeTotal = timeTotal - result.month * monthTotal
    }

    if (timeTotal < monthTotal && timeTotal >= dayTotal) {
      result.day = parseInt((timeTotal) / dayTotal)
      timeTotal = timeTotal - result.day * dayTotal
      
    }

    if (timeTotal < dayTotal && timeTotal >= hourTotal) {
      result.hour = parseInt((timeTotal) / hourTotal)
      timeTotal = timeTotal - result.hour * hourTotal
    }

    if (timeTotal < hourTotal && timeTotal >= minuteTotal) {
      result.minute = parseInt((timeTotal) / minuteTotal)
      timeTotal = timeTotal - result.minute * minuteTotal
    }

    result.second = parseInt(timeTotal)

    return result
  }

  /**
   * 挂载
   * @param {*} container 
   * @param {*} html 
   */
  function mount(container, html) {
    container.innerHTML = html
  }

  /**
   * 初始化
   */
  function init() {
    var config = parseTime(totalTime)
    var html = render(config)
    current = config
    mount(clockContainer, html)
  }

  // 防止空白
  init()

  var timer = null

  /**
   * 开始
   */
  function start() {
    stop()
    timer = setTimeout(function () {
      run()
      start()
    }, 1000)
  }
  start()

  /**
   * 主体开始
   */
  function run() {
    before = current
    totalTime--
    current = parseTime(totalTime)
    var html = render(current, before)
    mount(clockContainer, html)
  }

  function stop() {
    clearTimeout(timer)
  }
})()