import React, { useEffect, useState } from "react";
import Card from "../../card/Card";
import { Spinner } from "../../loader/Loader";
import { toast } from "react-toastify";

const Profile = () => {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }, [isLoading]);

  const updateProfile = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully.");
  };

  return (
    <div className="container profile">
      <h3>Profile</h3>
      <Card cardClass={"card"}>
        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={updateProfile}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Name" name="name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Email" name="email" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Update Profile
            </button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Profile;
