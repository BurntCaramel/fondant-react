import React from 'react'
import Meadow from 'react-meadow'
import webComponents from 'react-meadow/lib/defaultComponents'
import * as stylers from './stylers/meadow'

const Field = webComponents.fieldComponent
const StyledField = (props) => (
	<Field
		{ ...props }
		labelStyler={ stylers.label }
		inputStyler={ stylers.input }
	/>
)

const Multiple = webComponents.multipleComponent
const StyledMultiple = (props) => (
	<Multiple
		{ ...props }
		styler={ stylers.multiple }
	/>
)

const adjustedComponents = {
	...webComponents,
	fieldComponent: StyledField,
	multipleComponent: StyledMultiple
}

export default function WebMeadow(props) {
	return (
		<Meadow { ...adjustedComponents } { ...props } />
	)
}