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
    this.getStatisticList(0)
  }

  getStatisticList(skip) {
    API.get('classes/name/statistic', {
      order:'-createdAt',
      limit:model.mvvm.pagesize,
      skip:skip
    }, (data) => {
      API.pagination(data.count, {
        skip: skip,
      }, (event, p, nskip) => {
        model.getStatisticList(nskip)
      })
      model.mvvm.$set('statistics', data.item)
    }, (err) => {
      Core.alert('danger', err)
    })
  }
}

Core.expose('statistics', 'index', Index)