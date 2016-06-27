function transformToUIData({ type, ...props }) {
	const [typeGroup, typeInner, ...typeMore] = type.split('.')

	if (props.transforms) {
		props.transforms = transformsToUIData(props.transforms)
	}

	return {
		type: typeGroup,
		[`${typeGroup}Inner`]: {
			type,
			...props
		}
	}
}

export default function transformsToUIData(transforms) {
	return transforms.map(transformToUIData)
}