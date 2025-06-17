/**
 * 渲染html
 */

/**
 * 渲染单个数字
 * @param {*} number 
 * @param {*} isActive 
 * @param {*} isBefore 
 * @returns 
 */
function renderOneNumber(number, isActive, isBefore ) {
  return `<li class="item ${isActive ? 'active' : ''} ${isBefore ? 'before' : ''}">
    <div class="up">
      <div class="shadow"></div>
      <div class="inn">${number}</div>
    </div>
    <div class="down">
      <div class="shadow"></div>
      <div class="inn">${number}</div>
    </div>
  </li>`
}

/**
 * 渲染单一组数字
 * @param {*} current 
 * @param {*} before 
 * @param {*} total 
 * @returns 
 */
function renderFlipItem(current, before, total) {
  var string = ''
  for (let j = 0; j < 10; j++) {
    var isActive = current == j
    var isBefore = j == before
    string += renderOneNumber(j, isActive, isBefore)
  }
  return string
}

/**
 * 渲染一组分页数字，两个卡片
 * @param {*} number 
 * @param {*} key 
 * @param {*} numberConfig 
 * @param {*} beforeNumber 
 * @returns 
 */
function renderItem(number, key, numberConfig, beforeNumber) {
  var num = number.toString().split('')
  var bNum = beforeNumber.toString().split('')
  console.log(num, bNum)
  var string = ''
  for (let i = 0; i < num.length; i++) {
    var total = numberConfig[i]
    string += `<div id="${key}_${i}" class="${num[i] !== bNum[i] ? 'play' : ''}"><ul class="flip">`
    string += renderFlipItem(num[i], bNum[i], total)
    string += `</ul></div>
`
  }
  return string
}

/**
 * 定义每组卡片最大的值
 */
var totalNumberConfig = {
  year: [5000],
  month: [1, 2],
  day: [3, 9],
  hour: [5, 9],
  minute: [5, 9],
  second: [5, 9]
}

/**
 * 主体渲染函数
 * @param {*} config 
 * @param {*} beforeConfig 
 * @returns 
 */
function render(config, beforeConfig = 0) {
  var str = ''
  var skip = true
  for (var k in config) {
    if (config[k] != 0) {
      skip = false
    }
    if (!skip) {
      var numberConfig = totalNumberConfig[k]
      var beforeNumberConfig = totalNumberConfig[k]
      var number = numberConfig.length > 1 ? addZero(config[k]) : config[k]
      var beforeNumber = beforeNumberConfig ? beforeNumberConfig.length > 1 ? addZero(beforeConfig[k] || 0) : beforeConfig[k] : '00'
      str += renderItem(number, k, numberConfig, beforeNumber)
      if (k !== 'second') {
        str += `<div class="colon"></div>`
      }
    }
  }
  return str
}