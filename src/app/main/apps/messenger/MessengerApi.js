import { apiService as api } from 'app/store/apiService';
import jsonToFormData from 'src/app/@helpers/jsonToFormData';
import {
  GET_ALL_MESSAGES_BY_SENDER_ID,
  POST_MESSAGES,
  UNREAD_MESSAGES_WITH_ALL_USERS,
} from 'src/app/constant/constants';

export const addTagTypes = [
  'messenger_contacts',
  'messenger_contact',
  'messenger_chats',
  'messenger_chat',
  'messenger_user_profile',
];
const MessengerApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMessengerContacts: build.query({
        query: (userId) => ({
          url: `${UNREAD_MESSAGES_WITH_ALL_USERS}${userId}`,
        }),
        providesTags: ['messenger_contacts'],
      }),
      getMessengerContact: build.query({
        query: (queryArg) => ({
          url: `/mock-api/messenger/contacts/${queryArg}`,
        }),
        providesTags: ['messenger_contact'],
      }),
      updateMessengerContact: build.mutation({
        query: (queryArg) => ({
          url: `/mock-api/messenger/contacts/${queryArg.id}`,
          method: 'PUT',
          data: queryArg,
        }),
        invalidatesTags: ['messenger_contact'],
      }),
      deleteMessengerContact: build.mutation({
        query: (queryArg) => ({
          url: `/mock-api/messenger/contacts/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['messenger_contact'],
      }),
      getMessengerChats: build.query({
        query: () => ({ url: `/mock-api/messenger/chats` }),
        providesTags: ['messenger_chats'],
      }),
      getMessengerChat: build.query({
        query: (queryArg) => ({
          url: `${GET_ALL_MESSAGES_BY_SENDER_ID}${queryArg}`,
        }),
        providesTags: ['messenger_chat'],
      }),
      deleteMessengerChat: build.mutation({
        query: (queryArg) => ({
          url: `/mock-api/messenger/chats/${queryArg}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['messenger_chats'],
      }),
      sendMessengerMessage: build.mutation({
        query: (queryArg) => ({
          url: POST_MESSAGES,
          method: 'POST',
          data: jsonToFormData({
            message: queryArg.message,
            receiver: queryArg.contactId,
            file: queryArg.file,
          }),
        }),
        invalidatesTags: ['messenger_chat', 'messenger_chats'],
      }),

      getMessengerUserProfile: build.query({
        query: () => ({ url: `/mock-api/messenger/profile` }),
        providesTags: ['messenger_user_profile'],
      }),
      updateMessengerUserProfile: build.mutation({
        query: (queryArg) => ({
          url: POST_MESSAGES,
          method: 'PUT',
          data: queryArg,
        }),
        invalidatesTags: ['messenger_user_profile'],
      }),
    }),
    overrideExisting: false,
  });
export default MessengerApi;
export const {
  useGetMessengerContactsQuery,
  useGetMessengerContactQuery,
  useUpdateMessengerContactMutation,
  useDeleteMessengerContactMutation,
  useGetMessengerChatsQuery,
  useGetMessengerChatQuery,
  useDeleteMessengerChatMutation,
  useGetMessengerUserProfileQuery,
  useUpdateMessengerUserProfileMutation,
  useSendMessengerMessageMutation,
} = MessengerApi;
