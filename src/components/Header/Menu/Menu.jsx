import React from 'react';
import { Link } from 'react-router-dom';
import closePageIcon from '../../../assets/icon-close.png';
import profileIcon from '../../../assets/icon-profile.png';
import logoutIcon from '../../../assets/icon-logout.png';

const Menu = ({ profileMenu, closeMenu, userData, userId, darkBackground }) => {
  return (
    <div>
      <div className="profileMenu" ref={profileMenu}>
        <div className="profileMenuHeader">
          <h4>Account info</h4>
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="closeProfileMenu" onClick={closeMenu}>
            <img src={closePageIcon} alt="Close page icon" />
          </button>
        </div>

        <div>
          {userData && (
            <div className="user-menu">
              <div>
                <img src={userData.avatar} alt="avatar" className="user-menu__avatar" />
              </div>
              <p className="user-menu__username">{userData.username}</p>
              <p>@{userData.nickname}</p>
              <div className="aboutFollowOfUser">
                <p>
                  <b>{userData.following.length}</b> Followings
                </p>
                <p>
                  <b>{userData.followers.length}</b> Followers
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="user-menu__profile-list">
          {userId ? (
            <Link className="user-menu__profile-list-items" to={`/profile/${userId}`}>
              <img src={profileIcon} alt="Profile icon" />
              Profile
            </Link>
          ) : (
            ''
          )}
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="user-menu__logoutBtn">
            <img src={logoutIcon} alt="Logout icon" /> Logout
          </button>
        </div>
      </div>
      <div ref={darkBackground} className="darkBackground" />
    </div>
  );
};

export default Menu;
