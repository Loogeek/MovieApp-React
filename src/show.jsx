import React from 'react'
import fetchJsonp from 'fetch-jsonp'
import { Link } from 'react-router'
import HeaderBar from './components/HeaderBar'
import Loading from './components/Loading'
import Star from './components/Star'
import './sass/show.scss'

class Show extends React.Component {
  constructor () {
    super()
    this.state = {
      title: '电影详情',
      image: '',
      genres: [],
      casts: [],
      score: 0,
      countries: [],
      summary: '',
      directors: [],
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
                <div className='ui-nowrap'>
                  <Star score={ this.state.score } size='large'></Star>
                </div>
                <p className='ui-nowrap'>类型:{ this.state.genres }</p>
                <p className='ui-nowrap'>主演:
                  {
                    this.state.casts.map((item, index) => {
                      return (
                        <span key={ index }>{ item.name }/</span>
                      )
                    })
                  }
                </p>
                <p className='ui-nowrap'>地区:{ this.state.countries }</p>
              </div>
            </div>
          </div>
          <section className='ui-panel summary'>
            <h2>
              <a href=''>剧情简介</a>
            </h2>
            <div className='ui-whitespace ui-txt-justify ui-txt-sub ui-txt-info'>{ this.state.summary }</div>
          </section>
          <section className='ui-panel directors'>
            <h2 className='ui-arrowlink'>
              <a href='javascript:;'>导演</a>
            </h2>
            <div className='ui-row ui-whitespace'>
              { this.state.directors.map((item, index) => {
                return (
                  <div className='ui-col ui-col-33' key={ index }>
                    <Link to={ '/director/' + item.id }>
                      <img src={ item.avatars ? item.avatars.medium : ''} alt={ item.name } />
                      <h5 className='ui-nowrap ui-arrow'>
                        { item.name }(查看)
                      </h5>
                    </Link>
                  </div>
                )
              }) }
            </div>
          </section>
        </div>
      )
    }
  }
  componentDidMount () {
    this.getMovieData(this.props.params.id)
  }
  getMovieData (id) {
    fetchJsonp('http://api.douban.com/v2/movie/subject/' + id).then((response) => response.json()).then((json) => {
      this.setState({
        title: json.title,
        image: json.images.large,
        genres: json.genres.join(' '),
        casts: json.casts,
        score: json.rating.average,
        countries: json.countries.join(' '),
        summary: json.summary,
        directors: json.directors,
        loading: false
      })
    })
  }
}

module.exports = Show
