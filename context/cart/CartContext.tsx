import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';

interface ContextProps{
    cart:ICartProduct[];
    addProductoToCard: (product: ICartProduct) => void;
    updatedCartQuatity: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);