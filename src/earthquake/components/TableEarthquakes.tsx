import { Label, Table, TextInput } from "flowbite-react";
import { useEarthquake } from "../hooks/useEarthquake";
import { Earthquake } from "../earthquaketypes";
import { PaginationTable } from "./PaginationTable";
import { useEffect, useState } from "react";
import { CustomModal } from "./ModalComments";
import Swal from "sweetalert2";

export const TableEarthquakes = () => {
  const { earthquakes,onLoadEarthquakes,pagination,loadComments,saveNewComment,onChangePerPage } = useEarthquake();
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsDisplay,setCommentsDisplay] = useState([])

  const [newComment,setNewComment] =useState({
    id:0,
    comment:''
  })

  const [modalShow, setModalShow] = useState(false);
  const [modalCreateComment, setModalCreateComment] = useState(false);
  useEffect(()=>{
    onLoadEarthquakes(currentPage,pagination.per_page)
  },[currentPage])

  const onShowComment = (id:number)=>{
    loadComments(id)
      .then(res=>{
        setCommentsDisplay(res)
        setModalShow(true)
      })
  }

  const onChangeQtyView = (value:string)=>{
    onChangePerPage(value)
    onLoadEarthquakes(currentPage,Number(value))
  }

  const onCreateNewComment = (id:number)=>{
    setNewComment({id,comment:''})
    setModalCreateComment(true)
  }

  const onSaveNewComment = ()=>{

    if(!newComment.comment) return Swal.fire('Atencion','El comentario debe contener algun texto','warning')
    saveNewComment({id:newComment.id,comment:newComment.comment})
      .then(response=>{
        const{status} =response
        if(status==201){
          setNewComment({id:0,comment:''})
          setModalCreateComment(false)

          Swal.fire('Atencion','Comentario almacenado','success')
        }
      })
      .catch((e)=>{
        Swal.fire('Atencion','Ocurrio un error almacenando el comentario','warning')
        console.log(e)
      })
  }
  return (
    <>
      <div>
        <label htmlFor="views" className="block text-sm font-medium leading-6 text-gray-900">Cantidad por pagina</label>
        <select name="views" id="views" className="mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" defaultValue={pagination.per_page} onChange={(e)=>onChangeQtyView(e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    <div className="overflow-x-auto h-[calc(100vh-8rem)]">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>External Id</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Magnitud</Table.HeadCell>
          <Table.HeadCell>Lugar</Table.HeadCell>
          <Table.HeadCell>Hora</Table.HeadCell>
          <Table.HeadCell>Tsunami</Table.HeadCell>
          <Table.HeadCell>Nivel Magnitud</Table.HeadCell>
          <Table.HeadCell>Coordenadas</Table.HeadCell>
          <Table.HeadCell>
           Comentarios
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {earthquakes.map((earthquakes: Earthquake) => {
            const dateToTime = new Date(earthquakes.attributes.time).toLocaleDateString('es')
            return (
              
                <Table.Row
                  key={earthquakes.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {earthquakes.attributes.external_id}
                  </Table.Cell>
                  <Table.Cell>{earthquakes.attributes.title}</Table.Cell>
                  <Table.Cell>{earthquakes.attributes.magnitude}</Table.Cell>
                  <Table.Cell>{earthquakes.attributes.place}</Table.Cell>
                  <Table.Cell>{dateToTime}</Table.Cell>
                  <Table.Cell>{earthquakes.attributes.tsunami ? 'SI':'NO'}</Table.Cell>
                  <Table.Cell>{earthquakes.attributes.mag_type}</Table.Cell>
                  <Table.Cell>
                    Coordenadas Latitud:{" "}
                    {earthquakes.attributes.coordinates.latitude} / longitud:{" "}
                    {earthquakes.attributes.coordinates.longitude}
                  </Table.Cell>

                  <Table.Cell className='flex justify-between'>
                    <button
                      className="font-medium text-cyan-600 hover:underline hover:bg-cyan-500 hover:text-white bg-gray-200 rounded-md px-2"
                      onClick={()=>onShowComment(earthquakes.id)}
                    >
                      Ver
                    </button>
                    <button
                      className="font-medium text-cyan-600 hover:underline hover:bg-cyan-500 hover:text-white bg-gray-200 rounded-md px-2"
                      onClick={()=>onCreateNewComment(earthquakes.id)}
                    >
                      Crear
                    </button>
                  </Table.Cell>
                </Table.Row>
              
            );
          })}
        </Table.Body>
      </Table>

    </div>
    <PaginationTable qtyPerPage={itemsPerPage} totalList={pagination.total} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    <CustomModal
        title="Comentarios"
        openModal={modalShow}
        size="5xl"
        openModalHandler={setModalShow}
      >
        <>
            <ol>
              {commentsDisplay.length==0
                ? 'Sin cometarios almacenados'
                : commentsDisplay.map((comment:{id:number,body:string},key)=>(<li key={comment.id}>{key+1}) {comment.body}</li>) )
              }
              
            </ol>
        </>
      </CustomModal>
      <CustomModal
        title="Crear Comentario"
        openModal={modalCreateComment}
        size="5xl"
        openModalHandler={setModalCreateComment}
      >
        <>
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Comentario" />
          </div>
          <TextInput id="comment" type="text" placeholder="..." required value={newComment.comment} onChange={(e)=>setNewComment(prevState=>({...prevState,comment:e.target.value}))}/>
          <div className="flex  justify-center w-full mt-2">
            <button className='  bg-blue-500 text-white px-2  w-2/4  rounded-md' onClick={onSaveNewComment}>Guardar</button>
          </div>
        </>
      </CustomModal>
    </>
  );
};
