import { chatReducer } from "@/entities/ai/model"
import { api } from "@/shared/api"
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: 'root322',
    storage
}

const initialReducers = {
    [api.reducerPath]: api.reducer,
    chatReducer
}

const rootReducer = combineReducers(initialReducers)

export const persisterReducer = persistReducer(
    persistConfig,
    rootReducer
)