import clsx from 'clsx'
import React, { useCallback } from 'react'

import {
  Button, IconButton, InputBase, Stack, Typography,
} from '@mui/material'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import { GTPMappingReturn } from '../../api/types'

export interface HomePageAskProps {
  gtpResponses: GTPMappingReturn[]
  executionData: any
  askPrompt: (prompt: string) => void
  completeCalldatas: () => void
  executeTransactions: () => void
}

export default function HomePageAsk(props: HomePageAskProps) {
  const {
    gtpResponses, executionData,
    askPrompt, completeCalldatas, executeTransactions,
  } = props
  const [inputValue, setInputValue] = React.useState<string>('')

  const handleAskPrompt = useCallback(() => {
    askPrompt(inputValue.trim())
    setInputValue('')
  }, [inputValue, askPrompt])

  return (
    <Stack
      position="absolute"
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      width="65%"
      left="50%"
      minWidth={550}
      top="calc(100vh - 160px)"
      sx={{
        transform: 'translate(-50%, 0)',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        p="3px 5px"
      >
        <Button
          onClick={completeCalldatas}
          disabled={!gtpResponses.length}
          className={clsx(
            'rounded-md',
            gtpResponses.length && 'shadow-[0_0_10px_rgba(0,0,0,0.10)]',
          )}
        >
          Combine
        </Button>
        <Button
          onClick={executeTransactions}
          disabled={!executionData}
          className={clsx(
            'rounded-md',
            !!executionData && 'shadow-[0_0_10px_rgba(0,0,0,0.10)]',
          )}
        >
          Execute
        </Button>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        p="3px 5px"
        width="100%"
        className="bg-white border border-black/10 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAskPrompt()
          }}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="ask"
          onClick={handleAskPrompt}
        >
          <SendOutlinedIcon />
        </IconButton>
      </Stack>
      <Typography variant="caption" className="text-gray-500" mt={1}>Not affiliated with OpenAI or ChatGPT.</Typography>
    </Stack>
  )
}
