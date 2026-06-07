
export default function KpiCards() {
  const kpiData = [
    {
      title: "Petugas Aktif",
      value: "24",
      unit: "Orang",
      trend: "+2 dibanding kemarin",
      trendUp: true,
      icon: (
        <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      bgBlob: "bg-brand-500/10",
      textColor: "text-brand-500",
    },
    {
      title: "Patroli Berjalan",
      value: "8",
      unit: "Rute",
      trend: "Sesuai jadwal",
      trendUp: true,
      icon: (
        <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      bgBlob: "bg-success-500/10",
      textColor: "text-success-500",
    },
    {
      title: "Laporan Insiden",
      value: "2",
      unit: "Baru",
      trend: "-1 dibanding kemarin",
      trendUp: true, // fewer incidents is good
      icon: (
        <svg className="w-8 h-8 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      bgBlob: "bg-error-500/10",
      textColor: "text-error-500",
    },
    {
      title: "Cakupan Area",
      value: "94",
      unit: "%",
      trend: "Batas aman: 90%",
      trendUp: true,
      icon: (
        <svg className="w-8 h-8 text-warning-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bgBlob: "bg-warning-500/10",
      textColor: "text-warning-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      {kpiData.map((kpi, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group flex flex-col justify-between min-h-[160px]"
        >
          {/* Decorative Blob */}
          <div className={`absolute top-0 right-0 w-24 h-24 ${kpi.bgBlob} rounded-bl-full -mr-4 -mt-4 transition-transform duration-300 ease-out group-hover:scale-125 group-hover:rotate-12`}></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {kpi.title}
                </p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white/90">
                    {kpi.value}
                  </h3>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {kpi.unit}
                  </span>
                </div>
              </div>
              <div className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 ${kpi.textColor}`}>
                {kpi.icon}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className={`flex items-center text-xs font-medium ${kpi.trendUp ? "text-success-500" : "text-error-500"}`}>
                {kpi.trendUp ? (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {kpi.trend}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
