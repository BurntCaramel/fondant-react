import R from 'ramda'

export default function changeAt(key, val, obj) {
	if (R.isNil(val)) {
		// Remove
		return R.ifElse(
			Array.isArray,
			R.remove(key, 1),
			R.assoc(key, val)
		)(obj)
	}
	else {
		// Replace
		return R.ifElse(
			Array.isArray,
			R.ifElse(
				R.propEq('length', key),
				R.append(val), // Append if past last index
				R.update(key, val) // Otherwise replace the item at the index
			),
			R.assoc(key, val)
		)(obj)
	}
}