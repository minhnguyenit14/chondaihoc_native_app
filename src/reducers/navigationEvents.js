import types from '../actions/navigationEvents/types'
import { ROUTES } from '../constants';

const initState = {
    tabs: Object.values(ROUTES),
    currentTab: { route: "" },
    nextTab: { route: "" },
}

const navigationEvents = (state = initState, action) => {
    switch (action.type) {
        case types.SET_CURRENT_TAB:
            return {
                ...state,
                currentTab: action.currentTab,
            }
        case types.SET_NEXT_TAB:
            return {
                ...state,
                nextTab: action.nextTab,
            }

        default:
            return state
    }
}

export default navigationEvents