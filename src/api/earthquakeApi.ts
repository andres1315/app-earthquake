import axios from "axios";
const URL_API = 'http://localhost:3000/api'



export const axiosIntance = axios.create({
  baseURL: URL_API,
})

export class EarthquakeApi{
  async get(url:string){
    const {data,status} = await axiosIntance.get(url)
    return {data,status}
  }

  async post(url:string,dataRequest:any){
    const {data,status} = await axiosIntance.post(url,dataRequest)
    return {data,status}
  }
}