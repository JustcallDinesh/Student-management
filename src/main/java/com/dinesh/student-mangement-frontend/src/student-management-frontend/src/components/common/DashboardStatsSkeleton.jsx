const DashboardStatsSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/10
            backdrop-blur-xl
            p-6
            shadow-xl
          "
        >

          <div className="animate-pulse">

            {/* Icon */}

            <div className="h-16 w-16 rounded-2xl bg-white/10" />

            {/* Title */}

            <div className="mt-6 h-4 w-28 rounded-lg bg-white/10" />

            {/* Number */}

            <div className="mt-3 h-12 w-20 rounded-lg bg-white/10" />

          </div>

        </div>
      ))}

    </div>
  );
};

export default DashboardStatsSkeleton;