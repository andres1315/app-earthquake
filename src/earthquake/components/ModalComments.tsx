import { Button, Modal } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';

interface Props{
  title:string,
  children:JSX.Element,
  openModalHandler: Dispatch<SetStateAction<boolean>>
  openModal:boolean,
  size:string
}

export  function CustomModal({title='',children, openModalHandler, openModal, size='2xl'}:Props) {



  return (
    <>
     
      <Modal  show={openModal === true} size={size} onClose={() => openModalHandler(false)} className='animate-slide-in-bottom'>
        <Modal.Header className='py-2'>{title}</Modal.Header>
        <Modal.Body>
         {children}
        </Modal.Body>
        <Modal.Footer className='py-2'>
          <Button color="gray" size='xs'  onClick={() => openModalHandler(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}