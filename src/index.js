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
	},
	{
		"type": "object.mapValues",
		"transforms": [
			{
				"type": "text.uppercase"
			}
		]
	}
]

export default React.createClass({
	onReplaceInfoAtKeyPath(value, keyPath, id) {

	},

	render() {
		const uiTransforms = transformsToUIData(transforms)
		return (
			<div>
				<Meadow
					typeSpecs={ typeSpecs }
					fieldSpecs={ fieldSpecs }
					fields={[ 'transforms' ]}
					values={{ transforms: uiTransforms }}
					onReplaceInfoAtKeyPath={ this.onReplaceInfoAtKeyPath }
				/>
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
