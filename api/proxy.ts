import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // const { name = 'World' } = req.query
  // res.status(200).send(`Hello ${name}!`)
  try {
    const { backendUrl } = req.query

    if(!backendUrl) {
      return res.status(400).json({ error: 'Missing backendUrl query parameter'})
    }

    //Forward the request to the backend server using Axios
    const response = await axios({
      method: req.method,
      url: backendUrl as string,
      headers: req.headers,
      data: req.body
    })

    //Pass the response from the backend server back to the client
    res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Error: ', error)
    res.status(500).json({ error: 'Internal Server Error'})
  }
  // res.status(200).json({
  //   body: req.body,
  //   url: req.url,
  //   query: req.query,
  //   cookies: req.cookies,
  // })
}
