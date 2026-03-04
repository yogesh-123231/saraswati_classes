import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import StudentSidebar from "./StudentSidebar";
import { useAuth } from "@/context/AuthContext";

type TabKey = "overview" | "courses" | "tests" | "results" | "profile";

interface StudentLayoutProps {
  children: ReactNode;
  active: TabKey;
  onChangeTab: (key: TabKey) => void;
}

const StudentLayout = ({ children, active, onChangeTab }: StudentLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentStudent } = useAuth();

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <p className="font-semibold text-sm md:text-base">
              Student Dashboard
            </p>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Welcome, {currentStudent?.name || "Student"}
          </p>
        </div>
      </header>

      <div className="flex flex-1">
        <StudentSidebar active={active} onChange={(k) => onChangeTab(k as TabKey)} />

        {/* Mobile sidebar */}
        {mobileOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            className="fixed inset-y-0 left-0 z-40 w-60 md:hidden shadow-xl"
          >
            <StudentSidebar
              active={active}
              onChange={(k) => {
                onChangeTab(k as TabKey);
                setMobileOpen(false);
              }}
            />
          </motion.div>
        )}

        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export type { TabKey };
export default StudentLayout;

