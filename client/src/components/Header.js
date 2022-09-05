import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/icons/chef.png';
import { Link } from "react-router-dom";

const Header = ({ props }) => {

    const navigate = useNavigate();

    const renderButton = () => {
        switch (props) {
            case 'register':
                return <Button type="button" onClick={() => navigate('/login')}>
                    Login
                </Button>;
            case 'login':
                return <Button type="button" onClick={() => navigate('/register')}>
                    Registrarse
                </Button>;
            case 'joboffer':
                return <div>
                    <Button className="m-3" type="button" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                    <Button type="button" onClick={() => navigate('/register')}>
                        Registrarse
                    </Button>
                </div>;

            default:
                return <></>;
        }
    }

    return (
        <div className="header d-flex align-items-center justify-content-center">
            <Link to='/'>
                <img className="header-logo m-3" src={icon} alt='jobky logo' />

            </Link>
            {renderButton()}
        </div>
    )
}

export default Header;