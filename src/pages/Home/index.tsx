import React, { useCallback, useState } from 'react'

import { BodyWithSidebar } from '../../layouts/BodyWithSidebar'
import HomePageChats from './Chats'
import HomePageAsk from './Ask'
import GTPApi from '../../api'
import { GTPCombineReturn, GTPMappingReturn } from '../../api/types'

export default function HomePage() {
  // TODO: use redux to manage state
  const [blocks, setBlocks] = useState<string[][]>([])
  const [gtpResponses, setGtpResponses] = useState<GTPMappingReturn[]>([])
  const [executionData, setExecutionData] = useState<GTPCombineReturn>()

  const askPrompt = useCallback((prompt: string) => {
    setBlocks((prev) => [...prev, [prompt]])

    GTPApi.askPrompt(prompt)
      .then((gtpRes) => {
        setGtpResponses((prev) => [...prev, gtpRes])
        console.log(gtpRes)

        const fromEntities = gtpRes.readable.tokens?.filter((x) => x.relation === 'from') as { name: string, address: string, relation: string }[]
        const toEntities = gtpRes.readable.tokens?.filter((x) => x.relation === 'to') as { name: string, address: string, relation: string }[]

        const readableOutput = [
          '', // to be filled
          ...(fromEntities.map((x) => `Pay: ${x.name}`)),
          ...(toEntities.map((x) => `Get: ${x.name}`)),
          // `Calldata: ${gtpRes.calldata}`,
        ]
        if (gtpRes.readable.action === 'swap') {
          readableOutput[0] = `${gtpRes.readable.action as string} on ${gtpRes.readable.platform as string} (${(gtpRes.readable.chain as { origin: string }).origin})`
        } else {
          readableOutput[0] = `${gtpRes.readable.action as string}: ${(gtpRes.readable.chain as { origin: string }).origin} -> ${(gtpRes.readable.chain as { dest: string }).dest}`
        }

        setBlocks((prev) => [...prev, readableOutput])
      })
      .catch((err) => {
        setBlocks((prev) => prev.slice(0, prev.length - 1))
      })
  }, [])

  const completeCalldatas = useCallback(() => {
    GTPApi.combineMappings(gtpResponses)
      .then((data) => setExecutionData(data))
  }, [gtpResponses])

  const executeTransactions = useCallback(() => {
    console.log(executionData)
  }, [executionData])

  return (
    <BodyWithSidebar>
      <HomePageChats blocks={blocks} />
      <HomePageAsk
        gtpResponses={gtpResponses}
        executionData={executionData}
        askPrompt={askPrompt}
        completeCalldatas={completeCalldatas}
        executeTransactions={executeTransactions}
      />
    </BodyWithSidebar>
  )
}
