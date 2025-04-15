import  {configureStore} from "@reduxjs/toolkit"


const store =  configureStore({
    reducer:{
        patient: '',
        docotr: '',
        admin: '',
    }
})


export default store;