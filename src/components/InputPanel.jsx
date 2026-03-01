import { useState } from 'react';
import { TOOLTIPS } from '../utils/ooip';

function Tooltip({ text }) {
  const [visible, setVisible] = useState(false);
  return (
    <span className="relative inline-block ml-1">
      <button
        className="w-4 h-4 rounded-full bg-steel text-white text-xs font-bold flex items-center justify-center leading-none hover:bg-steel-light transition-colors"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible((v) => !v)}
        aria-label="Help"
        type="button"
      >
        ?
      </button>
      {visible && (
        <div className="absolute z-50 left-5 top-0 w-64 p-3 bg-navy-dark text-white text-xs rounded-lg shadow-xl border border-steel/40 leading-relaxed">
          {text}
          <div className="absolute left-[-6px] top-2 w-0 h-0 border-y-4 border-y-transparent border-r-[6px] border-r-navy-dark" />
        </div>
      )}
    </span>
  );
}

function InputField({ label, id, value, onChange, unit, min, max, step, tooltipKey, placeholder }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="flex items-center text-xs font-semibold text-navy uppercase tracking-wide mb-1">
        {label}
        <Tooltip text={TOOLTIPS[tooltipKey]} />
        <span className="ml-auto text-steel text-xs font-normal normal-case tracking-normal">{unit}</span>
      </label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step || 'any'}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-steel/50 focus:border-steel transition-colors"
      />
    </div>
  );
}

export default function InputPanel({ inputs, onChange, onOrinocoMode, isOrinocoMode }) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <button
          onClick={onOrinocoMode}
          className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200 shadow-md ${
            isOrinocoMode
              ? 'bg-amber-500 hover:bg-amber-600 text-white ring-2 ring-amber-300'
              : 'bg-gradient-to-r from-navy to-steel hover:from-navy-light hover:to-steel-light text-white'
          }`}
          id="orinoco-mode-btn"
        >
          🛢 Orinoco Mode
        </button>
        {isOrinocoMode && (
          <p className="mt-2 text-center text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1.5 leading-snug">
            Orinoco Belt, Venezuela &mdash; Extra-Heavy Oil<br />
            <span className="font-semibold">(8&ndash;10&deg; API, ~50,000 cP viscosity)</span>
          </p>
        )}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
        <h3 className="text-xs font-bold text-navy uppercase tracking-widest mb-3 border-b border-gray-200 pb-1">Reservoir Parameters</h3>
        <InputField label="Area (A)" id="area" value={inputs.area} onChange={(v) => onChange('area', v)} unit="acres" min={0} tooltipKey="area" placeholder="e.g. 10000" />
        <InputField label="Net Pay (h)" id="netPay" value={inputs.netPay} onChange={(v) => onChange('netPay', v)} unit="feet" min={0} tooltipKey="netPay" placeholder="e.g. 80" />
        <InputField label="Porosity" id="porosity" value={inputs.porosity} onChange={(v) => onChange('porosity', v)} unit="%" min={0} max={100} step={0.1} tooltipKey="porosity" placeholder="e.g. 30" />
        <InputField label="Water Saturation (Sw)" id="sw" value={inputs.sw} onChange={(v) => onChange('sw', v)} unit="%" min={0} max={100} step={0.1} tooltipKey="sw" placeholder="e.g. 20" />
        <InputField label="Oil FVF (Bo)" id="bo" value={inputs.bo} onChange={(v) => onChange('bo', v)} unit="res bbl/STB" min={0.5} step={0.001} tooltipKey="bo" placeholder="1.05" />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
        <h3 className="text-xs font-bold text-navy uppercase tracking-widest mb-3 border-b border-gray-200 pb-1">Recovery Factors</h3>
        <InputField label="RF Low - P90" id="rfLow" value={inputs.rfLow} onChange={(v) => onChange('rfLow', v)} unit="%" min={0} max={100} step={0.1} tooltipKey="rfLow" placeholder="15" />
        <InputField label="RF Best - P50" id="rfBest" value={inputs.rfBest} onChange={(v) => onChange('rfBest', v)} unit="%" min={0} max={100} step={0.1} tooltipKey="rfBest" placeholder="35" />
        <InputField label="RF High - P10" id="rfHigh" value={inputs.rfHigh} onChange={(v) => onChange('rfHigh', v)} unit="%" min={0} max={100} step={0.1} tooltipKey="rfHigh" placeholder="55" />

        <div className="mt-4 border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="rfScenario" className="text-xs font-semibold text-navy uppercase tracking-wide">Recovery Factor Scenario</label>
            <span className="text-lg font-black text-navy">{Number(inputs.rfScenario || 0).toFixed(1)}%</span>
          </div>
          <input
            id="rfScenario"
            type="range"
            min={5}
            max={70}
            step={0.1}
            value={inputs.rfScenario}
            onChange={(e) => onChange('rfScenario', e.target.value)}
            className="w-full accent-steel"
          />
          <p className="text-xs text-gray-500 mt-1">Move slider to explore recovery scenarios</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-xs font-bold text-navy uppercase tracking-widest mb-3 border-b border-gray-200 pb-1">Commercial</h3>
        <InputField label="Oil Price" id="oilPrice" value={inputs.oilPrice} onChange={(v) => onChange('oilPrice', v)} unit="$/bbl" min={0} step={0.5} tooltipKey="oilPrice" placeholder="70" />
        <InputField label="Royalty" id="royalty" value={inputs.royalty} onChange={(v) => onChange('royalty', v)} unit="%" min={0} max={100} step={0.01} tooltipKey="royalty" placeholder="16.67" />
        <InputField label="OPEX" id="opex" value={inputs.opex} onChange={(v) => onChange('opex', v)} unit="$/bbl" min={0} step={0.1} tooltipKey="opex" placeholder="12" />
        <InputField label="CAPEX" id="capex" value={inputs.capex} onChange={(v) => onChange('capex', v)} unit="$MM" min={0} step={0.1} tooltipKey="capex" placeholder="50" />
        <InputField label="Discount Rate" id="discountRate" value={inputs.discountRate} onChange={(v) => onChange('discountRate', v)} unit="%" min={0} step={0.1} tooltipKey="discountRate" placeholder="10" />
      </div>
    </div>
  );
}
