let model
class WechatUserList extends Basic {

  constructor() {
    super({
    	vue:{
    		data:{
          users:[]
        }
    	}
    })

    model = this
    this.init()
  }

  init() {
    this.register(['getUsers'])
    this.getUsers(0)
  }

  getUsers(skip) {
    API.get('classes/name/user', {
      'limit': model.mvvm.pagesize,
      'skip': skip
    }, (data) => {
      API.pagination(data.count, {
        skip: skip,
        wraper: '.tab-pane'
      }, (event, p, nskip) => {
        console.log(nskip)
        model.getUsers(nskip)
      })
      model.mvvm.$set('users', data.item)
    }, (error) => {
      Core.alert('error', error.message)
    })
  }

}

Core.expose('app', 'wechat_userlist', WechatUserList)
