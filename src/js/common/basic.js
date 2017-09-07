let model
let url = require('url')
let qs = require('querystring')

class Basic {
  constructor(initData = {}) {
    model = this

    let mvvmDefault = {
      el: 'body',
      data: {
        session: SITE.session,
        submit_disabled: false,
        export_status: 'normal',
        pagesize: 20,
        params: qs.parse(url.parse(window.location.href).query)
      },
      components: {

      }
    }

    _.each(initData.vue, (v, k)=> {
      if (_.has(mvvmDefault, k)) {
        mvvmDefault[k] = _.extend(mvvmDefault[k], v)
      }else{
        mvvmDefault[k] = v
      }
    })


    this.mvvm = new Vue(mvvmDefault)

    window.MVVM = this.mvvm
    this.initBasic()
  }

  initBasic() {
    this.register(['logout','stringify', 'getLocalDate', 'refreshPagination', 'pageDown', 'pageUp'])
  }

  register(methods){
    methods.forEach((item)=> {
      this.mvvm[item] = this[item]
    })
  }

  stringify(data) {
    return JSON.stringify(data)
  }

  getLocalDate(timestamp) {
    return new Date(parseInt(timestamp) * 1000).toLocaleString()
  }

  logout() {
    Cookies.set('token','')
    window.location.href = '/login'
  }

}

window.Basic = Basic