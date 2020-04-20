import { parseLinesData } from './src/actions/line'
import { initPlayer } from './src/actions/player'
import { SERVER_URL_LOCAL } from './src/utils/constants'

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
