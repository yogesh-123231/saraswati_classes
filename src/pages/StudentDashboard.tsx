import { useState } from "react";
import StudentLayout, { type TabKey } from "@/components/student/StudentLayout";
import StudentDashboardOverview from "@/components/student/StudentDashboardOverview";
import StudentMyCourses from "@/components/student/StudentMyCourses";
import StudentMyTestSeries from "@/components/student/StudentMyTestSeries";
import StudentResults from "@/components/student/StudentResults";
import StudentProfile from "@/components/student/StudentProfile";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  let content: JSX.Element;
  switch (activeTab) {
    case "courses":
      content = <StudentMyCourses />;
      break;
    case "tests":
      content = <StudentMyTestSeries />;
      break;
    case "results":
      content = <StudentResults />;
      break;
    case "profile":
      content = <StudentProfile />;
      break;
    case "overview":
    default:
      content = <StudentDashboardOverview />;
  }

  return (
    <StudentLayout active={activeTab} onChangeTab={setActiveTab}>
      {content}
    </StudentLayout>
  );
};

export default StudentDashboard;

