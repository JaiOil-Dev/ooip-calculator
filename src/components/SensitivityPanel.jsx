import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const COLORS = { highest: '#f59e0b', normal: '#2E75B6' };

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-navy-dark text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-steel/30">
        <p className="font-bold mb-1">{d.name}</p>
        <p>+10%: <span className="text-green-300">+{d.pctUp.toFixed(1)}%</span> OOIP</p>
        <p>-10%: <span className="text-red-300">{d.pctDown.toFixed(1)}%</span> OOIP</p>
      </div>
    );
  }
  return null;
}

export default function SensitivityPanel({ sensitivity, hasData }) {
  if (!hasData || !sensitivity.length) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-gray-400">
        <div className="text-4xl mb-3">📊</div>
        <p className="text-sm text-center">Enter all reservoir parameters to see sensitivity analysis.</p>
      </div>
    );
  }

  const topVar = sensitivity[0];
  const chartData = sensitivity.map((s) => ({
    name: s.name,
    impact: parseFloat(s.impact.toFixed(1)),
    pctUp: s.pctUp,
    pctDown: s.pctDown,
    isTop: s.key === topVar.key,
  }));

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xs font-bold text-navy uppercase tracking-widest mb-4">
        Sensitivity Analysis &mdash; &plusmn;10% Change
      </h3>

      <div className="bg-amber-50 border-2 border-amber-400 rounded-lg px-4 py-2.5 mb-4 flex items-center gap-2">
        <span className="text-amber-500 text-xl">&#9888;</span>
        <div>
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Key Uncertainty</p>
          <p className="text-sm font-semibold text-amber-900">{topVar.name}</p>
          <p className="text-xs text-amber-700">&plusmn;10% &rarr; OOIP changes &plusmn;{topVar.impact.toFixed(1)}%</p>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
            <XAxis type="number" domain={[0, 15]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 10, fill: '#374151' }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(46,117,182,0.08)' }} />
            <Bar dataKey="impact" radius={[0, 4, 4, 0]} barSize={18}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.isTop ? COLORS.highest : COLORS.normal} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Ranked by Impact</p>
        <div className="space-y-1.5">
          {sensitivity.map((s, idx) => (
            <div
              key={s.key}
              className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs ${
                idx === 0 ? 'bg-amber-50 border border-amber-300' : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  idx === 0 ? 'bg-amber-400 text-white' : 'bg-gray-300 text-gray-600'
                }`}>{idx + 1}</span>
                <span className={`font-medium ${idx === 0 ? 'text-amber-900' : 'text-gray-700'}`}>{s.name}</span>
              </div>
              <span className={`font-bold ${idx === 0 ? 'text-amber-700' : 'text-steel'}`}>&plusmn;{s.impact.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-400 leading-relaxed">
          Each variable changed by 10% while others are held constant. Area, Net Pay, and Porosity have a 1:1 linear relationship with OOIP.
        </p>
      </div>
    </div>
  );
}
