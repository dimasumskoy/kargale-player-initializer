import { setPlaybackUpdates } from './playback'
import { PLAYER_UPDATE_INTERVAL } from '../utils/constants'

export const initPlayer = async (props) => {
  const {
    playerInstance,
    songPath,
    playNow,
    updatePlayerCallback
  } = props

  const loadPlayerSource = async () => {
    try {
      await playerInstance.loadAsync({ uri: songPath })
      await playerInstance.setProgressUpdateIntervalAsync(PLAYER_UPDATE_INTERVAL)

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