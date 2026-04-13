/**
 * Contenedor principal tipo pergamino / ficha tradicional.
 */
export default function GlassCard({ children, variant = 'default', className = '', ...rest }) {
  const variants = {
    default:
      'mb-6 rounded-2xl border border-cream-300/90 bg-cream-50/90 p-4 shadow-[0_8px_30px_rgba(44,40,37,0.08)] sm:p-6 md:p-8',
    restoration:
      'mb-6 flex min-h-[calc(100vh-11rem)] flex-1 flex-col rounded-2xl border border-cream-300/90 bg-cream-50/90 p-4 shadow-[0_8px_30px_rgba(44,40,37,0.08)] sm:p-6 md:p-8',
  };

  return (
    <div className={`${variants[variant] ?? variants.default} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
