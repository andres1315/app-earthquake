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

  const loadComments=(id:number)=>{
    return earthquakeApi
    .get(`/features/${id}/comments`)
    .then((response)=>{
      const {data} =response
      return data

    })
  }

  const saveNewComment=({id,comment}:{id:number, comment:string})=>{
    const data ={
      body:comment
    }
    return earthquakeApi
    .post(`/features/${id}/comments`,data)
    .then((response)=>{
      return response

    })
  }

  return {
    earthquakes,
    pagination,
    onLoadEarthquakes,
    loadComments,
    saveNewComment
  }
}
