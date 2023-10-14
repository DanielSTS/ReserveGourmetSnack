'use client';
import { useEstablishmentsContext } from '@/contexts/EstablishmentsContext';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function Favorites() {
  const favorites = useEstablishmentsContext()?.slice(0, 5);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'category', headerName: 'Categoria', width: 150 },
    { field: 'address', headerName: 'Localização', width: 150 },
    { field: 'rating', headerName: 'Avaliação', width: 150 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow my-4 mr-4">
      <h1 className="text-redMain text-center p-2 text-lg">Favoritos</h1>
      <div className="h-80">
        <DataGrid
          columns={columns}
          rows={favorites}
          rowHeight={40}
          columnVisibilityModel={{
            id: false
          }}
        />
      </div>
    </div>
  );
}
