import { configureStore, combineReducers } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import authReducer from "./slices/authSlice";

import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔹 Combine reducers
const rootReducer = combineReducers({
  form: formReducer,   // ❌ not persisted
  auth: authReducer,   // ✅ persisted
});

// 🔹 Persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"], // only auth persist
};

// 🔹 Wrap reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 🔹 Persistor
export const persistor = persistStore(store);