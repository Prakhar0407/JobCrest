import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="navbar">
            <div className="navbar-container">
            <h1 className="logo">
    <Link to="/">JobCrest</Link></h1>

                <ul className="nav-links">
                    {user && user.role === 'recruiter' ? (
                        <>
                            <li><Link to="/admin/companies">Companies</Link></li>
                            <li><Link to="/admin/jobs">Jobs</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/jobs">Jobs</Link></li>
                            <li><Link to="/browse">Discover</Link></li>
                            <li><a href="https://leetcode.com/studyplan/leetcode-75/" target="_blank" rel="noopener noreferrer">Practice</a>
</li>
                
                        </>
                    )}
                </ul>

                {!user ? (
                    <div className="auth-buttons">
                        <Link to="/login"><Button variant="outline">Login</Button></Link>
                        <Link to="/signup"><Button className="signup-btn">Register</Button></Link>
                    </div>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="popover-content">
                            <div className="popover-container">
                                <div className="profile-info">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className="profile-name">{user?.fullname}</h4>
                                        <p className="profile-bio">{user?.profile?.bio}</p>
                                    </div>
                                </div>

                                {user && user.role === 'student' && (
    <>
        <div className="profile-options">
            <User2 />
            <Button variant="link">
                <Link to="/profile">View Profile</Link>
            </Button>
        </div>
        <div className="profile-options">
            <User2 />
            <Button variant="link">
                <Link to="/saved-jobs">My Saved Jobs</Link>
            </Button>
        </div>
    </>
)}

                                <div className="profile-options">
                                    <LogOut />
                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        </div>
    )
};

export default Navbar;

const styles = `
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: yellow;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 12px 0;
    z-index: 1000;
}

.navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.logo-highlight {
    color: #F83002;
}

.nav-links {
    display: flex;
    gap: 20px;
    list-style: none;
    font-size: 16px;
    font-weight: 500;
}

.nav-links a {
    text-decoration: none;
    color: #555;
    transition: 0.3s;
}

.nav-links a:hover {
    color: #F83002;
    background-color: pink;
    border-radius: -100px;
    padding : 10px;
}

.auth-buttons {
    display: flex;
    gap: 10px;
}

.signup-btn {
    background-color: #F83002;
    color: white;
}

.signup-btn:hover {
    background-color: #d72600;
}

.popover-content {
    width: 250px;
    padding: 15px;
}

.popover-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.profile-options {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 6px;
    
}

.profile-options a {
    text-decoration: none;
    color: black;
}
    

.profile-options:hover {
    background-color: #FFD700; 
    color: black;
}

`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
