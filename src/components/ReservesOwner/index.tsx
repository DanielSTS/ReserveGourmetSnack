'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useUserInfoContext } from '@/contexts/UserInfoContext';

export default function ReservesOwner() {
  const { reservations: reservationsData } = useUserInfoContext();


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'userName', headerName: 'Usuário', width: 160 },
    { field: 'datetime', headerName: 'Horário', width: 120 },
    {
      field: 'numPeople',
      headerName: 'Quantidade',
      width: 200
    },
    { field: 'observations', headerName: 'Observações', width: 130 },
  ];

  return (
    <div className="p-4 bg-white rounded shadow m-4">
      <h1 className="text-redMain text-center p-2 text-lg">Reservas</h1>
      <DataGrid
        columns={columns}
        rows={reservationsData.length ? reservationsData : []}
        columnVisibilityModel={{
          id: false
        }}
        rowHeight={40}
      />
    </div>
  );
}
