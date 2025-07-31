import {
  JSGraph as OriginalJSGraph,
  autoPeakPicking as originalAutoPeakPicking,
  peakPicking as originalPeakPicking,
} from 'common-spectrum';

import { convertPeak } from './convertPeak.js';
import { getAnnotations } from './jsgraph/getAnnotations';

export { AnalysesManager, Analysis, toJcamp } from 'common-spectrum';

export function peakPicking(spectrum, target, options) {
  const peak = originalPeakPicking(spectrum, target, options);
  if (!peak) return undefined;
  return convertPeak(peak, spectrum);
}

export function autoPeakPicking(spectrum, options) {
  const peaks = originalAutoPeakPicking(spectrum, options);
  if (!peaks) return [];
  return peaks.map((peak) => convertPeak(peak, spectrum));
}

export { fromJcamp } from './from/fromJcamp';
export { fromSPC } from './from/fromSPC';

export const JSGraph = { ...OriginalJSGraph, getAnnotations };
