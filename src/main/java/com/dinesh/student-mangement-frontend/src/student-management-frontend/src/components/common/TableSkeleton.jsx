import Skeleton from "./Skeleton";

const TableSkeleton = ({ rows = 8 }) => {
  return (
    <div className="glass-card rounded-3xl p-6">

      {/* Header */}

      <div className="mb-6 flex justify-between">

        <Skeleton className="h-8 w-48" />

        <Skeleton className="h-10 w-32" />

      </div>

      {/* Table Header */}

      <div className="mb-4 grid grid-cols-9 gap-4">

        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-5"
          />
        ))}

      </div>

      {/* Rows */}

      {Array.from({ length: rows }).map((_, row) => (

        <div
          key={row}
          className="mb-4 grid grid-cols-9 gap-4"
        >

          {Array.from({ length: 9 }).map((_, col) => (

            <Skeleton
              key={col}
              className="h-10"
            />

          ))}

        </div>

      ))}

    </div>
  );
};

export default TableSkeleton;