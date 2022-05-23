import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import { FETCH_API_URL, PAGE_SIZE } from '../constants';
import { Item, Status } from '../types';

export interface ItemState {
  items: Item[];
  paginatedItems: Item[];
  status: Status
}

const initialState: ItemState = {
  items: [],
  paginatedItems: [],
  status: Status.Success,
};

// paginate items by page and pageSize
const paginateItems = (items: Item[], page: number, pageSize: number): Item[] => {
    return items.slice((page - 1) * pageSize, page * pageSize);
}

// fetching items from API
export const getItemsFromAPI = createAsyncThunk(
  'items/getItems',
  async (): Promise<Item[]> => {
    const response = await axios.get<Item[]>(FETCH_API_URL)
    return response.data;
  }
);

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    paginate: (state, action) => {
        const {page, pageSize = PAGE_SIZE} = action.payload
        state.paginatedItems = paginateItems(state.items, page, pageSize)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemsFromAPI.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getItemsFromAPI.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.items = action.payload;
        state.paginatedItems = paginateItems(action.payload, 1, 50)
      })
      .addCase(getItemsFromAPI.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export const { paginate } = itemSlice.actions;

export const getItems = (state: RootState): Item[] => state.items.items;
export const getPaginatedItems = (state: RootState): Item[] => state.items.paginatedItems;
export const getStatus = (state: RootState): Status => state.items.status


export default itemSlice.reducer;
