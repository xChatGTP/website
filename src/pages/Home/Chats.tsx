import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import chatGTPLogo from '../../assets/chatGTP.svg'
import ChatBlock from '../../components/Chat/Block'

export interface HomePageChatsProps {
  blocks: string[][]
}

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

export default function HomePageChats(props: HomePageChatsProps) {
  const { blocks } = props
  return (
    <>
      {/* <NoInputResponse /> */}
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        height="100vh"
        width="100%"
        overflow="scroll"
        pb={18}
      >
        {
          blocks.length ? (
            blocks.map((texts: string[], idx) => (
              <ChatBlock key={idx}>
                {texts.map((text: string, jdx: number) => (
                  <Typography variant="body1" noWrap={false} key={jdx}>{text}</Typography>
                ))}
              </ChatBlock>
            ))
          ) : (
            <NoInputResponse />
          )
        }
      </Stack>
    </>
  )
}
