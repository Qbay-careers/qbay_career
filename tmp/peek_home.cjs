require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function peek() {
  const { data } = await supabase.from('cms_content').select('content').eq('key', 'home').single();
  const content = data.content;
  console.log("Home Key Structure:");
  for (const key in content) {
     if (Array.isArray(content[key])) {
       console.log(`- ${key}: Array[${content[key].length}]`);
       if (content[key].length > 0) {
         console.log(`    Sample: ${JSON.stringify(Object.keys(content[key][0]))}`);
       }
     } else {
       console.log(`- ${key}: Object`);
       console.log(`    Fields: ${JSON.stringify(Object.keys(content[key]))}`);
     }
  }
}
peek();
