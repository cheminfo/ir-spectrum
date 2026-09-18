import type { MeasurementXYVariables } from 'cheminfo-types';

import { isPercent, isTransmittance } from './isTransmittance.ts';

/**
 * Callback that adds absorbance (a) and transmittance (t) variables to the spectrum.
 * If the y variable is absorbance, transmittance is computed and vice versa.
 * @param variables - Spectrum variables with at least x and y defined.
 * @returns The modified variables with a and t added.
 */
export function spectrumCallback(
  variables: MeasurementXYVariables,
): MeasurementXYVariables {
  // we add missing absorbance / transmittance
  // variable a = absorbance
  // variable t = transmittance
  const yVariable = variables.y;
  if (!isTransmittance(yVariable)) {
    variables.a = {
      ...yVariable,
      symbol: 'a',
      data: yVariable.data.slice() as number[],
    };
    variables.t = {
      data: (yVariable.data as number[]).map(
        (absorbance: number) => 10 ** -absorbance * 100,
      ),
      label: 'Transmittance (%)',
      symbol: 't',
      units: '',
    };
  } else {
    const factor = isPercent(yVariable) ? 100 : 1;

    variables.a = {
      data: (yVariable.data as number[]).map(
        (transmittance: number) => -Math.log10(transmittance / factor),
      ),
      symbol: 'a',
      label: 'Absorbance',
      units: '',
    };
    const { label, units, data } = yVariable;
    if (isPercent({ label, units })) {
      variables.t = { ...yVariable, symbol: 't', data: data.slice() };
    } else {
      variables.t = {
        units: '',
        label: 'Transmittance (%)',
        symbol: 't',
        data:
          factor === 100
            ? data.slice()
            : (data as number[]).map(
                (transmittance: number) => transmittance * 100,
              ),
      };
    }
  }
  return variables;
}
