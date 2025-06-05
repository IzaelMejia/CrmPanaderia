import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { rootReducer, RootState } from "./rootReducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { initMessageListener } from "redux-state-sync";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
});

// initMessageListener(store);
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

