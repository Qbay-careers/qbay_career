const fs = require('fs');

async function check() {
  const url = 'https://rtillsonpxzxxcdoahym.supabase.co/rest/v1/cms_content?key=eq.home&select=content';
  const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0aWxsc29ucHh6eHhjZG9haHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyODY0NzAsImV4cCI6MjA5MDg2MjQ3MH0.ugDZ_Rny7zfqESj0Dl2ddRCZXPQ2q8wCTU0M2pf_H4I';
  
  const response = await fetch(url, { headers: { 'apikey': apikey } });
  const data = await response.json();
  
  if (data && data.length > 0) {
    const content = data[0].content;
    const info = Object.keys(content).map(k => {
      const type = Array.isArray(content[k]) ? 'Array' : typeof content[k];
      return `${k}: ${type}; length/keys: ${type === 'Array' ? content[k].length : Object.keys(content[k] || {}).join(',')}`;
    });
    fs.writeFileSync('d:\\EXPELON\\qbay careers\\tmp\\db_keys.txt', info.join('\n'));
  } else {
    fs.writeFileSync('d:\\EXPELON\\qbay careers\\tmp\\db_keys.txt', 'No data returned or empty.');
  }
}

check();
