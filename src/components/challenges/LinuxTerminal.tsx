// Â© 2026 Aboubacar Sidick Meite (ApollonASM8977) â€” All Rights Reserved
import { useState, useRef, useEffect } from 'react';

interface HistoryEntry { cmd: string; output: string; color?: string; }

// Virtual file system
const FS: Record<string, string> = {
  '/home/user/readme.txt':     'Welcome to ApollonASM8977\'s system.\nLook around, you might find something interesting...',
  '/home/user/flag.txt':       'FLAG{y0u_kn0w_y0ur_l1nux_c0mmands}',
  '/home/user/secret/.hidden': 'Good job finding me! Now find the flag in /root/',
  '/root/flag.txt':            'ACCESS DENIED â€” try: sudo cat /root/flag.txt',
  '/etc/passwd':               'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:ApollonASM8977:/home/user:/bin/bash',
  '/etc/hosts':                '127.0.0.1 localhost\n10.10.10.100 tryhackme.com\n192.168.1.1 gateway',
  '/home/user/notes.txt':      'Hints:\n1. Check hidden files with ls -la\n2. The flag is in a .txt file\n3. Try "find / -name flag.txt 2>/dev/null"',
};

const DIR_CHILDREN: Record<string, string[]> = {
  '/':               ['home', 'etc', 'root', 'var', 'bin', 'usr'],
  '/home':           ['user'],
  '/home/user':      ['readme.txt', 'flag.txt', 'notes.txt', 'secret'],
  '/home/user/secret': ['.hidden'],
  '/etc':            ['passwd', 'hosts', 'shadow'],
  '/root':           ['flag.txt'],
  '/var':            ['log'],
  '/bin':            ['bash', 'ls', 'cat', 'grep', 'find', 'ps'],
  '/usr':            ['share', 'bin', 'local'],
};

function resolvePath(cwd: string, arg: string): string {
  if (arg.startsWith('/')) return arg;
  const parts = [...cwd.split('/').filter(Boolean), ...arg.split('/').filter(Boolean)];
  const resolved: string[] = [];
  for (const p of parts) {
    if (p === '..') resolved.pop();
    else if (p !== '.') resolved.push(p);
  }
  return '/' + resolved.join('/');
}

