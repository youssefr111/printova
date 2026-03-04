import { useState, useContext } from "react";
import Section from "../../ui/Section";
import FormGrid from "../../ui/FormGrid";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ResultBox from "../../ui/ResultBox";
import AuthContext from "../../../context/AuthContext";

const AuthSection = () => {
  const { register, login, logout } = useContext(AuthContext);
  const token = localStorage.getItem("accessToken") || "";

  const [registerForm, setRegisterForm] = useState({});
  const [loginForm, setLoginForm] = useState({});
  const [result, setResult] = useState(null);

  // ---------- HANDLERS ----------

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    const res = await register(registerForm);
    setResult(res);
  };

  const handleLogin = async () => {
    const res = await login(loginForm.email, loginForm.password);
    setResult(res);
  };

  const handleLogout = async () => {
    const res = await logout();
    setResult(res);
  };

  return (
    <Section title="Authentication">

      {/* ================= REGISTER ================= */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-2">Register</h3>

        <FormGrid>
            <Input name="firstName" placeholder="First Name" onChange={handleRegisterChange} />
            <Input name="lastName" placeholder="Last Name" onChange={handleRegisterChange} />
            <Input name="email" placeholder="Email" onChange={handleRegisterChange} />
            <Input name="password" type="password" placeholder="Password" onChange={handleRegisterChange} />
            <Input name="phone" placeholder="Phone" onChange={handleRegisterChange} />
            <Input name="address" placeholder="Address" onChange={handleRegisterChange} />
        </FormGrid>

        <Button onClick={handleRegister} className="mb-6">Register</Button>
      </div>


      {/* ================= LOGIN ================= */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="font-semibold text-lg mb-2">Login</h3>

        <FormGrid>
            <Input name="email" type="email" placeholder="Email" onChange={handleLoginChange} />
            <Input name="password" type="password" placeholder="Password" onChange={handleLoginChange} />
        </FormGrid>

        <Button onClick={handleLogin} className="mb-6">Login</Button>

        <h4 className="font-medium my-2">JWT Access Token</h4>
        <textarea value={token} readOnly className="w-full p-3 rounded-lg bg-gray-100 dark:bg-neutral-900 text-sm mb-6" rows={4}/>
      </div>


      {/* ================= LOGOUT ================= */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Logout</h3>

        <Button variant="danger" onClick={handleLogout}>Logout</Button>


        {/* ================= RESULT ================= */}
        <ResultBox data={result} />
      </div>

    </Section>
  );
};

export default AuthSection;