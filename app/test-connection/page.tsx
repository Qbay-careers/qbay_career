import { supabase } from '@/lib/supabase';

export default async function TestConnectionPage() {
  let data = null;
  let error = null;

  try {
    // Attempting to fetch from the newly created 'cms_content' table
    const { data: cmsData, error: fetchError } = await supabase
      .from('cms_content')
      .select('*')
      .limit(1);
    
    data = cmsData;
    error = fetchError;
  } catch (err) {
    error = err;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <h1 className="mb-8 text-4xl font-bold text-[#1A112B]">Supabase CMS Connection Test</h1>
      
      <div className="w-full max-w-2xl rounded-xl border-t-4 border-t-purple-600 bg-white p-8 shadow-xl">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Connection Status</h2>
        
        {error ? (
          <div className="rounded-lg bg-red-50 p-6 text-red-700 border border-red-100">
            <p className="font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
              Error connecting to Supabase:
            </p>
            <pre className="mt-4 overflow-auto text-sm bg-red-100/50 p-4 rounded border border-red-200">
              {JSON.stringify(error, null, 2)}
            </pre>
            <p className="mt-4 text-sm text-red-600">
              Note: Make sure the table `cms_content` is created in your public schema.
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-green-50 p-6 text-green-700 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600"></span>
                Perfect! Connected to Supabase.
              </p>
              <span className="text-xs bg-green-200 px-2 py-1 rounded-full text-green-800">Active</span>
            </div>
            
            <p className="text-sm font-medium text-green-800 mb-2">Sample data from 'cms_content' table:</p>
            <div className="max-h-64 overflow-auto bg-green-100/30 p-4 rounded border border-green-200">
              <pre className="text-xs font-mono">{JSON.stringify(data?.[0], null, 2)}</pre>
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-xs text-green-600">
              <span>&#10003; Table found</span>
              <span>&#10003; Data successfully fetched</span>
            </div>
          </div>
        )}
        
        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-xs text-gray-400">
            Current Project: <code className="bg-gray-100 px-2 py-1 rounded text-gray-500">{process.env.NEXT_PUBLIC_SUPABASE_URL}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
