import { FC } from 'react';

export const Spacer: FC<{ width?: number; height?: number }> = ({
  width = 0,
  height = 0,
}) => <div style={{ width, height }} />;
