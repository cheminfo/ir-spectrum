import { toJcamp } from 'common-spectrum';
import { expect, test } from 'vitest';

import { fromText } from '../fromText.ts';

test('fromText default dataType is IR spectrum', () => {
  const data = '1000 0.5\n2000 0.3\n3000 0.8';
  const analysis = fromText(data, {
    info: {
      xLabel: 'Wavenumber',
      xUnits: 'cm-1',
      yLabel: 'Absorbance',
      yUnits: '',
    },
  });

  expect(analysis.spectra).toHaveLength(1);

  const first = analysis.spectra[0]!;

  expect(first.dataType).toBe('IR spectrum');
  expect(Object.keys(first.variables)).toStrictEqual(['x', 'y']);

  const jcamp = toJcamp(analysis, {});

  expect(jcamp).toContain('##DATA TYPE=IR spectrum');
});

test('fromText custom dataType', () => {
  const data = '1000 0.5\n2000 0.3';
  const analysis = fromText(data, {
    dataType: 'Raman spectrum',
    info: {
      xLabel: 'Wavenumber',
      xUnits: 'cm-1',
      yLabel: 'Absorbance',
      yUnits: '',
    },
  });

  const jcamp = toJcamp(analysis, {});

  expect(jcamp).toContain('##DATA TYPE=Raman spectrum');
});
