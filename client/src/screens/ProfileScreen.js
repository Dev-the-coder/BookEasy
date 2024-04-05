// ProfileScreen.js

import React, { useState, useEffect } from "react";
import { Tabs, Tag } from "antd";
import MyBookingScreen from "./MyBookingScreen";
import "./css/profile.css"; // Import custom CSS file

const { TabPane } = Tabs;

function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="profile-container">
      <Tabs defaultActiveKey="1" onChange={callback} className="profile-tabs">
        <TabPane tab="Profile" key="1" className="profile-tab-pane">
          <div className="profile-info">
            <h2 className="profile-title">My Profile</h2>
            <div className="profile-details">
              <p><span className="profile-label">Name:</span> {user.name}</p>
              <p><span className="profile-label">Email:</span> {user.email}</p>
              <p className="profile-label">Is Admin: <Tag color={user.isAdmin ? "green" : "red"}>{user.isAdmin ? "YES" : "NO"}</Tag></p>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Booking" key="2" className="profile-tab-pane">
          <MyBookingScreen />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ProfileScreen;
