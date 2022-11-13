/**
 * 将json转换为列表，通过自定义filter过滤不需要的
 * @param jsonList Array
 * @param flags Array 定义每一个json数据的类型
 * @param filter Function
 * @returns {[]}
 */
export function convertToList(jsonList, flags, filter) {
  if (!filter) filter = (_) => true
  if (!Array.isArray(jsonList)) jsonList = [jsonList]
  if (!Array.isArray(flags)) flags = []
  const list = []
  for (let i = 0; i < jsonList.length; i++) {
    const json = jsonList[i]
    const flag = flags[i]
    for (const k in json) {
      if (!json.hasOwnProperty(k)) continue
      if (!filter(json[k])) continue
      list.push({
        ...json[k],
        flag
      })
    }
  }
  return list
}




/**
 * Tested
 * @param json
 * @param groupBy
 * @returns {{}}
 */
export function refactor(json, groupBy) {
  const groupObj = {}
  let group
  if (groupBy === "time") group = "timeArr"
  if (group === "timeArr") {
    if (Array.isArray(json)) {
      for (const cur of json) {
        _parse(cur, group)
      }
    } else {
      for (const k in json) {
        const cur = json[k]
        _parse(cur, group)
      }
    }

    return groupObj

    function _parse(obj, group) {
      if (!obj[group]) return
      if (obj[group].length === 0) {
        if (!groupObj.noDate) groupObj.noDate = []
        groupObj.noDate.push(obj)
        return
      }
      const year = obj[group][0]
      const month = obj[group][1]
      const day = obj[group][2]
      if (!groupObj[year]) groupObj[year] = []
      if (!groupObj[year][month]) groupObj[year][month] = []
      let index = groupObj[year][month].length
      // insertion sort
      while (index > 0 && day < groupObj[year][month][index - 1][group][2]) index--
      groupObj[year][month].splice(index, 0, obj)
    }
  }
  // if(group==="label"){
  //   for(let k in json){
  //     let cur=json[k]
  //     if(!cur[group])continue;
  //     let curLabel=cur[group]
  //     for(let i=0;i<curLabel.length;i++){
  //       if(!groupObj[curLabel[i]])groupObj[curLabel[i]]=[cur]
  //       else groupObj[curLabel[i]].push(cur)
  //     }
  //   }
  //   return groupObj
  // }
  // if(group==="init"){
  //   let result=[]
  //   for(let k in json){
  //     if(k==="version" || Object.prototype.toString.call(json[k])!=="[object Object]")continue
  //     result.push(json[k])
  //   }
  //   result.sort(function(o1,o2){
  //     let t1=o1.timeArr,t2=o2.timeArr
  //     if(!t1 || !t2)return -1
  //     if(t2[0]!==t1[0])return t2[0]-t1[0]
  //     else if(t2[1]!==t1[1])return t2[1]-t1[1]
  //     else return t2[2]-t1[2]
  //   })
  //   return result
  // }
}

// 按sortKey的顺序比较，sortKey对应的值支持Array(nest)
// immutable
// obj<json>:{ a:{},b:{}}
// 不同类型只能比较数字，字符串等js默认能比较的（需要更准确需要类似JAVA compare函数）
export function objSortBy(obj, sortKey, asc) {
  const os = Object.prototype.toString
  if (os.call(obj) !== "[object Object]") throw new Error("obj must be Object")
  const result = [];
  // cannotSort=[],
  const compareReturn = asc ? 1 : -1;
  const sortFactor = Array.isArray(sortKey) ? sortKey : [sortKey]
  for (const k in obj) {
    if (!obj.hasOwnProperty(k)) continue
    result.push(obj[k])
  }
  _sort(result, sortFactor)
  function _sort(sortArr, sortFactor) {
    sortArr.sort((a, b) => {
      let index = 0
      let valA, valB
      while (index < sortFactor.length) {
        valA = a[sortFactor[index]]
        valB = b[sortFactor[index]]
        if (valA == null && valB == null) index++
        else if (valA == null || _compare(valA, valB) < 0) return -compareReturn
        else if (valB == null || _compare(valA, valB) > 0) return compareReturn
        else index++
      }
      return 0
    })
  }
  function _compare(a, b) {
    if (a == null && b == null) return 0
    else if (a == null) return -1
    else if (b == null) return 1
    const typeA = os.call(a); const typeB = os.call(b)
    if (typeA === "[object Array]" && typeB === "[object Array]") {
      let i = 0
      while (i < a.length) {
        if (_compare(a[i], b[i]) < 0) return -1
        else if (_compare(a[i], b[i]) > 0) return 1
        else i++
      }
    } else if (typeA !== "[object Array]" && typeB !== "[object Array]") {
      if (typeof a !== typeof b) { a = a.toString(); b = b.toString() }
      if (!isNaN(a) && !isNaN(b)) { a = Number(a); b = Number(b) }
      if (a < b) return -1
      else if (a > b) return 1
    } else if (typeA === "[object Array]") return 1
    else return -1
    return 0
  }
  return result
}

