const logos = [
  { type: 'text', content: 'YOURSTORY', className: 'text-3xl font-black font-sans tracking-tighter text-gray-800' },
  { type: 'text', content: 'Forbes', className: 'text-4xl font-serif font-bold tracking-tight text-gray-700' },
  { type: 'text', content: 'DNA', className: 'text-5xl font-black tracking-tighter text-gray-800' },
  { type: 'multiline', lines: ['FINANCIAL EXPRESS', 'Read to Lead'] },
];

export default function FeaturedOn() {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-purple-50">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5D4A7A] mb-3">Featured On</h2>
        <div className="w-32 h-1 bg-[#5D4A7A] mx-auto mb-12 opacity-80" />

        {/* ── Desktop: static centered row ── */}
        <div className="hidden md:flex justify-center items-center gap-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-500">
          <span className="text-4xl font-black font-sans tracking-tighter text-gray-800">YOURSTORY</span>
          <span className="text-5xl font-serif font-bold tracking-tight text-gray-700">Forbes</span>
          <span className="text-6xl font-black tracking-tighter text-gray-800">DNA</span>
          <div className="flex flex-col text-left text-gray-700">
            <span className="text-3xl font-bold tracking-tight leading-none">FINANCIAL EXPRESS</span>
            <span className="text-xs text-gray-500 font-serif self-end pt-1">Read to Lead</span>
          </div>
        </div>

        {/* ── Mobile: endless right-to-left marquee ── */}
        <div className="md:hidden relative overflow-hidden w-full">
          {/* Left fade */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex items-center gap-12 animate-marquee w-max grayscale opacity-60 py-2">
            {/* Duplicate items twice for seamless loop */}
            {[...logos, ...logos].map((logo, idx) => (
              logo.type === 'multiline' ? (
                <div key={idx} className="flex flex-col text-left text-gray-700 shrink-0">
                  <span className="text-xl font-bold tracking-tight leading-none whitespace-nowrap">FINANCIAL EXPRESS</span>
                  <span className="text-[9px] text-gray-500 font-serif self-end pt-0.5">Read to Lead</span>
                </div>
              ) : (
                <span key={idx} className={`${logo.className} shrink-0 whitespace-nowrap`}>{logo.content}</span>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
