import React from 'react'
import { Link } from 'react-router'
import fetchJsonp from 'fetch-jsonp'
import HeaderBar from './components/HeaderBar'
import Loading from './components/Loading'
import Star from './components/Star'
import './sass/director.scss'

class Director extends React.Component {
  constructor () {
    super()
    this.state = {
      title: '导演',
      image: '',
      gender: '',
      born_place: '',
      works: [],
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
        <div className='page'>
          <HeaderBar title={ this.state.title } left={ 'back' }></HeaderBar>
          <div className='banner'>
            <div className='blur' style={{ backgroundImage: 'url(' + this.state.image + ')' }}></div>
            <div className='info'>
              <div className='img'>
                <img src={ this.state.image } alt={ this.state.title } />
              </div>
              <div className='txt'>
                <h1 className='ui-nowrap'>{ this.state.title }</h1>
                <p className='ui-nowrap'>性别:{ this.state.gender }</p>
                <p className='ui-nowrap'>地区:{ this.state.born_place }</p>
              </div>
            </div>
          </div>
          <section className='ui-panel summary'>
            <h2>
              <a href=''>作品</a>
              <span className='ui-panel-subtitle'>{ this.state.works.length } 个</span>
            </h2>
            <ul className='ui-list ui-list-link ui-border-tb list-one'>
              {
                this.state.works.map((work, index) => {
                  return (
                    <li className='ui-border-t' key={ work.subject.id }>
                      <Link to={ '/show/' + work.subject.id }>
                        <div className='ui-list-img'>
                          <img src={ work.subject.images.medium } alt={ work.subject.title } />
                        </div>
                        <div className='ui-list-info'>
                          <h4 className='ui-nowrap'> [{ work.roles }] { work.subject.title }
                            <div className='ui-nowrap'>
                              <Star score={ work.subject.rating.average }></Star>
                            </div>
                            <p className='ui-nowrap'> { work.subject.genres.join(' ') }</p>
                            <p className='ui-nowrap'>
                              {
                                work.subject.casts.map((cast, index) => {
                                  return (
                                    <span key={ index }>{ cast.name }/</span>
                                  )
                                })
                              }
                            </p>
                          </h4>
                        </div>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </section>
        </div>
      )
    }
  }
  componentDidMount () {
    this.getMovieData(this.props.params.id)
  }
  getMovieData (id) {
    fetchJsonp('http://api.douban.com/v2/movie/celebrity/' + id).then((response) => response.json()).then((json) => {
      this.setState({
        title: json.name,
        image: json.avatars.medium,
        gender: json.gender,
        born_place: json.born_place,
        works: json.works,
        loading: false
      })
    })
  }
}

module.exports = Director
