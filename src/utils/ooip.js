/**
 * OOIP & Reserves Calculator - Calculation Engine
 * Volumetric equation: OOIP (STB) = (7758 x A x h x phi x (1 - Sw)) / Bo
 */

export function calcOOIP({ area, netPay, porosity, sw, bo }) {
    const phi = porosity / 100;
    const Sw = sw / 100;
    if (!area || !netPay || phi <= 0 || Sw >= 1 || bo <= 0) return 0;
    return (7758 * area * netPay * phi * (1 - Sw)) / bo;
}

export function calcReserves(ooipSTB, rfLow, rfBest, rfHigh, oilPrice) {
    const ooipMMSTB = ooipSTB / 1e6;
    const r1p = ooipMMSTB * (rfLow / 100);
    const r2p = ooipMMSTB * (rfBest / 100);
    const r3p = ooipMMSTB * (rfHigh / 100);
    const rev1p = r1p * 1e6 * oilPrice;
    const rev2p = r2p * 1e6 * oilPrice;
    const rev3p = r3p * 1e6 * oilPrice;
    return { ooipSTB, ooipMMSTB, r1p, r2p, r3p, rev1p, rev2p, rev3p };
}

export function calcSensitivity({ area, netPay, porosity, sw, bo }) {
    const base = calcOOIP({ area, netPay, porosity, sw, bo });
    if (!base) return [];
    const delta = 0.1;
    const variables = [
        { name: 'Area (A)', key: 'area', compute: (f) => calcOOIP({ area: area * (1 + f), netPay, porosity, sw, bo }) },
        { name: 'Net Pay (h)', key: 'netPay', compute: (f) => calcOOIP({ area, netPay: netPay * (1 + f), porosity, sw, bo }) },
        { name: 'Porosity', key: 'porosity', compute: (f) => calcOOIP({ area, netPay, porosity: porosity * (1 + f), sw, bo }) },
        { name: 'Water Sat. (Sw)', key: 'sw', compute: (f) => calcOOIP({ area, netPay, porosity, sw: sw * (1 + f), bo }) },
        { name: 'FVF (Bo)', key: 'bo', compute: (f) => calcOOIP({ area, netPay, porosity, sw, bo: bo * (1 + f) }) },
    ];
    return variables
        .map(({ name, key, compute }) => {
            const up = compute(delta);
            const down = compute(-delta);
            const pctUp = base > 0 ? ((up - base) / base) * 100 : 0;
            const pctDown = base > 0 ? ((down - base) / base) * 100 : 0;
            const impact = Math.max(Math.abs(pctUp), Math.abs(pctDown));
            return { name, key, pctUp, pctDown, impact };
        })
        .sort((a, b) => b.impact - a.impact);
}

export const ORINOCO_DEFAULTS = {
    area: 50000, netPay: 80, porosity: 32, sw: 15, bo: 1.05,
    rfLow: 8, rfBest: 35, rfHigh: 55, oilPrice: 65,
};

export const DEFAULT_INPUTS = {
    area: '', netPay: '', porosity: '', sw: '', bo: 1.05,
    rfLow: 15, rfBest: 35, rfHigh: 55, oilPrice: 70,
};

export const TOOLTIPS = {
    area: 'The surface area of the reservoir in acres. Determined from seismic data and well control. Often the most uncertain parameter in early exploration.',
    netPay: 'The thickness of reservoir rock that meets quality cutoffs for porosity, permeability and saturation. Always less than gross thickness.',
    porosity: 'The fraction of rock volume that is pore space. Venezuelan heavy oil sands typically 28-35%.',
    sw: 'The fraction of pore space occupied by water. (1-Sw) gives oil saturation. Lower Sw = more oil.',
    bo: 'Oil Formation Volume Factor - how much the oil shrinks when brought from reservoir to surface conditions. Heavy oil has Bo close to 1.0 as it contains little dissolved gas.',
    rfLow: 'Recovery Factor (P90) - conservative estimate. Ranges from 8% for early thermal heavy oil to 80% with optimized ES-SAGD.',
    rfBest: 'Recovery Factor (P50) - best estimate. The fraction of OOIP recoverable under most likely development scenario.',
    rfHigh: 'Recovery Factor (P10) - optimistic estimate. The fraction of OOIP recoverable under favorable conditions.',
    oilPrice: 'Used for commercial summary only. Does not affect OOIP or reserves calculation.',
};
