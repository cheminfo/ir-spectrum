import { expect, test } from 'vitest';

import { isPercent, isTransmittance } from '../isTransmittance.ts';

function classify(labels: string[]) {
  return Object.fromEntries(
    labels.map((label) => [label, isTransmittance({ label })]),
  );
}

test('units spelled out are a transmittance', () => {
  expect(
    classify([
      'TRANSMITTANCE',
      'Transmittance',
      'Transmittance (%)',
      '%Transmittance',
      'Transmission',
      '% Transmission',
    ]),
  ).toStrictEqual({
    TRANSMITTANCE: true,
    Transmittance: true,
    'Transmittance (%)': true,
    '%Transmittance': true,
    Transmission: true,
    '% Transmission': true,
  });
});

test('abbreviated units are a transmittance', () => {
  expect(classify(['%T', '%t', 'T%', 'T', ' %T ', '% T'])).toStrictEqual({
    '%T': true,
    '%t': true,
    'T%': true,
    T: true,
    ' %T ': true,
    '% T': true,
  });
});

test('units are read from the units field as well as the label', () => {
  expect(isTransmittance({ label: 'Y', units: '%T' })).toBe(true);
  expect(isTransmittance({ label: 'Y', units: 'TRANSMITTANCE' })).toBe(true);
});

test('anything else is an absorbance', () => {
  expect(
    classify([
      'Absorbance',
      'ABSORBANCE',
      'A',
      'Arbitrary units',
      'Kubelka-Munk',
      'Reflectance',
      'y',
      '',
    ]),
  ).toStrictEqual({
    Absorbance: false,
    ABSORBANCE: false,
    A: false,
    'Arbitrary units': false,
    'Kubelka-Munk': false,
    Reflectance: false,
    y: false,
    '': false,
  });
});

test('percent is recognised on the label and on the units', () => {
  expect(isPercent({ label: 'Transmittance (%)' })).toBe(true);
  expect(isPercent({ label: '%T' })).toBe(true);
  expect(isPercent({ label: 'Percent transmission' })).toBe(true);
  expect(isPercent({ label: 'Y', units: '%T' })).toBe(true);
  expect(isPercent({ label: 'Transmittance' })).toBe(false);
  expect(isPercent({ label: 'T' })).toBe(false);
});

test('percent is inferred from the data when the text does not say', () => {
  expect(isPercent({ label: 'Transmission', data: [3.3, 94.9, 100] })).toBe(
    true,
  );
  expect(isPercent({ label: 'Transmission', data: [0.03, 0.95, 1.02] })).toBe(
    false,
  );
  expect(isPercent({ label: 'Transmission', data: [] })).toBe(false);
});