/**
 * Tested
 * @param objOrList {Array,Object}
 * @param key
 * @param priorityProps 优先分组
 * @param onlyCount     对所有数据仅获取数量
 * @param specificProp  仅仅提取特定的key数据
 * @returns {{}}
 */
// 第三个参数，优先分组，如果发现不存在的，将不存在的单独分组
export function objGroupBy(objOrList, key, {
  priorityProps = null,
  onlyCount = false,
  specificProp = null
} = {}) {
  const result = {}
  const os = Object.prototype.toString
  if (Array.isArray(objOrList)) {
    for (const objData of objOrList) {
      if (!objData[key]) continue
      _group(objData[key], result, objData)
    }
  } else {
    for (const k in objOrList) {
      if (!objOrList.hasOwnProperty(k)) continue
      const objData = objOrList[k]
      if (!objData[key]) continue
      _group(objData[key], result, objData)
    }
  }
  function _group(data, result, objData) {
    const typeData = os.call(data)
    if (typeData === "[object Array]") {
      if (priorityProps && data[priorityProps] != null) {
        _group(data[priorityProps], result, objData)
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i] == null) continue
          if (specificProp != null && data[i] !== specificProp) continue
          _group(data[i], result, objData)
        }
      }
    } else if (typeData === "[object Object]") {
      if (priorityProps && data[priorityProps] != null) {
        _group(data[priorityProps], result, objData)
      } else {
        for (const _k in data) {
          if (!data.hasOwnProperty(_k)) continue
          if (data[_k] == null) continue
          if (specificProp != null && data[_k] !== specificProp) continue
          _group(data[_k], result, objData)
        }
      }
    } else if (!result[data]) {
      if (onlyCount) result[data] = 1
      else result[data] = [objData]
    } else {
      if (onlyCount) result[data]++
      else result[data].push(objData)
    }
  }
  if (specificProp) {
    // 在specificProp下，结果只能由一个key
    const keys = Object.keys(result)
    if (keys.length !== 1) {
      throw new Error('在specificProp下，结果只能由一个key')
    }
    return result[keys[0]]
  }
  return result
}




