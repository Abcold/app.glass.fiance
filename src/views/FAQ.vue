<template>
    <div class="main faq">
      <div class="section">
        <div class="title">
          What is FinX Protocol?
        </div>
        <div class="content">
          The FinX Protocol is a decentralized asset management protocol to provide users with one-stop, integrated, and innovative financial products and services, and to create high-yield financial derivatives in a simple and flexible way. The FinX Protocol leverages advanced technologies to provide DeFi investors a variety of financial products, including products on leading centralized exchanges and decentralized platforms, such as fixed income, lending, dual currency, V2 and V3 liquidity pools, market-neutral vaults, structured products, etc.
        <br/>
          <br/>
          The FinX Protocol and the FinX Interface were developed by FinX Technology.
        </div>
        <div class="content-space"></div>
      </div>

      <div class="section">
        <div class="title">
          How do I use the FinX Protocol?
        </div>
        <div class="content">
          To purchase a new product, head over to the FinX Interface and connect a Web3 wallet. Remember, each transaction on Ethereum costs Ether (ETH). If you are a developer interested in building on top of the FinX Protocol, please refer to our extensive docs.
        </div>
        <div class="content-space"></div>
      </div>

      <div class="section">
        <div class="title">
          How does FinX Protocol work?
        </div>
        <div class="content">
          FinX is a DeFi platform for financial products. It is a collection of smart contracts that realize popular financial products such as dual currency, covered call, and liquidity mining in a decentralized manner. There is no third-party custody. The logic behind our strategy and the source of our income are transparent. For a more in-depth description, check out our <a>whitepaper</a>.
        </div>
        <div class="content-space"></div>

        <div class="section">
          <div class="title">
            How to contact us?
          </div>
          <div class="content">
            Please contact us via twitter at: <a>twitter</a>
          </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  components:{

  },
  name: "FAQ"
}
</script>

<style scoped lang="scss">
.faq {
  margin-top: 64px;
}
.section {
  display: grid;
  grid-auto-rows: auto;
  row-gap: 12px;
  line-height: 24px;
  .title {
    font-weight: 400;
    font-size: 24px;
    margin: 0px;
  }
  .content {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
  }
  .content-space {
    border-top: 1px solid rgba(255, 255, 255, 0.24);
    margin: 32px 0px;
    width: 100%;
  }
}
</style>
