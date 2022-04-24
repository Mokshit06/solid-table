import { createSignal, For } from 'solid-js';
import './App.css';
import { makeData, Person } from './make-data';
import {
  createTable,
  createTableInstance,
  getCoreRowModelSync,
  getSortedRowModelSync,
} from '@tanstack/solid-table';

const table = createTable().setRowType<Person>();

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
  const [sorting, setSorting] = createSignal([]);
  const instance = createTableInstance(table, {
    get data() {
      return props.data;
    },
    get columns() {
      return props.columns;
    },
    state: {
      get sorting() {
        return sorting();
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModelSync(),
    getSortedRowModel: getSortedRowModelSync(),
  });

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = () => instance.getRowModel().rows.slice(0, 20);

  return (
    <>
      <table {...instance.getTableProps()}>
        <thead>
          <For each={instance.getHeaderGroups()}>
            {headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <For each={headerGroup.headers}>
                  {header => {
                    return (
                      <th
                        {...header.getHeaderProps()}
                        {...header.column.getToggleSortingProps()}
                      >
                        {header.renderHeader()}
                        <span>
                          {header.column.getIsSorted()
                            ? header.column.getIsSorted() === 'desc'
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    );
                  }}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody {...instance.getTableBodyProps()}>
          <For each={firstPageRows()}>
            {row => (
              <tr {...row.getRowProps()}>
                <For each={row.getVisibleCells()}>
                  {cell => (
                    <td {...cell.getCellProps()}>{cell.renderCell()}</td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <br />
      <div>
        Showing the first 20 results of {instance.getRowModel().rows.length}{' '}
        rows
      </div>
    </>
  );
}

function App() {
  const data = makeData(2000);

  return (
    <div class="table">
      <Table data={data} columns={columns} />
    </div>
  );
}

export default App;
