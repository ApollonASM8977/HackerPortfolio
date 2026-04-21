// Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved
import { useState } from 'react';

// Pre-computed MD5 hashes (educational only)
const CHALLENGES = [
  {
    hash: '5f4dcc3b5aa765d61d8327deb882cf99',
    type: 'MD5',
    answer: 'password',
    hint: 'Most common password in the world',
    wordlist: ['admin', 'password', '123456', 'letmein', 'qwerty', 'monkey', 'football', 'dragon'],
  },
  {
    hash: '482c811da5d5b4bc6d497ffa98491e38',
    type: 'MD5',
    answer: 'password123',
    hint: 'password + 3 digits',
    wordlist: ['password1', 'password12', 'password123', 'password1234', 'pass123', 'p@ssword'],
  },
  {
    hash: 'b14361404c078ffd549c03db604c0c84',
    type: 'MD5',
    answer: '0987654321',
    hint: 'Reversed sequence of digits',
    wordlist: ['1234567890', '0987654321', '9876543210', '12345678', '87654321'],
  },
];

// Simple MD5-like simulation using a lookup table approach (pre-defined)
const HASH_MAP: Record<string, string> = {
  'admin':          '21232f297a57a5a743894a0e4a801fc3',
  'password':       '5f4dcc3b5aa765d61d8327deb882cf99',
  '123456':         'e10adc3949ba59abbe56e057f20f883e',
  'letmein':        '0d107d09f5bbe40cade3de5c71e9e9b7',
  'qwerty':         'd8578edf8458ce06fbc5bb76a58c5ca4',
  'monkey':         '1f0648c955540db88e02e17e8245b2f2',
  'football':       '37b4e2d82900d5e94b8da524fbeb33c0',
  'dragon':         '8621ffdbc5698829397d97767ac13db3',
  'password1':      '7c6a180b36896a0a8c02787eeafb0e4c',
  'password12':     'b59c67bf196a4758191e42f76670ceba',
  'password123':    '482c811da5d5b4bc6d497ffa98491e38',
  'password1234':   'f64c413ca36f5cfe643ddbec4f7d92d0',
  'pass123':        '1ba3d16e9881959f8c9a9762854f72c8',
  'p@ssword':       'e7e5a0c48baa0b5e6a21deac25f6ae04',
  '1234567890':     'e807f1fcf82d132f9bb018ca6738a19f',
  '0987654321':     'b14361404c078ffd549c03db604c0c84',
  '9876543210':     'b3f3f65e39b2acccf91b20b2b7a26c2e',
  '12345678':       '25d55ad283aa400af464c76d713c07ad',
  '87654321':       'c56f04e2fd0bac9c0a7c6e3fbdf4108a',
};

