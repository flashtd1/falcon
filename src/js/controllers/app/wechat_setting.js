let model
class WechatSetting extends Basic {

  constructor() {
    super({
    	vue:{
    		data:{
          config:{}
        }
    	}
    })

    model = this
    this.init()
  }

  init() {
    this.register([ 'setConfig' ,'getConfig'])
    this.getConfig()
  }

  getConfig() {
    API.get('classes/name/config/id/1', {}, (data) => {
      model.mvvm.$set('config', data)
    }, (error) => {
      Core.alert('error', error.message)
    })
  }

  setConfig() {

    API.put('classes/name/config/id/1', {
      admin_id:model.mvvm.config.admin_id,
      email:model.mvvm.config.email,
      welcome:model.mvvm.config.welcome
    }, (data) => {
      Core.alert('success', '修改配置成功')
    }, (error) => {
      Core.alert('error', error.message)
    })
  }

}

Core.expose('app', 'wechat_setting', WechatSetting)
