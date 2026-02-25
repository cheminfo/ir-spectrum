import type { MeasurementXY } from 'cheminfo-types';

export interface ConvertedPeak {
  wavenumber: number;
  absorbance: number;
  transmittance: number;
  kind: string;
}

interface SpectrumPeak {
  x: number;
  a: number;
  t: number;
  [key: string]: number;
}

/**
 * Converts a peak from common-spectrum format to IR-specific format.
 * @param peak - Peak object with x, a, t properties.
 * @param spectrum - Spectrum containing variable metadata.
 * @returns Converted peak with wavenumber, absorbance, transmittance, and kind.
 */
export function convertPeak(
  peak: SpectrumPeak,
  spectrum: MeasurementXY,
): ConvertedPeak {
  const tVariable = spectrum.variables.t;
  return {
    wavenumber: peak.x,
    absorbance: peak.a,
    transmittance: peak.t / 100,
    kind: getPeakKind(peak.t, tVariable?.min ?? 0, tVariable?.max ?? 100),
  };
}

function getPeakKind(
  transmittance: number,
  minTransmittance: number,
  maxTransmittance: number,
): string {
  const position =
    (maxTransmittance - transmittance) / (maxTransmittance - minTransmittance);
  if (position < 0.33) {
    return 'w';
  } else if (position < 0.66) {
    return 'm';
  }
  return 'S';
}
