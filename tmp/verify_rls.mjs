const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0aWxsc29ucHh6eHhjZG9haHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyODY0NzAsImV4cCI6MjA5MDg2MjQ3MH0.ugDZ_Rny7zfqESj0Dl2ddRCZXPQ2q8wCTU0M2pf_H4I';
const url = 'https://rtillsonpxzxxcdoahym.supabase.co/rest/v1/cms_content?key=eq.home';

async function testUpdate() {
  const fetch = (await import('node-fetch')).default;
  console.log("Attempting a harmless update to check RLS...");
  
  // Fetch existing first
  const getRes = await fetch(url + '&select=content', { headers: { 'apikey': apikey } });
  const getData = await getRes.json();
  const content = getData[0].content;
  
  // Add a dummy field
  content.dummyTest = Date.now();
  
  const patchRes = await fetch(url + '&select=key', {
    method: 'PATCH',
    headers: {
      'apikey': apikey,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ content })
  });
  
  const patchData = await patchRes.json();
  console.log("Update response:", patchData);
  if (patchData.length === 0) {
    console.log("CRITICAL ERROR: Supabase returned [] (0 rows updated). RLS is blocking the save!");
  } else {
    console.log("Update SUCCESSFUL. RLS is allowing saves.");
  }
}
testUpdate();
