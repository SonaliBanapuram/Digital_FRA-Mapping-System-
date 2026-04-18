import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("fra_user");
    if (!stored) { navigate("/"); return; }
    const parsed = JSON.parse(stored);
    if (parsed.type === "tribal") {
      navigate("/dashboard/tribal", { replace: true });
    } else if (parsed.type === "government") {
      navigate("/dashboard/government", { replace: true });
    } else {
      navigate("/");
    }
  }, [navigate]);

  return null;
};

export default Dashboard;
