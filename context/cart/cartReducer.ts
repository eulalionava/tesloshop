import { ICartProduct } from '../../interfaces';
import { CartState } from './';

type CartActionType = 
    | { type:'[Cart] - Loadcart from cokies | storage',payload:ICartProduct[]}
    | { type:'[Cart] - add product',payload:ICartProduct}

export const cartReducer = (state:CartState,action:CartActionType):CartState=>{
    switch(action.type){
        case '[Cart] - Loadcart from cokies | storage':
            return{
               ...state,
            }
        default:
          return state
    }
}