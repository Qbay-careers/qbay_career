const fs = require('fs');

async function checkDetailed() {
  const url = 'https://rtillsonpxzxxcdoahym.supabase.co/rest/v1/cms_content?key=eq.home&select=content';
  const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0aWxsc29ucHh6eHhjZG9haHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyODY0NzAsImV4cCI6MjA5MDg2MjQ3MH0.ugDZ_Rny7zfqESj0Dl2ddRCZXPQ2q8wCTU0M2pf_H4I';
  
  const response = await fetch(url, { headers: { 'apikey': apikey } });
  const data = await response.json();
  
  const content = data[0].content;
  fs.writeFileSync('d:\\EXPELON\\qbay careers\\tmp\\detailed_dump.json', JSON.stringify(content, null, 2));
}

checkDetailed();
