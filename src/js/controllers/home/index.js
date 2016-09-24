
class A {

  constructor() {
    console.log('hello a!')
    this.foo()
  }

  foo() {
   console.log('foo')
  }

}

Core.expose('home', 'index', A)
