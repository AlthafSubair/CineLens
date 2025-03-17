import { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthHOC = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const { token, role } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
      if (!token || role !== "admin") {
toast.error("You do not have permission to view this page.",
{
  position: "bottom-left",
  autoClose: 5000,
}
)

        // Redirect to login page
        navigate("/auth/login");
      }
    }, [navigate, role, token]);

    return (
      <div>
        <WrappedComponent {...props} />
      </div>
    );
  };

  // Set a meaningful display name for debugging
  WithAuth.displayName = `AuthHOC(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithAuth;
};

export default AuthHOC;
