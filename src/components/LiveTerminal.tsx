// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useEffect, useRef, useState } from 'react';

type Line = { text: string; color?: string };
type TermState = 'booting' | 'ready' | 'running';
const PROMPT = 'apollon@kali:~$ ';

const BOOT: (Line & { delay: number })[] = [
  { text: 'BIOS v2.4.1 — POST check...', color: '#444', delay: 80 },
  { text: '▸ CPU  Intel Core i7-12700H ......... [OK]', color: '#00ff41', delay: 240 },
  { text: '▸ RAM  16 384 MB DDR5 ............... [OK]', color: '#00ff41', delay: 420 },
  { text: '▸ NET  eth0 192.168.1.100 ........... [OK]', color: '#00ff41', delay: 600 },
  { text: '▸ SEC  Firewall active .............. [OK]', color: '#00ff41', delay: 780 },
  { text: '', color: '', delay: 900 },
  { text: 'Loading apollon@kali  [████████████] 100%', color: '#00d4ff', delay: 1080 },
  { text: '', color: '', delay: 1200 },
  { text: 'Welcome back. Type "help" for commands.', color: '#ffcc00', delay: 1380 },
];

type CmdResult = { lines: Line[]; animated?: boolean; lineDelay?: number; clear?: boolean };

function getOutput(raw: string): CmdResult {
  const cmd = raw.trim();
  const base = cmd.split(' ')[0];

  if (cmd === 'clear')      return { clear: true, lines: [] };
  if (cmd === 'whoami')     return { lines: [
    { text: 'apollon', color: '#00ff41' },
    { text: 'Security Researcher · CTF Player · Full-Stack Dev', color: '#ccc' },
    { text: 'TryHackMe [0xA] WIZARD — Top 4% worldwide', color: '#00d4ff' },
  ]};
  if (cmd === 'ls')         return { lines: [
    { text: 'drwxr-xr-x  projects/   certifications/   tools/   writeups/', color: '#00d4ff' },
    { text: '-rw-r--r--  README.md   flag.txt   .bashrc', color: '#ccc' },
  ]};
  if (cmd === 'ls -la' || cmd === 'll') return { lines: [
    { text: 'total 48', color: '#666' },
    { text: 'drwx--x--x  apollon  .', color: '#ccc' },
    { text: 'drwxr-xr-x  apollon  projects/', color: '#00d4ff' },
    { text: 'drwxr-xr-x  apollon  tools/', color: '#00d4ff' },
    { text: '-rw-r--r--  apollon  README.md', color: '#ccc' },
    { text: '-rw-------  apollon  flag.txt', color: '#ff0040' },
  ]};
  if (cmd === 'cat README.md') return { lines: [
    { text: '# Aboubacar Sidick Meite — @ApollonASM8977', color: '#00ff41' },
    { text: 'M.S. Cybersecurity @ Montclair State University', color: '#ccc' },
    { text: 'Skills: Python · Linux · React · Cryptography · Pentesting', color: '#aaa' },
    { text: 'Contact: linkedin.com/in/aboubacar-sidick-meite-b5b309276', color: '#00d4ff' },
  ]};
  if (cmd === 'cat flag.txt')  return { lines: [{ text: 'FLAG{w3lc0m3_t0_my_p0rtf0l10}', color: '#ff0040' }]};
  if (cmd === 'cat .bashrc')   return { lines: [
    { text: '# ~/.bashrc', color: '#666' },
    { text: "alias ll='ls -la'", color: '#ccc' },
    { text: "alias hack='nmap -sV --script vuln'", color: '#00ff41' },
    { text: "alias ports='netstat -tulnp'", color: '#00ff41' },
    { text: 'export EDITOR=vim', color: '#ccc' },
  ]};
  if (cmd === 'uname -a')      return { lines: [{ text: 'Linux apollon 6.5.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux', color: '#ccc' }]};
  if (cmd === 'ifconfig' || cmd === 'ip addr') return { lines: [
    { text: 'eth0: flags=4163<UP,BROADCAST,RUNNING>  mtu 1500', color: '#ccc' },
    { text: '      inet 192.168.1.100  netmask 255.255.255.0', color: '#00d4ff' },
    { text: 'lo:   flags=73<UP,LOOPBACK>  mtu 65536', color: '#666' },
    { text: '      inet 127.0.0.1  netmask 255.0.0.0', color: '#666' },
  ]};
  if (cmd === 'sudo su')       return { lines: [
    { text: '[sudo] password for apollon: ••••••••', color: '#666' },
    { text: 'root@kali:~# You were already root. Nice try.', color: '#ff0040' },
  ]};
  if (cmd === 'wireshark')     return { lines: [
    { text: 'Launching Wireshark GUI...', color: '#00d4ff' },
    { text: 'Error: no display found. For CLI use tcpdump.', color: '#ff6b6b' },
    { text: 'Tip: sudo tcpdump -i eth0 -w capture.pcap', color: '#ffcc00' },
  ]};
  if (cmd === 'exit' || cmd === 'logout') return { lines: [
    { text: 'logout', color: '#666' },
    { text: 'Connection closed. See you next time, hacker.', color: '#ff6b6b' },
  ]};
  if (cmd === 'history')       return { lines: [
    { text: '  1  nmap -sV 10.10.10.5', color: '#ccc' },
    { text: '  2  hashcat -m 0 hashes.txt /usr/share/wordlists/rockyou.txt', color: '#ccc' },
    { text: '  3  python3 exploit.py --target 192.168.1.50', color: '#ccc' },
    { text: '  4  wireshark -i eth0', color: '#ccc' },
    { text: '  5  cat flag.txt', color: '#ccc' },
  ]};
  if (cmd === 'help')          return { lines: [
    { text: 'Available commands:', color: '#ffcc00' },
    { text: '  whoami   ls   ls -la   cat <file>', color: '#ccc' },
    { text: '  uname -a   ifconfig   ip addr', color: '#ccc' },
    { text: '  nmap <target>   nmap --script vuln <target>', color: '#ccc' },
    { text: '  wireshark   hashcat -m 0 hash wordlist', color: '#ccc' },
    { text: '  python3 exploit.py   ping <host>', color: '#ccc' },
    { text: '  sudo su   history   clear   exit', color: '#ccc' },
  ]};

  /* ── animated ─────────────────────────────────────── */
  if (base === 'ping') return { animated: true, lineDelay: 340, lines: [
    { text: `PING ${cmd.split(' ')[1] ?? '8.8.8.8'} 56(84) bytes of data.`, color: '#ccc' },
    { text: '64 bytes: icmp_seq=1 ttl=118 time=11.3 ms', color: '#00ff41' },
    { text: '64 bytes: icmp_seq=2 ttl=118 time=10.9 ms', color: '#00ff41' },
    { text: '64 bytes: icmp_seq=3 ttl=118 time=11.6 ms', color: '#00ff41' },
    { text: '--- ping statistics ---', color: '#666' },
    { text: '3 packets transmitted, 3 received, 0% packet loss', color: '#00ff41' },
  ]};

  if (base === 'nmap') {
    const vuln = cmd.includes('--script');
    return { animated: true, lineDelay: 180, lines: [
      { text: 'Starting Nmap 7.94 ( https://nmap.org )', color: '#ccc' },
      { text: 'NSE: Loaded 156 scripts for scanning.', color: '#666' },
      { text: 'Scanning target [1000 ports]...', color: '#ccc' },
      { text: 'Discovered open port 22/tcp', color: '#00ff41' },
      { text: 'Discovered open port 80/tcp', color: '#00ff41' },
      { text: 'Discovered open port 443/tcp', color: '#00ff41' },
      { text: 'Discovered open port 8080/tcp', color: '#ffcc00' },
      { text: '', color: '' },
      { text: 'PORT     STATE  SERVICE    VERSION', color: '#666' },
      { text: '22/tcp   open   ssh        OpenSSH 8.2p1', color: '#ccc' },
      { text: '80/tcp   open   http       Apache 2.4.41', color: '#ccc' },
      { text: '443/tcp  open   ssl/https  nginx 1.18.0', color: '#ccc' },
      { text: '8080/tcp open   http       Apache Tomcat 9.0.30  [!] CVE-2020-9484', color: '#ff0040' },
      { text: '', color: '' },
      { text: 'Nmap done: 1 host up, scanned in 12.34 seconds', color: '#00d4ff' },
      ...(vuln ? [
        { text: '[CRITICAL] Tomcat 9.0.30 — Deserialization RCE (CVE-2020-9484)', color: '#ff0040' },
        { text: '[WARNING]  Apache 2.4.41 — Path traversal possible', color: '#ffcc00' },
      ] : []),
    ]};
  }

  if (base === 'hashcat') return { animated: true, lineDelay: 240, lines: [
    { text: 'hashcat (v6.2.6) starting...', color: '#ccc' },
    { text: 'Hash.Type.......: MD5', color: '#666' },
    { text: 'Input.Mode......: Wordlist rockyou.txt', color: '#666' },
    { text: '[#########                       ] 28%', color: '#ffcc00' },
    { text: '[##################              ] 55%', color: '#ffcc00' },
    { text: '5f4dcc3b5aa765d61d8327deb882cf99:password', color: '#00ff41' },
    { text: '[############################    ] 87%', color: '#ffcc00' },
    { text: '[################################] 100%', color: '#00ff41' },
    { text: 'Recovered........: 1/1 (100.00%) Digests', color: '#00ff41' },
    { text: 'Session..........: Complete', color: '#00d4ff' },
  ]};

  if (base === 'python3' || base === 'python') return { animated: true, lineDelay: 120, lines: [
    { text: 'Python 3.11.4 (main, Dec 2023)', color: '#ccc' },
    { text: 'Executing script...', color: '#666' },
    { text: '[*] Target: 192.168.1.50:8080', color: '#00d4ff' },
    { text: '[*] Sending exploit payload...', color: '#ccc' },
    { text: '[*] Trying CVE-2020-9484...', color: '#ffcc00' },
    { text: '[+] Shell obtained!', color: '#00ff41' },
    { text: '[+] uid=0(root) gid=0(root)', color: '#00ff41' },
    { text: '$ cat /root/flag.txt', color: '#ffcc00' },
    { text: 'FLAG{3xpl01t_succ3ssful}', color: '#ff0040' },
  ]};

  return { lines: [{ text: `bash: ${base}: command not found`, color: '#ff6b6b' }] };
}

