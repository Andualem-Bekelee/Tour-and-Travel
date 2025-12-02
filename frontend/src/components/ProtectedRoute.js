import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({children}){
    const navigate = useNavigate();
    
    const token=localStorage.getItem("item");
    if(!token){
    return <Navigate to="/login" replace />
    }

   return children;
}

export default ProtectedRoute;