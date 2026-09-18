import type { MeasurementVariable, NumberArray } from 'cheminfo-types';
import { xMaxValue } from 'ml-spectra-processing';

/** Any spelling built on the word itself: `TRANSMITTANCE`, `%Transmission`. */
const spelledOut = /trans/i;
/** The abbreviated forms, which share no substring with `transmittance`. */
const abbreviated = /^\s*%?\s*t\s*%?\s*$/i;

/**
 * Checks whether a variable holds a transmittance rather than an absorbance.
 * Spectrometers spell the unit in many ways and `%T` is as common as
 * `TRANSMITTANCE`, so both the label and the units are tested.
 * @param variable - Variable to inspect, usually the y of an IR spectrum.
 * @returns True when the data is a transmittance.
 */
export function isTransmittance(
  variable: Pick<MeasurementVariable, 'label' | 'units'>,
): boolean {
  const { label, units } = variable;
  for (const value of [label, units]) {
    if (!value) continue;
    if (spelledOut.test(value) || abbreviated.test(value)) return true;
  }
  return false;
}

/**
 * Checks whether a transmittance is expressed as a percentage rather than as a
 * fraction of 1. The label and the units are tested first; when neither says
 * so, the data decides, since a fraction never goes much above 1.
 * @param variable - Variable known to hold a transmittance.
 * @returns True when the data runs from 0 to 100.
 */
export function isPercent(
  variable: Pick<MeasurementVariable, 'label' | 'units'> & {
    data?: NumberArray;
  },
): boolean {
  const { label, units, data } = variable;
  for (const value of [label, units]) {
    if (!value) continue;
    if (value.includes('%') || value.toLowerCase().includes('percent')) {
      return true;
    }
  }
  return data !== undefined && data.length > 0 && xMaxValue(data) > 2;
}
