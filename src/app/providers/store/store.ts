import { api } from '@/shared/api'
import { persisterReducer } from '@/shared/lib/config'
import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

export const store = configureStore({
    reducer: persisterReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    'chats/sendMessage/fulfilled'
                ]
            }
        }).concat(api.middleware)
})

export const persistor = persistStore(store)
