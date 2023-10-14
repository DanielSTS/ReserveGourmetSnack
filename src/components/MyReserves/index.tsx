'use client';

import { Button, IconButton, Modal, TextField } from '@mui/material';
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
  const [selectedRow, setSelectedRow] = useState<any>('');
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
      headerName: '',
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
      .put('https://reservegourmetsnackbackend.onrender.com/reservations', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        handleSuccessOpen('Edição confirmada!');
      })
      .catch(error => {
        handleErrorOpen(
          error?.response?.data?.message ?? 'Error ao enviar edição!'
        );
        console.log('error ', error);
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
      .delete('https://reservegourmetsnackbackend.onrender.com/reservations', {
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
        handleErrorOpen(
          error?.response?.data?.message ?? 'Error ao cancelar reserva!'
        );
        console.log('error ', error);
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
      .post('https://reservegourmetsnackbackend.onrender.com/comments', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        handleSuccessOpen('Avaliação enviada!');
      })
      .catch(error => {
        handleErrorOpen(
          error?.response?.data?.message ?? 'Error ao enviar avaliação!'
        );
        console.log('error ', error);
      });
    setOpenReview(false);
  };

  const handleCancelReview = () => {
    setOpenReview(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow m-4">
      <h1 className="text-redMain text-center p-2 text-lg">Minhas Reservas</h1>
      <div className="h-80">
        <DataGrid
          columns={columns}
          rows={reservationsData.length ? reservationsData : []}
          columnVisibilityModel={{
            id: false
          }}
          rowHeight={40}
        />
      </div>

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
          <div className="p-4 bg-white rounded shadow  text-center flex flex-col gap-12">
            <h1 className="text-redMain text-2xl">Editar Reserva</h1>
            <form
              className="flex flex-col gap-6 items-center"
              onSubmit={handleEditConfirm}
            >
              <TextField
                className="w-full"
                label="Quantidade"
                variant="outlined"
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

              <TextField
                className="w-full"
                label="Observações"
                variant="outlined"
                multiline
                rows={4}
                placeholder="Observações"
                value={editedReservation.observation}
                onChange={e =>
                  setEditedReservation(prevState => ({
                    ...prevState,
                    observation: e.target.value
                  }))
                }
              />

              <TextField
                className="w-full"
                label="Data"
                variant="outlined"
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
                    datetime: new Date(e.target.value + 'Z')
                  }))
                }
              />

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
          <div className="p-4 bg-white rounded shadow  text-center flex flex-col gap-8">
            <h1 className="text-redMain text-2xl">Avaliar</h1>
            <form className="flex flex-col gap-6 items-center">
              <TextField
                className="w-full"
                label="Comentário"
                variant="outlined"
                multiline
                rows={4}
                placeholder="Comentário"
                onChange={e => setComment(e.target.value)}
              />
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
