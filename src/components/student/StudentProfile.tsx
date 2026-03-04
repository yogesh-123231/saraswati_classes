import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const StudentProfile = () => {
  const { currentStudent } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold mb-1">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Basic profile information for your student account. Actual update and verification flows will be wired to the backend later.
        </p>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="profile-name">Name</Label>
              <Input
                id="profile-name"
                value={currentStudent?.name || ""}
                readOnly
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                value={currentStudent?.email || ""}
                readOnly
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="profile-password">Password</Label>
              <Input
                id="profile-password"
                type="password"
                value={currentStudent?.password || ""}
                readOnly
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="profile-joined">Joined On</Label>
              <Input
                id="profile-joined"
                value={currentStudent?.createdAt || ""}
                readOnly
              />
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground mt-2">
            Profile editing will be managed by the institute. For any corrections in your details,
            please contact the admin directly. This section is designed to be ready for future
            backend-connected profile updates.
          </p>

          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm" disabled>
              Save Changes (coming soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;

