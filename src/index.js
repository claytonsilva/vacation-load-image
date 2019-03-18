import { API_KEY, PORT, TAG } from './config'
import express from 'express'
import giphyRandom from 'giphy-random'
import rp from 'request-promise'

const app = express()

const randomImage = async (key, tag) => {
  const { data } = await giphyRandom(key, { tag: tag })

  const requestSettings = {
    url: data.images.fixed_width.url,
    method: 'GET',
    encoding: null
  }

  return rp(requestSettings)
}

app.all('/', async (req, res) => {
  res.set('Content-Type', 'image/gif')
  res.send(await randomImage(API_KEY, TAG || 'kaiju'))
})

app.listen(PORT || 3000, function() {
  console.log('Vacation app!')
})
