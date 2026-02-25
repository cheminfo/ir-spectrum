import type { MeasurementXYVariables } from 'cheminfo-types';
import { Analysis } from 'common-spectrum';
import type { InputData } from 'spc-parser';
import { parse } from 'spc-parser';

import { spectrumCallback as defaultSpectrumCallback } from './utils/spectrumCallback.ts';

interface FromSPCOptions {
  /** Unique identifier for the analysis. */
  id?: string;
  /** Human-readable label for the analysis. */
  label?: string;
  /** Custom callback to apply on variables when creating a spectrum. Defaults to adding absorbance/transmittance variables. */
  spectrumCallback?: (
    variables: MeasurementXYVariables,
  ) => MeasurementXYVariables;
}

/**
 * Creates a new Analysis from an SPC buffer.
 * @param buffer - SPC file buffer.
 * @param options - Options for the analysis.
 * @returns New Analysis element with the given data.
 */
export function fromSPC(
  buffer: InputData,
  options: FromSPCOptions = {},
): Analysis {
  const { spectrumCallback = defaultSpectrumCallback, ...rest } = options;
  const analysis = new Analysis({ ...rest, spectrumCallback });
  const result = parse(buffer);

  const { parameters: _resultParameters, ...resultMeta } = result.meta;

  for (const spectrum of result.spectra) {
    const { parameters: _spectrumParameters, ...spectrumMeta } =
      spectrum.meta ?? {};
    analysis.pushSpectrum(spectrum.variables, {
      dataType: 'IR SPECTRUM',
      title: '',
      meta: { ...resultMeta, ...spectrumMeta },
    });
  }
  return analysis;
}
