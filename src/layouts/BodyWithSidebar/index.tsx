import React, { PropsWithChildren, useState } from 'react'

import { Box, Stack } from '@mui/material'

import Sidebar from '../../components/Sidebar'

export function BodyWithSidebar({ children }: PropsWithChildren) {
  const [sidebarWidth, setSidebarWidth] = useState<number>(260)

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={0}
      width="100vw"
    >
      <Box width={`${sidebarWidth}px`} height="100vh">
        <Sidebar />
      </Box>
      <Box
        position="relative"
        width={`calc(100% - ${sidebarWidth}px)`}
        overflow="hidden"
      >
        {children}
      </Box>
    </Stack>
  )
}
