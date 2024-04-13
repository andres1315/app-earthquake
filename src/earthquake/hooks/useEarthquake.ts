import { EarthquakeApi } from "../../api/earthquakeApi"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { loadEarthquake } from "../slice/earthquakeSlice"

export const useEarthquake = () => {
  const {earthquakes,pagination} =  useAppSelector(state => state.earthquake)
  const dispatch =  useAppDispatch()

  const earthquakeApi =  new EarthquakeApi

  const onLoadEarthquakes =(page:number,per_page:number)=>{
    earthquakeApi
      .get(`/features?page=${page}&per_page=${per_page}`)
      .then((response)=>{
        const {data} =response
        dispatch(loadEarthquake({data:data.data,pagination:data.pagination}))
      })
  }

  return {
    earthquakes,
    pagination,
    onLoadEarthquakes
  }
}
