import sow from 'react-sow'
import R from 'ramda'

const controlBackground = '#e6e6e6'
const controlText = '#111'

export const label = sow(({ type }) => ({
	display: 'flex',
	fontWeight: 'bold'
}), {
	title: sow(({ type }) => ({
		display: type === 'choice' ? 'none' : 'flex',
		flex: '1 1'
	}))
})

const baseInput = sow(({ type }) => ({
	flex: '1 1',
	marginBottom: '0.25em',
	padding: '0.125em 0.5em',
	fontSize: 'inherit',
	WebkitAppearance: 'none',
	border: 'none',
	color: controlText,
	background: 'none',
	borderRadius: 0
}))

const specificInput = sow(R.when(
	R.propEq('type', 'choice'),
	R.always({
		background: controlBackground
	})
))

export const input = sow.combine([
	baseInput,
	specificInput
])

const button = sow({
	fontSize: 'inherit',
	color: controlText,
	background: controlBackground,
	border: 'none',
	opacity: 0.7
})

export const multiple = sow({
	display: 'flex',
	flexDirection: 'column'
}, {
	list: sow(({ level }) => ({
		listStyle: 'none',
		marginLeft: 0,
		paddingLeft: level === 0 ? 0 : '1rem'
	})),
	item: sow({
		marginBottom: '1rem'
	}),
	removeButton: button,
	addButton: button
})
