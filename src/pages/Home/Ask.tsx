import React, { useCallback } from 'react'

import {
  IconButton, InputBase, Stack, Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export interface HomePageAskProps {
  setAsks: React.Dispatch<React.SetStateAction<string[]>>
}

export default function HomePageAsk(props: HomePageAskProps) {
  const [inputValue, setInputValue] = React.useState<string>('')

  const handleSendAsk = useCallback(() => {
    props.setAsks((prev) => [...prev, inputValue])
    setInputValue('')
  }, [props, inputValue])

  return (
    <Stack
      position="absolute"
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1.5}
      width="65%"
      left="50%"
      minWidth={550}
      bottom="25px"
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
        width="100%"
        className="border border-black/10 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.trim())}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="ask"
          onClick={handleSendAsk}
        >
          <SearchIcon />
        </IconButton>
      </Stack>
      <Typography variant="caption" className="text-gray-500">Not affiliated with OpenAI or ChatGPT.</Typography>
    </Stack>
  )
}
