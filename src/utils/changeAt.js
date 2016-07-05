import R from 'ramda'

export default function changeAt(key, val, obj) {
	return Array.isArray(obj) ? (
		R.update(key, val, obj)
	) : (
		R.assoc(key, val, obj)
	)
}