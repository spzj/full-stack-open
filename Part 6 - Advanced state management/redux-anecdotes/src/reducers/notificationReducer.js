import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

let prevTimeout = null;

export const createNotification = (message, timeoutDuration = 5000) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    if (prevTimeout) {
      clearTimeout(prevTimeout);
    }

    prevTimeout = setTimeout(
      () => dispatch(setNotification('')),
      timeoutDuration
    );
  };
};

export default notificationSlice.reducer;
