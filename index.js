import { parseLinesData } from './src/actions/line'
import { initPlayer } from './src/actions/player'

const songReportState = (lyrics) => {
  const target = lyrics[parseInt(lyrics.length / 2)]

  return {
    sent: false,
    timeStamp: target.line_start || target.timeData.start
  }
}

const initialPlayerState = () => {
  return {
    isPlaying: false,
    currentPosition: 0
  }
}

const initialSongState = (song, serverUrl) => {
  return {
    ...song,
    songPath: `${serverUrl}/${song.audio}`,
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

  const songInfo    = initialSongState(currentSong, serverUrl)
  const reportInfo  = songReportState(songInfo.lyrics)
  const playerInfo  = initialPlayerState()
  const playerState = {
    playerInstance: playerInstance,
    playerState: playerInfo,
    currentSong: songInfo,
    report: reportInfo,
    playing: false,
    startedAt: null
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