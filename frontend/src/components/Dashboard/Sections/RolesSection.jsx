import { useState, useContext } from "react";
import Section from "../../ui/Section";
import FormGrid from "../../ui/FormGrid";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ResultBox from "../../ui/ResultBox";
import { RoleContext } from "../../../context/RoleContext";

const RolesSection = () => {
  const { getAllRoles, getRoleById, getUserRoles, addUserRole, removeUserRole } = useContext(RoleContext);

  // ---------- STATE ----------
  const [roleId, setRoleId] = useState("");
  const [roleByIdResult, setRoleByIdResult] = useState(null);

  const [allRolesResult, setAllRolesResult] = useState(null);

  const [userRolesUserId, setUserRolesUserId] = useState("");
  const [userRolesResult, setUserRolesResult] = useState(null);

  const [addRoleForm, setAddRoleForm] = useState({});
  const [addRoleResult, setAddRoleResult] = useState(null);

  const [removeRoleForm, setRemoveRoleForm] = useState({});
  const [removeRoleResult, setRemoveRoleResult] = useState(null);

  // ---------- HANDLERS ----------
  const handleAddRoleChange = (e) => {
    setAddRoleForm({ ...addRoleForm, [e.target.name]: e.target.value });
  };

  const handleRemoveRoleChange = (e) => {
    setRemoveRoleForm({ ...removeRoleForm, [e.target.name]: e.target.value });
  };

  const handleGetAllRoles = async () => {
    const res = await getAllRoles();
    setAllRolesResult(res);
  };

  const handleGetRoleById = async () => {
    const res = await getRoleById(roleId);
    setRoleByIdResult(res);
  };

  const handleGetUserRoles = async () => {
    const res = await getUserRoles(userRolesUserId);
    setUserRolesResult(res);
  };

  const handleAddUserRole = async () => {
    const res = await addUserRole(addRoleForm.userId, addRoleForm.roleName);
    setAddRoleResult(res);
  };

  const handleRemoveUserRole = async () => {
    const res = await removeUserRole(removeRoleForm.userId, removeRoleForm.roleName);
    setRemoveRoleResult(res);
  };

  return (
    <Section title="Roles">

      {/* ===== GET ALL ROLES ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Get All Roles</h3>
        <p className="text-sm text-gray-500 mb-2">Allowed Roles: Admin only</p>

        <Button onClick={handleGetAllRoles} className="mb-2">Get All Roles</Button>
        <ResultBox data={allRolesResult} />
      </div>

      {/* ===== GET ROLE BY ID ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Get Role By ID</h3>
        <p className="text-sm text-gray-500 mb-2">Allowed Roles: Admin only</p>

        <FormGrid>
          <Input placeholder="Role ID" value={roleId} onChange={(e) => setRoleId(e.target.value)} />
        </FormGrid>

        <Button onClick={handleGetRoleById} className="mb-2">Get Role By ID</Button>
        <ResultBox data={roleByIdResult} />
      </div>

      {/* ===== GET USER ROLES ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Get User Roles</h3>
        <p className="text-sm text-gray-500 mb-2">Admin: any user | User: own account only</p>

        <FormGrid>
          <Input placeholder="User ID" value={userRolesUserId} onChange={(e) => setUserRolesUserId(e.target.value)} />
        </FormGrid>

        <Button onClick={handleGetUserRoles} className="mb-2">Get User Roles</Button>
        <ResultBox data={userRolesResult} />
      </div>

      {/* ===== ADD USER ROLE ===== */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-1">Add User Role</h3>
        <p className="text-sm text-gray-500 mb-2">
          Allowed Roles: Admin any role | Manager: only roles below Manager | User: no role management
        </p>

        <FormGrid>
          <Input name="userId" placeholder="User ID" onChange={handleAddRoleChange} />
          <Input name="roleName" placeholder="Role Name" onChange={handleAddRoleChange} />
        </FormGrid>

        <Button onClick={handleAddUserRole} className="mb-2">Add User Role</Button>
        <ResultBox data={addRoleResult} />
      </div>

      {/* ===== REMOVE USER ROLE ===== */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-1">Remove User Role</h3>
        <p className="text-sm text-gray-500 mb-2">
          Allowed Roles: Admin any role | Manager: only roles below Manager | User: no role management
        </p>

        <FormGrid>
          <Input name="userId" placeholder="User ID" onChange={handleRemoveRoleChange} />
          <Input name="roleName" placeholder="Role Name" onChange={handleRemoveRoleChange} />
        </FormGrid>

        <Button onClick={handleRemoveUserRole} className="mb-2">Remove User Role</Button>
        <ResultBox data={removeRoleResult} />
      </div>

    </Section>
  );
};

export default RolesSection;