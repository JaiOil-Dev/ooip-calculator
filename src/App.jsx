/*
 * OOIP & Reserves Calculator v1.0
 * Built by Jainer M., Petroleum Engineer
 * Portfolio tool for volumetric reserves estimation with specific application to
 * Venezuelan extra-heavy oil reservoirs, Orinoco Belt.
 */

import { useState, useCallback, useMemo } from 'react';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import SensitivityPanel from './components/SensitivityPanel';
import { calcOOIP, calcReserves, calcSensitivity, ORINOCO_DEFAULTS, DEFAULT_INPUTS } from './utils/ooip';

const toNum = (v) => parseFloat(v) || 0;

export default function App() {
  const [inputs, setInputs] = useState({ ...DEFAULT_INPUTS });
  const [isOrinocoMode, setIsOrinocoMode] = useState(false);

  const handleChange = useCallback((key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setIsOrinocoMode(false);
  }, []);

  const handleOrinocoMode = useCallback(() => {
    setInputs({ ...ORINOCO_DEFAULTS });
    setIsOrinocoMode(true);
  }, []);

  const results = useMemo(() => {
    const p = {
      area: toNum(inputs.area),
      netPay: toNum(inputs.netPay),
      porosity: toNum(inputs.porosity),
      sw: toNum(inputs.sw),
      bo: toNum(inputs.bo),
    };
    const economics = {
      oilPrice: toNum(inputs.oilPrice),
      royalty: toNum(inputs.royalty),
      opex: toNum(inputs.opex),
      capex: toNum(inputs.capex),
      discountRate: toNum(inputs.discountRate),
    };
    const ooipSTB = calcOOIP(p);
    return calcReserves(
      ooipSTB,
      toNum(inputs.rfLow),
      toNum(inputs.rfBest),
      toNum(inputs.rfHigh),
      economics,
      toNum(inputs.rfScenario)
    );
  }, [inputs]);

  const sensitivity = useMemo(() => {
    const p = {
      area: toNum(inputs.area),
      netPay: toNum(inputs.netPay),
      porosity: toNum(inputs.porosity),
      sw: toNum(inputs.sw),
      bo: toNum(inputs.bo),
    };
    return calcSensitivity(p);
  }, [inputs]);

  const hasData = results.ooipSTB > 0;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      <header className="bg-navy shadow-xl">
        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-steel flex items-center justify-center text-xl shadow">
              🛢
            </div>
            <div>
              <h1 className="text-white font-black text-xl tracking-tight leading-none">
                OOIP &amp; Reserves Calculator
              </h1>
              <p className="text-blue-300 text-xs mt-0.5">
                Volumetric Estimation Tool &mdash; Petroleum Engineering Portfolio &middot; Jainer M.
              </p>
            </div>
            <div className="ml-auto hidden sm:flex items-center gap-3">
              <a
                href="https://JaiOil-Dev.github.io/dca-app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-300 hover:text-white border border-blue-400/40 hover:border-steel/80 px-3 py-1.5 rounded-md transition-colors"
              >
                Tool #1: DCA Pro &rarr;
              </a>
              <span className="text-xs text-blue-400 bg-navy-light/50 px-2 py-1 rounded font-semibold">Tool #2</span>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-navy-dark/90 border-b border-steel/20">
        <div className="max-w-screen-xl mx-auto px-6 py-2 flex items-center gap-4 overflow-x-auto">
          <span className="text-xs text-blue-300 font-semibold whitespace-nowrap">Volumetric equation:</span>
          <code className="text-xs font-mono text-amber-300 whitespace-nowrap tracking-wide">
            OOIP (STB) = ( 7758 &times; A &times; h &times; &phi; &times; (1&minus;Sw) ) / Bo
          </code>
        </div>
      </div>

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-5 grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-4 items-start">

        <section className="bg-white rounded-xl shadow-md border border-gray-200 p-5" aria-label="Input Parameters">
          <h2 className="text-sm font-black text-navy uppercase tracking-widest mb-4 pb-2 border-b border-gray-200">
            Parameters
          </h2>
          <InputPanel inputs={inputs} onChange={handleChange} onOrinocoMode={handleOrinocoMode} isOrinocoMode={isOrinocoMode} />
        </section>

        <section className="bg-white rounded-xl shadow-md border border-gray-200 p-5" aria-label="Results">
          <h2 className="text-sm font-black text-navy uppercase tracking-widest mb-4 pb-2 border-b border-gray-200">
            Results
          </h2>
          <ResultsPanel results={results} inputs={inputs} />
        </section>

        <section className="bg-white rounded-xl shadow-md border border-gray-200 p-5" aria-label="Sensitivity Analysis">
          <h2 className="text-sm font-black text-navy uppercase tracking-widest mb-4 pb-2 border-b border-gray-200">
            Sensitivity
          </h2>
          <SensitivityPanel sensitivity={sensitivity} hasData={hasData} />
        </section>

      </main>

      <footer className="bg-navy-dark text-center py-3 border-t border-navy-light/20">
        <p className="text-xs text-blue-400">
          Built by Jainer M. &middot; Petroleum Engineer
        </p>
      </footer>
    </div>
  );
}
