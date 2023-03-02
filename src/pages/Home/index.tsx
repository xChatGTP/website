import React, { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Typography } from '@mui/material'

import { BodyWithSidebar } from '../../layouts/BodyWithSidebar'
import HomePageChats from './Chats'
import HomePageAsk from './Ask'
import GTPApi from '../../api'

// import Container from '../../components/Container'

export default function HomePage() {
  // TODO: use redux to manage state
  const [blocks, setBlocks] = useState<string[][]>([
    // ['swap on uniswap (ethereum)', 'Pay: USDC', 'Get: ETH'],
    // ['swap on uniswap (ethereum)', 'Pay: USDC', 'Get: ETH'],
    // ['swap on uniswap (ethereum)', 'Pay: USDC', 'Get: ETH'],
    // ['swap on uniswap (ethereum)', 'Pay: USDC', 'Get: ETH'],
    // ['swap on uniswap (ethereum)', 'Pay: USDC', 'Get: ETH'],
    // ['swap on uniswap (ethereum)', 'Pay: USDC', 'Get: ETH'],
  ])

  const askPrompt = useCallback(async (prompt: string) => {
    setBlocks((prev) => [...prev, [prompt]])

    const gtpRes = await GTPApi.askPrompt(prompt)
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
  }, [])

  return (
    <BodyWithSidebar>
      <HomePageChats blocks={blocks} />
      <HomePageAsk askPrompt={askPrompt} />
    </BodyWithSidebar>
  )
}
