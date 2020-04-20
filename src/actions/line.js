export const parseLinesData = (songData) => {
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