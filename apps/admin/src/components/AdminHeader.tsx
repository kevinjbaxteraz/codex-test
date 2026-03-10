import { colors } from '@rural/ui';

export function AdminHeader() {
  return (
    <header style={{ borderBottom: `2px solid ${colors.accent}`, paddingBottom: 8 }}>
      <h2 style={{ color: colors.text }}>Operations Control Center</h2>
    </header>
  );
}
