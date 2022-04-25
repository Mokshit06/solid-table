import { createSignal, For, Show } from 'solid-js';
import './App.css';
import { makeData, Person } from './make-data';
import {
  Column,
  ColumnFiltersState,
  createTable,
  createTableInstance,
  TableInstance,
  getCoreRowModelSync,
  getColumnFilteredRowModelSync,
  getGlobalFilteredRowModelSync,
  getPaginationRowModel,
} from '@tanstack/solid-table';

const table = createTable().setRowType<Person>();

const columns = table.createColumns([
  table.createGroup({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      table.createDataColumn('firstName', {
        cell: info => info.value,
        footer: props => props.column.id,
        filterType: 'auto',
      }),
      table.createDataColumn(row => row.lastName, {
        id: 'lastName',
        cell: info => info.value,
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
        filterType: 'auto',
      }),
    ],
  }),
  table.createGroup({
    header: 'Info',
    footer: props => props.column.id,
    columns: [
      table.createDataColumn('age', {
        header: () => 'Age',
        footer: props => props.column.id,
        filterType: 'auto',
      }),
      table.createGroup({
        header: 'More Info',
        columns: [
          table.createDataColumn('visits', {
            header: () => <span>Visits</span>,
            footer: props => props.column.id,
          }),
          table.createDataColumn('status', {
            header: 'Status',
            footer: props => props.column.id,
          }),
          table.createDataColumn('progress', {
            header: 'Profile Progress',
            footer: props => props.column.id,
          }),
        ],
      }),
    ],
  }),
]);

function Filter(props: { column: Column<any>; instance: TableInstance<any> }) {
  const firstValue = () =>
    props.instance.getPreColumnFilteredRowModel().flatRows[0].values[
      props.column.id
    ];

  return (
    <Show
      when={typeof firstValue() === 'number'}
      fallback={
        <input
          type="text"
          value={(props.column.getColumnFilterValue() ?? '') as string}
          onInput={e => {
            props.column.setColumnFilterValue(e.currentTarget.value);
          }}
          placeholder={`Search... (${
            props.column.getPreFilteredUniqueValues().size
          })`}
          className="w-36 border shadow rounded"
        />
      }
    >
      <div className="flex space-x-2">
        <input
          type="number"
          min={Number(props.column.getPreFilteredMinMaxValues()[0])}
          max={Number(props.column.getPreFilteredMinMaxValues()[1])}
          value={
            ((props.column.getColumnFilterValue() as string[])?.[0] ??
              '') as string
          }
          onInput={e =>
            props.column.setColumnFilterValue((old: string) => [
              e.currentTarget.value,
              old?.[1],
            ])
          }
          placeholder={`Min (${props.column.getPreFilteredMinMaxValues()[0]})`}
          className="w-24 border shadow rounded"
        />
        <input
          type="number"
          min={Number(props.column.getPreFilteredMinMaxValues()[0])}
          max={Number(props.column.getPreFilteredMinMaxValues()[1])}
          value={
            ((props.column.getColumnFilterValue() as string[])?.[1] ??
              '') as string
          }
          onInput={e =>
            props.column.setColumnFilterValue((old: string) => [
              old?.[0],
              e.currentTarget.value,
            ])
          }
          placeholder={`Max (${props.column.getPreFilteredMinMaxValues()[1]})`}
          className="w-24 border shadow rounded"
        />
      </div>
    </Show>
  );
}

function App() {
  const data = makeData(10);
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = createSignal('');
  const instance = createTableInstance(table, {
    data,
    columns,
    state: {
      get columnFilters() {
        return columnFilters();
      },
      get globalFilter() {
        return globalFilter();
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModelSync(),
    getColumnFilteredRowModel: getColumnFilteredRowModelSync(),
    getGlobalFilteredRowModel: getGlobalFilteredRowModelSync(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div class="table">
      <div>
        <input
          value={globalFilter() ?? ''}
          onInput={e => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search all columns..."
        />
      </div>
      <table {...instance.getTableProps()}>
        <thead>
          <For each={instance.getHeaderGroups()}>
            {headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <For each={headerGroup.headers}>
                  {header => (
                    <th {...header.getHeaderProps()}>
                      <Show when={!header.isPlaceholder} fallback={null}>
                        {header.renderHeader()}
                        <Show when={header.column.getCanColumnFilter()}>
                          <div>
                            <Filter
                              column={header.column}
                              instance={instance}
                            />
                          </div>
                        </Show>
                      </Show>
                    </th>
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
                  {cell => (
                    <td {...cell.getCellProps()}>{cell.renderCell()}</td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <div>{instance.getGlobalFilteredRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(columnFilters(), null, 2)}</pre>
    </div>
  );
}

export default App;
