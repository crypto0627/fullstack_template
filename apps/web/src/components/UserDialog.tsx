"use client";

import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useAccount } from "wagmi";

type UserDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UserDialog({ open, setOpen }: UserDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { address, isConnected } = useAccount();

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSave = async () => {
    // Call updateUser function with name and email
    try {
      const response = await fetch(`/api/users/${address}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from API:", errorData.error);
        // Handle error: Display it in UI, etc.
      } else {
        const userData = await response.json();
        console.log("User data:", userData);
        // Process userData as needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
    handleClose();
  };

  // Effect for handling resize events
  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  // // Effect for handling scroll events
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolling(window.scrollY > 0);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`/api/users/${address}`);
        if (response.status === 404) {
          const response = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              walletAddress: address?.toString(),
              username: "user",
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error from API:", errorData.error);
            // Handle error: Display it in UI, etc.
          } else {
            const userData = await response.json();
            console.log("User data:", userData);
            // Process userData as needed
          }
        }
        const userData = await response.json();
        // Process userData as needed
        return userData;
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (isConnected && address) {
      getUser();
    }
  }, [address, isConnected]);
  // Render Navbar
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editing Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To receive notifications, please enter your email address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="string"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserDialog;
