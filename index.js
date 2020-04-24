import { parseLinesData } from './src/actions/line'
import { initPlayer } from './src/actions/player'

const initialPlayerState = () => {
  return {
    isPlaying: false,
    currentPosition: 0
  }
}

const initialSongState = (song, serverUrl) => {
  const songPath = `${serverUrl}/${song.audio}`

  return {
    ...song,
    songPath: songPath,
    lyrics: song.syllables ? song.lyrics : parseLinesData(song)
  }
}

export default function PlayerState(props) {
  const {
    playerInstance,
    currentSong,
    stateUpdateCallback,
    playNow,
    serverUrl
  } = props

  if (!currentSong) return null

  const playerState = {
    playerInstance: playerInstance,
    playerState: initialPlayerState(),
    currentSong: initialSongState(currentSong, serverUrl)
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