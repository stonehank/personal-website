const format = require('dateformat');
import dateExist from './dateExist'


export function covertSec2DayHour(seconds, simple = false) {
    if (seconds <= 0) return '0 second'
    let hour = 0, min = 0, sec = 0
    // let dayTime=24*60*60
    let hourTime = 60 * 60
    let minTime = 60
    let secTime = 1
    // day=Math.floor(seconds / dayTime)
    // seconds= seconds % dayTime
    hour = Math.floor(seconds / hourTime)
    seconds = seconds % hourTime
    min = Math.floor(seconds / minTime)
    seconds = seconds % minTime
    sec = Math.floor(seconds / secTime)
    if (simple) {
        return toDouble(hour) + ':' + toDouble(min) + ":" + toDouble(sec)
    }
    let hourStr = '', minStr = '', secStr = ''
    // dayStr = day===0 ? '' : day===1 ? day+' day,' :day + ' days, '
    hourStr = hour === 0 ? '' : hour === 1 ? hour + ' hour,' : hour + ' hours, '
    minStr = min === 0 ? '' : min === 1 ? min + ' minute,' : min + ' minutes, '
    secStr = sec <= 1 ? sec + ' second' : sec + ' seconds'
    return hourStr + minStr + secStr
}

function toDouble(num) {
    if (num < 10) return '0' + num
    return num + ''
}

export function dateFormat(date, mask = 'ddd, mmm d, yyyy') {
    if (Array.isArray(date)) {
        return date
    }
    if (!dateExist(date)) return null
    try {
        return format(date, mask)
    } catch (_) {
        date=compatibleDateTimeStr(date)
    }
    try {
        return format(date, mask)
    } catch (_) {
        return compatibleDateTimeStr(date)
    }
}

// export function isSameDate(date1, date2) {
//     let dateStr1 = dateFormat(date1, 'yyyy-mm-dd')
//     let dateStr2 = dateFormat(date2, 'yyyy-mm-dd')
//     return dateStr1 === dateStr2
// }
//
// export function beforeDate(date) {
//     let time = new Date(date).getTime()
//     return (val) => new Date(val).getTime() <= time
// }
//
// export function afterDate(date) {
//     let time = new Date(date).getTime()
//     return (val) => new Date(val).getTime() >= time
// }

export function dayGapMoreThan(prevDate,daysGap){
    let prevDateTime = new Date(compatibleDateTimeStr(prevDate)).getTime()
    let nowDateTime = new Date().getTime()
    let gapDateTime=daysGap * 24 * 3600 * 1000
    return (nowDateTime - prevDateTime) >= gapDateTime
}


// function isAppleDevice() {
//     return navigator.userAgent.match(/(iPhone|iPod|iPad)/) != null
// }

// export function betweenDate(date1, date2) {
//     date1 = dateFormat(compatibleDateTimeStr(date1),'yyyy/mm/dd')
//     date2 = dateFormat(compatibleDateTimeStr(date2),'yyyy/mm/dd')
//     let time1 = new Date(date1).getTime()
//     let time2 = new Date(date2).getTime()
//     return (val) => {
//         let time = new Date(dateFormat(val,'yyyy/mm/dd')).getTime()
//         return time <= time2 && time >= time1
//     }
// }

// export function timeDuration(oldDate, newDate) {
//     return timeAgo(oldDate, newDate, {
//         seconds: '秒',
//         minutes: '分钟',
//         hours: '小时',
//         now: '刚刚',
//         days: '天',
//         months: '个月',
//     })
// }

function compatibleDateTimeStr(date) {
    if(!date)return null
    let dateStr = ''
    if (typeof date === 'object') {
        return date.toISOString()
    } else if (typeof date === 'string') {
        if (date.includes('-')) {
            dateStr = date.replace(/-/g, '/')
        }
    }
    return dateStr
}




export function timeAgo(oldDate, newDate, langTxt) {
    let defaultLangTxt={
        seconds: '秒前',
        minutes: '分钟前',
        hours: '小时前',
        now: '刚刚',
        days: '天前',
        months: '个月前',
    }
    if (langTxt==null) {
        langTxt = defaultLangTxt
    }else{
        langTxt=Object.assign(defaultLangTxt,langTxt)
    }
    oldDate = new Date(compatibleDateTimeStr(oldDate))

    let oldTime = oldDate.getTime()
    let curTime = null
    if (newDate != null) {
        curTime = new Date(compatibleDateTimeStr(newDate))
    } else {
        curTime = new Date().getTime()
    }
    // console.log(oldDate,newDate)
    try {
        // let curTime = new Date().getTime()
        let diffValue = curTime - oldTime
        let days = Math.floor(diffValue / (24 * 3600 * 1000))
        if (days === 0) {
            // 计算相差小时数
            let leave1 = diffValue % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
            let hours = Math.floor(leave1 / (3600 * 1000))
            if (hours === 0) {
                // 计算相差分钟数
                let leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
                let minutes = Math.floor(leave2 / (60 * 1000))
                if (minutes === 0) {
                    // 计算相差秒数
                    let leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
                    let seconds = Math.round(leave3 / 1000)
                    return `${seconds} ${langTxt.seconds}`
                }
                return `${minutes} ${langTxt.minutes}`
            }
            return `${hours} ${langTxt.hours}`
        }
        if (days < 0) return langTxt.now
        if (days < 30) return `${days} ${langTxt.days}`
        if (days < 365) return `${Math.floor(days / 30)} ${langTxt.months}`
        return dateFormat(oldDate, 'yyyy-mm-dd')
    } catch (error) {
        console.error('Something wrong with timeago function.', error)
    }
    return 'Unknown'
}
