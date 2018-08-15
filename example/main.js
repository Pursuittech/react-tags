'use strict'

const React = require('react')
const ReactDom = require('react-dom')
const Tags = require('../lib/ReactTags')
const suggestions = require('./users')

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tags: [
        {
          id: 400,
          name: "Mikko Sarreal",
          avatar: "https://avatars1.githubusercontent.com/u/26211423?s=460&v=4"
        },
        {
          id: 300,
          name: "Rob May",
          avatar: "https://avatars1.githubusercontent.com/u/38393319?s=70&v=4"
        }
      ],
      suggestions
    }
  }

  handleDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }

  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }

  render () {
    console.log(this.state)
    return (
      <div>
        <Tags
          tags={this.state.tags}
          inputAttributes={{readOnly: true}}
          disableButton={true}
          suggestions={this.state.suggestions}
          handleDelete={this.handleDelete.bind(this)}
          handleAddition={this.handleAddition.bind(this)} 
          minQueryLength={1}/>
        <hr />
        <pre><code>{JSON.stringify(this.state.tags, null, 2)}</code></pre>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'))
