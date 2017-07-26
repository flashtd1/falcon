let model

class Index extends Basic {
  constructor() {
    super({
      vue:{
        data:{
          statistics: []
        }
      }
    })

    model = this
    this.init()
  }

  init() {
    this.register(['getStatisticList'])
    this.getStatisticList()
  }

  getStatisticList() {
    API.get('classes/name/statistic', {
      order:'-createdAt',
      limit:2000
    }, (data) => {
      model.mvvm.$set('statistics', data.item)
    }, (err) => {
      Core.alert('danger', err)
    })
  }
}

Core.expose('statistics', 'index', Index)