module.exports = [
  {
    path: '/api/chain',
    handler: (req, res) => {
      return res.json({
        result: [
          {
            chainName: 'Arbitrum Mainnet',
            chainId: '42161',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: ['https://arb1.arbitrum.io.rpc']
          },
          {
            chainName: 'Binance Smart Chain',
            chainId: '56',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18
            },
            rpcUrls: ['https://bsc-dataseed.binance.org']
          }
        ]
      });
    },
  }
]
