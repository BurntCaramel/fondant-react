import React from 'react'
import R from 'ramda'

import Meadow from './Meadow'
import Transform from './Transform'
import transformsToUIData from './transformsToUIData'
import types from './types'
import fieldSpecs from './fieldSpecs'
import * as stylers from './stylers/main'
import changePath from './utils/changePath'

const typeSpecs = R.mapObjIndexed((typeSpec, id) => (
	R.merge(typeSpec, { id })
), types)

console.log('typeSpecs', typeSpecs)

const initialTransforms = [
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
	getInitialState() {
		return {
			transforms: transformsToUIData(initialTransforms)
		}
	},

	onReplaceInfoAtKeyPath(value, keyPath) {
		console.log('change', value, keyPath)
		this.setState(R.pipe(
			R.prop('transforms'),
			R.clone(),
			R.objOf('transforms'),
			R.set(
				R.lens(R.path(keyPath), changePath(keyPath)),
				value
			),
			R.tap(after => console.log('after', after))
		))
	},

	render() {
		const transforms = this.state.transforms
		return (
			<div { ...stylers.base() }>
				<Meadow
					typeSpecs={ typeSpecs }
					fieldSpecs={ fieldSpecs }
					fields={[ 'transforms' ]}
					values={{ transforms }}
					onReplaceInfoAtKeyPath={ this.onReplaceInfoAtKeyPath }
				/>
			</div>
		)
	}
})
