export const setPlaybackUpdates = (props) => {
  const {
    isPlaying,
    positionMillis,
    stateUpdateCallback,
  } = props

  let state = {
    isPlaying,
    currentPosition: positionMillis
  }

  if (positionMillis > 0) {
    stateUpdateCallback({
      playerState: state
    })
  }
}