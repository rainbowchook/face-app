import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export const serverUrl: string = process.env.REACT_APP_SERVER_URL!

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const backendUrl = req.query.backendUrl as string

    if (!backendUrl) {
      return res
        .status(400)
        .json({ error: 'Missing backendUrl query parameter' })
    }

    const url = `${serverUrl}${backendUrl}`

    //Forward the request to the backend server using Axios
    const response = await axios({
      method: req.method,
      url,
      headers: req.headers,
      data: req.body,
    })

    //Pass the response from the backend server back to the client
    res.status(response.status).json(response.data)
  } catch (error) {
    console.error('Error: ', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
