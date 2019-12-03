import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        session:'',
        sees:{
            NMSL:"hhh"
        },
        sonName:'广告列表',
        Medium:{

        }
    },
    mutations:{
        saveSession(state,session){
            state.session=session
        },
        someNameUpdata(state,addSonName){
            state.sonName=addSonName
        },
        commitMedium(state,Medium){
            state.Medium=Medium
        }
    },
    actions:{
        
    }
})