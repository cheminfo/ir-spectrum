import type { MeasurementXYVariables, TextData } from 'cheminfo-types';
import type { Analysis } from 'common-spectrum';
import { fromJcamp as commonFromJcamp } from 'common-spectrum';

import { spectrumCallback as defaultSpectrumCallback } from './utils/spectrumCallback.ts';

interface FromJcampOptions {
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
 * Creates a new Analysis from a JCAMP string or buffer.
 * @param jcamp - JCAMP data as a string or ArrayBuffer.
 * @param options - Options for the analysis.
 * @returns New Analysis element with the given data.
 */
export function fromJcamp(
  jcamp: TextData,
  options: FromJcampOptions = {},
): Analysis {
  const { spectrumCallback = defaultSpectrumCallback, ...rest } = options;
  return commonFromJcamp(jcamp, { ...rest, spectrumCallback });
}
