'use client';

import { Button, IconButton, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { useUserInfoContext } from '@/contexts/UserInfoContext';
import axios from 'axios';
import AlertMessage from '../AlertMessage';

export default function MyReserves() {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState('');
  const { reservations: reservationsData } = useUserInfoContext();
  const [openReview, setOpenReview] = useState(false);

  const [comment, setComment] = useState('');

  const [editedReservation, setEditedReservation] = useState({
    id: '',
    name: '',
    datetime: new Date(),
    numPeople: 0,
    observation: ''
  });

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sucessMessage, setSucessMessage] = useState('');
  const handleSuccessOpen = (message: string) => {
    setSucessMessage(message);
    setSuccessOpen(true);
  };
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };
  const handleErrorOpen = (message: string) => {
    setErrorMessage(message);
    setErrorOpen(true);
  };
  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'establishmentName', headerName: 'Estabelecimento', width: 160 },
    { field: 'category', headerName: 'Categoria', width: 130 },
    { field: 'datetime', headerName: 'Horário', width: 200 },
    {
      field: 'numPeople',
      headerName: 'Quantidade',
      width: 100
    },
    {
      field: 'actions',
      headerName: 'Avaliar',
      width: 200,
      renderCell: params => (
        <>
          <IconButton
            aria-label="Editar"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Excluir"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleReviewClick(params.row)}
          >
            Avaliar
          </Button>
        </>
      )
    }
  ];

  function handleEdit(params: any): void {
    setSelectedRow(params);
    const selectedReservation = reservationsData.find(
      reservation => reservation.id === params.id
    )!;
    setEditedReservation({
      id: selectedReservation.id,
      name: selectedReservation.establishmentName,
      datetime: new Date(selectedReservation.datetime),
      numPeople: selectedReservation.numPeople,
      observation: selectedReservation.observation
    });
    setOpenModalEdit(true);
  }

  function handleEditCancel(): void {
    setOpenModalEdit(false);
    setSelectedRow('');
  }

  function handleEditConfirm(event: any): void {
    event.preventDefault();
    const data = {
      id: editedReservation.id,
      datetime: editedReservation.datetime,
      numPeople: editedReservation.numPeople,
      observation: editedReservation.observation
    };
    axios
      .put('http://localhost:3001/reservations', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        handleSuccessOpen('Edição confirmada!');
      })
      .catch(error => {
        console.log('error ', error);
        handleErrorOpen('Error ao enviar edição!');
      });
    setOpenModalEdit(false);
    setSelectedRow('');
  }

  function handleDelete(params: any): void {
    setSelectedRow(params);
    setOpenModalDelete(true);
  }

  function handleDeleteCancel(): void {
    setOpenModalDelete(false);
    setSelectedRow('');
  }

  function handleDeleteConfirm(): void {
    axios
      .delete('http://localhost:3001/reservations', {
        headers: {
          Authorization: localStorage.getItem('token')
        },
        data: {
          id: selectedRow.id
        }
      })
      .then(() => {
        handleSuccessOpen('Reserva cancelada!');
      })
      .catch(error => {
        console.log('error ', error);
        handleErrorOpen('Error ao cancelar reserva!');
      });

    setOpenModalDelete(false);
    setSelectedRow('');
  }

  const handleReviewClick = (params: any) => {
    setSelectedRow(params);
    setOpenReview(true);
  };

  const handleConfirmReview = () => {
    const data = {
      userId: localStorage.getItem('id'),
      establishmentId: selectedRow.establishmentId,
      comment
    };
    axios
      .post('http://localhost:3001/comments', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        handleSuccessOpen('Avaliação enviada!');
      })
      .catch(error => {
        console.log('error ', error);
        handleErrorOpen('Error ao enviar avaliação!');
      });
    setOpenReview(false);
  };

  const handleCancelReview = () => {
    setOpenReview(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow m-4">
      <h1 className="text-redMain text-center p-2 text-lg">Minhas Reservas</h1>
      <DataGrid
        columns={columns}
        rows={reservationsData.length ? reservationsData : []}
        columnVisibilityModel={{
          id: false
        }}
        rowHeight={40}
      />

      <Modal open={openModalDelete} onClose={() => setOpenModalDelete(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 bg-white rounded shadow  text-center flex flex-col gap-24">
            <h1 className="text-redMain text-2xl">Cancelar Reserva</h1>
            <p className="text-redMain">Confirmar cancelamento de reserva?</p>
            <div className="flex justify-between gap-6">
              <button
                onClick={handleDeleteCancel}
                className="border-2 border-zinc-400 bg-white text-zinc-400 font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="border-2 border-white bg-redMain text-white font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={openModalEdit} onClose={() => setOpenModalEdit(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 bg-white rounded shadow  text-center flex flex-col gap-24">
            <h1 className="text-redMain text-2xl">Editar Reserva</h1>
            <form
              className="flex flex-col gap-6 items-center"
              onSubmit={handleEditConfirm}
            >
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="quantity"
                  type="number"
                  placeholder="Quantidade"
                  value={editedReservation.numPeople}
                  onChange={e =>
                    setEditedReservation(prevState => ({
                      ...prevState,
                      numPeople: parseInt(e.target.value, 10)
                    }))
                  }
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notes"
                  type="text"
                  placeholder="Observações"
                  value={editedReservation.observation}
                  onChange={e =>
                    setEditedReservation(prevState => ({
                      ...prevState,
                      observation: e.target.value
                    }))
                  }
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="calendar"
                  type="datetime-local"
                  placeholder="Data"
                  value={
                    editedReservation.datetime instanceof Date
                      ? editedReservation.datetime.toISOString().slice(0, 16)
                      : ''
                  }
                  onChange={e =>
                    setEditedReservation(prevState => ({
                      ...prevState,
                      datetime: new Date(e.target.value)
                    }))
                  }
                />
              </div>
              <div className="flex justify-between gap-6">
                <button
                  onClick={handleEditCancel}
                  className="border-2 border-zinc-400 bg-white text-zinc-400 font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="border-2 border-white bg-redMain text-white font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal open={openReview} onClose={() => setOpenReview(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 bg-white rounded shadow  text-center flex flex-col gap-24">
            <h1 className="text-redMain text-2xl">Avaliar</h1>
            <form className="flex flex-col gap-6 items-center">
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notes"
                  type="text"
                  placeholder="Comentário"
                  onChange={e => setComment(e.target.value)}
                />
              </div>
            </form>
            <div className="flex justify-between gap-6">
              <button
                onClick={handleCancelReview}
                className="border-2 border-zinc-400 bg-white text-zinc-400 font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmReview}
                className="border-2 border-white bg-redMain text-white font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <AlertMessage
        open={successOpen}
        severity="success"
        message={sucessMessage}
        onClose={handleSuccessClose}
      />
      <AlertMessage
        open={errorOpen}
        severity="error"
        message={errorMessage}
        onClose={handleErrorClose}
      />
    </div>
  );
}
