import { colors } from '@rural/ui';

export function Hero() {
  return (
    <section style={{ background: colors.background, padding: 20, borderRadius: 12 }}>
      <h2 style={{ color: colors.text }}>Buy Rural Goods. Deliver Smarter.</h2>
      <p>Marketplace + logistics for hay, feed, eggs, livestock, and supplies.</p>
    </section>
  );
}
