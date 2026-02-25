export function convertPeak(peak, spectrum) {
  return {
    wavenumber: peak.x,
    absorbance: peak.a,
    transmittance: peak.t / 100,
    kind: getPeakKind(
      peak.t,
      spectrum.variables.t.min,
      spectrum.variables.t.max,
    ),
  };
}

function getPeakKind(transmittance, minTransmittance, maxTransmittance) {
  let position =
    (maxTransmittance - transmittance) / (maxTransmittance - minTransmittance);
  if (position < 0.33) {
    return 'w';
  } else if (position < 0.66) {
    return 'm';
  }
  return 'S';
}
