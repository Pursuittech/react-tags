'use strict'

const React = require('react')

function escapeForRegExp (query) {
  return query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
}

function filterSuggestions (query, suggestions, length) {
  const regex = new RegExp(`(?:^|\\s)${escapeForRegExp(query)}`, 'i')
  return suggestions.filter((item) => regex.test(item.name)).slice(0, length)
}

class Suggestions extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      options: filterSuggestions(this.props.query, this.props.suggestions, this.props.maxSuggestionsLength),
      animate: {}
    }
  }

  componentWillReceiveProps (newProps) {
    const transitionStyles = {
      transform: 'scale(1)',
      transition: 'all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)',
      transformOrigin: '1em 0% 0px'
    }

    this.setState({
      options: filterSuggestions(newProps.query, newProps.suggestions, newProps.maxSuggestionsLength)
    })

    if (newProps.expandable === true) {
      this.timeout = setTimeout(() => { this.setState({ animate: transitionStyles }) }, 100)
    } else {
      this.setState({ animate: {} })
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }
  }

  handleMouseDown (item, e) {
    // focus is shifted on mouse down but calling preventDefault prevents this
    e.preventDefault()
    this.props.addTag(item)
  }

  render () {
    if (!this.props.expandable || !this.state.options.length) {
      return null
    }

    const options = this.state.options.map((item, i) => {
      const key = `${this.props.listboxId}-${i}`
      const classNames = []

      if (this.props.selectedIndex === i) {
        classNames.push(this.props.classNames.suggestionActive)
      }

      if (item.disabled) {
        classNames.push(this.props.classNames.suggestionDisabled)
      }

      return (
        React.createElement( 'li', {
          id: key, key: key, role: 'option', className: classNames.join(' '), 'aria-disabled': item.disabled === true, onMouseDown: this.handleMouseDown.bind(this, item) },
          React.createElement( 'img', { className: this.props.classNames.selectedTagAvatar, src: item.avatar }),
          React.createElement( 'span', null, item.name )
        )
      )
    })

    return (
      React.createElement( 'div', { className: this.props.classNames.suggestions, style: this.state.animate },
        React.createElement( 'ul', { role: 'listbox', id: this.props.listboxId }, options)
      )
    )
  }
}

module.exports = Suggestions
