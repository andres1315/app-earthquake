import { createSlice } from "@reduxjs/toolkit";
import { Earthquake } from "../earthquaketypes";

export interface EarthquakeState{
  earthquakes: Earthquake[]
  pagination:{
    current_page: number,
    total: number,
    per_page: number
  }
}

const initialState:EarthquakeState={
  earthquakes:[],
  pagination:{
    current_page: 1,
    total:0,
    per_page: 10
  }
}

export const earthquakeSlice =  createSlice({
  name:'earthquake',
  initialState,
  reducers:{
    loadEarthquake: (state,{payload})=>{
      state.earthquakes = payload.data
      state.pagination = payload.pagination
    }
  }
})

export const earthquakeReducer = earthquakeSlice.reducer

export const {loadEarthquake} = earthquakeSlice.actions