export function HashChallenge({ onSolve }: { onSolve: () => void }) {
  const [level, setLevel]       = useState(0);
  const [cracking, setCracking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult]     = useState<string | null>(null);
  const [solved, setSolved]     = useState<boolean[]>([false, false, false]);
  const [manualInput, setManualInput] = useState('');
  const [manualResult, setManualResult] = useState<string | null>(null);

  const current = CHALLENGES[level];

  const runWordlist = () => {
    setCracking(true);
    setResult(null);
    setProgress(0);
    const wl = current.wordlist;
    let i = 0;
    const interval = setInterval(() => {
      setProgress(Math.round(((i + 1) / wl.length) * 100));
      const word = wl[i];
      const hash = HASH_MAP[word];
      if (hash === current.hash) {
        setResult(`âœ“ CRACKED: "${word}"`);
        clearInterval(interval);
        setCracking(false);
        const newSolved = [...solved];
        newSolved[level] = true;
        setSolved(newSolved);
        if (newSolved.every(Boolean)) setTimeout(onSolve, 500);
        return;
      }
      i++;
      if (i >= wl.length) {
        setResult('âœ— Not in wordlist â€” try manual input');
        clearInterval(interval);
        setCracking(false);
      }
    }, 220);
  };

  const checkManual = () => {
    const hash = HASH_MAP[manualInput.toLowerCase()];
    if (hash === current.hash) {
      setManualResult(`âœ“ CRACKED: "${manualInput}"`);
      const newSolved = [...solved];
      newSolved[level] = true;
      setSolved(newSolved);
      if (newSolved.every(Boolean)) setTimeout(onSolve, 500);
    } else {
      setManualResult('âœ— Wrong â€” that hash doesn\'t match');
    }
  };

  return (
    <div className="space-y-4 font-mono text-sm">
      {/* Level tabs */}
      <div className="flex gap-2">
        {CHALLENGES.map((_c, i) => (
          <button key={i}
            onClick={() => { setLevel(i); setResult(null); setProgress(0); setCracking(false); setManualResult(null); }}
            className={`px-3 py-1 text-xs rounded border transition-all ${
              level === i ? 'border-[#ffcc00] text-[#ffcc00]' :
              solved[i]  ? 'border-[#00ff4133] text-[#00ff4166]' :
                           'border-[#1a2332] text-[#666]'
            }`}
          >
            {solved[i] ? 'âœ“ ' : ''}Hash {i + 1}
          </button>
        ))}
      </div>

      {/* Hash display */}
      <div className="bg-black rounded p-3 border border-[#1a2332]">
        <div className="text-[#666] text-xs mb-1">TARGET HASH ({current.type}):</div>
        <div className="text-[#ff6b6b] font-bold text-xs break-all tracking-wider">{current.hash}</div>
      </div>

      {/* Wordlist attack */}
      <div>
        <div className="text-[#666] text-xs mb-2">DICTIONARY ATTACK â€” wordlist ({current.wordlist.length} entries):</div>
        <div className="flex flex-wrap gap-1 mb-3">
          {current.wordlist.map((w, _idx) => (
            <span key={w} className="text-xs px-2 py-0.5 bg-[#0a0a0a] border border-[#1a2332] text-[#aaa] rounded">{w}</span>
          ))}
        </div>

        <button
          onClick={runWordlist}
          disabled={cracking || solved[level]}
          className={`px-4 py-2 text-xs rounded border font-bold transition-all ${
            solved[level] ? 'border-[#00ff4133] text-[#00ff4166] cursor-default' :
            cracking ? 'border-[#ffcc0033] text-[#ffcc00] cursor-wait animate-pulse' :
            'border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc0011]'
          }`}
        >
          {cracking ? 'âš¡ Cracking...' : solved[level] ? 'âœ“ Solved' : 'âš¡ Run Wordlist Attack'}
        </button>

        {cracking && (
          <div className="mt-2">
            <div className="skill-bar">
              <div className="skill-bar-fill" style={{ width: `${progress}%`, background: '#ffcc00' }} />
            </div>
            <div className="text-[#ffcc00] text-xs mt-1">{progress}% complete</div>
          </div>
        )}

        {result && (
          <div className={`mt-2 text-sm font-bold ${result.startsWith('âœ“') ? 'text-[#00ff41] glow-green' : 'text-[#ff6b6b]'}`}>
            {result}
          </div>
        )}
      </div>

      {/* Manual brute force */}
      <div className="border-t border-[#1a2332] pt-3">
        <div className="text-[#666] text-xs mb-2">MANUAL INPUT (hint: {current.hint}):</div>
        <div className="flex gap-2">
          <input
            value={manualInput}
            onChange={e => setManualInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkManual()}
            placeholder="Type your guess..."
            className="terminal-input flex-1 bg-black border border-[#1a2332] rounded px-3 py-1 text-xs text-[#00ff41] placeholder-[#333]"
          />
          <button
            onClick={checkManual}
            className="px-3 py-1 text-xs border border-[#00ff41] text-[#00ff41] rounded hover:bg-[#00ff4111] transition-all"
          >
            Check
          </button>
        </div>
        {manualResult && (
          <div className={`mt-1 text-xs font-bold ${manualResult.startsWith('âœ“') ? 'text-[#00ff41]' : 'text-[#ff6b6b]'}`}>
            {manualResult}
          </div>
        )}
      </div>

      {solved.every(Boolean) && (
        <div className="text-center text-[#00ff41] font-bold glow-green py-2">
          ðŸ”“ ALL HASHES CRACKED! You're a password auditor!
        </div>
      )}
    </div>
  );
}

