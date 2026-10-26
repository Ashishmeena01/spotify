import audiusApi from '@/config/audiusApi.js'

export async function getTrendingTracks() {
  const { data } = await audiusApi.get('/tracks/trending', {
    params: { limit: 12 },
  })

  return data.data || []
}
