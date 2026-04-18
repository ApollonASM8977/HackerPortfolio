// © 2026 Aboubacar Sidick Meite (ApollonIUGB77) — All Rights Reserved

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  onSolve: () => void;
}

// Level configs
const L1_FLAG = 'CTF{r3fl3ct3d_xss}';
const L2_FLAG = 'CTF{d0m_b4s3d_xss}';
const L3_FLAG = 'CTF{xss_f1lt3r_byp4ss}';

function checkL2(answer: string): boolean {
  const a = answer.trim().toLowerCase();
  return a === 'dom-based' || a === 'dom based' || a === 'dom';
}

function checkL3(answer: string): boolean {
  const a = answer.trim().toLowerCase();
  return (
    a.includes('img') ||
    a.includes('svg') ||
    a.includes('onerror') ||
    a.includes('iframe')
  );
}

const SNIPPET_A = `echo "<p>Hello, " . $_GET['name'] . "</p>";`;
const SNIPPET_B = `echo "<p>Hello, " . htmlspecialchars($_GET['name']) . "</p>";`;

const DOM_CODE = `<div id="output"></div>
<script>
  document.getElementById('output').innerHTML = location.hash.slice(1);
</script>`;

const FILTER_CODE = `// Filter applied:
input = input.replace(/script/gi, '');
// Result still vulnerable! What tag bypasses this filter?`;

