import { Hero } from '../src/components/Hero';

export default function WebHomePage() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1>Rural Logistics Marketplace</h1>
      <Hero />
      <p>Public website and onboarding portal scaffold.</p>
    </main>
  );
}
