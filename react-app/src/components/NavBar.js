import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = e => {
    e.preventDefault();
    if(showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if(!showMenu) return;
    const closeMenu = e => {
      e.preventDefault();
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
      <>
        {user && (<nav className="nav-container">
            <div className="nav-div center-flex">
              <NavLink to="/" exact={true} activeClassName="active">
                Home
              </NavLink>
            </div>
            <div className="nav-div center-flex">
              <div className="center-flex" onClick={openMenu}>
                <img className="profileIcon" alt="avatar" src={user?.avatarUrl}/>
              </div>
              {showMenu && <LogoutButton />}
            </div>
        </nav>)}
      </>
  );
}

export default NavBar;
