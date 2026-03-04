import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import AdminSidebar, { type AdminTab } from "./AdminSidebar";

interface AdminLayoutProps {
  active: AdminTab;
  onChangeTab: (tab: AdminTab) => void;
  children: ReactNode;
}

const AdminLayout = ({ active, onChangeTab, children }: AdminLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
              Admin Dashboard
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <AdminSidebar active={active} setActive={onChangeTab} />

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              className="fixed inset-y-0 left-0 z-40 w-64 md:hidden shadow-xl bg-background"
            >
              <AdminSidebar
                active={active}
                setActive={(tab) => {
                  onChangeTab(tab);
                  setMobileOpen(false);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

