import Leancloud from '../../modules/Leancloud'
import ParseTool from '../../modules/ParseTool'

let model
class Index extends Basic {
  constructor() {
    super({
      vue:{
        data:{
          list: [],
          progresses: [],
          currentMusicType: 'add',
          currentMusic:{
            id:0,
            title:'',
            desc:'',
          }
        }
      }
    })

    model = this
    this.init()
  }

  init() {
    Leancloud.init('CSbxMOaofoB1uHOl4rtRrLLP-gzGzoHsz', 'qI1yQeznIr9NKt0Xm76k6TWM', 'bUG9rgQP9TKTkvaJoua8BoVl')
    this.register(['transTypeName', 'getPracticeProgress','getMusicList', 'addMusic', 'editMusic', 'setMusic', 'deleteMusic'])
    
    this.getPracticeProgress().then(() => {
      this.getMusicList()
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

  getPracticeProgress() {
    return new Promise(resolve => {
      let listQuery = new AV.Query('Progress')
      listQuery.descending('order')
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

  getMusicList() {
    let listQuery = new AV.Query('MusicList')
    listQuery.include('progress').descending('objectId')
    listQuery.find().then(function(result) {
        model.mvvm.list = []
        result.map(function(item){
            let obj = ParseTool.Parse2Obj(item)
            model.mvvm.list.push(obj)
        })
    })
  }

  addMusic() {
    let tempMusic = model.mvvm.currentMusic
    tempMusic.progress.className = 'Progress'

    // 新建一个 ACL 实例
    let acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    // 新建对象
    let music = ParseTool.Parse2AV('MusicList', tempMusic)

    music.setACL(acl)
    music.save().then(function (todo) {
      Core.alert('success', '添加音乐成功')
      model.init()
    }, function (error) {
      console.error(error)
      Core.alert('danger', error.toString())
    });
  }

  setMusic() {
    let tempMusic = model.mvvm.currentMusic
    tempMusic.progress.className = 'Progress'

    let music = ParseTool.Parse2AV('MusicList', tempMusic)
    music.save().then(function(todo) {
      Core.alert('success', '修改音乐成功')
      model.init()
    }, function(error) {
      console.error(error)
      Core.alert('danger', error.toString())
    })
    
  }

  editMusic(music) {
    if(music) {
      model.mvvm.currentMusicType = 'edit'
      console.log(music)
      model.mvvm.$set('currentMusic', music)
    } else {
      model.mvvm.currentMusicType = 'add'
      model.mvvm.$set('currentMusic', {})
    }
  }

  deleteMusic(music) {
    if(confirm('是否确定要删除 ' + music.title + ' 这首练习条目')) {
      let todo = AV.Object.createWithoutData('MusicList', music.id);
      todo.destroy().then(function (success) {
        // 删除成功
        Core.alert('success', '删除成功')
        model.getMusicList()
      }, function (error) {
        Core.alert('danger', error)
      });
    } else {

    }
  }
}

Core.expose('musicpractice', 'index', Index)