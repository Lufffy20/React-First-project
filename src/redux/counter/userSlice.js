import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        // CREATE
        addUser: (state, action) => {
            state.users.push(action.payload);
        },

        // DELETE
        deleteUser: (state, action) => {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        },

        // UPDATE
        updateUser: (state, action) => {
            const { id, updatedData } = action.payload;

            const index = state.users.findIndex(
                (user) => user.id === id
            );

            if (index !== -1) {
                state.users[index] = {
                    ...state.users[index],
                    ...updatedData,
                };
            }
        },
    },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
