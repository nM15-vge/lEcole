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
    <nav>
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </div>
        <div>
          <div onClick={openMenu}>
            <img className="profileIcon" src={user?.avatarUrl}/>
          </div>
          {showMenu && <LogoutButton />}
        </div>
        <div>
          <NavLink to="modal-testing" exact={true}>
            Modal Testing
          </NavLink>
        </div>
    </nav>
  );
}

export default NavBar;
