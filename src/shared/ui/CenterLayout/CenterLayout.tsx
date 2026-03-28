import type { ICenterLayoutProps } from './types';

export const CenterLayout = ({ children }: ICenterLayoutProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5',
      }}
    >
      {children}
    </div>
  );
};
