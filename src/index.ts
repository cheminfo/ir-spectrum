import type { MeasurementXY } from 'cheminfo-types';
import type {
  AutoPeakPickingOptions,
  PeakPickingOptions,
} from 'common-spectrum';
import {
  JSGraph as OriginalJSGraph,
  autoPeakPicking as originalAutoPeakPicking,
  peakPicking as originalPeakPicking,
} from 'common-spectrum';

import type { ConvertedPeak } from './convertPeak.ts';
import { convertPeak } from './convertPeak.ts';
import { getAnnotations } from './jsgraph/getAnnotations.ts';

export type { ConvertedPeak } from './convertPeak.ts';
export { AnalysesManager, Analysis, toJcamp } from 'common-spectrum';

/**
 * Picks a single peak closest to the given target wavenumber.
 * @param spectrum - The spectrum to pick from.
 * @param target - Target wavenumber value.
 * @param options - Peak picking options.
 * @returns The converted peak or undefined if no peak is found.
 */
export function peakPicking(
  spectrum: MeasurementXY,
  target: number,
  options?: PeakPickingOptions,
): ConvertedPeak | undefined {
  const peak = originalPeakPicking(spectrum, target, options);
  if (!peak) return undefined;
  return convertPeak(
    peak as { x: number; a: number; t: number; [key: string]: number },
    spectrum,
  );
}

/**
 * Automatically picks all peaks in the spectrum.
 * @param spectrum - The spectrum to pick from.
 * @param options - Auto peak picking options.
 * @returns Array of converted peaks.
 */
export function autoPeakPicking(
  spectrum: MeasurementXY,
  options?: AutoPeakPickingOptions,
): ConvertedPeak[] {
  const peaks = originalAutoPeakPicking(spectrum, options);
  if (!peaks) return [];
  return peaks.map((peak) =>
    convertPeak(
      peak as { x: number; a: number; t: number; [key: string]: number },
      spectrum,
    ),
  );
}

export { fromJcamp } from './from/fromJcamp.ts';
export { fromSPC } from './from/fromSPC.ts';
export { fromText } from './from/fromText.ts';

export const JSGraph: typeof OriginalJSGraph & {
  getAnnotations: typeof getAnnotations;
} = { ...OriginalJSGraph, getAnnotations };
