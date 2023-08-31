"use client";

interface SingleHistoryItem {
  history: {
    year: string;
    description: string;
  };
}

export default function SingleHistory({ history }: SingleHistoryItem) {
  return (
    <div className="group relative border-t-2 border-white/60 flex items-center mb-6 h-full">
      <div className="absolute w-20 h-20 top-1 -left-10 group-hover:scale-150 group-hover:translate-x-10 bg-white/40 group-hover:bg-white/10 rounded-full transition duration-500"></div>
      <div className="border-red-600 py-3">
        <span className="font-bold lg:text-lg group-hover:text-xl lg:group-hover:text-3xl group-hover:text-white/90 text-white mb-3 transition-all duration-500">
          {history.year}
        </span>
        <p className="text-[11px] group-hover:text-md lg:text-sm lg:group-hover:text-lg font-bold lg:w-2/3 lg:group-hover:w-5/6 group-hover:text-white/50 transition-all duration-500">
          {history.description}
        </p>
      </div>
    </div>
  );
}
