import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
    'order/create',
    async (orderData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/learnify/payment/checkout', orderData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data || 'Something went wrong');
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: { order: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {p
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Order creation failed';
            });
    }
});

export default orderSlice.reducer;
