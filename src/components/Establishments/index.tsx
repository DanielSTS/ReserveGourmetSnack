'use client';
import {
  ReviewDto,
  useEstablishmentsContext
} from '@/contexts/EstablishmentsContext';
import { Button, MenuItem, Modal, Select, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import axios from 'axios';
import AlertMessage from '../AlertMessage';

export default function Establishments() {
  const [openNewReservation, setOpenNewReservation] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openReviewHistory, setOpenReviewHistory] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>('');
  const establishmentsData = useEstablishmentsContext();

  const [datetime, setDatetime] = useState(new Date());
  const [numPeople, setNumPeople] = useState(0);
  const [observation, setObservation] = useState('');

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

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

  const handleReserveClick = (params: any) => {
    setSelectedRow(params);
    setOpenNewReservation(true);
  };

  const handleConfirmReserve = () => {
    const data = {
      userId: localStorage.getItem('id'),
      establishmentId: selectedRow.id,
      datetime,
      numPeople,
      observation
    };
    axios
      .post('https://reservegourmetsnackbackend.onrender.com/reservations', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        handleSuccessOpen('Reserva confirmada!');
      })
      .catch(error => {
        handleErrorOpen(
          error?.response?.data?.message ?? 'Erro ao efetuar reserva!'
        );
        console.log('error ', error);
      });
    setOpenNewReservation(false);
    setSelectedRow('');
  };

  const handleCancelReserve = () => {
    setOpenNewReservation(false);
    setSelectedRow('');
  };

  const handleReviewClick = (params: any) => {
    setSelectedRow(params);
    setOpenReview(true);
  };

  const handleReviewHistoryClick = (params: any) => {
    setSelectedRow(params);
    setOpenReviewHistory(true);
  };

  const handleConfirmReview = () => {
    const data = {
      userId: localStorage.getItem('id'),
      establishmentId: selectedRow.id,
      rating,
      comment
    };
    axios
      .post('https://reservegourmetsnackbackend.onrender.com/reviews', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        handleSuccessOpen('Avaliação enviada!');
      })
      .catch(error => {
        console.log('error ', error);
        handleErrorOpen(
          error?.response?.data?.message ?? 'Erro ao enviar avaliação!'
        );
      });
    setOpenReview(false);
  };

  const handleCancelReview = () => {
    setOpenReview(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Nome', width: 200 },
    { field: 'category', headerName: 'Categoria', width: 200 },
    { field: 'address', headerName: 'Localização', width: 200 },
    {
      field: 'state',
      headerName: 'Aberto',
      width: 200,
      valueGetter: params => (params.row.enabled ? 'ativo' : 'inativo')
    },
    {
      field: 'hour',
      headerName: 'Horário de Funcionamento',
      width: 300,
      valueGetter: params =>
        new Date(params.row.openingHoursStart).toLocaleTimeString() +
        ' - ' +
        new Date(params.row.openingHoursEnd).toLocaleTimeString()
    },
    {
      field: 'reserve',
      headerName: 'Reservar',
      width: 150,
      renderCell: params => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReserveClick(params.row)}
        >
          Reservar
        </Button>
      )
    },
    {
      field: 'review',
      headerName: 'Avaliar',
      width: 150,
      renderCell: params => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReviewClick(params.row)}
        >
          Avaliar
        </Button>
      )
    },

    {
      field: 'actions',
      headerName: 'Avaliações',
      width: 150,
      renderCell: params => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReviewHistoryClick(params.row)}
        >
          Avaliações
        </Button>
      )
    }
  ];

  return (
    <div className="p-4 bg-white rounded shadow mx-4">
      <h1 className="text-redMain text-center p-2 text-lg">Estabelecimentos</h1>
      <div className="h-96">
        <DataGrid
          columns={columns}
          rows={establishmentsData}
          rowHeight={40}
          columnVisibilityModel={{
            id: false
          }}
        />
      </div>

      <Modal
        open={openNewReservation}
        onClose={() => setOpenNewReservation(false)}
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 bg-white rounded shadow  text-center flex flex-col gap-12">
            <h1 className="text-redMain text-2xl">Criar Reserva</h1>
            <form className="flex flex-col gap-6 items-center">
              <TextField
                className="w-full"
                label="Quantidade"
                variant="outlined"
                type="number"
                placeholder="Quantidade"
                onChange={e => setNumPeople(parseInt(e.target.value, 10))}
              />

              <TextField
                className="w-full"
                label="Observações"
                variant="outlined"
                multiline
                rows={4}
                placeholder="Observações"
                onChange={e => setObservation(e.target.value)}
              />

              <TextField
                className="w-full"
                label="Data"
                variant="outlined"
                type="datetime-local"
                placeholder="Data"
                onChange={e => setDatetime(new Date(e.target.value))}
              />
            </form>
            <div className="flex justify-between gap-6">
              <button
                onClick={handleCancelReserve}
                className="border-2 border-zinc-400 bg-white text-zinc-400 font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmReserve}
                className="border-2 border-white bg-redMain text-white font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={openReview} onClose={() => setOpenReview(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 bg-white rounded shadow  text-center flex flex-col gap-12">
            <h1 className="text-redMain text-2xl">Avaliar</h1>
            <form className="flex flex-col gap-6 items-center">
              <Select
                className="w-full text-left"
                variant="outlined"
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>

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

      <Modal
        open={openReviewHistory}
        onClose={() => setOpenReviewHistory(false)}
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 bg-white rounded shadow text-center flex flex-col gap-12">
            <h1 className="text-redMain text-2xl">Avaliações</h1>
            <div className="flex gap-4">
              <div className="overflow-y-auto max-h-56">
                {selectedRow?.reviews?.map(
                  (review: ReviewDto, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-300 p-2 m-4 rounded text-zinc-600 flex gap-2"
                    >
                      <h2 className="font-bold">{review.rating}</h2>
                      <p>{review.comment}</p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex justify-between gap-6">
              <button
                onClick={() => setOpenReviewHistory(false)}
                className="border-2 border-zinc-400 bg-white text-zinc-400 font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              >
                Sair
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
