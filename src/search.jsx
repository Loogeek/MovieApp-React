import React from 'react'
import { Link } from 'react-router'
import fetchJsonp from 'fetch-jsonp'
import _ from 'underscore'
// import DebounceInput from 'react-debounce-input'
import Loading from './components/Loading'
import './sass/search.scss'

class Search extends React.Component {
  constructor () {
    super()
    this.state = {
      title: '搜索',
      keywords: '',
      hotwords: [],
      suggests: [],
      loading: true
    }
  }
  render () {
    return (
      <div>
        <div className='page'>
          <div className='ui-searchbar-wrap ui-border-b focus ui-header'>
            <div className='ui-searchbar ui-border-radius'>
              <i className='ui-icon-search'></i>
              <div className='ui-searchbar-input'>
                <input type='text' placeholder='请输入关键字'
                  ref='keywords' onKeyUp={ this.handleChange.bind(this) } />
              </div>
              <i className='ui-icon-close'
                style={ this.state.keywords ? { display: 'block' } : { display: 'none' }} onClick={ this.clear.bind(this) }></i>
            </div>
            <button className='ui-searchbar-cancel' onClick={ this.back }>取消</button>
          </div>
          <div className='hotwords'
            style={ this.state.suggests.length ? { display: 'none' } : { display: 'block' }}>
            <h4>大家都在搜</h4>
            <div className='hot-search ui-txt-info'>
              {
                this.state.hotwords.map((hotword, index) => {
                  return (
                    <span className='ui-label' key={ hotword.id }>{ hotword.title }</span>
                  )
                })
              }
            </div>
          </div>
          <div className='suggest'
            style={ this.state.suggests.length ? { display: 'block' } : { display: 'none' }}>
            <ul className='ui-list ui-list-text ui-list-link ui-txt-info'>
              {
                this.state.suggests.map((suggest, index) => {
                  return (
                    <li className='ui-border-b' key={ suggest.id }>
                      <Link to={ '/show/' + suggest.id }>{ suggest.title }</Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <Loading show={ this.state.loading }></Loading>
      </div>
    )
  }
  componentDidMount () {
    this.refs.keywords.focus()                      // 输入框获取焦点
    this.setState({
      hotwords: JSON.parse(sessionStorage.hotwords),
      loading: false
    })
  }
  handleChange (event) {
    let inputValue = event.target.value
    if (inputValue.trim()) {
      this.setState({
        keywords: inputValue,
        loading: true
      })
      fetchJsonp('http://api.douban.com/v2/movie/search?q=' + this.state.keywords).then((response) => response.json()).then((json) => {
        this.setState({
          suggests: json.subjects,
          loading: false
        })
      })
    }
  }
  // getData () {
  //   fetchJsonp('http://api.douban.com/v2/movie/search?q=' + this.state.keywords).then((response) => response.json()).then((json) => {
  //     this.setState({
  //       suggests: json.subjects,
  //       loading: false
  //     })
  //   })
  // }
  back () {
    history.back()
  }
  clear () {
    this.setState({
      keywords: '',
      suggests: []
    })
    this.refs.keywords.value = ''
    this.refs.keywords.focus()
  }
}

module.exports = Search
