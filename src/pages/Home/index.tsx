import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Typography } from '@mui/material'

import { BodyWithSidebar } from '../../layouts/BodyWithSidebar'
import HomePageResponses from './Responses'
import HomePageAsk from './Ask'

// import Container from '../../components/Container'

export default function HomePage() {
  // TODO: use redux to manage state
  const [asks, setAsks] = useState<string[]>([])

  return (
    <BodyWithSidebar>
      <HomePageResponses />
      <HomePageAsk setAsks={setAsks} />
    </BodyWithSidebar>
  )
}