export function XSSChallenge({ onSolve }: Props) {
  const [currentLevel, setCurrentLevel] = useState(0);

  // Level 1
  const [l1Choice, setL1Choice] = useState<'A' | 'B' | null>(null);
  const [l1Status, setL1Status] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Level 2
  const [l2Input, setL2Input] = useState('');
  const [l2Status, setL2Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [l2HintVisible, setL2HintVisible] = useState(false);

  // Level 3
  const [l3Input, setL3Input] = useState('');
  const [l3Status, setL3Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [l3HintVisible, setL3HintVisible] = useState(false);

  function handleL1Choice(choice: 'A' | 'B') {
    if (l1Status === 'correct') return;
    setL1Choice(choice);
    if (choice === 'A') {
      setL1Status('correct');
      setTimeout(() => {
        setCurrentLevel(1);
        setL1Status('idle');
      }, 1000);
    } else {
      setL1Status('wrong');
    }
  }

  function handleL2Verify() {
    if (checkL2(l2Input)) {
      setL2Status('correct');
      setTimeout(() => {
        setCurrentLevel(2);
        setL2Status('idle');
        setL2Input('');
      }, 1000);
    } else {
      setL2Status('wrong');
    }
  }

  function handleL3Verify() {
    if (checkL3(l3Input)) {
      setL3Status('correct');
      setTimeout(() => {
        onSolve();
      }, 1200);
    } else {
      setL3Status('wrong');
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Level progress */}
      <div className="flex gap-2 mb-4">
        {[0, 1, 2].map(i => (
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
              <span className="font-mono text-xs" style={{ color: '#00ff41' }}>LEVEL 1 / 3</span>
              <span className="font-mono text-xs" style={{ color: '#444' }}>Identify the Vulnerability</span>
            </div>

            <div
              className="font-mono text-xs px-3 py-2 rounded"
              style={{ background: '#0d1117', border: '1px solid #1a2332', color: '#888' }}
            >
              Reflected XSS occurs when unsanitized user input is inserted directly into HTML.
              Review these two PHP snippets and identify the vulnerable one.
            </div>

            {/* Snippet A */}
            <div>
              <div className="font-mono text-xs mb-1" style={{ color: '#ffd700' }}>Snippet A:</div>
              <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-4 font-mono text-xs text-[#00ff41] overflow-x-auto">
                <span style={{ color: '#888' }}>{'<?php\n'}</span>
                {SNIPPET_A}
              </div>
            </div>

            {/* Snippet B */}
            <div>
              <div className="font-mono text-xs mb-1" style={{ color: '#00cfff' }}>Snippet B:</div>
              <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-4 font-mono text-xs text-[#00ff41] overflow-x-auto">
                <span style={{ color: '#888' }}>{'<?php\n'}</span>
                {SNIPPET_B}
              </div>
            </div>

            <div className="font-mono text-xs" style={{ color: '#888' }}>
              &gt; Which snippet is vulnerable to Reflected XSS?
            </div>

            {/* Choice buttons */}
            <div className="flex gap-3">
              {(['A', 'B'] as const).map(opt => (
                <button
                  key={opt}
                  onClick={() => handleL1Choice(opt)}
                  className="font-mono text-sm px-6 py-2 rounded transition-all"
                  style={{
                    border: l1Choice === opt
                      ? opt === 'A' ? '1px solid #00ff41' : '1px solid #ff4444'
                      : '1px solid #1a2332',
                    background: l1Choice === opt
                      ? opt === 'A' ? '#00ff4122' : '#ff444422'
                      : 'transparent',
                    color: l1Choice === opt
                      ? opt === 'A' ? '#00ff41' : '#ff4444'
                      : '#555',
                  }}
                >
                  Snippet {opt}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {l1Status === 'correct' && (
                <motion.div
                  key="ok1"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-1 text-xs font-mono"
                  style={{ color: '#00ff41' }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} />
                    ✓ Correct! FLAG: {L1_FLAG}
                  </div>
                  <div style={{ color: '#555' }}>
                    Snippet A directly inserts user input into HTML without sanitization.
                  </div>
                </motion.div>
              )}
              {l1Status === 'wrong' && (
                <motion.div
                  key="no1"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs font-mono"
                  style={{ color: '#ff4444' }}
                >
                  <XCircle size={14} />
                  ✗ Incorrect. Look at which snippet sanitizes input.
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
              <span className="font-mono text-xs" style={{ color: '#00ff41' }}>LEVEL 2 / 3</span>
              <span className="font-mono text-xs" style={{ color: '#444' }}>Craft the Payload</span>
            </div>

            <div
              className="font-mono text-xs px-3 py-2 rounded"
              style={{ background: '#0d1117', border: '1px solid #1a2332', color: '#888' }}
            >
              Examine where user input originates and where it is written to the DOM.
              Identify the type of XSS present in this code.
            </div>

            {/* Code block */}
            <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-4 font-mono text-xs text-[#00ff41] overflow-x-auto whitespace-pre">
              {DOM_CODE}
            </div>

            {/* Hint button */}
            <button
              onClick={() => setL2HintVisible(true)}
              disabled={l2HintVisible}
              className="text-xs font-mono px-3 py-1.5 rounded transition-all self-start"
              style={{
                border: '1px solid #1a2332',
                color: l2HintVisible ? '#555' : '#00ff4188',
                background: 'transparent',
              }}
            >
              💡 {l2HintVisible ? 'Hint shown' : 'Show hint'}
            </button>

            <AnimatePresence>
              {l2HintVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="font-mono text-xs px-3 py-2 rounded"
                  style={{ background: '#0a1a0a', border: '1px solid #00ff4133', color: '#00ff4188' }}
                >
                  Hint: Look at where the user input comes from and where it&apos;s written
                </motion.div>
              )}
            </AnimatePresence>

            <div className="font-mono text-xs" style={{ color: '#888' }}>
              &gt; What type of XSS is this? (DOM-based / Stored / Reflected)
            </div>

            <input
              value={l2Input}
              onChange={e => {
                setL2Input(e.target.value);
                if (l2Status === 'wrong') setL2Status('idle');
              }}
              onKeyDown={e => { if (e.key === 'Enter') handleL2Verify(); }}
              placeholder="Type the XSS type..."
              className="bg-transparent border border-[#1a2332] rounded px-3 py-2 text-[#00ff41] font-mono text-xs w-full outline-none focus:border-[#00ff4166]"
              autoComplete="off"
              spellCheck={false}
            />

            <button
              onClick={handleL2Verify}
              disabled={!l2Input.trim() || l2Status === 'correct'}
              className="font-mono text-xs px-4 py-2 rounded transition-all self-start"
              style={{
                background: '#00ff4122',
                border: '1px solid #00ff4166',
                color: '#00ff41',
                opacity: !l2Input.trim() ? 0.4 : 1,
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
                    ✓ Correct! FLAG: {L2_FLAG}
                  </div>
                  <div style={{ color: '#555' }}>
                    DOM-based XSS: input from location.hash is written to innerHTML — never touches the server!
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
                  ✗ Incorrect. Try again. (hint: where does the data come from — server or client?)
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── LEVEL 3 ── */}
        {currentLevel === 2 && (
          <motion.div
            key="l3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs" style={{ color: '#00ff41' }}>LEVEL 3 / 3</span>
              <span className="font-mono text-xs" style={{ color: '#444' }}>Find the Bypass</span>
            </div>

            <div
              className="font-mono text-xs px-3 py-2 rounded"
              style={{ background: '#0d1117', border: '1px solid #1a2332', color: '#888' }}
            >
              A naive XSS filter strips{' '}
              <span style={{ color: '#ff6b6b' }}>&lt;script&gt;</span> tags — but the page is still
              vulnerable. What HTML tag can execute JavaScript without{' '}
              <span style={{ color: '#ff6b6b' }}>&lt;script&gt;</span>?
            </div>

            {/* Code block */}
            <div className="bg-[#020408] border border-[#1a2332] rounded-lg p-4 font-mono text-xs text-[#00ff41] overflow-x-auto whitespace-pre">
              {FILTER_CODE}
            </div>

            {/* Hint button */}
            <button
              onClick={() => setL3HintVisible(true)}
              disabled={l3HintVisible}
              className="text-xs font-mono px-3 py-1.5 rounded transition-all self-start"
              style={{
                border: '1px solid #1a2332',
                color: l3HintVisible ? '#555' : '#00ff4188',
                background: 'transparent',
              }}
            >
              💡 {l3HintVisible ? 'Hint shown' : 'Show hint'}
            </button>

            <AnimatePresence>
              {l3HintVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="font-mono text-xs px-3 py-2 rounded"
                  style={{ background: '#0a1a0a', border: '1px solid #00ff4133', color: '#00ff4188' }}
                >
                  Hint: You don&apos;t need &lt;script&gt; tags to execute JavaScript
                </motion.div>
              )}
            </AnimatePresence>

            <div className="font-mono text-xs" style={{ color: '#888' }}>
              &gt; What tag (or attribute) bypasses this filter?
            </div>

            <input
              value={l3Input}
              onChange={e => {
                setL3Input(e.target.value);
                if (l3Status === 'wrong') setL3Status('idle');
              }}
              onKeyDown={e => { if (e.key === 'Enter') handleL3Verify(); }}
              placeholder='e.g. <img>, svg, onerror...'
              className="bg-transparent border border-[#1a2332] rounded px-3 py-2 text-[#00ff41] font-mono text-xs w-full outline-none focus:border-[#00ff4166]"
              autoComplete="off"
              spellCheck={false}
            />

            <button
              onClick={handleL3Verify}
              disabled={!l3Input.trim() || l3Status === 'correct'}
              className="font-mono text-xs px-4 py-2 rounded transition-all self-start"
              style={{
                background: '#00ff4122',
                border: '1px solid #00ff4166',
                color: '#00ff41',
                opacity: !l3Input.trim() ? 0.4 : 1,
              }}
            >
              [ VERIFY ]
            </button>

            <AnimatePresence mode="wait">
              {l3Status === 'correct' && (
                <motion.div
                  key="ok3"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-1 text-xs font-mono"
                  style={{ color: '#00ff41' }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} />
                    ✓ Correct! FLAG: {L3_FLAG}
                  </div>
                  <div style={{ color: '#555' }}>
                    {`<img src=x onerror=alert(1)>`} and {`<svg onload=...>`} bypass script-only filters!
                    Always use a proper allowlist, never a blocklist.
                  </div>
                </motion.div>
              )}
              {l3Status === 'wrong' && (
                <motion.div
                  key="no3"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs font-mono"
                  style={{ color: '#ff4444' }}
                >
                  <XCircle size={14} />
                  ✗ Incorrect. Think about HTML tags with event handler attributes.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
