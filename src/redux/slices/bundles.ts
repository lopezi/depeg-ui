import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BundleData } from '../../backend/bundle_data';

export interface BundlesState {
    bundles: BundleData[];
    isLoadingBundles: boolean;
}

const initialState: BundlesState = {
    bundles: [],
    isLoadingBundles: false,
}

export const bundlesSlice = createSlice({
    name: 'bundles',
    initialState,
    reducers: {
        addBundle: (state, action: PayloadAction<BundleData>) => {
            const hasBundle = state.bundles.find((bundle) => bundle.id === action.payload.id) !== undefined;
            if (!hasBundle) {
                state.bundles.push(action.payload);
            }
        },
        reset: (state) => {
            state.bundles = [];
        },
        startLoading: (state) => {
            state.isLoadingBundles = true;
        },
        finishLoading: (state) => {
            state.isLoadingBundles = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { 
    addBundle, reset, 
    startLoading, finishLoading,
} = bundlesSlice.actions;

export default bundlesSlice.reducer;
