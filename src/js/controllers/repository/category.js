let model

class Category extends Basic {
  constructor() {
    super({
      vue: {
        data: {
          categories: [],
          currentCategory: {}
        }
      }
    })

    model = this
    this.init()
  }

  init() {
    this.register(['getCategories', 'addCategory', 'setCategory', 'editCategory', 'deleteCategory'])
    this.getCategories(0)
  }

  getCategories(skip) {
    API.get('classes/name/repository_category', {
      limit: model.mvvm.pagesize,
      skip: skip
    }, (data) => {
      API.pagination(data.count, {
        skip: skip,
        wraper: '.tab-pane'
      }, (event, p, nskip) => {
        model.getCategories(nskip)
      })
      model.mvvm.$set('categories', data.item)
    }, (error) => {
      Core.alert('error', error.message)
    })
  }

  addCategory() {
    let tempCategory = model.mvvm.currentCategory
    API.post('classes/name/repository_category', tempCategory, (data) => {
      model.getCategories(0)
      Core.alert('success', '添加成功')
    }, (err) => {
      Core.alert('danger', err)
    })
  }

  setCategory() {
    let tempCategory = model.mvvm.currentCategory
    API.put('classes/name/repository_category/id/' + tempCategory.id, tempApp, (data) => {
      model.getCategories(0)
      Core.alert('success', '修改成功')
    }, (err) => {
      Core.alert('danger', err)
    })
  }

  editCategory(category) {
    if(category) {
      model.mvvm.currentCategoryType = 'edit'
      model.mvvm.$set('currentCategory', category)
    } else {
      model.mvvm.currentCategoryType = 'add'
      model.mvvm.$set('currentCategory', {})
    }
  }

  deleteCategory(category) {
    if(confirm('是否确定要删除 ' + category.name + ' 这条分类么')) {
      API.delete('classes/name/repository_category/id/' + category.id, {}, (data) => {
        model.getCategories(0)
        Core.alert('success', '删除成功')
      }, (err) => {
        Core.alert('danger', err)
      })
    } else {

    }
  }

}

Core.expose('repository', 'category', Category)