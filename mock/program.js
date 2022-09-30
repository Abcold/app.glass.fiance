module.exports = [
  {
    path: "/api/chain/3/category/1/product/1/program",
    handler: (req, res) => {
      console.debug(1);
      return res.json({
        result: [
          {
            programName: "ETH/USDC",
            // contractAddr: '0xaC401D099a71710F17dE7446640C347338CA35e5',
            contractAddr: "0xe5968dba59E8B0E0cABcA1D34EE49Dd9b0B4e3C5",
            programId: "1",
            description: "iZiSwap Protocol",
            programInfo: {
              token: {
                // pair: ['ETH', 'USDC'],
                pair: [
                  {
                    name: "ETH",
                    // symbol: 'WETH',
                    decimals: 18,
                    // wETH contract address for swap
                    contractAddr: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
                    // isStableCoin: false
                  },
                  {
                    name: "USDC",
                    // symbol: 'USDC',
                    decimals: 6,
                    contractAddr: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
                    // isStableCoin: true
                  },
                ],
                exchangeRate: 1200.1, // non-stable to stable coin
              },
              poolStats: {
                totalValueLocked: 50000000,
                totalRewards24H: 100000000,
                annualPercentageRate: 2.0, // 200%
              },

              // DualInvestment specific
              lockPeriods: [
                {
                  period: 1,
                  annualPercentageRate: 2.0, // 200%
                  nextSettlementTime: 1660318377172, // UTC seconds since epoch
                },
                {
                  period: 5,
                  annualPercentageRate: 3.0,
                  nextSettlementTime: 1665318377172,
                },
                {
                  period: 10,
                  annualPercentageRate: 4.0,
                  nextSettlementTime: 1668318377172,
                },
              ],
            },
          },
        ],
      });
    },
  },
  {
    path: "/chain/:chainId/category/:categoryId/product/:productId/program/:programId",
    handler: function (req, res) {
      let query = req.query || {};
      return res.json({
        result: {
          token: {
            // pair: ['ETH', 'USDC'],
            pair: [
              {
                name: "ETH",
                // symbol: 'wETH',
                contractAddr: "0x1000000000000000000000000000",
                // isStableCoin: false
              },
              {
                name: "USDC",
                // symbol: 'USDC',
                contractAddr: "0x0000000000000000000000000000",
                // isStableCoin: true
              },
            ],
            exchangeRate: 1200.1, // non-stable to stable coin
          },
          poolStats: {
            totalLockedValue: 50000000,
            totalRewards24H: 100000000,
            annualPercentageRate: 2.0, // 200%
          },

          // DualInvestment specific
          lockPositions: [
            {
              lockPeriod: "1d",
              annualPercentageRate: 2.0, // 200%
              nextSettlementTime: 400000000000000, // UTC seconds since epoch
            },
            {
              lockPeriod: "5d",
              annualPercentageRate: 3.0,
              nextSettlementTime: 400000000000000,
            },
            {
              lockPeriod: "10d",
              annualPercentageRate: 4.0,
              nextSettlementTime: 400000000000000,
            },
          ],
        },
      });
    },
  },
  {
    path: "/chain/97/category/1/product/1/program/1/contract",
    handler: (req, res) => {
      return res.json({
        result: {
          contractAddr: "0xD4d4F819c99504D3Fc9F547c69Ea30C48AEaF3C9",
          contractAbi: {
            name: "myEvent",
            type: "event",
            inputs: [
              {
                type: "uint256",
                name: "myNumber",
              },
              {
                type: "bytes32",
                name: "myBytes",
              },
            ],
          },
        },
      });
    },
  },
];
