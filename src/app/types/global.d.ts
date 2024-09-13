declare type RootState = ReturnType<typeof import('../providers/index').store.getState>
declare type AppDispatch = typeof import('../providers/index').store.dispatch