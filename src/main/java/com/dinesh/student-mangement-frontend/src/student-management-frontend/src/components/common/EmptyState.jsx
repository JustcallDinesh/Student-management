import { FaUserGraduate } from "react-icons/fa6";

const EmptyState = ({
  icon = <FaUserGraduate />,
  title = "No Data Found",
  description = "There is nothing to display.",
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="glass-card flex flex-col items-center justify-center rounded-3xl p-12 text-center">

      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-500/20 text-5xl text-indigo-400">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-300">
        {description}
      </p>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;