import {
  createTableInstance,
  init,
  AnyGenerics,
  CreateTableFactoryOptions,
  Options,
  PartialKeys,
  Table,
} from './table-core';
import { createComputed, mergeProps } from 'solid-js';
import { createStore } from 'solid-js/store';

export * from './table-core';
export { createCoreTable, createTableFactory };

function render<TProps extends {}>(Comp: any, props: TProps) {
  if (!Comp) return null;

  if (typeof Comp === 'function') {
    return <Comp {...props} />;
  }

  return Comp;
}

const { createTable: createCoreTable, createTableFactory } = init({ render });

export function createTable<TGenerics extends AnyGenerics>(
  table: Table<TGenerics>,
  options: PartialKeys<
    Omit<
      Options<TGenerics>,
      keyof CreateTableFactoryOptions<any, any, any, any>
    >,
    'state' | 'onStateChange'
  >
) {
  const resolvedOptions: Options<TGenerics> = mergeProps(
    {
      ...(table.__options ?? {}),
      state: {}, // Dummy state
      onStateChange: () => {}, // noop
      render,
    },
    options
  );

  const instance = createTableInstance<TGenerics>(resolvedOptions);
  const [state, setState] = createStore(instance.initialState);

  createComputed(() => {
    instance.setOptions(prev => {
      return mergeProps(prev, options, {
        state: mergeProps(state, options.state || {}),
        // Similarly, we'll maintain both our internal state and any user-provided
        // state.
        onStateChange: (updater: any) => {
          // merging isn't required because stores shallow update
          setState(updater);

          options.onStateChange?.(updater);
        },
      });
    });
  });

  return instance;
}
