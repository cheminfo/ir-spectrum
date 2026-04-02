# ir-spectrum

[![NPM version][npm-image]][npm-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.5482831.svg)](https://doi.org/10.5281/zenodo.5482831)

## Installation

`$ npm install --save ir-spectrum`

## Usage

```js
import IRSpectrum from 'ir-spectrum';

let analysis = IRSpectrum.fromJcamp(jcamp);
```

When loading an IR spectrum from JCAMP or SPC, two additional variables are systematically added:

| Key | Label              | Units | Description                      | Always present |
| --- | ------------------ | ----- | -------------------------------- | -------------- |
| x   | Wavenumber         | cm⁻¹  | Infrared wavenumber              | Yes            |
| y   | (from source file) |       | Original y-axis data             | Yes            |
| a   | Absorbance         |       | Absorbance values                | Yes            |
| t   | Transmittance      | %     | Percent transmittance values     | Yes            |

The conversion is automatic: if the original y label contains "transmittance", absorbance is calculated; if it contains "absorbance", transmittance is calculated. For transmittance, the presence of '%' or 'percent' in the label is used to determine the scaling factor.

### Selector for visualization

```html
<select name="selector.variables">
  <option value="a vs x">Absorbance versus wavenumber</option>
  <option value="t vs x">Transmittance versus wavenumber</option>
</select>
```

## [API Documentation](https://cheminfo.github.io/ir-spectrum/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ir-spectrum.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/ir-spectrum
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/ir-spectrum.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/cheminfo/ir-spectrum
[download-image]: https://img.shields.io/npm/dm/ir-spectrum.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/ir-spectrum
