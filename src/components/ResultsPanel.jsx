function Badge({ label, colorClass }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${colorClass}`}>
      {label}
    </span>
  );
}

function MetricCard({ label, badge, valueMain, valueSub, netRevenue, npv, highlight, hasData }) {
  const npvPositive = npv > 0;
  const npvClass = npvPositive ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-red-700 bg-red-50 border-red-200';

  return (
    <div className={`rounded-lg p-4 border ${highlight ? 'bg-steel-pale border-steel/40' : 'bg-white border-gray-200'} mb-3`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</span>
        {badge}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-black text-navy">{valueMain}</span>
        <span className="text-sm text-gray-500 mb-0.5">MMSTB</span>
      </div>
      {valueSub && <p className="text-xs text-gray-400 mt-0.5">{valueSub}</p>}
      <div className="mt-2 pt-2 border-t border-gray-200 space-y-1.5">
        <p className="text-xs text-gray-500">
          Net Revenue: <span className="text-sm font-bold text-navy">{hasData ? fmtMoneyMM(netRevenue) : '\u2014'}</span>
        </p>
        <p className={`text-xs font-bold border rounded px-2 py-1 inline-block ${hasData ? npvClass : 'text-gray-500 bg-gray-100 border-gray-200'}`}>
          NPV: {hasData ? fmtMoneyMM(npv) : '\u2014'}
        </p>
      </div>
    </div>
  );
}

function fmt(val) {
  if (!val || isNaN(val)) return '\u2014';
  return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtMoneyMM(val) {
  if (val === undefined || val === null || isNaN(val)) return '\u2014';
  return `$${val.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}MM`;
}

export default function ResultsPanel({ results, inputs }) {
  const {
    ooipSTB,
    ooipMMSTB,
    r1p,
    r2p,
    r3p,
    scenarioReserves,
    scenarioNetRevenueMM,
    scenarioNpvMM,
    netRevenuePerBbl,
    netRevenue1pMM,
    netRevenue2pMM,
    netRevenue3pMM,
    npv1pMM,
    npv2pMM,
    npv3pMM,
    isEconomic,
  } = results;
  const hasData = ooipSTB > 0;

  const summaryText = hasData
    ? `This reservoir contains approximately ${fmt(ooipMMSTB)} MMSTB of oil in place. At a ${inputs.rfBest}% recovery factor, recoverable reserves are ${fmt(r2p)} MMSTB, net revenue is ${fmtMoneyMM(netRevenue2pMM)}, and simplified NPV is ${fmtMoneyMM(npv2pMM)}.`
    : 'Enter reservoir parameters to calculate OOIP and recoverable reserves.';

  return (
    <div className="flex flex-col h-full">
      {!isEconomic && hasData && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm font-semibold">
          ⚠️ Not economic under current conditions — net revenue per barrel is negative. Increase oil price or reduce OPEX.
        </div>
      )}

      <div className={`rounded-xl p-5 border-2 mb-4 ${hasData ? 'bg-gradient-to-br from-navy to-navy-light border-navy/20' : 'bg-gray-100 border-gray-200'}`}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${hasData ? 'text-steel-pale' : 'text-gray-400'}`}>
          Original Oil In Place (OOIP)
        </p>
        <div className="flex items-end gap-2 mb-1">
          <span className={`text-4xl font-black ${hasData ? 'text-white' : 'text-gray-300'}`}>
            {hasData ? fmt(ooipMMSTB) : '\u2014'}
          </span>
          <span className={`text-lg mb-0.5 font-semibold ${hasData ? 'text-steel-pale' : 'text-gray-300'}`}>MMSTB</span>
        </div>
        {hasData && <p className="text-xs text-blue-200">{ooipSTB.toLocaleString('en-US', { maximumFractionDigits: 0 })} STB</p>}
        <p className="text-xs text-blue-300/70 mt-2 font-mono">(7758 &times; A &times; h &times; &phi; &times; (1&minus;Sw)) / Bo</p>
      </div>

      <div className="rounded-lg border border-steel/30 bg-steel-pale/60 p-4 mb-4">
        <p className="text-xs font-bold text-navy uppercase tracking-widest mb-1">Recovery Factor Scenario</p>
        <p className="text-sm text-gray-600 mb-2">RF: <span className="font-bold text-navy">{Number(inputs.rfScenario || 0).toFixed(1)}%</span></p>
        <p className="text-sm text-gray-700">Recoverable Reserves: <span className="font-bold text-navy">{fmt(scenarioReserves)} MMSTB</span></p>
        <p className={`text-sm font-bold ${scenarioNpvMM > 0 ? 'text-emerald-700' : 'text-red-700'}`}>Scenario NPV: {fmtMoneyMM(scenarioNpvMM)}</p>
      </div>

      <h3 className="text-xs font-bold text-navy uppercase tracking-widest mb-3">Recoverable Reserves &amp; Economics</h3>

      <MetricCard label="1P Reserves" badge={<Badge label="Proved" colorClass="bg-red-100 text-red-700" />} valueMain={hasData ? fmt(r1p) : '\u2014'} valueSub={hasData ? `RF = ${inputs.rfLow}%` : null} netRevenue={netRevenue1pMM} npv={npv1pMM} hasData={hasData} />
      <MetricCard label="2P Reserves" badge={<Badge label="Proved + Probable" colorClass="bg-amber-100 text-amber-700" />} valueMain={hasData ? fmt(r2p) : '\u2014'} valueSub={hasData ? `RF = ${inputs.rfBest}%` : null} netRevenue={netRevenue2pMM} npv={npv2pMM} hasData={hasData} highlight />
      <MetricCard label="3P Reserves" badge={<Badge label="Proved + Probable + Possible" colorClass="bg-emerald-100 text-emerald-700" />} valueMain={hasData ? fmt(r3p) : '\u2014'} valueSub={hasData ? `RF = ${inputs.rfHigh}%` : null} netRevenue={netRevenue3pMM} npv={npv3pMM} hasData={hasData} />

      <div className="mt-auto pt-3 space-y-3">
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Economic Summary</p>
          <p className="text-sm text-gray-700">Net Revenue per barrel = Oil Price × (1 - Royalty%) - OPEX</p>
          <p className="text-sm font-semibold text-navy">= ${Number(netRevenuePerBbl || 0).toFixed(2)}/bbl</p>
          <p className="text-xs text-gray-500 mt-1">Discount rate input: {inputs.discountRate}% (for screening context)</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Summary</p>
          <p className="text-sm text-amber-900 leading-relaxed">{summaryText}</p>
        </div>
      </div>
    </div>
  );
}
