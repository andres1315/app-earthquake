import { Pagination } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";

interface Props{
  qtyPerPage:number,
  totalList:number,
  currentPage:number,
  setCurrentPage:Dispatch<SetStateAction<number>>
}

export function PaginationTable({qtyPerPage,totalList, currentPage,setCurrentPage}:Props) {
  
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalList/qtyPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPageChange = (page:number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination currentPage={currentPage} totalPages={pageNumbers.length} onPageChange={onPageChange} showIcons nextLabel='' previousLabel='' />
    </div>
  );
}