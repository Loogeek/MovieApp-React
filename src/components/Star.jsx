import React from 'react'
import '../sass/star.scss'

class Star extends React.Component {
  render () {
    let icon = []
    for (var i = 0; i < 5; i++) {
      icon.push(
        <i className='ui-icon-star' key={ i }></i>
      )
    }
    return (
      <div className={ this.props.size ? 'star large' : 'star'}>
        <div className='gray'>
          { icon }
        </div>
        <div className='ligh' style={{ width: this.props.score * 10 + '%' }}>
          { icon }
        </div>
        <div className='score'>
          { this.props.score }
        </div>
      </div>
    )
  }
}

module.exports = Star
