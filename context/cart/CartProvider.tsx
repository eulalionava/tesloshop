import { useEffect, useReducer } from 'react';
import { CartContext,cartReducer } from './'
import { ICartProduct } from '../../interfaces';
import { ProductCard } from '../../components/products';

import Cookie from 'js-cookie';

export interface CartState {
  cart:ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const CART_INITIAL_STATE:CartState = {
  cart:[],
  numberOfItems:0,
  subTotal:0,
  tax:0,
  total:0
}

export const CartProvider= ({children})=>{

   const[state,dispatch] = useReducer(cartReducer,CART_INITIAL_STATE);

   useEffect(()=>{
    try{
      const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')! ) :[]
      dispatch({ type:'[Cart] - Loadcart from cokies | storage',payload:cookieProducts });
      
    }catch(error){

      dispatch({ type:'[Cart] - Loadcart from cokies | storage',payload:[] });
    }

   },[]);

   useEffect(()=>{
      Cookie.set('cart',JSON.stringify(state.cart));
   },[state.cart]);

  useEffect(()=>{
    const numberOfItems = state.cart.reduce((prev,current) => current.quantity + prev, 0);
    const subTotal = state.cart.reduce((prev,current) => current.price + prev, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax:subTotal* taxRate,
      total:subTotal *(taxRate + 1)
    }
    
    dispatch({type:'[Cart] - update order summary',payload:orderSummary});

  },[state.cart]);


   const addProductoToCard = (product:ICartProduct)=>{
    //! nivel 1
      // dispatch({type:'[Cart] - add product',payload:product});

    //! nivel 2
      // const productsInCart = state.cart.filter(p => p._id !== product._id && p.size !== product.size);
      // dispatch({type:'[Cart] - add product',payload:[...productsInCart,product]})
    //! nivel 3
    const productInCart = state.cart.some(p => p._id == product._id);
    if(!productInCart) return dispatch({type:'[Cart] - update products in cart',payload:[...state.cart,product]})
    
    const productInCartButDiferentSize = state.cart.some( p => p._id === product._id && p.size === product.size);
    if(!productInCartButDiferentSize) return dispatch({type:'[Cart] - update products in cart',payload:[...state.cart,product]});

    const updatedProducts = state.cart.map(p=>{
      if(p._id !== product._id ) return p
      if(p.size !== product.size ) return p

      p.quantity += p.quantity;
      return p;
    })

    dispatch({type:'[Cart] - update products in cart',payload:updatedProducts});

   }

   const updatedCartQuatity = (product:ICartProduct)=>{
    dispatch({type:'[Cart] - change cart quantity',payload:product});
   }

   return(
       <CartContext.Provider value={{
           ...state,
           addProductoToCard,
           updatedCartQuatity
       }}>
          { children }
       </CartContext.Provider>
   )
}