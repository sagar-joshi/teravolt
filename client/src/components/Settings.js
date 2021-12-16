import { useContext } from "react";
import { ax } from "../utils/axios.config"
import { AuthContext } from "../utils/contexts";

export function Settings(props){
    const auth = useContext(AuthContext);

    const handleLogout = ()=>{
        ax.post('/user/logout')
        .then((res)=>{
            if(res.status === 200)
                auth.updateUser();
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal">
                {auth.user.firstName}
                </button>

                <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{auth.user.firstName}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-grid gap-2">
                                    <button className="btn btn-light" type="button">Profile</button>
                                    <button className="btn btn-light" type="button" data-bs-dismiss="modal" onClick={handleLogout}>Logout</button>
                                </div>             
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}