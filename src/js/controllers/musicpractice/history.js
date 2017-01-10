import Leancloud from '../../modules/Leancloud'
import ParseTool from '../../modules/ParseTool'

let model
class History extends Basic {
  constructor() {
    super({
      vue:{
        data:{
          musicId: 0,
          historys: [],
          progresses: [],
          historyFile:$('#leanUpload'),
          currentHistoryType: 'add',
          currentHistory:{
            name:'',
            content:'',
            file:{}
          }
        }
      }
    })

    model = this
    this.init()
  }

  init() {
    Leancloud.init('CSbxMOaofoB1uHOl4rtRrLLP-gzGzoHsz', 'qI1yQeznIr9NKt0Xm76k6TWM', 'bUG9rgQP9TKTkvaJoua8BoVl')
    this.register(['transTypeName', 'getPracticeProgress','getHistoryList', 'addHistory', 'editHistory', 'setMusic', 'deleteHistory', 'leanUpload'])
    let musicId = ParseTool.getQueryString('id')
    model.mvvm.historyFile.on('change', model.mvvm.leanUpload)
    model.mvvm.musicId = musicId
    this.getPracticeProgress().then(() => {
      this.getHistoryList()
    })
  }

  transTypeName(id) {
    if(model.mvvm.app_types) {
      let result = model.mvvm.app_types.filter((item) => {
        return item.id == id
      })[0]

      if(result) {
        return result.name
      } else {
        return id
      }
    } else {
      return id
    }
  }

  leanUpload() {
    let fileControl = model.mvvm.historyFile[0]
    if(fileControl.files.length > 0) {
      let localFile = fileControl.files[0]
      let name = localFile.name

      let file = new AV.File(name, localFile)
      file.save().then(function(uploadedFile){
        console.log('上传成功')
        console.log(uploadedFile.id)
        model.mvvm.$set('currentHistory.file',{
          id:uploadedFile.id,
          className:'_File'
        })
        model.mvvm.historyFile.attr('value',null)
      }, function(err) {

      })
    } 
  }

  getPracticeProgress() {
    return new Promise(resolve => {
      let listQuery = new AV.Query('Progress')
      listQuery.find().then(function(result) {
          model.mvvm.progresses = []
          result.map(function(item){
              let obj = ParseTool.Parse2Obj(item)
              model.mvvm.progresses.push(obj)
          })
          resolve()
      })
    })
  }

  getHistoryList() {
    let music = AV.Object.createWithoutData('MusicList', model.mvvm.musicId);
    let listQuery = new AV.Query('MusicHistory')
    listQuery.equalTo('music', music)
    listQuery.include('progress').descending('objectId')
    listQuery.find().then(function(result) {
        model.mvvm.historys = []
        result.map(function(item){
            let obj = ParseTool.Parse2Obj(item)
            model.mvvm.historys.push(obj)
        })
    })
  }

  addHistory() {
    let tempHistory = model.mvvm.currentHistory
    tempHistory.progress.className = 'Progress'
    tempHistory.music = {
      id: model.mvvm.musicId,
      className: 'MusicList'
    }

    // 新建一个 ACL 实例
    let acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    // 新建对象
    let music = ParseTool.Parse2AV('MusicHistory', tempHistory)

    music.setACL(acl)
    music.save().then(function (todo) {
      Core.alert('success', '添加历史记录成功')
      model.setMusic().then(() => {
        model.getHistoryList()
      })
      
    }, function (error) {
      console.error(error)
      Core.alert('danger', error.toString())
    });
  }

  setMusic() {
    return new Promise(resolve => {
      let music = AV.Object.createWithoutData('MusicList', model.mvvm.musicId);
      let currentHistory = model.mvvm.currentHistory
      let progress = AV.Object.createWithoutData('Progress', currentHistory.progress.id);
      
      if(currentHistory.file) {
        let file = AV.Object.createWithoutData('_File', currentHistory.file.id);
        music.set('musicFile', file)
      }

      music.set('progress', progress)
      music.save().then(function(todo) {
        resolve()
      }, function(error) {
        console.error(error)
        resolve()
      })
    })
    
  }

  editHistory(history) {
    if(history) {
      model.mvvm.currentMusicType = 'edit'
      console.log(history)
      model.mvvm.$set('currentHistory', history)
    } else {
      model.mvvm.currentMusicType = 'add'
      model.mvvm.$set('currentHistory', {name:'',content:'',file:{}})
    }
  }

  deleteHistory(history) {
    if(confirm('是否确定要删除 ' + history.id + ' 这条历史记录')) {
      let todo = AV.Object.createWithoutData('MusicHistory', history.id);
      todo.destroy().then(function (success) {
        // 删除成功
        Core.alert('success', '删除成功')
        model.getHistoryList()
      }, function (error) {
        Core.alert('danger', error)
      });
    } else {

    }
  }
}

Core.expose('musicpractice', 'history', History)