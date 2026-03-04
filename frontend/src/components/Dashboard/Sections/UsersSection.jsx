import { useState, useContext } from "react";
import Section from "../../ui/Section";
import FormGrid from "../../ui/FormGrid";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ResultBox from "../../ui/ResultBox";
import AuthContext from "../../../context/AuthContext";

const UsersSection = () => {
  const { getUserById, getAllUsers, updateUser, changePassword } = useContext(AuthContext);

  // ---------- STATE ----------
  const [getUserId, setGetUserId] = useState("");
  const [getUserResult, setGetUserResult] = useState(null);

  const [allUsersResult, setAllUsersResult] = useState(null);

  const [updateForm, setUpdateForm] = useState({});
  const [updateResult, setUpdateResult] = useState(null);

  const [passwordForm, setPasswordForm] = useState({});
  const [passwordResult, setPasswordResult] = useState(null);

  // ---------- HANDLERS ----------
  const handleUpdateChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleGetUser = async () => {
    const res = await getUserById(getUserId);
    setGetUserResult(res);
  };

  const handleGetAllUsers = async () => {
    const res = await getAllUsers();
    setAllUsersResult(res);
  };

  const handleUpdateUser = async () => {
    const res = await updateUser(updateForm);
    setUpdateResult(res);
  };

  const handleChangePassword = async () => {
    const res = await changePassword(passwordForm.oldPassword, passwordForm.newPassword);
    setPasswordResult(res);
  };

  return (
    <Section title="Users">

      {/* ===== GET USER ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Get User By ID</h3>
        <p className="text-sm text-gray-500 mb-2">Admin: any user | User: own account only</p>

        <FormGrid>
          <Input placeholder="User ID" value={getUserId} onChange={(e) => setGetUserId(e.target.value)} />
        </FormGrid>

        <Button onClick={handleGetUser} className="mb-2">Get User</Button>
        <ResultBox data={getUserResult} />
      </div>

      {/* ===== GET ALL USERS ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Get All Users</h3>
        <p className="text-sm text-gray-500 mb-2">Allowed Roles: Admin only</p>

        <Button onClick={handleGetAllUsers} className="mb-2">Get All</Button>
        <ResultBox data={allUsersResult} />
      </div>

      {/* ===== UPDATE USER ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Update User</h3>
        <p className="text-sm text-gray-500 mb-2">Admin: any user | User: own account only</p>

        <FormGrid>
          <Input name="id" placeholder="User ID" onChange={handleUpdateChange} />
          <Input name="firstName" placeholder="First Name" onChange={handleUpdateChange} />
          <Input name="lastName" placeholder="Last Name" onChange={handleUpdateChange} />
          <Input name="email" placeholder="Email" onChange={handleUpdateChange} />
          <Input name="phone" placeholder="Phone Number" onChange={handleUpdateChange} />
          <Input name="address" placeholder="Address" onChange={handleUpdateChange} />
        </FormGrid>

        <Button onClick={handleUpdateUser} className="mb-2">Update</Button>
        <ResultBox data={updateResult} />
      </div>

      {/* ===== CHANGE PASSWORD ===== */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-1">Change Password</h3>

        <FormGrid>
          <Input name="oldPassword" type="password" placeholder="Old Password" onChange={handlePasswordChange} />
          <Input name="newPassword" type="password" placeholder="New Password" onChange={handlePasswordChange} />
        </FormGrid>

        <Button onClick={handleChangePassword} className="mb-2">Change Password</Button>
        <ResultBox data={passwordResult} />
      </div>

    </Section>
  );
};

export default UsersSection;