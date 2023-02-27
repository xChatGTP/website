import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import chatGTPLogo from '../../assets/chatGTP.svg'
import ChatBlock from '../../components/Chat/Block'

function NoInputResponse() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
    >
      <Box
        width="65%"
        left="50%"
        minWidth={550}
        textAlign="center"
      >
        <img src={chatGTPLogo} alt="ChatGTP Logo" width="80px" height="80px" style={{ margin: '0 auto' }} />
        <Typography variant="h5" fontWeight={600} mt={3}>ChatGTP</Typography>
      </Box>
    </Stack>
  )
}

export default function HomePageResponses() {
  return (
    <>
      {/* <NoInputResponse /> */}
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        height="100vh"
        width="100%"
      >
        <ChatBlock>
          Swap ETH to USDC
        </ChatBlock>
        <ChatBlock>
          Hello, I'm ChatGTP. I'm a chatbot that can help you create GTP .
        </ChatBlock>
      </Stack>
    </>
  )
}
