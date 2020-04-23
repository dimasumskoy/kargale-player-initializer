import { parseLinesData } from './src/actions/line'
import { initPlayer } from './src/actions/player'
import { SERVER_URL_LOCAL } from './src/utils/constants'

const initialPlayerState = () => {
  return {
    isPlaying: false,
    currentPosition: 0
  }
}

const initialSongState = (song) => {
  const songPath = `${SERVER_URL_LOCAL}/${song.audio}`

  return {
    ...song,
    songPath: songPath,
    lyrics: song.syllables ? song.lyrics : parseLinesData(song)
  }
}

export default function KargalePlayer(props) {
  const {
    playerInstance,
    currentSong,
    stateUpdateCallback,
    playNow
  } = props

  if (!currentSong) return null

  const playerState = {
    playerInstance: playerInstance,
    playerState: initialPlayerState(),
    currentSong: initialSongState(currentSong)
  }
  
  const currentSongPath = playerState.currentSong.songPath

  initPlayer({
    playerInstance,
    currentSongPath,
    playNow,
    stateUpdateCallback
  })

  return playerState
}