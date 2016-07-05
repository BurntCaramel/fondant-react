import sow from 'react-sow'
import { fallow } from 'react-sow/dom'
import rgba from 'react-sow/rgba'
import R from 'ramda'

import { fontFamily } from './main' 

const controlBackground = rgba(0, 0, 0, 0.04)
const controlText = rgba.whiteValue(0.06)
const controlPadding = '0.333333em 0.666666em'
const utilityText = controlText
//const utilityBackground = controlBackground.mapAlpha(R.multiply(2/3))

const removeColor = rgba(255, 200, 200, 0.2)
const utilityBackground = controlBackground
/*const utilityBackground = controlBackground.mapRGB((value, component) => {
	return value * 0.4 + removeColor.get(component) * 0.6
})*/
const utilityBorder = 'none' //`1px solid ${utilityBackground}` 
const selectedColor = '#00BDFF'
const dividerBorderWidth = '2px'
const dividerBorder = `${dividerBorderWidth} solid ${controlBackground}`
const selectedBorder = `${dividerBorderWidth} solid ${selectedColor}`
const focusShadow = `0 0 16px ${selectedColor}`

const focusClass = fallow({
	focus: {
		outline: 'none',
		boxShadow: focusShadow
	}
})

const buttonTypography = sow({
	classes: [ focusClass ],
	fontFamily,
	fontSize: 'inherit',
})

const button = sow.combine([
	buttonTypography,
	{
		padding: controlPadding,
		color: controlText,
		background: controlBackground,
		border: 'none'
	}
])

const utilityButton = sow.combine([
	buttonTypography,
	{
		padding: 0,
		fontSize: '1.25rem',
		fontWeight: 'bold',
		color: utilityText,
		background: utilityBackground,
		border: utilityBorder
	}
])

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
		marginBottom: `-${dividerBorderWidth}`,
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
				background: controlBackground,
				borderBottom: dividerBorder
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
	utilityButton,
	{
		children: '−',
		marginLeft: '0.25rem',
		marginRight: '0.25rem',
		paddingLeft: '0.25rem',
		paddingRight: '0.25rem',
		background: removeColor
	}
])

const addButton = sow.combine([
	utilityButton,
	{
		children: '+',
		paddingLeft: '0.5rem',
		paddingRight: '0.5rem'
	}
])

export const multiple = sow({
	display: 'flex',
	flexDirection: 'column'
}, {
	title: sow(() => ({
		marginTop: '0.5rem',
		marginBottom: '1rem',
		fontWeight: 500
	})),
	list: sow(({ level }) => ({
		listStyle: 'none',
		margin: 0,
		paddingLeft: 0
		//paddingLeft: level === 0 ? 0 : '1rem'
	})),
	item: sow({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		marginBottom: '1.5rem'
	}, {
		content: sow({
			width: '100%'
		})
	}),
	removeButton,
	addButton
})

const shouldIndentGroupKeyPath = R.pipe(
	R.last,
	R.anyPass([
		R.equals('objectInner'),
		R.equals('listInner'),
		R.equals('textInner')
	])
)

export const group = sow(({ keyPath }) => ({
	
}), {
	items: sow(({ keyPath }) => ({
		paddingLeft: shouldIndentGroupKeyPath(keyPath) ? '1rem' : 0
	}))
})
