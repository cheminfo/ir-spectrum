import {
  JSGraph as OriginalJSGraph,
  autoPeakPicking as originalAutoPeakPicking,
  peakPicking as originalPeakPicking,
} from 'common-spectrum';

import { convertPeak } from './convertPeak.js';
import { getAnnotations } from './jsgraph/getAnnotations';

export { Analysis, AnalysesManager, toJcamp } from 'common-spectrum';

export function peakPicking(spectrum, target, options) {
  const peak = originalPeakPicking(spectrum, target, options);
  return convertPeak(peak, spectrum);
}

export function autoPeakPicking(spectrum, options) {
  const peaks = originalAutoPeakPicking(spectrum, options);
  return peaks.map((peak) => convertPeak(peak, spectrum));
}

export { fromJcamp } from './from/fromJcamp';
export { fromSPC } from './from/fromSPC';

export const JSGraph = { ...OriginalJSGraph, getAnnotations };
