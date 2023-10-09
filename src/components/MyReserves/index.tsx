'use client'

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


export default function MyReserves() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nome', headerName: 'Nome', width: 120 },
    { field: 'categoria', headerName: 'Categoria', width: 150 },
    { field: 'horario', headerName: 'Horário', width: 100 },
    { field: 'quantidade', headerName: 'Quantidade', width: 150,       renderCell: (params) => (
      <div className='flex gap-2 items-center'>
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
    ),
  },
  ];

  const rows = [
    { id: 1, nome: 'Reserva 1', categoria: 'Categoria 1', horario: '10:00', quantidade: 5 },
    { id: 2, nome: 'Reserva 2', categoria: 'Categoria 2', horario: '12:00', quantidade: 3 },
    { id: 3, nome: 'Reserva 3', categoria: 'Categoria 1', horario: '14:00', quantidade: 2 },
  ];

  return (
    <div className='p-4 bg-white rounded shadow m-4'>
       <h1 className='text-redMain text-center p-2 text-lg'>Minhas Reservas</h1>
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={40}
      />
    </div>
  );
};
function handleEdit(id: any): void {
  throw new Error('Function not implemented.');
}

function handleDelete(id: any): void {
  throw new Error('Function not implemented.');
}

