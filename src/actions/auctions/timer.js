import {
  COUNTDOWN_TICK,
  SET_INTERMISSION_TIME,
} from 'constants'

export function setIntermission(timeISO) {
  return {
    type: SET_INTERMISSION_TIME,
    payload: timeISO,
  }
}

export function countDownTick(nextTick) {
  return {
    type: COUNTDOWN_TICK,
    payload: nextTick,
  }
}
