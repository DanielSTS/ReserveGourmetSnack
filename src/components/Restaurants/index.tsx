'use client';
import { Modal } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { SetStateAction, useState } from 'react';

export default function Restaurants() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowDoubleClick = (params: { row: SetStateAction<null> }) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleConfirmReserve = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleCancelReserve = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'categoria', headerName: 'Categoria', width: 150 },
    { field: 'localizacao', headerName: 'Localização', width: 150 },
    { field: 'aberto', headerName: 'Aberto', width: 150 },
    {
      field: 'horarioFuncionamento',
      headerName: 'Horário de Funcionamento',
      width: 200
    }
  ];

  const rows = [
    {
      id: 1,
      nome: 'Restaurante 1',
      categoria: 'Categoria 1',
      localizacao: 'Localização 1',
      aberto: true,
      horarioFuncionamento: '09:00 - 18:00'
    },
    {
      id: 2,
      nome: 'Restaurante 2',
      categoria: 'Categoria 2',
      localizacao: 'Localização 2',
      aberto: false,
      horarioFuncionamento: '10:00 - 20:00'
    },
    {
      id: 3,
      nome: 'Restaurante 3',
      categoria: 'Categoria 1',
      localizacao: 'Localização 3',
      aberto: true,
      horarioFuncionamento: '08:00 - 17:00'
    }
  ];
  return (
    <div className="p-4 bg-white rounded shadow mx-4">
      <h1 className="text-redMain text-center p-2 text-lg">Restaurantes</h1>
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={40}
        onRowDoubleClick={handleRowDoubleClick}
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
                />
              </div>
              <div className="">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="notes"
                  type="text"
                  placeholder="Observações"
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="calendar"
                  type="datetime-local"
                  placeholder="Data"
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
