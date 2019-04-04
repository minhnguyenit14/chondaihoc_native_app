import { STATUS } from '../constants'
import types from '../actions/blog/types'

const initState = {
    searchStatus: STATUS.default,
    showmoreStatus: STATUS.default,
}

const blog = (state = initState, action) => {
    switch (action.type) {
        case types.SET_SEARCH_STATUS:
            return {
                ...state,
                searchStatus: action.status,
            }
        case types.SET_SHOWMORE_STATUS:
            return {
                ...state,
                showmoreStatus: action.status,
            }

        default:
            return state
    }
}

export default blog