import { For } from 'solid-js';
import './App.css';
import { makeData, Person } from './make-data';
import { createCoreTable, createTable } from '../solid-table';

const table = createCoreTable<{ Row: Person }>();

const columns = table.createColumns([
  table.createGroup({
    header: 'Name',
    columns: [
      table.createDataColumn('firstName', {
        header: 'First Name',
      }),
      table.createDataColumn('lastName', {
        header: 'Last Name',
      }),
    ],
  }),
  table.createGroup({
    header: 'Info',
    columns: [
      table.createDataColumn('age', {
        header: 'Age',
      }),
      table.createDataColumn('visits', {
        header: 'Visits',
      }),
      table.createDataColumn('status', {
        header: 'Status',
      }),
      table.createDataColumn('progress', {
        header: 'Profile Progress',
      }),
    ],
  }),
]);

function Table(props: { columns: any[]; data: any[] }) {
  const instance = createTable(table, {
    get data() {
      return props.data;
    },
    get columns() {
      return props.columns;
    },
  });

  return (
    <table {...instance.getTableProps()}>
      <thead>
        <For each={instance.getHeaderGroups()}>
          {headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <For each={headerGroup.headers}>
                {header => (
                  <th {...header.getHeaderProps()}>{header.renderHeader()}</th>
                )}
              </For>
            </tr>
          )}
        </For>
      </thead>
      <tbody {...instance.getTableBodyProps()}>
        <For each={instance.getRowModel().rows}>
          {row => (
            <tr {...row.getRowProps()}>
              <For each={row.getVisibleCells()}>
                {cell => <td {...cell.getCellProps()}>{cell.renderCell()}</td>}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}

function App() {
  const data = makeData(20);

  return (
    <div class="table">
      <Table data={data} columns={columns} />
    </div>
  );
}

export default App;
