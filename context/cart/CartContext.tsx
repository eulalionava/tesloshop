import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';

interface ContextProps{
    cart:ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    
    addProductoToCard: (product: ICartProduct) => void;
    updatedCartQuatity: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);