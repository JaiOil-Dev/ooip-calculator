function Badge({ label, colorClass }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${colorClass}`}>
      {label}
    </span>
  );
}

function MetricCard({ label, badge, valueMain, valueSub, revenue, highlight }) {
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
      {revenue !== undefined && (
        <div className="mt-2 pt-2 border-t border-gray-200 flex items-center gap-1">
          <span className="text-xs text-gray-500">Gross Revenue:</span>
          <span className="text-sm font-bold text-emerald-700">{revenue}</span>
        </div>
      )}
    </div>
  );
}

function fmt(val) {
  if (!val || isNaN(val)) return '\u2014';
  return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtRev(rev) {
  if (!rev || isNaN(rev)) return '\u2014';
  if (rev >= 1e9) return `$${(rev / 1e9).toFixed(2)}B`;
  if (rev >= 1e6) return `$${(rev / 1e6).toFixed(1)}M`;
  return `$${rev.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export default function ResultsPanel({ results, inputs }) {
  const { ooipSTB, ooipMMSTB, r1p, r2p, r3p, rev1p, rev2p, rev3p } = results;
  const hasData = ooipSTB > 0;

  const summaryText = hasData
    ? `This reservoir contains approximately ${fmt(ooipMMSTB)} MMSTB of oil in place. At a ${inputs.rfBest}% recovery factor, recoverable reserves are ${fmt(r2p)} MMSTB with estimated gross value of ${fmtRev(rev2p)} at $${inputs.oilPrice}/bbl.`
    : 'Enter reservoir parameters to calculate OOIP and recoverable reserves.';

  return (
    <div className="flex flex-col h-full">
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

      <h3 className="text-xs font-bold text-navy uppercase tracking-widest mb-3">Recoverable Reserves</h3>

      <MetricCard label="1P Reserves" badge={<Badge label="Proved" colorClass="bg-red-100 text-red-700" />} valueMain={hasData ? fmt(r1p) : '\u2014'} valueSub={hasData ? `RF = ${inputs.rfLow}%` : null} revenue={hasData ? fmtRev(rev1p) : undefined} />
      <MetricCard label="2P Reserves" badge={<Badge label="Proved + Probable" colorClass="bg-amber-100 text-amber-700" />} valueMain={hasData ? fmt(r2p) : '\u2014'} valueSub={hasData ? `RF = ${inputs.rfBest}%` : null} revenue={hasData ? fmtRev(rev2p) : undefined} highlight />
      <MetricCard label="3P Reserves" badge={<Badge label="Proved + Probable + Possible" colorClass="bg-emerald-100 text-emerald-700" />} valueMain={hasData ? fmt(r3p) : '\u2014'} valueSub={hasData ? `RF = ${inputs.rfHigh}%` : null} revenue={hasData ? fmtRev(rev3p) : undefined} />

      <div className="mt-auto pt-3">
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">Summary</p>
          <p className="text-sm text-amber-900 leading-relaxed">{summaryText}</p>
        </div>
      </div>
    </div>
  );
}
