import { chatReducer } from "@/entities/chat/model"
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: 'root228',
    storage
}

const initialReducers = {
    chatReducer
}

const rootReducer = combineReducers(initialReducers)

export const persisterReducer = persistReducer(
    persistConfig,
    rootReducer
)