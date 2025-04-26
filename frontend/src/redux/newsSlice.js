import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  newsData: [],
  singleNews : [],
  Analysis: [],
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    addNewsData: (state, action) => {
      state.newsData.push(action.payload)
    },
    setSingleNews : (state,action) => {
        state.singleNews = [];
        state.singleNews.push(action.payload)
    },
    setNewsAnalysis : (state,action) => {
        state.Analysis = [];
        state.Analysis.push(action.payload)
    }
  },
})

export const { addNewsData,setNewsAnalysis,setSingleNews} = newsSlice.actions
export default newsSlice.reducer
