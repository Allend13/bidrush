import { UI } from 'constants'
const { OPEN_MENU, CLOSE_MENU, TOGGLE_MENU } = UI


export function showMenu() {
  return {
    type: OPEN_MENU,
  }
}

export function closeMenu() {
  return {
    type: CLOSE_MENU,
  }
}

export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
  }
}
