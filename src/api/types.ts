interface MapSwapReturn {
  fn: string,
  selector: string,
  args: {
    // path?: [string[], MapSwapUniswapFee[]],
    path?: string, // encoded version of above
    amountIn?: string,
    amountInMaximum?: string,
    amountOut?: string,
    amountOutMinimum?: string,
    tokenIn?: string,
    fee?: string,
    sqrtPriceLimitX96?: string,
  },
  argsOrder: string[],
  calldata: string,
  readable: {
    chain?: {
      origin: string,
      dest: string,
    },
    action?: string,
    platform?: string,
    tokens?: {
      name: string,
      address: string,
      relation: string,
    }[],
  },
}

export interface GTPCombineReturn {
  tos: string[],
  datas: string[],
  configs: string[],
}

export type GTPMappingReturn = MapSwapReturn
