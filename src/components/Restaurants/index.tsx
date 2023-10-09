'use client'
import { DataGrid, GridColDef } from '@mui/x-data-grid';


export default function Restaurants() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'categoria', headerName: 'Categoria', width: 150 },
    { field: 'localizacao', headerName: 'Localização', width: 150 },
    { field: 'aberto', headerName: 'Aberto', width: 150 },
    { field: 'horarioFuncionamento', headerName: 'Horário de Funcionamento', width: 200 },
  ];

  const rows = [
    { id: 1, nome: 'Restaurante 1', categoria: 'Categoria 1', localizacao: 'Localização 1', aberto: true, horarioFuncionamento: '09:00 - 18:00' },
    { id: 2, nome: 'Restaurante 2', categoria: 'Categoria 2', localizacao: 'Localização 2', aberto: false, horarioFuncionamento: '10:00 - 20:00' },
    { id: 3, nome: 'Restaurante 3', categoria: 'Categoria 1', localizacao: 'Localização 3', aberto: true, horarioFuncionamento: '08:00 - 17:00' },
  ];
  return (
    <div className='p-4 bg-white rounded shadow mx-4'>
       <h1 className='text-redMain text-center p-2 text-lg'>Restaurantes</h1>
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={40}
      />
    </div>
  );
};