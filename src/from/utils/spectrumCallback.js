export function spectrumCallback(variables) {
  // we add missing absorbance / transmittance
  // variable a = absorbance
  // variable t = transmittance
  let yVariable = variables.y;
  let absorbance = true;
  if (yVariable.label.toLowerCase().includes('trans')) {
    absorbance = false;
  }
  if (absorbance) {
    variables.a = { ...yVariable, symbol: 'a', data: yVariable.data.slice() };
    variables.t = {
      data: yVariable.data.map((absorbance) => 10 ** -absorbance * 100),
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
      data: yVariable.data.map(
        (transmittance) => -Math.log10(transmittance / factor),
      ),
      symbol: 'a',
      label: 'Absorbance',
      units: '',
    };
    if (factor === 100) {
      variables.t = { ...yVariable, symbol: 't' };
      variables.t.data = variables.t.data.slice();
    } else {
      variables.t = {
        units: '',
        label: 'Transmittance (%)',
        symbol: 't',
        data: yVariable.data.map((transmittance) => transmittance * 100),
      };
    }
  }
}
