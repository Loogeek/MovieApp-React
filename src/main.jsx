import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'
import fetchJsonp from 'fetch-jsonp'
import List from './list'
import Show from './show'
import Director from './director'
import Search from './search'
import HeaderBar from './components/HeaderBar'
import Loading from './components/Loading'
import './sass/main.scss'
import './sass/index.scss'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      title: '电影',
      resData: [],
      hotwords: [],
      isSlide: false,           // 获取子组件上传的菜单栏显示或隐藏状态
      navHidden: false,         // 经过延迟处理后将isSlide赋值给navHidden属性
      loading: true
    }
  }
  render () {
    if (this.state.loading) {
      return (
        <Loading show={ this.state.loading }></Loading>
      )
    } else {
      return (
        <div>
          <div className='page'>
            <div className='wrapper'>
              <HeaderBar title={ this.state.title } left={ 'menu' }></HeaderBar>
              {
                this.state.resData.map((listItem, index) => {
                  return (
                    <section className='ui-panel' key={ index }>
                      <Link to={ '/list/' + listItem.name } >
                        <h2 className='ui-arrowlink'>{ listItem.title }
                          <span className='ui-panel-subtitle'>{ listItem.total }个</span>
                        </h2>
                      </Link>
                      <ul className='ui-grid-trisect'>
                        {
                         listItem.subjects.map((item, index) => {
                           return (
                             <li key={ item.id }>
                               <Link to={ '/show/' + item.id }>
                                 <div className='ui-grid-trisect-img'>
                                   <img src={ item.images.large } alt={ item.title } />
                                   <p className='ui-nowrap'>{ item.title }</p>
                                 </div>
                               </Link>
                             </li>
                           )
                         })
                        }
                      </ul>
                    </section>
                  )
                })
              }
            </div>
          </div>
          <nav className='navdrawer'>
            <article>
              <header className='navdrawer-header'>
                <h2>豆瓣</h2>
                <ul>
                  <li><a className='.ui-icon-personal' href='javascript:;'></a></li>
                  <li><a className='.ui-icon-add-group' href='javascript:;'></a></li>
                  <li><a className='.ui-icon-comment' href='javascript:;'></a></li>
                </ul>
              </header>
              <div className='ui-searchbar-wrap ui-border-b focus'>
                <div className='ui-searchbar ui-border-radius'>
                  <i className='ui-icon-search'></i>
                  <div className='ui-searchbar-input'>
                    <input type='text' placeholder='请输入关键字' />
                  </div>
                </div>
              </div>
              <div className='navdrawer-content'>
                <h3>电影</h3>
                <ul>
                  <li><a href='javascript:;'>电影首页</a></li>
                  <li><a href='javascript:;'>正在上映</a></li>
                  <li><a href='javascript:;'>即将上映</a></li>
                  <li><a href='javascript:;'>Top250</a></li>
                  <li><a href='javascript:;'>使用反馈</a></li>
                  <li><a href='javascript:;'>退出登录</a></li>
                </ul>
              </div>
            </article>
          </nav>
        </div>
      )
    }
  }
  componentDidMount () {
    this.getData()
  }
  getData () {
    // 正在热映、即将上映、Top250
    const ResourcesURI = ['in_theaters', 'coming_soon', 'top250']
    ResourcesURI.forEach((item, index) => {
      fetchJsonp('http://api.douban.com/v2/movie/' + item + '?count=6').then((response) => response.json()).then((json) => {
        this.state.resData.push({
          name: item,
          title: json.title.split('-')[0],
          total: json.total,
          subjects: json.subjects
        })
        json.subjects.forEach((item) => {
          this.state.hotwords.push({
            title: item.title,
            id: item.id
          })
        })
        if (ResourcesURI.length === this.state.resData.length) {
          sessionStorage.resData = JSON.stringify(this.state.resData)
          sessionStorage.hotwords = JSON.stringify(this.state.hotwords)
          this.setState({
            loading: false
          })
        }
      })
    })
  }
}

ReactDOM.render((
  <Router history={ hashHistory }>
    <Route path='/' component={ App } />
      <Route path='/show/:id' component={ Show } />
      <Route path='/director/:id' component={ Director } />
      <Route path='/list/:type' component={ List } />
      <Route path='/search' component={ Search } />
  </Router>
), document.getElementById('app'))
