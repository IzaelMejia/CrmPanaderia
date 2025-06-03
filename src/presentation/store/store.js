import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { rootReducer } from "./rootReducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initMessageListener } from "redux-state-sync";
import { thunk } from "redux-thunk";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(thunk),
});

initMessageListener(store);
export const persistor = persistStore(store);
