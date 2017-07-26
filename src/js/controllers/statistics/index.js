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
    this.getStatisticList(1)
  }

  getStatisticList(pages) {
    API.get('classes/name/statistic', {
      order:'-createdAt',
      limit:model.mvvm.pagesize,
      skip:pages
    }, (data) => {
      API.pagination(data.count, {
        page: pages,
      }, (event, p) => {
        model.getStatisticList(p)
      })
      model.mvvm.$set('statistics', data.item)
    }, (err) => {
      Core.alert('danger', err)
    })
  }
}

Core.expose('statistics', 'index', Index)