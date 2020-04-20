export const setPlaybackUpdates = (props) => {
  const {
    isPlaying,
    positionMillis,
    updatePlayerCallback,
  } = props

  let state = {
    isPlaying,
    currentPosition: positionMillis
  }

  if (positionMillis > 0) {
    updatePlayerCallback(player => {
      return {
        ...player,
        playerState: state
      }
    })
  }
}