const SceneControl = (auction, userBids, currenScene, replace) => {
  let nextScene

  switch (auction.status) {
    case 1:
      if (userBids) nextScene = 'precap'
      break
    case 2:
    case 3:
    case 4:
      nextScene = 'race'
      break
    case 5:
      if (currenScene === 'prize-claim') break
      nextScene = 'finish'
      break
    default:
      nextScene = false
  }

  if (nextScene && currenScene !== nextScene) replace(nextScene)
}

export default SceneControl
