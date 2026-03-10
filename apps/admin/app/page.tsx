import { AdminHeader } from '../src/components/AdminHeader';

export default function AdminHomePage() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>Rural Logistics Admin</h1>
      <AdminHeader />
      <p>Operations dashboard scaffold for approvals, dispatch, and support.</p>
    </main>
  );
}
