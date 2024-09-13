import { createSelector } from "@reduxjs/toolkit"
import { IChatType } from ".."

const selectAllChats = (state: RootState) => state.chatReducer.list
const selectChatType = (_state: RootState, chatType: IChatType) => chatType

export const selectChatsByType = createSelector(
    [selectAllChats, selectChatType],
    (list, chatType) => list.filter(chat => chat.type === chatType)
)

export const selectActiveChatByType = createSelector(
    [selectAllChats, selectChatType],
    (list, chatType) => list.find(chat => chat.type === chatType && chat.isActive === true)
)