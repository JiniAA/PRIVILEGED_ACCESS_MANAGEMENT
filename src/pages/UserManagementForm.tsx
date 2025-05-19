import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";

export default function UserManagement() {
  const [formData, setFormData] = useState({
    USER_ID: "",
    F_NAME: "",
    L_NAME: "",
    PASSWORDS: "",
    USER_TYPE: "",
    MANAGER: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can replace this with an API call
  };

  return (
    <MainLayout title="User Management" showBackButton>
      <div className="p-6">
        <Card className="max-w-xl mx-auto">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-2xl font-semibold mb-6">User Management</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="USER_ID">User ID</Label>
                  <Input
                    id="USER_ID"
                    placeholder="Enter User ID"
                    value={formData.USER_ID}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="F_NAME">First Name</Label>
                  <Input
                    id="F_NAME"
                    placeholder="Enter First Name"
                    value={formData.F_NAME}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="L_NAME">Last Name</Label>
                  <Input
                    id="L_NAME"
                    placeholder="Enter Last Name"
                    value={formData.L_NAME}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="PASSWORDS">Password</Label>
                  <Input
                    id="PASSWORDS"
                    type="password"
                    placeholder="Enter Password"
                    value={formData.PASSWORDS}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="USER_TYPE">User Type</Label>
                  <Input
                    id="USER_TYPE"
                    placeholder="e.g. manager, user"
                    value={formData.USER_TYPE}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="MANAGER">Manager ID</Label>
                  <Input
                    id="MANAGER"
                    placeholder="Enter Manager's User ID"
                    value={formData.MANAGER}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button type="submit">Add User</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
