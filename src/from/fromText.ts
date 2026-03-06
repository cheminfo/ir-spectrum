import type { TextData } from 'cheminfo-types';
import type { FromTextOptions as CommonFromTextOptions } from 'common-spectrum';
import { Analysis } from 'common-spectrum';
import { parseXYAndKeepInfo } from 'xy-parser';

interface FromTextOptions extends CommonFromTextOptions {
  /** Unique identifier for the analysis. */
  id?: string;
  /** Human-readable label for the analysis. */
  label?: string;
}

/**
 * Creates a new Analysis from text data (CSV, TSV, etc.).
 * @param data - Text data containing x,y values.
 * @param options - Options for parsing and analysis creation.
 * @returns New Analysis element with the given data.
 */
export function fromText(
  data: TextData,
  options: FromTextOptions = {},
): Analysis {
  const {
    info = {},
    parser = {},
    dataType = 'IR spectrum',
    title = '',
    ...rest
  } = options;

  const analysis = new Analysis(rest);

  const parsed = parseXYAndKeepInfo(data, parser);
  const variables = {
    x: {
      data: parsed.data.x,
      units: info.xUnits || '',
      label: info.xLabel || '',
    },
    y: {
      data: parsed.data.y,
      units: info.yUnits || '',
      label: info.yLabel || '',
    },
  };

  analysis.pushSpectrum(variables, { dataType, title });

  return analysis;
}
