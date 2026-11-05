import { configureStore } from "@reduxjs/toolkit";
import inventryReducer from "../Features/InventerySlice";

const store = configureStore({
    reducer: {
        inventory: inventryReducer,
    },
});

export default store;