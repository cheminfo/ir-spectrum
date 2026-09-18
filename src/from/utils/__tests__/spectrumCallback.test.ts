import { expect, test } from 'vitest';

import { spectrumCallback } from '../spectrumCallback.ts';

function callback(label: string, data: number[], units?: string) {
  return spectrumCallback({
    x: { label: 'Wavenumber [cm-1]', symbol: 'x', data: [4000, 3999] },
    y: { label, units, symbol: 'y', data },
  });
}

test('a percent transmittance is kept as is and converted to absorbance', () => {
  for (const label of ['Transmittance (%)', '%T', 'T%']) {
    const variables = callback(label, [10, 100]);

    expect(Array.from(variables.t?.data as number[])).toStrictEqual([10, 100]);

    const absorbance = Array.from(variables.a?.data as number[]);

    expect(absorbance[0]).toBeCloseTo(1, 10);
    expect(absorbance[1]).toBeCloseTo(0, 10);
  }
});

test('a percent transmittance is recognised from the units field', () => {
  const variables = callback('Y', [10, 100], '%T');

  expect(Array.from(variables.t?.data as number[])).toStrictEqual([10, 100]);
});

test('a fractional transmittance is scaled to percent', () => {
  const variables = callback('T', [0.1, 1]);

  expect(Array.from(variables.t?.data as number[])).toStrictEqual([10, 100]);

  const absorbance = Array.from(variables.a?.data as number[]);

  expect(absorbance[0]).toBeCloseTo(1, 10);
  expect(absorbance[1]).toBeCloseTo(0, 10);
});

test('an absorbance is kept as is and converted to transmittance', () => {
  const variables = callback('Absorbance', [1, 0]);

  expect(Array.from(variables.a?.data as number[])).toStrictEqual([1, 0]);
  expect(Array.from(variables.t?.data as number[])).toStrictEqual([10, 100]);
});

test('an unknown unit stays an absorbance', () => {
  const variables = callback('y', [1, 0]);

  expect(Array.from(variables.a?.data as number[])).toStrictEqual([1, 0]);
  expect(Array.from(variables.t?.data as number[])).toStrictEqual([10, 100]);
});
