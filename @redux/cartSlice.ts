import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { TItem } from '../@types/item-types';

// Define a type for the slice state
type Item = TItem;

interface CartState {
    items: any[];
    item: any;
    isLoading: boolean;
    subtotal: number;
    grandTotal: number;
}

// Define the initial state using that type
const initialState: CartState = {
    items: [],
    item: {},
    isLoading: false,
    subtotal: 0,
    grandTotal: 0, //this will be set when user click "check out" button in CartScreen
};

export const cartSlice = createSlice({
    name: 'cart',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addItem: (state, { payload }) => {
            // add new item
            const target = state.items.findIndex(
                (item) => item._id == payload._id
            );

            if (target != -1) {
                state.items[target].quantity = state.items[target].quantity + 1;

                // calculate new subtotal and
                const newSubtotal = state.items.reduce((acc, cur, i) => {
                    const qtyXprice = cur.price * cur.quantity;
                    return acc + qtyXprice;
                }, 0);

                state.subtotal = newSubtotal;

                return;
            }

            // set states
            state.items = [...state.items, payload];

            // calculate new subtotal and
            const newSubtotal = state.items.reduce((acc, cur, i) => {
                const qtyXprice = cur.price * cur.quantity;
                return acc + qtyXprice;
            }, 0);

            state.subtotal = newSubtotal;
        },
        amendItem: (state, { payload }) => {
            const { itemId, type } = payload;

            const target = state.items.findIndex((item) => item._id == itemId);

            if (type == 'increase' && target != -1) {
                state.items[target].quantity = state.items[target].quantity + 1;

                // calculate new subtotal and
                const newSubtotal = state.items.reduce((acc, cur, i) => {
                    const qtyXprice = cur.price * cur.quantity;
                    return acc + qtyXprice;
                }, 0);

                state.subtotal = newSubtotal;

                return;
            } else if (type == 'decrease' && target != -1) {
                state.items[target].quantity = state.items[target].quantity - 1;

                // calculate new subtotal and
                const newSubtotal = state.items.reduce((acc, cur, i) => {
                    const qtyXprice = cur.price * cur.quantity;
                    return acc + qtyXprice;
                }, 0);

                state.subtotal = newSubtotal;

                return;
            }
        },
        addGrandTotal: (state, { payload }) => {
            state.grandTotal = payload;
        },
        removeItem: (state, { payload }) => {
            const newItems = [...state.items].filter((i) => i._id != payload);

            // calculate new subtotal and
            const newSubtotal = newItems.reduce((acc, cur, i) => {
                const qtyXprice = cur.price * cur.quantity;
                return acc + qtyXprice;
            }, 0);

            state.items = newItems;
            state.subtotal = newSubtotal;
        },
        clear: (state) => {
            state.items = [];
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
});

export const { addItem, removeItem, clear, amendItem, addGrandTotal } =
    cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default cartSlice.reducer;
