import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredUsers = createSelector(
  (state) => state.users.data,
  (state) => state.users.searchTerm,
  (data, searchTerm) => {
    if (!searchTerm) return data;
    return data.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);
