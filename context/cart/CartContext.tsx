import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';
import { ShippingAddress } from './';

interface ContextProps{
    isLoaded:boolean,
    cart:ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?:ShippingAddress
    
    addProductoToCard: (product: ICartProduct) => void;
    updatedCartQuatity: (product: ICartProduct) => void;
    updateAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);