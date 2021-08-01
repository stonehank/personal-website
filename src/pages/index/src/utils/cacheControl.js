import jsCookies from 'js-cookie'
function getFromCache(key){
  let savedUserData=null
  if(localStorage){
    let originalData=localStorage.getItem(key)
      try{
          savedUserData=JSON.parse(originalData)
      }catch(_){
          if(typeof originalData==='string'){
              savedUserData=originalData
          }else{
              savedUserData=null
          }
      }
  }else{
    savedUserData=jsCookies.get(key)
  }
  return savedUserData
}

function setCache(key,value,expires=7){
  let valueStr = JSON.stringify(value)
  console.log(key,valueStr)
  if (localStorage) {
    localStorage.setItem(key, valueStr)
  } else {
    jsCookies.set(
      key,
      value,
      {expires: expires})
  }
}

function removeCache(key){
    if(localStorage){
        localStorage.removeItem(key)
    }else{
        jsCookies.remove(key)
    }
}

export {getFromCache,setCache,removeCache}
