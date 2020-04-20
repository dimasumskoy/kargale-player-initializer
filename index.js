const SERVER_URL_LOCAL       = 'http://192.168.1.204:3000'
const PLAYER_UPDATE_INTERVAL = 100

const parseLinesData = (songData) => {
  if (!songData.syllables && songData.syllables !== undefined) {
    return songData.lyrics.map(line => {
      return {
        timeData: {
          start: line.start,
          end: line.end
        },
        lineText: line.text.toUpperCase()
      }
    })
  }
}

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

const initPlayer = async (props) => {
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

export default function loadPlayerData(props) {
  const { 
    playerInstance, 
    songJson, 
    initialState, 
    updateCallback 
  } = props

  if (songJson === '') return false

  const currentSong = JSON.parse(songJson)
  const lyricsData  = currentSong.syllables ? currentSong.lyrics : parseLinesData(currentSong)

  initialState.currentSong = {
    ...currentSong,
    songPath: `${SERVER_URL_LOCAL}/${currentSong.audio}`,
    lyrics: lyricsData
  }

  initPlayer({
    playerInstance,
    songPath: initialState.currentSong.songPath,
    playNow: true,
    updatePlayerCallback: updateCallback
  })
    .then(playerInstance => {
      updateCallback({
        playerInstance: playerInstance,
        currentSong: initialState.currentSong,
        playerState: initialState.playerState
      })
    })
}
