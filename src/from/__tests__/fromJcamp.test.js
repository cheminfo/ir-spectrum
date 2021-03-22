import { readFileSync } from 'fs';
import { join } from 'path';

import { fromJcamp } from '../fromJcamp';

describe('fromJcamp', () => {
    it('simple case', () => {
        let jcamp = readFileSync(
            join(__dirname, '../../../testFiles/ir.jdx'),
            'utf8',
        );

        let result = fromJcamp(jcamp);

        expect(result.spectra).toHaveLength(1);

        let first = result.spectra[0];

        expect(first.variables.x.data).toHaveLength(935);
        expect(first.variables.y.data).toHaveLength(935);
        expect(first.variables.x.label).toStrictEqual('Wavenumber');
        expect(first.variables.y.label).toStrictEqual('%Transmittance');

    });

});
