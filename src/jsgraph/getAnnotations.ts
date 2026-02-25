interface AnnotationPeak {
  wavenumber: number;
  transmittance: number;
  absorbance: number;
  kind: string;
  assignment?: string;
}

interface AnnotationLabel {
  text: string;
  size: string;
  anchor: string;
  color: string;
  angle?: number;
  position: {
    x: number;
    y: number;
    dy: string;
  };
}

interface AnnotationPosition {
  x: number;
  y: number;
  dy: string;
  dx: string;
}

interface Annotation {
  line: number;
  type: string;
  strokeColor: string;
  strokeWidth: number;
  fillColor: string;
  labels?: AnnotationLabel[];
  position?: AnnotationPosition[];
}

interface GetAnnotationsOptions {
  /** Fill color for annotation rectangles. */
  fillColor?: string;
  /** Stroke color for annotation rectangles. */
  strokeColor?: string;
  /** Display the kind ('m', 'w', 'S'). */
  showKind?: boolean;
  /** Display the assignment. */
  showAssignment?: boolean;
  /** Callback allowing to add properties to an annotation. */
  creationFct?: (annotation: Annotation, peak: AnnotationPeak) => void;
  /** 't100'=transmittance in %, 't'=transmittance, 'a'=absorbance. */
  mode?: 'a' | 't' | 't100';
  /** Angle for assignment labels in absorbance mode. */
  assignmentAngle?: number;
}

/**
 * Creates annotations for jsgraph that allows to display the result of peak picking.
 * @param peaks - Array of peaks with wavenumber, transmittance, absorbance, kind.
 * @param options - Display options for the annotations.
 * @returns Array of annotation objects for jsgraph.
 */
export function getAnnotations(
  peaks: AnnotationPeak[],
  options: GetAnnotationsOptions = {},
): Annotation[] {
  const {
    fillColor = 'green',
    strokeColor = 'red',
    creationFct,
    mode = 't100',
  } = options;
  const annotations = peaks.map((peak) => {
    const annotation: Annotation = {
      line: 1,
      type: 'rect',
      strokeColor,
      strokeWidth: 0,
      fillColor,
    };
    if (creationFct) {
      creationFct(annotation, peak);
    }
    switch (mode) {
      case 'a':
        annotationAbsorbance(annotation, peak, options);
        break;
      case 't':
        annotationTransmittance(annotation, peak, 1, options);
        break;
      case 't100':
        annotationTransmittance(annotation, peak, 100, options);
        break;
      default:
    }
    return annotation;
  });
  return annotations;
}

function annotationTransmittance(
  annotation: Annotation,
  peak: AnnotationPeak,
  factor = 1,
  options: GetAnnotationsOptions = {},
): void {
  const { showKind = true, showAssignment = true } = options;
  const labels: AnnotationLabel[] = [];
  let line = 0;

  if (showKind) {
    labels.push({
      text: peak.kind,
      size: '18px',
      anchor: 'middle',
      color: 'red',
      position: {
        x: peak.wavenumber,
        y: peak.transmittance * factor,
        dy: `${23 + line * 14}px`,
      },
    });
    line++;
  }

  if (showAssignment) {
    labels.push({
      text: peak.assignment ?? '',
      size: '18px',
      anchor: 'middle',
      color: 'darkred',
      position: {
        x: peak.wavenumber,
        y: peak.transmittance * factor,
        dy: `${23 + line * 14}px`,
      },
    });
    line++;
  }

  annotation.labels = labels;
  annotation.position = [
    {
      x: peak.wavenumber,
      y: peak.transmittance * factor,
      dy: '10px',
      dx: '-1px',
    },
    {
      x: peak.wavenumber,
      y: peak.transmittance * factor,
      dy: '5px',
      dx: '1px',
    },
  ];
}

function annotationAbsorbance(
  annotation: Annotation,
  peak: AnnotationPeak,
  options: GetAnnotationsOptions = {},
): void {
  const {
    showKind = true,
    showAssignment = true,
    assignmentAngle = -45,
  } = options;
  const labels: AnnotationLabel[] = [];
  let line = 0;

  if (showKind) {
    labels.push({
      text: peak.kind,
      size: '18px',
      anchor: 'middle',
      color: 'red',
      position: {
        x: peak.wavenumber,
        y: peak.absorbance,
        dy: `${-15 - line * 14}px`,
      },
    });
    line++;
  }

  if (showAssignment) {
    labels.push({
      text: peak.assignment ?? '',
      size: '18px',
      angle: assignmentAngle,
      anchor: 'left',
      color: 'darkred',
      position: {
        x: peak.wavenumber,
        y: peak.absorbance,
        dy: `${-15 - line * 14}px`,
      },
    });
    line++;
  }

  annotation.labels = labels;

  annotation.position = [
    {
      x: peak.wavenumber,
      y: peak.absorbance,
      dy: '-10px',
      dx: '-1px',
    },
    {
      x: peak.wavenumber,
      y: peak.absorbance,
      dy: '-5px',
      dx: '1px',
    },
  ];
}
