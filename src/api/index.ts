import axios from 'axios'

import {
  GTPCombineReturn,
  GTPMappingReturn,
} from './types'

export default class GTPApi {
  static async askPrompt(prompt: string): Promise<GTPMappingReturn> {
    const res = await axios.get<GTPMappingReturn>(`http://localhost:8080/generate?prompt=${prompt}`)
    return res.data
  }

  static async combineMappings(gtpResponses: GTPMappingReturn[]): Promise<GTPCombineReturn> {
    const res = await axios.post<GTPCombineReturn>(
      'http://localhost:8080/combine',
      { gtpResponses },
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data
  }
}