function playKeyClick() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.value = 820;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.045);
  } catch { /* silently ignore if audio not available */ }
}

export function LiveTerminal() {
  const [lines, setLines]     = useState<Line[]>([]);
  const [state, setState]     = useState<TermState>('booting');
  const [inputVal, setInput]  = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx]       = useState(-1);
  const [soundOn, setSoundOn] = useState(false);

  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    BOOT.forEach((b, i) =>
      setTimeout(() => {
        setLines(prev => [...prev, { text: b.text, color: b.color }]);
        if (i === BOOT.length - 1) {
          setState('ready');
          setTimeout(() => inputRef.current?.focus(), 80);
        }
      }, b.delay)
    );
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, state]);

  const runCmd = (raw: string) => {
    const cmd = raw.trim();
    setLines(prev => [...prev, { text: PROMPT + cmd, color: '#ffcc00' }]);
    if (cmd) setHistory(prev => [cmd, ...prev]);
    setHIdx(-1);
    setInput('');
    if (!cmd) return;

    const result = getOutput(cmd);
    if (result.clear) { setLines([]); setState('ready'); return; }

    if (result.animated) {
      setState('running');
      result.lines.forEach((l, i) =>
        setTimeout(() => {
          setLines(prev => [...prev, l]);
          if (i === result.lines.length - 1) setState('ready');
        }, (i + 1) * (result.lineDelay ?? 180))
      );
    } else {
      setLines(prev => [...prev, ...result.lines]);
      setState('ready');
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (soundOn && e.key.length === 1) playKeyClick();
    if (e.key === 'Enter') { if (soundOn) playKeyClick(); runCmd(inputVal); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      setHIdx(i); setInput(history[i] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = Math.max(hIdx - 1, -1);
      setHIdx(i); setInput(i === -1 ? '' : history[i]);
    }
  };

  return (
    <div
      className="hacker-panel overflow-hidden cursor-text w-full"
      onClick={() => inputRef.current?.focus()}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1a2332]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-[#444] text-xs mono">root@apollon:~/portfolio</span>
        {state === 'running' && (
          <span className="ml-auto text-[#444] text-xs mono animate-pulse">running…</span>
        )}
        <button
          onClick={e => { e.stopPropagation(); setSoundOn(s => !s); }}
          className="ml-auto text-[10px] mono px-1.5 py-0.5 rounded transition-colors"
          style={{ color: soundOn ? '#00ff41' : '#333', border: `1px solid ${soundOn ? '#00ff4144' : '#1a2332'}` }}
          title={soundOn ? 'Sound ON — click to mute' : 'Sound OFF — click to enable'}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>
      </div>

      {/* body */}
      <div className="overflow-y-auto max-h-52 px-4 py-3 mono text-xs leading-[1.65] select-text">
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.color || '#00ff41' }}>{l.text || '\u00A0'}</div>
        ))}

        {state === 'ready' && (
          <div className="flex items-center">
            <span className="text-[#00ff41] shrink-0 select-none">{PROMPT}</span>
            <input
              ref={inputRef}
              value={inputVal}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="bg-transparent outline-none text-[#00ff41] flex-1 caret-transparent min-w-0"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="blink text-[#00ff41] select-none">█</span>
          </div>
        )}
        {state === 'running' && <span className="blink text-[#00ff41]">█</span>}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

