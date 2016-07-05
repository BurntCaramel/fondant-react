import sow from 'react-sow'
import { fallow } from 'react-sow/dom'
import R from 'ramda'

import { fontFamily } from './main' 

const controlBackground = `rgba(0,0,0,0.04)`
const controlText = '#111'
const controlPadding = '0.333333em 0.666666em'
const selectedColor = '#00BDFF'
const selectedBorder = `2px solid ${selectedColor}`
const focusShadow = `0 0 16px ${selectedColor}`

const focusClass = fallow({
	focus: {
		outline: 'none',
		boxShadow: focusShadow
	}
})

const button = sow({
	classes: [ focusClass ],
	padding: controlPadding,
	fontFamily,
	fontSize: 'inherit',
	color: controlText,
	background: controlBackground,
	border: 'none'
})

export const label = sow(({ type, keyPath }) => ({
	display: 'flex',
	fontWeight: 500,
	alignItems: 'baseline'
}), {
	title: sow(({ type }) => ({
		display: type === 'choice' ? 'none' : 'flex',
		flex: '1 1',
		marginTop: '0.5rem',
		marginBottom: '0.5rem'
	}))
})

const baseInput = sow(({ type }) => ({
	classes: [ focusClass ],
	flex: '1 1',
	marginBottom: '0.25em',
	padding: '0.125em 0.5em',
	fontFamily,
	fontSize: 'inherit',
	WebkitAppearance: 'none',
	border: 'none',
	color: controlText,
	background: 'none',
	borderRadius: 0
}))

const choicePillClass = fallow({
	className: 'choice-pill',
	focus: {
		background: 'white !important'
	},
	hover: {
		background: 'red'
	}
})

const choicePill = sow.combine([
	button,
	({ selected }) => ({
		classes: [ focusClass, choicePillClass ],
		display: 'inline-block',
		padding: controlPadding,
		background: 'none',
		borderBottom: selected ? selectedBorder : '2px solid transparent'
	})
])

const specificInput = sow(R.cond([
	[
		R.propEq('type', 'choice'),
		R.ifElse(
			R.propEq('pills', true),
			R.always({
				margin: 0,
				padding: 0,
				background: controlBackground
			}),
			R.always({
				padding: controlPadding,
				background: controlBackground
			})
		)
	],
	[
		R.T,
		R.always({
			border: `1px solid ${controlBackground}`
		})
	]
]))
specificInput.choicePill = choicePill

export const input = sow.combine([
	baseInput,
	specificInput
])

const removeButton = sow.combine([
	button,
	{
		marginLeft: '1rem'
	}
])

const addButton = sow.combine([
	button,
	{
		marginLeft: '1rem'
	}
])

export const multiple = sow({
	display: 'flex',
	flexDirection: 'column'
}, {
	title: sow({
		marginBottom: '0.5rem'
	}),
	list: sow(({ level }) => ({
		listStyle: 'none',
		margin: 0,
		paddingLeft: level === 0 ? 0 : '1rem'
	})),
	item: sow({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: '1.5rem'
	}, {
		content: sow({
			width: '100%'
		})
	}),
	removeButton,
	addButton
})

export const group = sow({

})
