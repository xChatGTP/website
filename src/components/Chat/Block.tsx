import React, { PropsWithChildren } from 'react'

import { Box, Stack, Typography } from '@mui/material'

import chatGTPLogo from '../../assets/chatGTP.svg'

export default function ChatBlock(props: PropsWithChildren) {
  return (
    <Box
      py={4}
      px={0.5}
      borderBottom="1px solid rgba(0, 0, 0, 0.1)"
      width="100%"
      sx={{
        '&:nth-of-type(odd)': {
          backgroundColor: 'rgb(249 250 251)',
        },
        '&:nth-of-type(odd) .chat-block-avatar-bot, &:nth-of-type(even) .chat-block-avatar-user': {
          display: 'none',
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
        width="65%"
        left="50%"
        minWidth={550}
        m="0 auto"
      >
        <Box>
          <Box className="chat-block-avatar-bot"><img src={chatGTPLogo} alt="ChatGTP" width="32px" /></Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            width="32px"
            height="32px"
            bgcolor="rgb(67, 126, 180)"
            className="chat-block-avatar-user"
            sx={{
              borderRadius: 0.5,
            }}
          >
            <Typography color="#fff" fontSize={12}>JW</Typography>
          </Stack>
        </Box>
        <Box>
          {props.children}
        </Box>
      </Stack>
    </Box>
  )
}
