// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LEVELS = [
  {
    title: 'Level 1 — CharCode Array',
    lang: 'javascript',
    code: `[70,76,65,71,123,106,115,95,48,98,102,125]
  .map(c => String.fromCharCode(c))
  .join('')`,
    question: 'What string does this JavaScript produce?',
    hint: 'Run it in your browser console (F12 ↑ Console) or decode manually:\n70=F  76=L  65=A  71=G  123={  106=j  115=s  95=_  48=0  98=b  102=f  125=}',
    flag: 'FLAG{js_0bf}',
    check: (a: string) => a.trim() === 'FLAG{js_0bf}',
  },
  {
    title: 'Level 2 — eval(atob(...))',
    lang: 'javascript',
    code: `eval(atob("YWxlcnQoIkNURntqc19ldmFsX2lzX2Rhbmdlcm91c30iKQ=="))`,
    question: 'What flag does this execute? Decode the Base64 argument.',
    hint: 'Run in console: atob("YWxlcnQoIkNURntqc19ldmFsX2lzX2Rhbmdlcm91c30iKQ==")\nDecodes to: alert("CTF{js_eval_is_dangerous}")',
    flag: 'CTF{js_eval_is_dangerous}',
    check: (a: string) => a.trim().toLowerCase() === 'ctf{js_eval_is_dangerous}',
  },
  {
    title: 'Level 3 — Python chr() Array',
    lang: 'python',
    code: `exec(''.join([chr(x) for x in [
  112,114,105,110,116,40,39,
  67, 84, 70,123,112,121,116,
  104, 48,110, 95,100, 51, 99,
   48,100, 51,114,125, 39, 41
]]))`,
    question: 'What does this Python code print?',
    hint: 'Decode chr() values:\nDecodes to: print(\'CTF{pyth0n_d3c0d3r}\')',
    flag: 'CTF{pyth0n_d3c0d3r}',
    check: (a: string) => a.trim().toLowerCase() === 'ctf{pyth0n_d3c0d3r}',
  },
];

export function ObfuscationChallenge({ onSolve }: { onSolve: () => void }) {
  const [level, setLevel]     = useState(0);
  const [input, setInput]     = useState('');
  const [status, setStatus]   = useState<'idle' | 'ok' | 'err'>('idle');
  const [showHint, setShowHint] = useState(false);

  const verify = () => {
    if (LEVELS[level].check(input)) {
      setStatus('ok');
      setTimeout(() => {
        if (level === LEVELS.length - 1) { onSolve(); return; }
        setLevel(l => l + 1);
        setInput(''); setStatus('idle'); setShowHint(false);
      }, 1200);
    } else {
      setStatus('err');
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  const cur = LEVELS[level];

  return (
    <div className="flex flex-col gap-4">
      {/* progress */}
      <div className="flex gap-2">
        {LEVELS.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded transition-all duration-500 ${
            level > i ? 'bg-[#a855f7]' : i === level ? 'bg-[#a855f766]' : 'bg-[#1a2332]'
          }`} />
        ))}
      </div>

      <div className="text-[#a855f7] text-xs mono">{cur.title}</div>

      <AnimatePresence mode="wait">
        <motion.div key={level} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="flex flex-col gap-3">

          {/* language badge */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs mono border border-[#a855f744] text-[#a855f7] rounded">
              {cur.lang}
            </span>
          </div>

          {/* code block */}
          <pre className="bg-[#020408] border border-[#1a2332] rounded-lg p-4 mono text-xs
                          text-[#e2e8f0] overflow-x-auto whitespace-pre leading-6">
            {cur.code}
          </pre>

          <p className="text-[#555] text-xs">{cur.question}</p>
        </motion.div>
      </AnimatePresence>

      {/* hint */}
      <button
        onClick={() => setShowHint(h => !h)}
        className="text-[#444] hover:text-[#ffcc00] text-xs mono transition-colors text-left"
      >
        {showHint ? '▾' : '▸'} Hint
      </button>
      {showHint && (
        <pre className="text-[#ffcc00] text-xs mono whitespace-pre-wrap">{cur.hint}</pre>
      )}

      {/* input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && verify()}
          placeholder={`Enter the flag…`}
          className="bg-transparent border border-[#1a2332] rounded px-3 py-2 text-[#a855f7]
                     mono text-xs flex-1 outline-none focus:border-[#a855f755]"
        />
        <button
          onClick={verify}
          className="px-4 py-2 border border-[#1a2332] text-[#aaa] hover:text-white
                     hover:border-[#a855f755] rounded mono text-xs transition-colors"
        >
          Verify
        </button>
      </div>

      {status === 'ok'  && <p className="text-[#00ff41] text-xs mono">✓ Correct! Flag: {cur.flag}</p>}
      {status === 'err' && <p className="text-[#ff4444] text-xs mono">✗ Incorrect. Try again.</p>}
    </div>
  );
}

