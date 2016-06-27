import React from 'react'
import Meadow from 'react-meadow'
import webComponents from 'react-meadow/lib/defaultComponents'

export default function WebMeadow(props) {
	return (
		<Meadow { ...webComponents } { ...props } />
	)
}