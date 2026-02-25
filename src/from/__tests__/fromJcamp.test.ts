import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { expect, test } from 'vitest';

import { fromJcamp } from '../fromJcamp.ts';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

test('transmittance', () => {
  const jcamp = readFileSync(
    join(import.meta.dirname, './data/transmittance.jdx'),
    'utf8',
  );

  const result = fromJcamp(jcamp);

  expect(result.spectra).toHaveLength(1);

  const first = result.spectra[0]!;

  expect(first.variables.x.data).toHaveLength(1991);
  expect(first.variables.y.data).toHaveLength(1991);
  expect(first.variables.a!.data).toHaveLength(1991);
  expect(first.variables.t!.data).toHaveLength(1991);
  expect(first.variables.x.label).toBe('1/CM');
  expect(first.variables.y.label).toBe('TRANSMITTANCE');
  expect(first.variables.a!.label).toBe('Absorbance');
  expect(first.variables.t!.label).toBe('Transmittance');
  expect(first.variables.t!.units).toBe('%');
  expect(first.variables.a!.min).toBeDeepCloseTo(0.0376306, 5);
  expect(first.variables.a!.max).toBeDeepCloseTo(1.79588, 5);
  expect(first.variables.t!.min).toBeDeepCloseTo(1.6, 5);
  expect(first.variables.t!.max).toBeDeepCloseTo(91.7, 5);
});

test('transmittance_percent', () => {
  const jcamp = readFileSync(
    join(import.meta.dirname, './data/transmittance_percent.jdx'),
    'utf8',
  );

  const result = fromJcamp(jcamp);

  expect(result.spectra).toHaveLength(1);

  const first = result.spectra[0]!;

  expect(first.variables.x.data).toHaveLength(935);
  expect(first.variables.y.data).toHaveLength(935);
  expect(first.variables.a!.data).toHaveLength(935);
  expect(first.variables.t!.data).toHaveLength(935);
  expect(first.variables.x.label).toBe('Wavenumber');
  expect(first.variables.y.label).toBe('%Transmittance');
  expect(first.variables.a!.label).toBe('Absorbance');
  expect(first.variables.t!.label).toBe('%Transmittance');
  expect(first.variables.a!.min).toBeDeepCloseTo(-0.00173641, 5);
  expect(first.variables.a!.max).toBeDeepCloseTo(0.5053756, 5);
  expect(first.variables.t!.min).toBeDeepCloseTo(31.233769, 5);
  expect(first.variables.t!.max).toBeDeepCloseTo(100.400625, 5);
});

test('absorbance', () => {
  const jcamp = readFileSync(
    join(import.meta.dirname, './data/absorbance.jdx'),
    'utf8',
  );

  const result = fromJcamp(jcamp);

  expect(result.spectra).toHaveLength(1);

  const first = result.spectra[0]!;

  expect(first.variables.x.data).toHaveLength(1738);
  expect(first.variables.y.data).toHaveLength(1738);
  expect(first.variables.a!.data).toHaveLength(1738);
  expect(first.variables.t!.data).toHaveLength(1738);
  expect(first.variables.x.label).toBe('1/CM');
  expect(first.variables.y.label).toBe('ABSORBANCE');
  expect(first.variables.a!.label).toBe('ABSORBANCE');
  expect(first.variables.t!.label).toBe('Transmittance');
  expect(first.variables.t!.units).toBe('%');
  expect(first.variables.a!.min).toBeDeepCloseTo(0.04470896, 5);
  expect(first.variables.a!.max).toBeDeepCloseTo(1.70098352, 5);
  expect(first.variables.t!.min).toBeDeepCloseTo(1.9907488797100026, 5);
  expect(first.variables.t!.max).toBeDeepCloseTo(90.2175522913975, 5);
});
