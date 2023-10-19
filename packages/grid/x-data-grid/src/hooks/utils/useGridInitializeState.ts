import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { GridPrivateApiCommon } from '../../models/api/gridApiCommon';
import { GridPrivateApiCommunity } from '../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type GridStateInitializer<
  P extends Partial<DataGridProcessedProps> = DataGridProcessedProps,
  PrivateApi extends GridPrivateApiCommon = GridPrivateApiCommunity,
> = (
  state: DeepPartial<PrivateApi['state']>,
  props: P,
  privateApiRef: React.MutableRefObject<PrivateApi>,
  theme?: Theme,
) => DeepPartial<PrivateApi['state']>;

export const useGridInitializeState = <
  P extends Partial<DataGridProcessedProps>,
  PrivateApi extends GridPrivateApiCommon = GridPrivateApiCommunity,
>(
  initializer: GridStateInitializer<P, PrivateApi>,
  privateApiRef: React.MutableRefObject<PrivateApi>,
  props: P,
  theme?: Theme,
) => {
  const isInitialized = React.useRef(false);

  if (!isInitialized.current) {
    privateApiRef.current.state = initializer(
      privateApiRef.current.state,
      props,
      privateApiRef,
      theme,
    ) as PrivateApi['state'];
    isInitialized.current = true;
  }
};
