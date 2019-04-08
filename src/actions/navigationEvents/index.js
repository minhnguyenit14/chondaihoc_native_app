import types from "./types";

export const setCurrentTab = (currentTab = { route: "" }) => ({
    type: types.SET_CURRENT_TAB,
    currentTab
})

export const setNextTab = (nextTab = { route: "" }) => ({
    type: types.SET_NEXT_TAB,
    nextTab
})