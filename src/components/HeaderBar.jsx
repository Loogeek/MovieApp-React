import React from 'react'
import { Link } from 'react-router'
import '../sass/headerBar.scss'

class HeaderBar extends React.Component {
  render () {
    let left = this.props.left

    return (
      <header className='ui-header ui-header-positive ui-border-b header'>
        <button className='btn back left'
             style={ left === 'back' ? { display: 'inline-block' } : { display: 'none' }} onClick={ this.back }>
          <i className='ui-icon-return'></i>
        </button>
        <button className='btn menu left' style={ left === 'menu' ? { display: 'inline-block' } : { display: 'none' }}>
          <i></i>
          <i></i>
          <i></i>
        </button>
        <button className='btn search right'>
          <Link to='/search'>
            <i className='ui-icon-search'></i>
          </Link>
        </button>
        <h1>{ this.props.title }</h1>
      </header>
    )
  }
  back () {
    history.back()
  }
}

module.exports = HeaderBar
