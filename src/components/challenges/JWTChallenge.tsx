// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

interface Props {
  onSolve: () => void;
}

// JWT parts (split by '.')
const JWT_HEADER = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const JWT_PAYLOAD = 'eyJ1c2VyIjoiaGFja2VyIiwiZmxhZyI6IkNURntqd3RfaXNfbjB0X3NlY3VyZX0iLCJyb2xlIjoiYWRtaW4ifQ';
const JWT_SIG = 's3cr3tS1gn4tur3';

const JWT_L1_ANSWER = 'CTF{jwt_is_n0t_secure}';
const JWT_L1_HINT = '{"user":"hacker","flag":"CTF{jwt_is_n0t_secure}","role":"admin"}';

const MC_OPTIONS = [
  { key: 'A', label: 'HS256' },
  { key: 'B', label: 'none' },
  { key: 'C', label: 'RS256' },
  { key: 'D', label: 'ES256' },
];
const JWT_L2_ANSWER = 'B';
const JWT_L2_FLAG = 'CTF{alg_n0ne_byp4ss}';

export function JWTChallenge({ onSolve }: Props) {
  const [currentLevel, setCurrentLevel] = useState(0);

  // Level 1 state
  const [l1Input, setL1Input] = useState('');
  const [l1Status, setL1Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [l1HintVisible, setL1HintVisible] = useState(false);

  // Level 2 state
  const [l2Selected, setL2Selected] = useState<string | null>(null);
  const [l2Status, setL2Status] = useState<'idle' | 'correct' | 'wrong'>('idle');

  function handleL1Verify() {
    if (l1Input.trim().toLowerCase() === JWT_L1_ANSWER.toLowerCase()) {
      setL1Status('correct');
      setTimeout(() => {
        setCurrentLevel(1);
        setL1Status('idle');
      }, 1000);
    } else {
      setL1Status('wrong');
    }
  }

  function handleL2Select(key: string) {
    if (l2Status === 'correct') return;
    setL2Selected(key);
    setL2Status('idle');
  }

  function handleL2Verify() {
    if (!l2Selected) return;
    if (l2Selected === JWT_L2_ANSWER) {
      setL2Status('correct');
      setTimeout(() => {
        onSolve();
      }, 1200);
    } else {
      setL2Status('wrong');
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Level progress */}
      <div className="flex gap-2 mb-4">
        {[0, 1].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded transition-all duration-500 ${
              currentLevel > i ? 'bg-[#00ff41]' : i === currentLevel ? 'bg-[#00ff4188]' : 'bg-[#1a2332]'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── LEVEL 1 ── */}
        {currentLevel === 0 && (
          <motion.div
            key="l1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs" style={{ color: '#00ff41' }}>LEVEL 1 / 2</span>
              <span className="font-mono text-xs" style={{ color: '#444' }}>JWT Decode</span>
            </div>

            {/* Explanation */}
            <div
              className="font-mono text-xs px-3 py-2 rounded leading-relaxed"
              style={{ background: '#0d1117', border: '1px solid #1a2332', color: '#888' }}
            >
              A JWT has 3 parts separated by dots:{' '}
              <span style={{ color: '#ffd700' }}>Header</span>.
              <span style={{ color: '#00cfff' }}>Payload</span>.
              <span style={{ color: '#ff6b6b' }}>Signature</span>
              <br />
              The payload is Base64url encoded. Decode it to find the flag.
              <br />
              <br />
              <span style={{ color: '#555' }}>
                Tip: <span className="select-all">atob(payload.replace(/-/g,'+').replace(/_/g,'/'))</span>
              </span>
            </div>

            {/* JWT token with colored parts */}
            <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-4 font-mono text-xs overflow-x-auto break-all leading-relaxed">
              <span style={{ color: '#ffd700' }}>{JWT_HEADER}</span>
              <span style={{ color: '#555' }}>.</span>
              <span style={{ color: '#00cfff' }}>{JWT_PAYLOAD}</span>
              <span style={{ color: '#555' }}>.</span>
              <span style={{ color: '#ff6b6b88' }}>{JWT_SIG}</span>
            </div>

            {/* Hint button */}
            <button
              onClick={() => setL1HintVisible(true)}
              disabled={l1HintVisible}
              className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded transition-all self-start"
              style={{
                border: '1px solid #1a2332',
                color: l1HintVisible ? '#555' : '#00ff4188',
                background: 'transparent',
              }}
            >
              <Eye size={13} />
              {l1HintVisible ? 'Payload revealed (hint used)' : 'Reveal decoded payload (hint)'}
            </button>

            <AnimatePresence>
              {l1HintVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#020408] border border-[#00ff4133] rounded-lg p-3 font-mono text-xs overflow-x-auto"
                  style={{ color: '#00cfff99' }}
                >
                  {JWT_L1_HINT}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question */}
            <div className="font-mono text-xs" style={{ color: '#888' }}>
              &gt; Decode the payload and enter the <span style={{ color: '#00ff41' }}>flag</span> field value:
            </div>

            <input
              value={l1Input}
              onChange={e => {
                setL1Input(e.target.value);
                if (l1Status === 'wrong') setL1Status('idle');
              }}
              onKeyDown={e => { if (e.key === 'Enter') handleL1Verify(); }}
              placeholder="CTF{...}"
              className="bg-transparent border border-[#1a2332] rounded px-3 py-2 text-[#00ff41] font-mono text-xs w-full outline-none focus:border-[#00ff4166]"
              autoComplete="off"
              spellCheck={false}
            />

            <button
              onClick={handleL1Verify}
              disabled={!l1Input.trim() || l1Status === 'correct'}
              className="font-mono text-xs px-4 py-2 rounded transition-all self-start"
              style={{
                background: '#00ff4122',
                border: '1px solid #00ff4166',
                color: '#00ff41',
                opacity: !l1Input.trim() ? 0.4 : 1,
              }}
            >
              [ VERIFY ]
            </button>

            <AnimatePresence mode="wait">
              {l1Status === 'correct' && (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs font-mono"
                  style={{ color: '#00ff41' }}
                >
                  <CheckCircle size={14} />
                  âœ“ Correct! FLAG: {JWT_L1_ANSWER}
                </motion.div>
              )}
              {l1Status === 'wrong' && (
                <motion.div
                  key="no"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs font-mono"
                  style={{ color: '#ff4444' }}
                >
                  <XCircle size={14} />
                  âœ— Incorrect. Try again.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── LEVEL 2 ── */}
        {currentLevel === 1 && (
          <motion.div
            key="l2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs" style={{ color: '#00ff41' }}>LEVEL 2 / 2</span>
              <span className="font-mono text-xs" style={{ color: '#444' }}>Spot the Vulnerability</span>
            </div>

            <div
              className="font-mono text-xs px-3 py-2 rounded leading-relaxed"
              style={{ background: '#0d1117', border: '1px solid #1a2332', color: '#888' }}
            >
              Two JWTs — one uses a strong algorithm, the other has a critical flaw.
              Identify which algorithm allows <span style={{ color: '#ff6b6b' }}>bypassing signature verification</span>.
            </div>

            {/* JWT A — HS256 */}
            <div>
              <div className="font-mono text-xs mb-1" style={{ color: '#555' }}>JWT A (decoded header):</div>
              <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-3 font-mono text-xs text-[#00cfff] overflow-x-auto">
                {`{"alg":"HS256","typ":"JWT"}`}
              </div>
            </div>

            {/* JWT B — none */}
            <div>
              <div className="font-mono text-xs mb-1" style={{ color: '#555' }}>JWT B (decoded header):</div>
              <div className="bg-[#020408] border border-[#ff444433] rounded-lg p-3 font-mono text-xs text-[#ff6b6b] overflow-x-auto">
                {`{"alg":"none","typ":"JWT"}`}
              </div>
            </div>

            <div className="font-mono text-xs" style={{ color: '#888' }}>
              &gt; Which JWT algorithm is a critical security vulnerability that allows bypassing signature verification?
            </div>

            {/* Multiple choice */}
            <div className="grid grid-cols-2 gap-2">
              {MC_OPTIONS.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleL2Select(opt.key)}
                  className="font-mono text-xs px-3 py-2 rounded transition-all text-left"
                  style={{
                    border: l2Selected === opt.key
                      ? '1px solid #00ff41'
                      : '1px solid #1a2332',
                    background: l2Selected === opt.key ? '#00ff4122' : 'transparent',
                    color: l2Selected === opt.key ? '#00ff41' : '#555',
                  }}
                >
                  {opt.key}) {opt.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleL2Verify}
              disabled={!l2Selected || l2Status === 'correct'}
              className="font-mono text-xs px-4 py-2 rounded transition-all self-start"
              style={{
                background: '#00ff4122',
                border: '1px solid #00ff4166',
                color: '#00ff41',
                opacity: !l2Selected ? 0.4 : 1,
              }}
            >
              [ VERIFY ]
            </button>

            <AnimatePresence mode="wait">
              {l2Status === 'correct' && (
                <motion.div
                  key="ok2"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-1 text-xs font-mono"
                  style={{ color: '#00ff41' }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} />
                    âœ“ Correct! FLAG: {JWT_L2_FLAG}
                  </div>
                  <div style={{ color: '#555' }}>
                    The &quot;none&quot; algorithm disables signature verification — any payload is accepted!
                  </div>
                </motion.div>
              )}
              {l2Status === 'wrong' && (
                <motion.div
                  key="no2"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs font-mono"
                  style={{ color: '#ff4444' }}
                >
                  <XCircle size={14} />
                  âœ— Incorrect. Think about which algorithm removes the security guarantee.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

