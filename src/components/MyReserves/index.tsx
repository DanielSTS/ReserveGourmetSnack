'use client';

import { IconButton, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

export default function MyReserves() {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nome', headerName: 'Nome', width: 120 },
    { field: 'categoria', headerName: 'Categoria', width: 150 },
    { field: 'horario', headerName: 'Horário', width: 100 },
    {
      field: 'quantidade',
      headerName: 'Quantidade',
      width: 150,
      renderCell: params => (
        <div className="flex gap-2 items-center">
          <>{params.row.quantidade}</>
          <IconButton
            aria-label="Editar"
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Excluir"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    }
  ];

  const rows = [
    {
      id: 1,
      nome: 'Reserva 1',
      categoria: 'Categoria 1',
      horario: '10:00',
      quantidade: 5
    },
    {
      id: 2,
      nome: 'Reserva 2',
      categoria: 'Categoria 2',
      horario: '12:00',
      quantidade: 3
    },
    {
      id: 3,
      nome: 'Reserva 3',
      categoria: 'Categoria 1',
      horario: '14:00',
      quantidade: 2
    }
  ];

  function handleEdit(id: number): void {
    setSelectedRow(id);
    setOpenModalEdit(true);
  }

  function handleEditCancel(): void {
    setOpenModalEdit(false);
    setSelectedRow(null);
  }

  function handleEditConfirm(): void {
    setOpenModalEdit(false);
    setSelectedRow(null);
  }

  function handleDelete(id: number): void {
    setSelectedRow(id);
    setOpenModalDelete(true);
  }

  function handleDeleteCancel(): void {
    setOpenModalDelete(false);
    setSelectedRow(null);
  }

  function handleDeleteConfirm(): void {
    setOpenModalDelete(false);
    setSelectedRow(null);
  }

  return (
    <div className="p-4 bg-white rounded shadow m-4">
      <h1 className="text-redMain text-center p-2 text-lg">Minhas Reservas</h1>
      <DataGrid columns={columns} rows={rows} rowHeight={40} />

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
                onClick={handleEditConfirm}
                className="border-2 border-zinc-400 bg-white text-zinc-400 font-bold p-2 px-8 rounded-3xl focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditCancel}
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
