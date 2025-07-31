import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { toJcamp } from 'common-spectrum';
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { describe, expect, it } from 'vitest';

import { fromSPC } from '../fromSPC.js';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

describe('fromSPC', () => {
  it('fromSPC', () => {
    let buffer = readFileSync(
      join(import.meta.dirname, './data/absorbance.spc'),
    );

    let analysis = fromSPC(buffer);
    let jcamp = toJcamp(analysis, {});

    expect(jcamp.split('\n')).toHaveLength(1833);
    expect(analysis.spectra).toHaveLength(1);

    let first = analysis.spectra[0];

    expect(first.variables.x.data).toHaveLength(1776);
    expect(first.variables.y.data).toHaveLength(1776);
    expect(first.variables.a.data).toHaveLength(1776);
    expect(first.variables.t.data).toHaveLength(1776);
    expect(first.variables.x.label).toBe('Wavenumber');
    expect(first.variables.x.units).toBe('cm-1');
    expect(first.variables.y.label).toBe('Transmission');
    expect(first.variables.a.label).toBe('Absorbance');
    expect(first.variables.t.label).toBe('Transmittance');
    expect(first.variables.t.units).toBe('%');
    expect(first.variables.a.min).toBeDeepCloseTo(-2, 5);
    expect(first.variables.a.max).toBeDeepCloseTo(-0.5194697976112366, 5);
    expect(first.variables.t.min).toBeDeepCloseTo(330.72710037231445, 5);
    expect(first.variables.t.max).toBeDeepCloseTo(10000, 5);
    expect(Object.keys(first.variables)).toStrictEqual(['x', 'y', 'a', 't']);
  });

  it('resolutionPro', () => {
    let buffer = readFileSync(
      join(import.meta.dirname, './data/resolutionPro.spc'),
    );

    let analysis = fromSPC(buffer);
    const variables = analysis.spectra[0].variables;

    expect(Object.keys(variables)).toStrictEqual(['x', 'y', 'a', 't']);
  });
});
