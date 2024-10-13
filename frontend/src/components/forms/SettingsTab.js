import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";

const SettingsTab = () => {
  const { auth } = useAuth();

  const [username, setUsername] = useState(auth.userInfo.userName);
  const [oldUsername, setOldUsername] = useState(auth.userInfo.userName);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [validName, setValidName] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const USER_REGEX = /^[A-Za-z][A-Za-z0-9_-]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%+]).{8,24}$/;

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(newPassword));
    setValidMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleEditClick = () => {
    setIsEditingUsername(true);
  };

  const handleSaveUsername = () => {
    if (validName) {
      console.log("New username:", username);
      setIsEditingUsername(false);
      setOldUsername(username);

      toast.success("Username updated successfully!");
    } else {
      toast.error("Invalid username. Please check the requirements.");
    }
  };

  const handleCancelUsername = () => {
    setUsername(oldUsername);
    setIsEditingUsername(false);
  };

  const handleSavePassword = () => {
    if (!validPwd) {
      setPasswordError("New password is invalid.");
      toast.error("New password is invalid. Please check the requirements.");
      return;
    }

    if (!validMatch) {
      setPasswordError("New password and confirm password do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    setPasswordError("");

    console.log("Old password:", oldPassword);
    console.log("New password:", newPassword);

    toast.success("Password changed successfully!");

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);

    console.log("Account ID to delete:", auth.userInfo._id);

    toast.success("Account deleted successfully!");

  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Account Settings</h2>

      <div className="card mb-4">
        <div className="card-header">Personal Information</div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              value={auth.userInfo.email}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Username
              <FontAwesomeIcon
                icon={faCheck}
                className={`ms-2 text-success ${validName ? "d-inline" : "d-none"
                  }`}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={`ms-2 text-danger ${validName || !username ? "d-none" : "d-inline"
                  }`}
              />
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={username}
                readOnly={!isEditingUsername}
                onChange={handleUsernameChange}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
              />
              <button
                className={`btn ${isEditingUsername ? "btn-success" : "btn-primary"
                  }`}
                onClick={
                  isEditingUsername ? handleSaveUsername : handleEditClick
                }
              >
                {isEditingUsername ? "Save" : "Edit"}
              </button>
              {isEditingUsername && (
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelUsername}
                >
                  Cancel
                </button>
              )}
            </div>
            <div
              id="uidnote"
              className={`form-text ${usernameFocus && username && !validName ? "d-block" : "d-none"
                }`}
            >
              <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Date of Birth</label>
            <input
              type="text"
              className="form-control"
              value={format(
                new Date(auth.userInfo.dateOfBirth),
                "yyyy-MM-dd"
              )}
              readOnly
            />
          </div>

          <div className="mt-4">
            <button
              className="btn btn-danger"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Change Password</div>
        <div className="card-body">
          {passwordError && (
            <div className="alert alert-danger">{passwordError}</div>
          )}

          <div className="mb-3">
            <label className="form-label fw-bold">Old Password</label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              New Password
              <FontAwesomeIcon
                icon={faCheck}
                className={`ms-2 text-success ${validPwd ? "d-inline" : "d-none"
                  }`}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={`ms-2 text-danger ${validPwd || !newPassword ? "d-none" : "d-inline"
                  }`}
              />
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <div
              id="pwdnote"
              className={`form-text ${pwdFocus && !validPwd ? "d-block" : "d-none"
                }`}
            >
              <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters. Must
              include uppercase and lowercase letters, a number, and a special
              character. Allowed special characters: ! @ # $ % +
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Confirm New Password
              <FontAwesomeIcon
                icon={faCheck}
                className={`ms-2 text-success ${validMatch && confirmPassword ? "d-inline" : "d-none"
                  }`}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={`ms-2 text-danger ${validMatch || !confirmPassword ? "d-none" : "d-inline"
                  }`}
              />
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <div
              id="confirmnote"
              className={`form-text ${matchFocus && !validMatch ? "d-block" : "d-none"
                }`}
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Must match the new
              password input field.
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleSavePassword}
            disabled={!oldPassword || !validPwd || !validMatch}
          >
            Save Password
          </button>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">
            <strong>Warning:</strong> This action cannot be undone. Are you sure you want to delete your account?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SettingsTab;
