import { fromJcamp as commonFromJcamp } from 'common-spectrum'

export function fromJcamp(jcamp, options) {
    const analysis = commonFromJcamp(jcamp, options)

    // we add missing absorbance / transmittance
    // variable a = absorbance
    // variable t = transmittance
    for (let spectrum of analysis.spectra) {
        let yVariable = spectrum.variables.y;
        let absorbance = true;
        if (yVariable.label.toLowerCase().includes('trans')) {
            absorbance = false;
        }


        if (absorbance) {
            spectrum.variables.a = yVariable
            spectrum.variables.t = 
        } else {
            spectrum.variables.t = yVariable
            spectrum.variables.t = yVariable
        }
        console.log(spectrum)
    }



    return analysis
}