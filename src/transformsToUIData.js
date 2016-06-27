function transformToUIData({ type, ...props }) {
	const [typeGroup, typeInner] = type.split('.')

	return {
		//type: 'transform',
		//transformType: {
			type: typeGroup,
			[`${typeGroup}Inner`]: {
				type,
				...props
			}
		//}
	}
}

export default function transformsToUIData(transforms) {
	return transforms.map(transformToUIData)
}