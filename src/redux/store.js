import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
import authReducer from "./authSlice";

const persistConfig = {
  key: "auth",
  storage:storageSession,
};

const persistedReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

 const persistor = persistStore(store);
export  {store , persistor }
