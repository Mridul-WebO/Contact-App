import React from 'react'
import { useNavigate } from 'react-router'
import { removeCurrentUser } from '../storage/Storage';

const NavBar = ({ setIsUserLoggedIn }) => {
    const navigate = useNavigate();
    function handleLogOut() {
        setIsUserLoggedIn(false)
        removeCurrentUser()
        navigate('/signin')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Contact App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Welcome!!</a>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">
                            <button className="btn btn-outline-success" type="submit" onClick={handleLogOut} >Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar