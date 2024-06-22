import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  news: null,
}
 

export const newsDetail = createSlice({
    name: 'news',
  initialState,
  reducers: {
    setnewsData: (state,action) => {
        state.news=action.payload;
// console.log('data store in redux',action.payload);
     },
     setnewsredirect: (state,action) => {
      state.newss=action.payload;
// console.log('data store in redux',action.payload);
   },
    }
})

 export const { setnewsData,setnewsredirect} = newsDetail.actions

export default newsDetail.reducer