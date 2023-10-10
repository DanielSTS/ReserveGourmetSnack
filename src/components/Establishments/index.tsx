'use client';
import { useEstablishmentsContext } from '@/contexts/EstablishmentsContext';
import { Modal } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import axios from 'axios';

export default function Establishments() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>('');
  const establishmentsData = useEstablishmentsContext();

  const [datetime, setDatetime] = useState(new Date());
  const [numPeople, setNumPeople] = useState(0);
  const [observation, setObservation] = useState('');

  const handleRowDoubleClick = (params: any) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleConfirmReserve = () => {
    const data = {
      userId: localStorage.getItem('id'),
      establishmentId: selectedRow.id,
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
        console.log('ok');
      })
      .catch(error => {
        console.log('error ', error);
      });
    setOpen(false);
    setSelectedRow('');
  };

  const handleCancelReserve = () => {
    setOpen(false);
    setSelectedRow('');
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
    }
  ];

  return (
    <div className="p-4 bg-white rounded shadow mx-4">
      <h1 className="text-redMain text-center p-2 text-lg">Restaurantes</h1>
      <DataGrid
        columns={columns}
        rows={establishmentsData}
        rowHeight={40}
        onRowDoubleClick={handleRowDoubleClick}
        columnVisibilityModel={{
          id: false
        }}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
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
    </div>
  );
}
