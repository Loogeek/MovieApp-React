import React from 'react'
import '../sass/loading.scss'

class Loading extends React.Component {
  render () {
    return (
      <div className='ui-loading-block show'
        style={ this.props.show ? { display: '-webkit-box' } : { display: 'none' }}>
        <div className='ui-loading-cnt'>
          <i className='ui-loading-bright'></i>
        </div>
      </div>
    )
  }
}

module.exports = Loading
