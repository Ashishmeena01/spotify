import audiusApi from '@/config/audiusApi.js'

export async function getTrendingTracks({ signal } = {}) {
  const { data } = await audiusApi.get('/tracks/trending', {
    params: { limit: 12 },
    signal,
  })

  return data.data || []
}

export async function searchTracks(query, { signal } = {}) {
  const { data } = await audiusApi.get('/tracks/search', {
    params: { query, limit: 24 },
    signal,
  })

  return data.data || []
}
