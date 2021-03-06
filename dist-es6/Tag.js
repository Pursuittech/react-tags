'use strict'

const React = require('react')

module.exports = (props) => (
  React.createElement( 'button', { disabled: props.disabled, type: 'button', className: props.classNames.selectedTag, title: 'Click to remove tag', onClick: props.onDelete },
    React.createElement( 'img', { className: props.classNames.selectedTagAvatar, src: props.tag.avatar, role: 'presentation' }),
    React.createElement( 'span', { className: props.classNames.selectedTagName }, props.tag.name)
  )
)
