async function test() {
  const url = "https://rtillsonpxzxxcdoahym.supabase.co/rest/v1/cms_content?key=eq.about&select=content";
  const res = await fetch(url, {
    headers: {
      "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0aWxsc29ucHh6eHhjZG9haHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyODY0NzAsImV4cCI6MjA5MDg2MjQ3MH0.ugDZ_Rny7zfqESj0Dl2ddRCZXPQ2q8wCTU0M2pf_H4I",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0aWxsc29ucHh6eHhjZG9haHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyODY0NzAsImV4cCI6MjA5MDg2MjQ3MH0.ugDZ_Rny7zfqESj0Dl2ddRCZXPQ2q8wCTU0M2pf_H4I"
    }
  });
  const data = await res.json();
  console.log(JSON.stringify(data[0].content, null, 2));
}
test();
