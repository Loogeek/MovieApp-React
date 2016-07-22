import React from 'react'
import { Link } from 'react-router'
import fetchJsonp from 'fetch-jsonp'
import HeaderBar from './components/HeaderBar'
import Loading from './components/Loading'
import Star from './components/Star'
import './sass/list.scss'

class List extends React.Component {
  constructor () {
    super()
    this.state = {
      title: '电影列表',
      movieLists: [],
      page: 1,
      type: '',
      total: 0,
      more: true,
      loading: true
    }
    this.scroll = this.scroll.bind(this)
  }
  render () {
    if (this.state.loading) {
      return (
        <Loading show={ this.state.loading }></Loading>
      )
    } else {
      return (
        <div className='page' id='page'>
          <HeaderBar title={ this.state.title } left={ 'back' }></HeaderBar>
          <ul className='ui-list ui-list-link ui-border-tb list-one'>
            {
              this.state.movieLists.map((item, index) => {
                return (
                  <li className='ui-border-t' key={ index }>
                    <Link to={ '/show/' + item.id }>
                      <div className='ui-list-img'>
                        <img src={ item.images.medium } alt={ item.title } />
                      </div>
                      <div className='ui-list-info'>
                        <h4 className='ui-nowrap'>{ item.title }</h4>
                        <div className='ui-nowrap'>
                          <Star score={ item.rating.average }></Star>
                        </div>
                        <p className='ui-nowrap'>{ item.genres.join(' ') }</p>
                        <p className='ui-nowrap'>
                          {
                            item.casts.map((cast, index) => {
                              return (
                                <span key={ index }>{ cast.name }/</span>
                              )
                            })
                          }
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
          <div className='ui-loading-wrap'>
            <p className='ui-txt-info'>{ this.state.more ? '加载中' : '没有更多了'}</p>
            <i className='ui-loading'
              style={ this.state.more ? { display: 'block' } : { display: 'none' }}>
            </i>
          </div>
        </div>
      )
    }
  }
  componentDidMount () {
    let type = this.props.params.type
    if (sessionStorage[`MovieApp_${type}`]) {
      let movieLists = JSON.parse(sessionStorage[`MovieApp_${type}`])
      this.setState({
        movieLists: movieLists,
        loading: false
      })
      // 如果数据都请求完毕并保存在movieLists数组中，则取消加载动画并提示加载完成
      // 如果数据加载完则停止发送请求
      if (this.state.total <= movieLists.length) {
        this.setState({
          more: false
        })
        return
      }
    }
    this.setState({
      type: this.props.params.type
    })
    this.getMoviesData()
    // 监听滚动事件
    window.addEventListener('scroll', this.scroll, false)
  }
  // 组件移除前删除监听的滚动事件
  componentWillUnmount () {
    window.removeEventListener('scroll', this.scroll, false)
  }
  getMoviesData () {
    fetchJsonp(`http://api.douban.com/v2/movie/${this.props.params.type}?count=10&start=${(this.state.page - 1) * 10}`).then((response) => response.json()).then((json) => {
      if (this.state.page === 1) {
        this.setState({
          title: json.title.split('-')[0],
          total: json.total,
          loading: false
        })
      }
      // 返回的数据不为空
      if (json && json.subjects.length) {
        this.setState({
          page: this.state.page + 1,
          movieLists: this.state.movieLists.concat(json.subjects)
        })
      // 全部数据请求完毕
      } else {
        this.setState({
          more: false
        })
      }
      // 将获取数据存储到sessionStorage中
      sessionStorage[`MovieApp_${this.state.type}`] = JSON.stringify(this.state.movieLists)
    })
  }
  scroll () {
    if (!this.state.loading) {
      let scrollBottom = document.body.scrollHeight - window.screen.height - document.body.scrollTop <= 0
      if (scrollBottom) {
        this.getMoviesData()
      }
    }
  }
}

module.exports = List
