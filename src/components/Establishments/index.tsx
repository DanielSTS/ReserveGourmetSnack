'use client';
import { useEstablishmentsContext } from '@/contexts/EstablishmentsContext';
import { Button, Modal } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import axios from 'axios';
import AlertMessage from '../AlertMessage';

export default function Establishments() {
  const [openNewReservation, setOpenNewReservation] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [selectedRow, setSelectedRow] = useState('');
  const establishmentsData = useEstablishmentsContext();

  const [datetime, setDatetime] = useState(new Date());
  const [numPeople, setNumPeople] = useState(0);
  const [observation, setObservation] = useState('');

  const [rate, setRate] = useState(5);
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
    setSelectedRow(params.row);
    setOpenNewReservation(true);
  };

  const handleConfirmReserve = () => {
    const data = {
      userId: localStorage.getItem('id'),
      establishmentId: selectedRow,
      datetime: datetime,
      numPeople: numPeople,
      observation: observation
    };
    axios
      .post('http://localhost:3001/reservations', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        handleSuccessOpen('Reserva confirmada!')
      })
      .catch(error => {
        console.log('error ', error);
        handleErrorOpen('Erro ao efetuar reserva!')
      });
    setOpenNewReservation(false);
    setSelectedRow('');
  };

  const handleCancelReserve = () => {
    setOpenNewReservation(false);
    setSelectedRow('');
  };

  const handleReviewClick = (params: any) => {
    setSelectedRow(params.row);
    setOpenReview(true);
  };

  const handleConfirmReview = () => {
    const data = {
      userId: localStorage.getItem('id'),
      establishmentId: selectedRow,
      rate,
      comment
    };
    axios
      .post('http://localhost:3001/reviews', data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(() => {
        handleSuccessOpen('Avaliação enviada!')
      })
      .catch(error => {
        console.log('error ', error);
        handleErrorOpen('Erro ao enviar avaliação!')
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
      valueGetter: params => 'open'
    },
    {
      field: 'hour',
      headerName: 'Horário de Funcionamento',
      width: 300,
      valueGetter: params =>
        params.row.openingHoursStart + ' - ' + params.row.openingHoursEnd
    },
    {
      field: 'reserve',
      headerName: 'Reservar',
      width: 150,
      renderCell: params => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReserveClick(params)}
        >
          Reservar
        </Button>
      )
    },
    {
      field: 'actions',
      headerName: 'Avaliar',
      width: 150,
      renderCell: params => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReviewClick(params)}
        >
          Avaliar
        </Button>
      )
    }
  ];

  return (
    <div className="p-4 bg-white rounded shadow mx-4">
      <h1 className="text-redMain text-center p-2 text-lg">Restaurantes</h1>
      <DataGrid
        columns={columns}
        rows={establishmentsData}
        rowHeight={40}
        columnVisibilityModel={{
          id: false
        }}
      />

      <Modal
        open={openNewReservation}
        onClose={() => setOpenNewReservation(false)}
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 bg-white rounded shadow  text-center flex flex-col gap-24">
            <h1 className="text-redMain text-2xl">Criar Reserva</h1>
            <form className="flex flex-col gap-6 items-center">
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="quantity"
                  type="number"
                  placeholder="Quantidade"
                  onChange={e => setNumPeople(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notes"
                  type="text"
                  placeholder="Observações"
                  onChange={e => setObservation(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="calendar"
                  type="datetime-local"
                  placeholder="Data"
                  onChange={e => setDatetime(new Date(e.target.value))}
                />
              </div>
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
          <div className="p-4 bg-white rounded shadow  text-center flex flex-col gap-24">
            <h1 className="text-redMain text-2xl">Avaliar</h1>
            <form className="flex flex-col gap-6 items-center">
              <div className="">
                <div className="">
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="rate"
                    value={rate}
                    onChange={e => setRate(Number(e.target.value))}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </div>
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
