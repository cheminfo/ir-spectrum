import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { expect, test } from 'vitest';

import { autoPeakPicking, fromJcamp, peakPicking } from '..';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

test('autoPeakPicking', () => {
  const jcamp = readFileSync(
    join(import.meta.dirname, './data/absorbance.jdx'),
  );

  const result = fromJcamp(jcamp);

  const peak = peakPicking(result.getSpectrum(), 1043);

  expect(peak).toBeDeepCloseTo({
    wavenumber: 1043.3171784680487,
    absorbance: 0.29902676,
    transmittance: 0.5023116375436859,
    kind: 'm',
  });

  const peaks = autoPeakPicking(result.getSpectrum());

  expect(peaks[0]).toBeDeepCloseTo({
    absorbance: 0.29902676,
    kind: 'm',
    transmittance: 0.5023116375436859,
    wavenumber: 1043.3171784680487,
  });

  expect(peaks).toHaveLength(24);
});
