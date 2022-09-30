import {defineStore} from "pinia";
import {v4} from 'uuid'
export const usePopupManager = defineStore('popup', {
  state: () => ({ childs: [] }),
  getters: {
    popups: (state) => state.childs,
  },
  actions: {
    addPopup(component,props, events = {}) {
      const self = this
      component.__popid = v4()
      let onClose
      if(events && events.close){
        onClose = events.close
      }
      events.close = () =>{
        onClose && onClose()
        self.removePopup(component)
      }
      this.childs.push({component,props, events})
    },
    removePopup(item){
      let index = -1
      let __popid = item.__popid
      this.childs.forEach( ({component},inx) => {
        if( component.__popid === __popid){
          index = inx
        }
      })
      if(index >=0) {
        this.childs.splice(index, 1)
      }
    }
  },
})
