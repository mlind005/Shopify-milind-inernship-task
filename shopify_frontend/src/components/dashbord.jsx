import { useState } from 'react';
import { DataTable } from '@shopify/polaris';


function Dashboard(props) {
  const [selectedRow, setSelectedRow] = useState(null);

  const rows = [
    {id: '1', product: 'Product A', description: 'Description A', price: 'Price A'},
    {id: '2', product: 'Product B', description: 'Description B', price: 'Price B'},
    {id: '3', product: 'Product C', description: 'Description C', price: 'Price C'},
  ];

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric']}
      headings={['Product', 'Description', 'Price']}
      rows={rows}
      onRowClick={handleRowClick}
    >
      {rows.map((row) => (
        <DataTable.Row key={row.id} selected={row === selectedRow}>
          <DataTable.Cell>{row.product}</DataTable.Cell>
          <DataTable.Cell>{row.description}</DataTable.Cell>
          <DataTable.Cell numeric>{row.price}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

export default Dashboard;
