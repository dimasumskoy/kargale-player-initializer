import { Audio } from 'expo-av'

const setPlaybackUpdates = (props) => {
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

export const initPlayer = async (props) => {
  console.log('started')

  const {
    songPath,
    playNow,
    updatePlayerCallback
  } = props

  const playerInstance = new Audio.Sound()

  const loadPlayerSource = async () => {
    try {
      await playerInstance.loadAsync({ uri: songPath })
      await playerInstance.setProgressUpdateIntervalAsync(100)

      if (playNow) {
        await playerInstance.playAsync()
      }
    } catch (e) {
      console.log(e)
    }
  }

  loadPlayerSource().then(() => {
    playerInstance.setOnPlaybackStatusUpdate(
      (playbackStatus) =>
        setPlaybackUpdates({ ...playbackStatus, updatePlayerCallback })
    )

    return playerInstance
  })
}