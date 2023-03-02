import axios from 'axios'

import { GTPMappingReturn } from './types'

export default class GTPApi {
  static async askPrompt(prompt: string): Promise<GTPMappingReturn> {
    const res = await axios.get<GTPMappingReturn>(`http://localhost:8080/generate?prompt=${prompt}`)
    return res.data
  }
}
