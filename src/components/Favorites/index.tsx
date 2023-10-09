'use client'
import { DataGrid, GridColDef } from '@mui/x-data-grid';


export default function Favorites() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'categoria', headerName: 'Categoria', width: 150 },
    { field: 'localizacao', headerName: 'Localização', width: 150 },
  ];

  const rows = [
    { id: 1, nome: 'Restaurante 1', categoria: 'Categoria 1', localizacao: 'Localização 1' },
    { id: 2, nome: 'Restaurante 2', categoria: 'Categoria 2', localizacao: 'Localização 2' },
    { id: 3, nome: 'Restaurante 3', categoria: 'Categoria 1', localizacao: 'Localização 3'},
  ];
  return (
    <div className='p-4 bg-white rounded shadow my-4 mr-4'>
       <h1 className='text-redMain text-center p-2 text-lg'>Favoritos</h1>
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={40}
      />
    </div>
  );
};