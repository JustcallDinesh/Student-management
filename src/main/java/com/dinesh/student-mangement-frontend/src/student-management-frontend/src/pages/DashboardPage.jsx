import {
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaUserCheck,
  FaArrowRight,
  FaPlus,
  FaArrowRotateRight,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

import DashboardStatsSkeleton from "../components/common/DashboardStatsSkeleton";
import AnimatedNumber from "../components/common/AnimatedNumber";
import EnrollmentTrendChart from "../components/dashboard/EnrollmentTrendChart";
import CourseDistributionChart from "../components/dashboard/CourseDistributionChart";
import RecentStudents from "../components/dashboard/RecentStudents";
import RecentEnrollments from "../components/dashboard/RecentEnrollments";

import useDashboard from "../hooks/useDashboard";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {

  // ==========================================
  // DASHBOARD DATA
  // ==========================================

  const {
    stats,
    enrollmentTrend,
    courseDistribution,
    recentStudents,
    recentEnrollments,
    loading,
    refreshing,
    error,
    refreshDashboard,
  } = useDashboard();


  // ==========================================
  // AUTHENTICATION
  // ==========================================

  const {
    user,
    role,
  } = useAuth();


  // ==========================================
  // DEBUG
  // ==========================================

  // console.log("Authenticated user:", user);
  // console.log("Authenticated role:", role);


  // ==========================================
  // STATISTICS CARDS
  // ==========================================

  const cards = [
    {
      title: "Students",
      value: stats.students,
      color: "from-blue-500 to-cyan-500",
      icon: <FaUserGraduate className="text-2xl" />,
    },

    {
      title: "Courses",
      value: stats.courses,
      color: "from-emerald-500 to-green-500",
      icon: <FaBook className="text-2xl" />,
    },

    {
      title: "Enrollments",
      value: stats.enrollments,
      color: "from-purple-500 to-pink-500",
      icon: <FaClipboardList className="text-2xl" />,
    },

    {
      title: "Active Students",
      value: stats.activeStudents,
      color: "from-orange-500 to-red-500",
      icon: <FaUserCheck className="text-2xl" />,
    },
  ];


  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* =====================================
          WELCOME
      ====================================== */}

      <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl sm:p-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Welcome Back 👋
            </h1>

            <p className="mt-3 text-base text-slate-300 sm:text-lg">
              Manage students, courses and enrollments from one place.
            </p>

          </div>


          {/* Refresh */}

          <button
            type="button"
            onClick={refreshDashboard}
            disabled={refreshing}
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-blue-500/20
              px-5
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-500/30
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <FaArrowRotateRight
              className={refreshing ? "animate-spin" : ""}
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"
            }

          </button>

        </div>

      </div>


      {/* =====================================
          ERROR
      ====================================== */}

      {error && (

        <div className="
          rounded-2xl
          border
          border-red-500/20
          bg-red-500/10
          p-5
        ">

          <div className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          ">

            <div>

              <p className="font-semibold text-red-400">
                Dashboard Error
              </p>

              <p className="mt-1 text-sm text-red-300">
                {error}
              </p>

            </div>


            <button
              type="button"
              onClick={refreshDashboard}
              disabled={refreshing}
              className="
                rounded-xl
                bg-red-500/20
                px-4
                py-2
                text-sm
                font-medium
                text-red-300
                transition
                hover:bg-red-500/30
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {refreshing
                ? "Retrying..."
                : "Try Again"
              }
            </button>

          </div>

        </div>

      )}


      {/* =====================================
          STATISTICS
      ====================================== */}

      {loading ? (

        <DashboardStatsSkeleton />

      ) : (

        <div className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-4
        ">

          {cards.map((card) => (

            <div
              key={card.title}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/10
                p-6
                shadow-xl
                backdrop-blur-xl
                transition
                duration-300
                hover:scale-[1.02]
              "
            >

              {/* Icon */}

              <div
                className={`
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-r
                  ${card.color}
                  text-white
                  shadow-lg
                `}
              >
                {card.icon}
              </div>


              {/* Title */}

              <p className="mt-6 text-slate-300">
                {card.title}
              </p>


              {/* Number */}

              <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">

                <AnimatedNumber
                  value={card.value}
                />

              </h2>

            </div>

          ))}

        </div>

      )}


      {/* =====================================
          CHARTS
      ====================================== */}

      <div className="grid gap-6 xl:grid-cols-2">

        <EnrollmentTrendChart
          data={enrollmentTrend}
        />

        <CourseDistributionChart
          data={courseDistribution}
        />

      </div>


      {/* =====================================
          QUICK ACTIONS + RECENT STUDENTS
      ====================================== */}

      <div className="grid gap-6 xl:grid-cols-2">


        {/* QUICK ACTIONS */}

        <div className="
          rounded-3xl
          border
          border-white/10
          bg-white/10
          p-5
          backdrop-blur-xl
          sm:p-8
        ">

          <h2 className="
            mb-6
            text-2xl
            font-bold
            text-white
          ">
            Quick Actions
          </h2>


          <div className="space-y-4">


            {/* Add Student */}

            <Link
              to="/students"
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                bg-blue-500/20
                px-4
                py-4
                transition
                hover:bg-blue-500/40
                sm:px-6
                sm:py-5
              "
            >

              <div className="flex items-center gap-4">

                <FaPlus className="text-white" />

                <span className="text-white">
                  Add Student
                </span>

              </div>

              <FaArrowRight className="text-white" />

            </Link>


            {/* Add Course */}

            <Link
              to="/courses"
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                bg-green-500/20
                px-4
                py-4
                transition
                hover:bg-green-500/40
                sm:px-6
                sm:py-5
              "
            >

              <div className="flex items-center gap-4">

                <FaPlus className="text-white" />

                <span className="text-white">
                  Add Course
                </span>

              </div>

              <FaArrowRight className="text-white" />

            </Link>


            {/* Enroll Student */}

            <Link
              to="/enrollments"
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                bg-purple-500/20
                px-4
                py-4
                transition
                hover:bg-purple-500/40
                sm:px-6
                sm:py-5
              "
            >

              <div className="flex items-center gap-4">

                <FaPlus className="text-white" />

                <span className="text-white">
                  Enroll Student
                </span>

              </div>

              <FaArrowRight className="text-white" />

            </Link>

          </div>

        </div>


        {/* RECENT STUDENTS */}

        <RecentStudents
          students={recentStudents}
        />

      </div>


      {/* =====================================
          RECENT ENROLLMENTS
      ====================================== */}

      <RecentEnrollments
        enrollments={recentEnrollments}
      />

    </div>
  );
};

export default DashboardPage;