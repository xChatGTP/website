import { utils } from 'ethers'
import React, { useCallback, useState } from 'react'
import { useContract, useSigner } from 'wagmi'

import { BodyWithSidebar } from '../../layouts/BodyWithSidebar'
import HomePageChats from './Chats'
import HomePageAsk from './Ask'
import GTPApi from '../../api'
import { GTPCombineReturn, GTPMappingReturn } from '../../api/types'
import GTPAbi from '../../abis/GTP.json'
import { GTP } from '../../types/contracts'

export default function HomePage() {
  const { data: signer } = useSigner()
  const gtpContract = useContract({
    address: '0x236A80A4cCf06e8EE6d869B318447d10983D7c03',
    abi: GTPAbi,
    signerOrProvider: signer,
  })

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
    if (!gtpContract) return
    if (!executionData?.tos) return

    console.log(executionData)
    const { tos, configs, datas } = executionData; // semi-colon required for next line (type casting)

    (gtpContract as GTP).batchExec(tos, configs, datas, { value: utils.parseEther('0.3'), gasLimit: 3_000_000 })
  }, [gtpContract, executionData])

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
