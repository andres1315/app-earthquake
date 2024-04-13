import { Table } from "flowbite-react";
import { useEarthquake } from "../hooks/useEarthquake";
import { Earthquake } from "../earthquaketypes";
import { PaginationTable } from "./PaginationTable";
import { useEffect, useState } from "react";

export const TableEarthquakes = () => {
  const { earthquakes,onLoadEarthquakes,pagination } = useEarthquake();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    onLoadEarthquakes(currentPage,itemsPerPage)
  },[currentPage])
  /* const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage; */
  return (
    <div className="overflow-x-auto">
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
                  <Table.Cell>{earthquakes.attributes.time}</Table.Cell>
                  <Table.Cell>{earthquakes.attributes.tsunami ? 'SI':'NO'}</Table.Cell>
                  <Table.Cell>{earthquakes.attributes.mag_type}</Table.Cell>
                  <Table.Cell>
                    Coordenadas Latitud:{" "}
                    {earthquakes.attributes.coordinates.latitude} / longitud:{" "}
                    {earthquakes.attributes.coordinates.longitude}
                  </Table.Cell>

                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Ver
                    </a>
                  </Table.Cell>
                </Table.Row>
              
            );
          })}
        </Table.Body>
      </Table>
      <PaginationTable qtyPerPage={itemsPerPage} totalList={pagination.total} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

    </div>
  );
};
