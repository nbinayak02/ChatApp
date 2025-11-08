import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = location.state || {};

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login", { replace: true });
    }
  }, []);
  return <h1>Welcome to admin panel</h1>;
}
