

/*
  将json对象转为Leancloud的对象
 */
const Parse2AV = function(className, obj) {
  let Class = AV.Object.extend(className)
  let AVObj = new Class()
  for(let key in obj) {
    if(typeof obj[key] == 'object') {
      try {
        // 处理pointer的方式，只用id恢复结构，不读取具体的内容，避免递归更新
        if(obj[key].className) {
          AVObj.set(key, AV.Object.createWithoutData(obj[key].className, obj[key].id))
          continue
        }
        // relation 暂时不处理
        if(obj[key].targetClassName) {
          continue
        }
      } catch(err) {
        console.log(err)
        console.warn(key,obj)
      }
      
    } else {
      try {
        AVObj.set(key, obj[key])
      } catch(err) {
        console.log(err)
        console.warn(obj[key])
      }
    }
  }
  return AVObj
}

/*
将Leancloud对象转为json对象
 */
const Parse2Obj = function(AVObj) {
  let obj = AVObj._serverData
  obj.id = AVObj.id
  if(AVObj.createdAt) {
    obj.createdAt = AVObj.createdAt
  }

  if(AVObj.updatedAt) {
    obj.updatedAt = AVObj.updatedAt
  }

  for(let i in obj) {
    if(obj[i]._serverData) {
      obj[i] = Parse2Obj(obj[i])
    }
  }
  return obj
}

/**
 * 获取url参数
 * @param  {string} name 参数名
 * @return {mixed}      参数值，如果没有则返回null
 */
const getQueryString = function(name) { 
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  let r = window.location.search.substr(1).match(reg)
  if (r != null) 
    return decodeURI(r[2])
  return null
} 

export default {
  Parse2AV:Parse2AV,
  Parse2Obj:Parse2Obj,
  getQueryString:getQueryString
}