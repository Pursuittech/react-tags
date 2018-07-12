'use strict'

var React = require('react')

function escapeForRegExp (query) {
  return query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
}

function filterSuggestions (query, suggestions, length) {
  var regex = new RegExp(("(?:^|\\s)" + (escapeForRegExp(query))), 'i')
  return suggestions.filter(function (item) { return regex.test(item.name); }).slice(0, length)
}

var Suggestions = (function (superclass) {
  function Suggestions (props) {
    superclass.call(this, props)

    this.state = {
      options: filterSuggestions(this.props.query, this.props.suggestions, this.props.maxSuggestionsLength),
      animate: {}
    }
  }

  if ( superclass ) Suggestions.__proto__ = superclass;
  Suggestions.prototype = Object.create( superclass && superclass.prototype );
  Suggestions.prototype.constructor = Suggestions;

  Suggestions.prototype.componentWillReceiveProps = function componentWillReceiveProps (newProps) {
    var this$1 = this;

    var transitionStyles = {
      transform: 'scale(1)',
      transition: 'all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)',
      transformOrigin: '1em 0% 0px'
    }
    console.log(newProps)
    this.setState({
      options: filterSuggestions(newProps.query, newProps.suggestions, newProps.maxSuggestionsLength)
    })

    if (newProps.expandable === true) {
      this.timeout = setTimeout(function () { this$1.setState({ animate: transitionStyles }) }, 100)
    } else {
      this.setState({ animate: {} })
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }
  };

  Suggestions.prototype.handleMouseDown = function handleMouseDown (item, e) {
    // focus is shifted on mouse down but calling preventDefault prevents this
    e.preventDefault()
    this.props.addTag(item)
  };

  Suggestions.prototype.render = function render () {
    var this$1 = this;

    if (!this.props.expandable || !this.state.options.length) {
      return null
    }

    var options = this.state.options.map(function (item, i) {
      var key = (this$1.props.listboxId) + "-" + i
      var classNames = []

      if (this$1.props.selectedIndex === i) {
        classNames.push(this$1.props.classNames.suggestionActive)
      }

      if (item.disabled) {
        classNames.push(this$1.props.classNames.suggestionDisabled)
      }

      return (
        React.createElement( 'li', {
          id: key, key: key, role: 'option', className: classNames.join(' '), 'aria-disabled': item.disabled === true, onMouseDown: this$1.handleMouseDown.bind(this$1, item) },
          React.createElement( 'img', { className: this$1.props.classNames.selectedTagAvatar, src: item.avatar }),
          React.createElement( 'span', null, item.name )
        )
      )
    })

    return (
      React.createElement( 'div', { className: this.props.classNames.suggestions, style: this.state.animate },
        React.createElement( 'ul', { role: 'listbox', id: this.props.listboxId }, options)
      )
    )
  };

  return Suggestions;
}(React.Component));

module.exports = Suggestions
