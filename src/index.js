import React from 'react'
import R from 'ramda'

import Meadow from './Meadow'
import MeadowItem from './MeadowItem'
import Transform from './Transform'
import transformsToUIData from './transformsToUIData'
import types from './types'
import fieldSpecs from './fieldSpecs'

const typeSpecs = R.mapObjIndexed((typeSpec, id) => (
	R.merge(typeSpec, { id })
), types)

console.log('typeSpecs', typeSpecs)

const transforms = [
	{
		"type": "object.mapKeys",
		"newToOldKeys": {
			"firstName": "first_name",
			"lastName": "last_name"
		}
	},
	{
		"type": "list.first",
		"limit": "5"
	}
]

export default React.createClass({
	onReplaceInfoAtKeyPath(value, keyPath, id) {

	},

	render() {
		const uiData = transformsToUIData(transforms)
		return (
			<div>
				{ uiData.map((transform, index) => (
					<Meadow
						key={ index }
						typeSpecs={ typeSpecs }
						fieldSpecs={ fieldSpecs }
						values={ transform }
						title={ JSON.stringify(transform) }
						onReplaceInfoAtKeyPath={ this.onReplaceInfoAtKeyPath }
					/>
				)) }
			</div>
		)
	}

	/*
	render() {

		const transformFields = transforms.map((transform, index) =>
			<Transform key={ index } { ...transform } />
		)

		transformFields.push(<Transform key='new' enabled={ false } />)

		return (
			<div>{
				transformFields
			}</div>
		)
	}
	*/
})
