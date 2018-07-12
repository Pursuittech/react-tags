'use strict'

const users = [
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
]

module.exports = (() => users.map((user, id) => ({ id: user.id, name: user.name, avatar: user.avatar })))()
