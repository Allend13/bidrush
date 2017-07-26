import { UI } from 'constants'
const { OPEN_MENU, CLOSE_MENU, TOGGLE_MENU } = UI

const initialState = {
  isOpened: false,
}

export default function menu(state = initialState, action) {
  switch (action.type) {
    case OPEN_MENU:
      return { isOpened: true }
    case CLOSE_MENU:
      return { isOpened: false }
    case TOGGLE_MENU:
      return { isOpened: !state.isOpened }
    default:
      return state
  }
}
