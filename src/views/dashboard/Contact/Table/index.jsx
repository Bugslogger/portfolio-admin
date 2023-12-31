import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
  },
  { field: 'email', headerName: 'Email', minWidth: 250 },
  { field: 'organization', headerName: 'Organization', width: 180 },
  { field: 'service', headerName: 'Service', width: 230 },
  {
    field: 'message',
    headerName: 'Message'
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', service: 'Website development', organization: 'xyz', email: 'snow@gmail.com' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', service: '', organization: '', email: 'Lannister@gmail.com' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', service: '', organization: '', email: 'LannisterJaime@gmail.com' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', service: '', organization: '', email: 'Stark@gmail.com' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', service: '', organization: '', email: 'Targaryen@gmail.com' },
  { id: 6, lastName: 'Melisandre', firstName: null, service: '', organization: '', email: 'Melisandre@gmail.com' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', service: '', organization: '', email: 'Clifford@gmail.com' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', service: '', organization: '', email: 'Rossini@gmail.com' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', service: '', organization: '', email: 'Harvey@gmail.com' }
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
