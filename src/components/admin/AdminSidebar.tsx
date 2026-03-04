import { type Dispatch, type SetStateAction } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  Images,
  Inbox,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export type AdminTab =
  | "dashboard"
  | "courses"
  | "students"
  | "tests"
  | "gallery"
  | "inquiries";

const items: { key: AdminTab; label: string; icon: React.ComponentType<any> }[] =
  [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "courses", label: "Course Management", icon: BookOpen },
    { key: "students", label: "Student Management", icon: Users },
    { key: "tests", label: "Test Series Management", icon: ClipboardList },
    { key: "gallery", label: "Gallery Management", icon: Images },
    { key: "inquiries", label: "Inquiry Management", icon: Inbox },
  ];

interface AdminSidebarProps {
  active: AdminTab;
  setActive: Dispatch<SetStateAction<AdminTab>>;
}

const AdminSidebar = ({ active, setActive }: AdminSidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 flex-shrink-0 border-r bg-background/80 backdrop-blur">
      <div className="px-4 py-4 border-b">
        <p className="text-sm font-semibold">Admin Panel</p>
        <p className="text-xs text-muted-foreground">
          Saraswati Classes Coaching
        </p>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(item.key)}
              className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="px-3 py-3 border-t">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-center gap-1"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

