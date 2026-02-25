import type { MeasurementXYVariables } from 'cheminfo-types';

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
  let isAbsorbance = true;
  if (yVariable.label.toLowerCase().includes('trans')) {
    isAbsorbance = false;
  }
  if (isAbsorbance) {
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
    const factor =
      yVariable.label.includes('%') ||
      yVariable.label.toLowerCase().includes('percent')
        ? 100
        : 1;

    variables.a = {
      data: (yVariable.data as number[]).map(
        (transmittance: number) => -Math.log10(transmittance / factor),
      ),
      symbol: 'a',
      label: 'Absorbance',
      units: '',
    };
    if (factor === 100) {
      variables.t = { ...yVariable, symbol: 't' };
      variables.t.data = variables.t.data.slice() as number[];
    } else {
      variables.t = {
        units: '',
        label: 'Transmittance (%)',
        symbol: 't',
        data: (yVariable.data as number[]).map(
          (transmittance: number) => transmittance * 100,
        ),
      };
    }
  }
  return variables;
}
