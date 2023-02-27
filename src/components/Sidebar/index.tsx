import React from 'react'

import { Box, Stack, Typography } from '@mui/material'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { SidebarButton, SidebarList } from './elements'
import chatGTPLogo from '../../assets/chatGTP.svg'

export default function Sidebar() {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      spacing={2}
      width="100%"
      height="100%"
      bgcolor="rgb(32, 33, 35)"
      color="#fff"
      p={1}
    >
      <Box>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          px={1}
          pt={1}
        >
          <img src={chatGTPLogo} alt="ChatGTP Logo" width="32" height="32" />
          <Typography variant="h6" fontWeight="bold" pt={0.5}>ChatGTP</Typography>
        </Stack>
        <SidebarList>
          <SidebarButton
            icon={ChatBubbleOutlineOutlinedIcon}
            text="Multi-chain Swaps"
          />
        </SidebarList>
      </Box>
      <Box borderTop="1px solid rgb(77, 77, 79)">
        <SidebarList>
          <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
        </SidebarList>
      </Box>
    </Stack>
  )
}
