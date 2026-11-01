import { Fragment } from 'react';

/** Muestra un texto respetando los saltos de línea que escribió el administrador. */
export function Lines({ text }: { text: string }) {
  const parts = text.split('\n');
  return <>{parts.map((p, i) => <Fragment key={i}>{i > 0 ? <br /> : null}{p}</Fragment>)}</>;
}
