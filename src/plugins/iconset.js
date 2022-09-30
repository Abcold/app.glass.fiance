import { h } from 'vue'
import arbitrum from '../assets/svg/arbitrum_logo.svg'
import coinbase from '../assets/svg/Coinbase.svg'
import wallet from '../assets/svg/WalletConnect.svg'
import ethereum from '../assets/svg/ethereum-eth.svg'
import metamask from '../assets/svg/Metamask.svg'
import optimism from '../assets/svg/optimism.svg'
import home from '../assets/svg/home.svg'
import earn from '../assets/svg/earn.svg'
import vault from '../assets/svg/vault.svg'
import xnft from '../assets/svg/xnft.svg'
import farm from '../assets/svg/farm.svg'
import more from '../assets/svg/more.svg'
import arrowDown from '../assets/svg/arrow-down.svg'


const aliases = {
  arbitrum,
  coinbase,
  wallet,
  ethereum,
  metamask,
  optimism,
  home,
  earn,
  vault,
  xnft,
  farm,
  more,
  arrowDown
}
const custom = {
  component: (props) =>{
    let file =  aliases[props.icon]
    if(file) {
      return h('img', {...props, src: file})
    }
    else {
      return
    }
  },
}

export { aliases, custom }
