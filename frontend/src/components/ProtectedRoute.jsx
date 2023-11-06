import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotAuthorized from "../pages/NotAuthorized";

const ProtectedRoute = (props) => {
    const adminRoute = window.location.pathname.startsWith("/admin");
    // console.log(">>>check route: " ,adminRoute);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const userRole = useSelector(state => state.account.user.role);
    console.log(">>>role: ", userRole);
    if (userRole === "admin") {
        console.log(123);
        return (
            <>
                {props.children}
            </>
        )
    } else {
        console.log(739938);
        return (
            <NotAuthorized />
        )
        
    }


}

export default ProtectedRoute;