export function LinuxTerminal({ onSolve }: { onSolve: () => void }) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { cmd: '', output: 'Apollo Linux 5.15.0-kali3-amd64 #1 SMP\nType commands below. Goal: find and read the flag.txt file!\n', color: '#00d4ff' }
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/home/user');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [solved, setSolved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) { setHistory(h => [...h, { cmd: '', output: '' }]); return; }

    setCmdHistory(h => [cmd, ...h]);
    setHistIdx(-1);

    const [prog, ...args] = cmd.split(/\s+/);
    let output = '';
    let color: string | undefined;

    switch (prog) {
      case 'help':
        output = 'Available: ls, cd, pwd, cat, echo, clear, whoami, id, uname, find, grep, sudo, ps, history, date, file';
        color = '#00d4ff';
        break;
      case 'whoami': output = 'user'; break;
      case 'id':     output = 'uid=1000(user) gid=1000(user) groups=1000(user),27(sudo)'; break;
      case 'pwd':    output = cwd; break;
      case 'date':   output = new Date().toString(); break;
      case 'uname':
        output = args.includes('-a')
          ? 'Linux apollo 5.15.0-kali3-amd64 #1 SMP x86_64 GNU/Linux'
          : 'Linux';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'history':
        output = cmdHistory.map((c, i) => `  ${cmdHistory.length - i}  ${c}`).join('\n') || '(empty)';
        break;
      case 'echo':
        output = args.join(' ');
        break;
      case 'ps':
        output = 'PID TTY          TIME CMD\n1234 pts/0    00:00:00 bash\n1337 pts/0    00:00:01 python3 exploit.py\n9999 pts/0    00:00:00 ps';
        break;
      case 'ls': {
        const target = args.filter(a => !a.startsWith('-')).join('') || cwd;
        const path = resolvePath(cwd, target);
        const children = DIR_CHILDREN[path];
        const showHidden = args.includes('-la') || args.includes('-a');
        if (!children) { output = `ls: cannot access '${target}': No such file or directory`; color = '#ff0040'; break; }
        const items = children.filter(c => showHidden || !c.startsWith('.'));
        const long = args.includes('-l') || args.includes('-la');
        output = long
          ? `total ${items.length * 4}\n` + items.map(item => {
              const isDir = !!DIR_CHILDREN[`${path}/${item}`.replace('//', '/')];
              return `${isDir ? 'd' : '-'}rwxr-xr-x 1 user user  4096 Apr 17 2026 ${isDir ? '\x1b[34m' : ''}${item}`;
            }).join('\n')
          : items.join('  ');
        break;
      }
      case 'cd': {
        const target = args[0] || '/home/user';
        const newPath = target === '~' ? '/home/user' : resolvePath(cwd, target);
        if (newPath === '/root') { output = 'bash: cd: /root: Permission denied'; color = '#ff0040'; break; }
        if (!DIR_CHILDREN[newPath]) { output = `bash: cd: ${target}: No such file or directory`; color = '#ff0040'; break; }
        setCwd(newPath);
        output = '';
        break;
      }
      case 'cat': {
        if (!args[0]) { output = 'cat: missing operand'; color = '#ff0040'; break; }
        const path = resolvePath(cwd, args[0]);
        const content = FS[path];
        if (!content) { output = `cat: ${args[0]}: No such file or directory`; color = '#ff0040'; break; }
        output = content;
        if (path === '/home/user/flag.txt') {
          color = '#00ff41';
          setTimeout(() => { setSolved(true); onSolve(); }, 800);
        }
        break;
      }
      case 'sudo': {
        const sub = args.join(' ');
        if (sub === 'cat /root/flag.txt') {
          output = '[sudo] password for user: \n\nSorry, try sudo -l first.';
          color = '#ff0040';
        } else if (sub === '-l') {
          output = 'Matching Defaults entries for user on apollo:\n    env_reset, mail_badpass\n\nUser user may NOT run sudo on apollo.';
        } else {
          output = 'sudo: ' + sub + ': command not found';
          color = '#ff0040';
        }
        break;
      }
      case 'find': {
        const nameArg = args.findIndex(a => a === '-name');
        const pattern = nameArg >= 0 ? args[nameArg + 1] : '*';
        if (pattern === 'flag.txt') {
          output = '/home/user/flag.txt\n/root/flag.txt';
          color = '#00ff41';
        } else {
          output = '/home/user\n/home/user/readme.txt\n/home/user/flag.txt\n/home/user/notes.txt\n/home/user/secret\n/home/user/secret/.hidden';
        }
        break;
      }
      case 'grep': {
        const pattern = args[0];
        const file    = args[1];
        if (!pattern || !file) { output = 'Usage: grep PATTERN FILE'; color = '#ff0040'; break; }
        const path = resolvePath(cwd, file);
        const content = FS[path];
        if (!content) { output = `grep: ${file}: No such file or directory`; color = '#ff0040'; break; }
        const lines = content.split('\n').filter(l => l.includes(pattern));
        output = lines.length ? lines.join('\n') : '';
        break;
      }
      case 'file': {
        const path = resolvePath(cwd, args[0] || '');
        output = FS[path] ? `${args[0]}: ASCII text` : `${args[0]}: ERROR: No such file`;
        break;
      }
      default:
        output = `bash: ${prog}: command not found\nType 'help' to see available commands.`;
        color = '#ff6b6b';
    }

    setHistory(h => [...h, { cmd: `${cwd}$ ${cmd}`, output, color }]);
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { runCommand(input); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(newIdx);
      setInput(cmdHistory[newIdx] || '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? '' : cmdHistory[newIdx]);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for files in cwd
      const children = DIR_CHILDREN[cwd] || [];
      const partial = input.split(' ').pop() || '';
      const match = children.find(c => c.startsWith(partial));
      if (match) {
        const parts = input.split(' ');
        parts[parts.length - 1] = match;
        setInput(parts.join(' '));
      }
    }
  };

  return (
    <div
      className="bg-black rounded-lg border border-[#1a2332] p-4 h-72 overflow-y-auto font-mono text-sm cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((e, i) => (
        <div key={i} className="mb-1">
          {e.cmd && <div className="text-[#ffcc00]">{e.cmd}</div>}
          {e.output && (
            <pre
              className="whitespace-pre-wrap text-xs leading-5"
              style={{ color: e.color || '#ccc' }}
            >
              {e.output}
            </pre>
          )}
        </div>
      ))}

      {!solved && (
        <div className="flex items-center gap-1 text-[#ffcc00]">
          <span className="text-xs">{cwd}$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            className="terminal-input text-xs flex-1 bg-transparent outline-none text-[#00ff41]"
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
          />
        </div>
      )}

      {solved && (
        <div className="text-[#00ff41] font-bold mt-2 glow-green">
          ðŸŽ‰ FLAG CAPTURED! You found it: FLAG{"{"}y0u_kn0w_y0ur_l1nux_c0mmands{"}"}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

