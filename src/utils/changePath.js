import R from 'ramda'
import changeAt from './changeAt'

function changePath(path, val, obj) {
  switch (path.length) {
    case 0:
      return val
    case 1:
			return changeAt(path[0], val, obj)
    default:
      return changeAt(path[0], changePath(path.slice(1), val, R.clone(obj[path[0]])), obj)
  }
}

export default R.curry(changePath) 