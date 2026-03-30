export default function FeaturedOn() {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-purple-50">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5D4A7A] mb-3">Featured On</h2>
        <div className="w-32 h-1 bg-[#5D4A7A] mx-auto mb-12 opacity-80" />
        
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-500">
          {/* Text representations for logos */}
          <span className="text-3xl md:text-4xl font-black font-sans tracking-tighter text-gray-800">YOURSTORY</span>
          <span className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-gray-700">Forbes</span>
          <span className="text-5xl md:text-6xl font-black tracking-tighter text-gray-800">DNA</span>
          <div className="flex flex-col text-left text-gray-700">
            <span className="text-2xl md:text-3xl font-bold tracking-tight leading-none">FINANCIAL EXPRESS</span>
            <span className="text-[10px] md:text-xs text-gray-500 font-serif self-end pt-1">Read to Lead</span>
          </div>
        </div>
      </div>
    </section>
  );
}
