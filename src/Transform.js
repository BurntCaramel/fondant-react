import React from 'react'
import Meadow from './Meadow'

export default function Transform({ type, value, enabled = true, specsByType }) {
	return (
		<div>
			<input type='checkbox' checked={ enabled } />
			<select>
				<option>List</option>
				<option>Object</option>
				<option>Render</option>
			</select>
			<select>
				<option>Filter</option>
				<option>First</option>
				<option>Insert</option>
				<option>Join</option>
			</select>
		</div>
	)
}