/**
 * 深比较
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
export function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true
  if (!obj1 || !obj2) return false
  const os = Object.prototype.toString; let result = true
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (os.call(obj1[key]) === '[object Array]' && os.call(obj2[key]) === '[object Array]') {
        if (obj1[key].length !== obj2[key].length) { return false }
        result = deepEqual(obj1[key], obj2[key])
      } else if (os.call(obj1[key]) === '[object Object]' && os.call(obj2[key]) === '[object Object]') {
        if (Object.keys(obj1[key]).length !== Object.keys(obj2[key]).length) { return false }
        result = deepEqual(obj1[key], obj2[key])
      } else if (typeof obj1[key] === 'function' && typeof obj2[key] === 'function') {
        if (obj1[key].toString() !== obj2[key].toString()) {
          return false
        }
      } else if (Number.isNaN(obj1[key]) && Number.isNaN(obj2[key])) {
        result = true
      } else if (obj1[key] !== obj2[key]) {
        return false
      }
      if (!result) {
        return false
      }
    }
  }
  return true
}

export function shallowEqual(obj1, obj2) {
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        return false
      }
    }
  }
  return true
}



export function withOutImgHTML(content) {
  return content.replace(/<\s*(img[^>]*)>?/g, " $1 ")
}

export function inHTMLTag(patternValue, content, preIdx) {
  let reg
  if (preIdx && content.substr(preIdx, patternValue.length) !== patternValue) {
    console.warn('preIdx 指定错误，当前指定下标并不是匹配值，此处逻辑有误需要修复')
    return true
  }

  // 设定前一个搜索的index，当preIdx在前一个和当前index之间，说明preIdx属于tag内部
  let lastSearchIdx = Infinity
  try {
    reg = new RegExp(`(<[^>]*?)${patternValue}|${patternValue}[^<]*?>`, 'g')
    let match = reg.exec(content)
    while (match) {
      if (preIdx != null) {
        if (preIdx === match.index + ((match[1] && match[1].length) || 0)) return true
        else if (preIdx > lastSearchIdx && preIdx < reg.lastIndex) return true
        else {
          lastSearchIdx = reg.lastIndex
          match = reg.exec(content)
        }
      }
      else return true
    }
    return false
  } catch (__) {
    console.log('err')
    return true
  }
}

export function ignoreInterceptTags(str) {
  let newStr = str
  const result = str.match(/^[^<.]*>/)
  if (result) {
    const idx = result.index; const len = result[0].length
    newStr = str.substring(0, idx) + str.substring(idx + len)
  }
  return newStr
}

export function searchPrecision(patternValue, content, fromIndex = 0) {
  patternValue = patternValue.replace(/(\(|\)|\[|\]|\\|\/|\+|\*|\.|\?|\^|\$|!|:)/g, "\\$1")
  const _content = content.substr(fromIndex); let result; let regPattern = ''
  if (/^[\u4E00-\u9FA5]+$/.test(patternValue)) regPattern = patternValue
  else if (/[\u4E00-\u9FA5]+$/.test(patternValue)) regPattern = `\\b${patternValue}`
  else if (/^[\u4E00-\u9FA5]+/.test(patternValue)) regPattern = `${patternValue}\\b`
  else if (/[\u4E00-\u9FA5]+/.test(patternValue)) regPattern = `${patternValue}`
  else regPattern = `\\b${patternValue}\\b`
  const tryP = tryReg(regPattern, false)
  if (tryP) result = _content.search(tryP)
  else return null
  if (result !== -1) return result + fromIndex
  else return -1
}

export function isMatchPrecision(patternValue, content) {
  patternValue = patternValue.replace(/(\(|\)|\[|\]|\\|\/|\+|\*|\.|\?|\^|\$|!|:)/g, "\\$1")
  if (/^[\u4E00-\u9FA5].*[\u4E00-\u9FA5]$/.test(patternValue)) return new RegExp(`${patternValue}`).test(content)
  else if (/.*[\u4E00-\u9FA5]$/.test(patternValue)) return new RegExp(`\\b${patternValue}`).test(content)
  else if (/^[\u4E00-\u9FA5].*/.test(patternValue)) return new RegExp(`${patternValue}\\b`).test(content)
  else if (/[\u4E00-\u9FA5]+/.test(patternValue)) return new RegExp(`${patternValue}`).test(content)
  else return new RegExp(`\\b${patternValue}\\b`).test(content)
}

export function tryReg(regPattern, otherwise) {
  try {
    return new RegExp(regPattern)
  } catch (__) {
    return otherwise
  }
}


export function getCookie(key, forTestCookie) {
  const cookie = forTestCookie || document.cookie
  return cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" +
    encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")
}

export function querySearch(search) {
  const splitSearch = search.replace("?", '').split('&')
  const data = {}
  for (let i = 0; i < splitSearch.length; i++) {
    const splitEach = splitSearch[i].split('=')
    data[splitEach[0]] = splitEach[1]
  }
  return data
}
