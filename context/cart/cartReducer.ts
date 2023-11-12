import { ICartProduct } from '../../interfaces';
import { CartState } from './';

type CartActionType = 
    | { type:'[Cart] - Loadcart from cokies | storage',payload:ICartProduct[]}
    | { type:'[Cart] - update products in cart',payload:ICartProduct[]}
    | { type:'[Cart] - change cart quantity',payload:ICartProduct}

export const cartReducer = (state:CartState,action:CartActionType):CartState=>{
    switch(action.type){
        case '[Cart] - Loadcart from cokies | storage':
            return{
               ...state,
               cart:[...action.payload]
            }
        case '[Cart] - update products in cart':
            return{
                ...state,
                cart:[...action.payload]
            }
        case '[Cart] - change cart quantity':
            return{
                ...state,
                cart:state.cart.map(product=>{
                    if(product._id !== action.payload._id) return product
                    if(product.size !== action.payload.size) return product

                    return action.payload;
                })
            }
        default:
          return state
    }
}