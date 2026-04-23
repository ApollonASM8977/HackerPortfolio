// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useState } from 'react';

type Step = 'login' | 'dumping' | 'done';

// Simulate vulnerable SQL login
function simulateLogin(username: string, password: string): { success: boolean; message: string; query: string; data?: string } {
  const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

  // Classic SQL injection: ' OR '1'='1
  const injectionPatterns = [
    /'\s*or\s*'1'\s*=\s*'1/i,
    /'\s*or\s*1\s*=\s*1/i,
    /'\s*--/i,
    /'\s*#/i,
    /'\s*\/\*/i,
    /admin'--/i,
    /'\s*or\s*'a'\s*=\s*'a/i,
    /'\s*or\s*true/i,
  ];

  const isInjected = injectionPatterns.some(p => p.test(username) || p.test(password));

  if (isInjected) {
    return {
      success: true,
      query,
      message: 'Access granted — SQL injection successful!',
      data: 'admin | hash:5f4dcc3b5aa765d61d8327deb882cf99 | role:ADMIN',
    };
  }

  // Normal login check
  if (username === 'admin' && password === 'secret_p@ss') {
    return { success: true, query, message: 'Login successful (legitimate)' };
  }

  return { success: false, query, message: 'Invalid credentials' };
}

export function SQLChallenge({ onSolve }: { onSolve: () => void }) {
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [result, setResult]         = useState<ReturnType<typeof simulateLogin> | null>(null);
  const [step, setStep]             = useState<Step>('login');
  const [dumpInput, setDumpInput]   = useState('');
  const [dumpResult, setDumpResult] = useState<string | null>(null);
  const [showHint, setShowHint]     = useState(false);
  const [solved, setSolved]         = useState(false);

  const handleLogin = () => {
    const res = simulateLogin(username, password);
    setResult(res);
    if (res.success && res.data) {
      setStep('dumping');
    }
  };

  const handleDump = () => {
    const q = dumpInput.trim().toUpperCase();
    if (
      q.includes('UNION') && q.includes('SELECT') ||
      q.includes("1' UNION") ||
      q.includes("' UNION SELECT") ||
      q.includes("UNION SELECT NULL") ||
      q.includes("INFORMATION_SCHEMA") ||
      q.includes("TABLE_NAME")
    ) {
      setDumpResult(
        'users:\n  id | username | password_hash                      | role\n  1  | admin    | 5f4dcc3b5aa765d61d8327deb882cf99  | ADMIN\n  2  | alice    | d8578edf8458ce06fbc5bb76a58c5ca4  | USER\n  3  | bob      | 37b4e2d82900d5e94b8da524fbeb33c0  | USER\n\nFLAG{sql_1nj3ct10n_byp4ss3d_4uth3nt1c4t10n}'
      );
      setSolved(true);
      setTimeout(onSolve, 800);
    } else {
      setDumpResult("Error: syntax error near '" + dumpInput + "'");
    }
  };

  return (
    <div className="space-y-4 font-mono text-sm">
      {/* Explanation */}
      <div className="text-xs text-[#666] border border-[#1a2332] rounded p-3">
        <span className="text-[#ff0040]">âš  VULNERABLE LOGIN FORM</span> — The query is:{' '}
        <span className="text-[#ffcc00]">SELECT * FROM users WHERE username='{`{input}`}' AND password='{`{input}`}'</span>
        <br />Goal: bypass authentication using SQL injection, then dump the database.
      </div>

      {/* Login form */}
      <div className="bg-black rounded border border-[#1a2332] p-4 space-y-3">
        <div className="text-[#00d4ff] text-xs font-bold">ðŸ” VULNERABLE LOGIN PANEL</div>
        <div>
          <label className="text-[#666] text-xs block mb-1">Username:</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full bg-[#0a0a0a] border border-[#1a2332] rounded px-3 py-2 text-xs text-[#00ff41] placeholder-[#333] outline-none focus:border-[#00ff41] transition-colors"
          />
        </div>
        <div>
          <label className="text-[#666] text-xs block mb-1">Password:</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Enter password"
            type={showHint ? 'text' : 'password'}
            className="w-full bg-[#0a0a0a] border border-[#1a2332] rounded px-3 py-2 text-xs text-[#00ff41] placeholder-[#333] outline-none focus:border-[#00ff41] transition-colors"
          />
        </div>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-[#1a2332] border border-[#00d4ff] text-[#00d4ff] text-xs rounded hover:bg-[#00d4ff11] transition-all"
        >
          LOGIN
        </button>
      </div>

      {/* Query preview */}
      {(username || password) && (
        <div className="bg-black rounded p-2 border border-[#1a2332]">
          <div className="text-[#666] text-xs mb-1">Generated SQL query:</div>
          <div className="text-xs text-[#ffcc00] break-all">
            SELECT * FROM users WHERE username='<span className="text-[#ff6b6b]">{username}</span>' AND password='<span className="text-[#ff6b6b]">{password}</span>'
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`rounded p-3 border text-xs ${result.success ? 'border-[#00ff4133] bg-[#00ff4108]' : 'border-[#ff004033] bg-[#ff000008]'}`}>
          <div className={`font-bold ${result.success ? 'text-[#00ff41]' : 'text-[#ff0040]'}`}>
            {result.success ? 'âœ“' : 'âœ—'} {result.message}
          </div>
          {result.data && <div className="text-[#ccc] mt-1">{result.data}</div>}
        </div>
      )}

      {/* Step 2: Dump DB */}
      {step === 'dumping' && (
        <div className="border-t border-[#1a2332] pt-4 space-y-3">
          <div className="text-[#00d4ff] text-xs font-bold">Step 2 — Dump the database using UNION injection:</div>
          <div className="text-[#666] text-xs">Try: <span className="text-[#ffcc00]">{"' UNION SELECT table_name FROM information_schema.tables --"}</span></div>
          <div className="flex gap-2">
            <input
              value={dumpInput}
              onChange={e => setDumpInput(e.target.value)}
              placeholder="' UNION SELECT ..."
              className="flex-1 bg-black border border-[#1a2332] rounded px-3 py-2 text-xs text-[#00ff41] placeholder-[#333] outline-none focus:border-[#ffcc00]"
            />
            <button
              onClick={handleDump}
              className="px-3 py-1 text-xs border border-[#ffcc00] text-[#ffcc00] rounded hover:bg-[#ffcc0011] transition-all"
            >
              Inject
            </button>
          </div>
          {dumpResult && (
            <pre className={`text-xs rounded p-3 border whitespace-pre-wrap ${solved ? 'border-[#00ff4133] text-[#00ff41] glow-green' : 'border-[#ff004033] text-[#ff6b6b]'}`}>
              {dumpResult}
            </pre>
          )}
        </div>
      )}

      {/* Hint */}
      <button
        onClick={() => setShowHint(!showHint)}
        className="text-xs text-[#666] hover:text-[#ffcc00] border border-[#1a2332] px-3 py-1 rounded transition-all"
      >
        {showHint ? 'Hide hint' : 'ðŸ’¡ Hint'}
      </button>
      {showHint && (
        <div className="text-xs text-[#ffcc00] bg-[#1a1500] border border-[#ffcc0033] rounded p-2 space-y-1">
          <div>Step 1 — Bypass login: try <span className="text-white">username = <span className="text-[#ff6b6b]">admin' OR '1'='1</span></span></div>
          <div>Step 2 — Dump DB: use UNION + information_schema</div>
        </div>
      )}

      {solved && (
        <div className="text-center text-[#00ff41] font-bold glow-green py-2">
          ðŸŽ‰ DATABASE DUMPED! FLAG captured!
        </div>
      )}
    </div>
  );
}

