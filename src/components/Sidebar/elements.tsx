import React, { PropsWithChildren } from 'react'

import {
  Button, ButtonProps, Stack, Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { SvgIconComponent } from '@mui/icons-material'

export interface SidebarButtonProps {
  text: string
}

export const SidebarButtonClicker = styled(Button)(({ theme }) => ({
  position: 'relative',
  // height: 200,
  color: '#fff',
  borderRadius: 4,
  // [theme.breakpoints.down('sm')]: {
  //   width: '100% !important', // Overrides inline-style
  //   height: 100,
  // },
  padding: '0',
  transitionDuration: '50ms',
  '&:hover': {
    backgroundColor: 'rgb(42, 43, 49)',
  },
  '&:hover, &.Mui-focusVisible': {
    '& .MuiTypography-root': {
      // color: '#fff',
    },
  },
}))

export function SidebarButton({ icon: Icon, text, ...props }: { icon: SvgIconComponent, text: string } & ButtonProps) {
  return (
    <SidebarButtonClicker {...props}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        width="100%"
        spacing={2}
        py={1.5}
        px={1.5}
      >
        <Icon fontSize="small" />
        <Typography variant="body1">{text}</Typography>
      </Stack>
    </SidebarButtonClicker>
  )
}

export function SidebarList({ children }: PropsWithChildren) {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={1}
      py={2}
    >
      {children}
    </Stack>
  )
}
