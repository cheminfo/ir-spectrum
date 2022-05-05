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

When loading an IRSpectrum from Jcamp we will systamatically add 2 new variables:

- a: containing the absorbance
- t: containing the percent transmittance

In order to calculate those 2 variables we will check the Y label. If it contains
transmittance we calculate absorbance, if it contains absorbance we calculate transmittance.
For transmittance we also check for the presence of a '%' sign.:w

## [API Documentation](https://cheminfo.github.io/ir-spectrum/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ir-spectrum.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/ir-spectrum
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/ir-spectrum.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/cheminfo/ir-spectrum
[download-image]: https://img.shields.io/npm/dm/ir-spectrum.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/ir-spectrum
