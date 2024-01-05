import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice(
    { 
        name: 'favorites', 
        initialState: [], 
        reducers: {
            toggleFavorite: (favorites, actions) => {
                if (favorites.includes(actions.payload))
                    return favorites.filter(
                        (favorite) => favorite !== actions.payload
                ); else {
                    favorites.push(actions.payload);
                }
            } 
        }
    }
)

export const { toggleFavorite } = favoriteSlice.actions;
export const favoritesReducer = favoriteSlice.reducer;