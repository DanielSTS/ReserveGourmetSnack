'use client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useOwnerInfoContext } from '@/contexts/OwnerInfoContext';

export default function ReservesOwner() {
  const { reservations } = useOwnerInfoContext();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'userName', headerName: 'Usuário', width: 160 },
    { field: 'datetime', headerName: 'Horário', width: 120 },
    {
      field: 'numPeople',
      headerName: 'Quantidade',
      width: 200
    },
    { field: 'observation', headerName: 'Observações', width: 130 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow m-4">
      <h1 className="text-redMain text-center p-2 text-lg">Reservas</h1>

      <div className="h-96">
        <DataGrid
          columns={columns}
          rows={reservations?.length ? reservations : []}
          columnVisibilityModel={{
            id: false
          }}
          rowHeight={40}
        />
      </div>
    </div>
  );
}
