'use strict'

const React = require('react')

module.exports = (props) => (
  <button type='button' className={props.classNames.selectedTag} title='Click to remove tag' onClick={props.onDelete}>
    <img className={props.classNames.selectedTagAvatar} src={props.tag.avatar} role='presentation' />
    <span className={props.classNames.selectedTagName}>{props.tag.name}</span>
  </button>
)
