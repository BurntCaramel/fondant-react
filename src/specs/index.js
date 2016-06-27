const any = 'any'
const integer = 'integer'
const transform = 'transform'

export const list = {
    filter: {
        where: transform
    },
    first: {
        limit: integer
    },
    insert: {
        item: any,
        index: integer
    }
}