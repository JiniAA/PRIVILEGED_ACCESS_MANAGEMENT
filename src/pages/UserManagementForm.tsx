// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { MainLayout } from "@/components/layout/MainLayout";

// export default function UserManagement() {
//   const [formData, setFormData] = useState({
//     USER_ID: "",
//     F_NAME: "",
//     L_NAME: "",
//     PASSWORDS: "",
//     USER_TYPE: "",
//     MANAGER: "",
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // You can replace this with an API call
//   };

//   return (
//     <MainLayout title="User Management" showBackButton>
//       <div className="p-6">
//         <Card className="max-w-xl mx-auto">
//           <CardContent className="space-y-6 p-6">
//             <h2 className="text-2xl font-semibold mb-6">User Management</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="USER_ID">User ID</Label>
//                   <Input
//                     id="USER_ID"
//                     placeholder="Enter User ID"
//                     value={formData.USER_ID}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="F_NAME">First Name</Label>
//                   <Input
//                     id="F_NAME"
//                     placeholder="Enter First Name"
//                     value={formData.F_NAME}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="L_NAME">Last Name</Label>
//                   <Input
//                     id="L_NAME"
//                     placeholder="Enter Last Name"
//                     value={formData.L_NAME}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="PASSWORDS">Password</Label>
//                   <Input
//                     id="PASSWORDS"
//                     type="password"
//                     placeholder="Enter Password"
//                     value={formData.PASSWORDS}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="USER_TYPE">User Type</Label>
//                   <Input
//                     id="USER_TYPE"
//                     placeholder="e.g. manager, user"
//                     value={formData.USER_TYPE}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="MANAGER">Manager ID</Label>
//                   <Input
//                     id="MANAGER"
//                     placeholder="Enter Manager's User ID"
//                     value={formData.MANAGER}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end mt-6">
//                 <Button type="submit">Add User</Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";

export default function UserManagement() {
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    USER_ID: "",
    F_NAME: "",
    L_NAME: "",
    PASSWORDS: "",
    USER_TYPE: "",
    MANAGER: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/userdata.json");
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUserSelect = (e) => {
    const selectedUserId = e.target.value;
    const selectedUser = userData.find(
      (user) => user.USER_ID === selectedUserId
    );

    if (selectedUser) {
      setFormData({
        USER_ID: selectedUser.USER_ID,
        F_NAME: selectedUser.F_NAME,
        L_NAME: selectedUser.L_NAME,
        PASSWORDS: selectedUser.PASSWORDS,
        USER_TYPE: selectedUser.USER_TYPE,
        MANAGER: selectedUser.MANAGER,
      });
    } else {
      setFormData({
        USER_ID: "",
        F_NAME: "",
        L_NAME: "",
        PASSWORDS: "",
        USER_TYPE: "",
        MANAGER: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${isEditMode ? "Change" : "Add"} User submitted:`, formData);
    // Implement API calls or other logic here
  };

  return (
    <MainLayout title="User Management" showBackButton>
      <div className="p-6">
        <Card className="max-w-xl mx-auto">
          <CardContent className="space-y-6 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">User Management</h2>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditMode((prev) => {
                    const newEditMode = !prev;

                    if (newEditMode) {
                      setFormData({
                        USER_ID: "",
                        F_NAME: "",
                        L_NAME: "",
                        PASSWORDS: "",
                        USER_TYPE: "",
                        MANAGER: "",
                      });
                    }

                    return newEditMode;
                  });
                }}
              >
                {isEditMode ? "Add user" : "Edit existing user"}
              </Button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="USER_ID">User ID</Label>
                  {isEditMode ? (
                    <select
                      id="USER_ID"
                      className="w-full border rounded px-3 py-2"
                      value={formData.USER_ID}
                      onChange={handleUserSelect}
                    >
                      <option value="">Select User ID</option>
                      {userData.map((user) => (
                        <option key={user.USER_ID} value={user.USER_ID}>
                          {user.USER_ID}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id="USER_ID"
                      placeholder="Enter User ID"
                      value={formData.USER_ID}
                      onChange={handleChange}
                    />
                  )}
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
                <Button type="submit">
                  {isEditMode ? "Save" : "Add User"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
