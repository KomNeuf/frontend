"use client";
import { Dialog } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import LoadingButton from "./LoadingButton";

const CommentModal = ({ isOpen, onClose, onConfirm }) => {
  const [comment, setComment] = React.useState("");

  const handleSubmit = () => {
    onConfirm(comment);
    setComment("");
    onClose();
    toast.success("Comment submitted successfully!");
  };

  const handleModalClose = () => {
    setComment("");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleModalClose}
      className="[&>*>*]:p-3 lg:[&>*>*]:p-4 [&>*>*]:rounded-xl [&>*]:!backdrop-blur-[3px]"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <button onClick={handleModalClose} className="ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="card  snap-start snap-always h-full duration-300 min-w-[270px] max-w-[350px]  rounded-md overflow-hidden">
        <div className="self-end flex text-center flex-col gap-y-2 justify-between gap-1 bg-white">
          <h3 className="font-semibold text-md mt-2 mb-1 text-stone-600">
            Admin Comment
          </h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment here"
            rows="4"
            className="border rounded-md p-2 w-full"
          />
          <LoadingButton
            onClick={handleSubmit}
            className="text-white text-center bg-[#070911] hover:text-white duration-300 w-full text-base font-medium leading-6 whitespace-nowrap justify-center items-center mt-5 px-4 py-2 rounded-lg"
          >
            Submit
          </LoadingButton>
          <button
            onClick={handleModalClose}
            className="text-gray-500 hover:text-gray-700 mt-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default CommentModal;
