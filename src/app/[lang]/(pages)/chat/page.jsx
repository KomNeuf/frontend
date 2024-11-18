"use client";
import Loading from "@/components/Loading";
import withAuth from "@/app/middleware/withAuth";
import api from "@/redux/api";
import { Camera, Download, Sparkles, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import langs from "../../dictionaries/langs";
import SelectOptions from "@/components/chat/SelectOptions";
// const socket = io("http://localhost:5000");
const socket = io("https://kiff-new-backend.vercel.app");

const MessageChat = ({ params }) => {
  const { lang } = params;
  const t = langs[lang]?.chat;
  const loginUser = useSelector((state) => state.auth.loginUser);
  const [clickedUser, setClickedUser] = useState(null);
  const [isArchived, setIsArchived] = useState(false);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const [lastMessages, setLastMessages] = useState({});
  const [images, setImages] = useState([]);
  const [localMessages, setLocalMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [createMessage] = api.adminApis.useCreateMessageMutation();
  const { data: currentUser, refetch: userRefetch } =
    api.adminApis.useGetSingleUserQuery(loginUser?._id, {
      skip: !loginUser?._id,
    });
  const [deleteChatMessages, { isSuccess: isDeleteSuccess }] =
    api.adminApis.useDeleteChatMessagesMutation();
  const [archiveConversation] = api.adminApis.useArchiveConversationMutation();
  const [markConversationAsImportant] =
    api.adminApis.useMarkConversationAsImportantMutation();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const beepSound = useRef(new Audio("/beepSound.wav"));

  const {
    data: user,
    isLoading: usersLoading,
    error: usersError,
  } = api.adminApis.useGetChatUserQuery(userId, {
    skip: !userId,
  });

  const {
    data: archive,
    isLoading: archiveLoading,
    error: archiveError,
    refetch: archiveRefetch,
  } = api.adminApis.useGetArchivedConversationsQuery(loginUser?._id, {
    skip: !loginUser?._id,
  });

  const { data: allChatUsers, refetch: allChatUsersRefetch } =
    api.adminApis.useGetChatUsersWithLastMessageQuery(loginUser?._id, {
      skip: !loginUser?._id,
    });
  const {
    data: fetchedMessages,
    isLoading: messagesLoading,
    error: messagesError,
    refetch,
  } = api.adminApis.useGetChatMessageQuery(
    { senderId: loginUser?._id, receiverId: clickedUser?._id },
    {
      skip: !loginUser?._id || !clickedUser?._id,
    }
  );

  useEffect(() => {
    if (fetchedMessages) {
      setLocalMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    if (loginUser?._id) {
      socket.emit("joinRoom", loginUser._id);
    }
  }, [loginUser]);

  useEffect(() => {
    const handleReceiveMessage = async (message) => {
      try {
        await beepSound.current.play();
        setLocalMessages((prevMessages) => [...prevMessages, message]);

        const updatedMessage = {
          content: message.content || "",
          images: message.images || [],
        };

        setLastMessages((prevLastMessages) => ({
          ...prevLastMessages,
          [message.senderId]: updatedMessage,
        }));
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);
  const [showArchived, setShowArchived] = useState(false);

  const handleArchiveClick = () => {
    setShowArchived((prevShowArchived) => !prevShowArchived);
  };
  useEffect(() => {
    if (user) setClickedUser(user);
  }, [user]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  useEffect(() => {
    socket.on("userTyping", ({ senderId }) => {
      setTypingUsers((prevUsers) => [...prevUsers, senderId]);
    });

    socket.on("userStoppedTyping", ({ senderId }) => {
      setTypingUsers((prevUsers) => prevUsers.filter((id) => id !== senderId));
    });

    return () => {
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, []);

  const handleTyping = () => {
    if (!isTyping) {
      socket.emit("typing", {
        receiverId: clickedUser?._id,
        senderId: loginUser?._id,
      });
      setIsTyping(true);
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", {
        receiverId: clickedUser?._id,
        senderId: loginUser?._id,
      });
      setIsTyping(false);
    }, 2000);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "" && images.length === 0) return;

    const newMessage = {
      senderId: loginUser?._id,
      receiverId: clickedUser?._id,
      content: message.trim() !== "" ? message : "",
      images: images,
      timestamp: new Date(),
    };

    await createMessage(newMessage);
    socket.emit("sendMessage", newMessage);

    setLocalMessages((prevMessages) => [...prevMessages, newMessage]);

    // setLastMessages((prevLastMessages) => ({
    //   ...prevLastMessages,
    //   [newMessage.receiverId]: newMessage.content,
    // }));

    const updatedMessage = {
      content: newMessage.content || "",
      images: newMessage.images || [],
    };

    setLastMessages((prevLastMessages) => ({
      ...prevLastMessages,
      [newMessage.receiverId]: updatedMessage,
    }));

    setMessage("");
    setImages([]);
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imagePromises = selectedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((base64Images) => {
        setImages(base64Images);
      })
      .catch((error) => {
        console.error("Error reading files: ", error);
      });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleDeleteChat = async () => {
    const res = await deleteChatMessages({
      userId: loginUser?._id,
      chatUserId: clickedUser?._id,
    });
    if (res?.data?.success) {
      toast.success(t?.chatDeletedSuccessfully);
      refetch();
      setLocalMessages([]);
    } else {
      toast.error(t?.chatDeleteFailed);
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const ImageModal = ({ image, onClose }) => {
    return (
      <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white bg-red-500"
          >
            <X />
          </button>
          <img src={image} alt="Preview" className="max-w-80 max-h-80" />
        </div>
      </div>
    );
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleArchiveConversation = async () => {
    const res = await archiveConversation({
      userId: loginUser._id,
      chatUserId: clickedUser._id,
    });
    if (res?.data?.success) {
      toast.success(
        res.data.action === "archived" ? t?.archived : t?.unarchived
      );
      setIsArchived(res.data.action === "archived");
      archiveRefetch();
      allChatUsersRefetch();
    } else {
      toast.error(t?.archiveError);
    }
  };

  const handleMarkAsImportant = async () => {
    const res = await markConversationAsImportant({
      userId: loginUser._id,
      chatUserId: clickedUser._id,
    });

    if (res?.data?.success) {
      userRefetch();
      toast.success(t?.markedAsImportant);
    } else {
      toast.error(t?.markAsImportantError);
    }
  };

  if (usersLoading) return <Loading />;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-8 ">
      <div className="border border-primaryText    ">
        <div className="sm:hidden flex overflow-x-auto whitespace-nowrap my-4">
          <div
            className={`ml-3 border border-primaryText rounded-md flex flex-col justify-center  ${
              showArchived ? "bg-gray-100" : ""
            } `}
          >
            <button
              className="font-semibold text-primaryText flex flex-col items-center px-3 "
              onClick={handleArchiveClick}
            >
              <Download className="text-primaryText" />
              <span className="mt-1">{t?.archivedTitle}</span>
            </button>
          </div>

          {showArchived
            ? archive?.map((user) => (
                <div
                  onClick={() => setClickedUser(user.user)}
                  key={user._id}
                  className="text-center cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                >
                  <div className=" bg-gray-300 rounded-full mx-auto">
                    <img
                      src={
                        user?.user?.avatar ||
                        "https://placehold.co/200x/cccccc/ffffff.svg?text=No+Image"
                      }
                      alt={`${user?.user?.name} Avatar`}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium capitalize">
                      {user?.user?.name?.length > 6
                        ? `${user.user.name.slice(0, 6)}...`
                        : user.user.name}
                    </h2>
                  </div>
                </div>
              ))
            : allChatUsers?.map((user) => (
                <div
                  onClick={() => setClickedUser(user.user)}
                  key={user._id}
                  className="text-center cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                >
                  <div className=" bg-gray-300 rounded-full mx-auto">
                    <img
                      src={
                        user?.user?.avatar ||
                        "https://placehold.co/200x/cccccc/ffffff.svg?text=No+Image"
                      }
                      alt={`${user?.user?.name} Avatar`}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium capitalize">
                      {user?.user?.name?.length > 6
                        ? `${user.user.name.slice(0, 6)}...`
                        : user.user.name}
                    </h2>
                  </div>
                </div>
              ))}
        </div>
        <div className="flex  overflow-hidden relative">
          <div className="hidden sm:block w-1/4 bg-primaryGray border-r border-primaryText">
            <header className="p-4 h-[67px] flex justify-between items-center bg-primaryText text-white ">
              <h1 className="text-2xl font-semibold">{t?.inbox}</h1>
            </header>
            <div
              className="overflow-y-auto h-screen p-3 mb-9 pb-20"
              style={{ scrollbarWidth: "thin" }}
            >
              <div
                className={`border-b border-primaryText pb-3 ${
                  showArchived ? "bg-gray-100 rounded-md" : ""
                }`}
              >
                <button
                  className="ml-4 flex items-center gap-5 font-semibold text-primaryText px-4 py-1 "
                  onClick={handleArchiveClick}
                >
                  <Download className=" text-primaryText" />
                  <span className="mt-2">{t?.archivedTitle}</span>
                </button>
              </div>

              {showArchived
                ? archive?.map((user, index) => (
                    <>
                      <div
                        onClick={() => setClickedUser(user.user)}
                        key={user._id}
                        className={`flex items-center cursor-pointer px-4 py-3 mb- rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                          index !== archive.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                          <img
                            src={
                              user?.user?.avatar ||
                              "https://placehold.co/200x200/cccccc/ffffff?text=No+Image"
                            }
                            alt={`${user?.user?.name} Avatar`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h2 className="text-lg font-semibold text-gray-800 capitalize">
                            {user?.user?.name}
                          </h2>
                          <p className="text-gray-600 text-sm">
                            {lastMessages[user.user._id]
                              ? lastMessages[user.user._id].images.length > 0
                                ? "Photo"
                                : lastMessages[user.user._id].content.length >
                                  25
                                ? `${lastMessages[user.user._id].content.slice(
                                    0,
                                    25
                                  )}...`
                                : lastMessages[user.user._id].content
                              : user.lastMessage
                              ? user.lastMessage.length > 25
                                ? `${user.lastMessage.slice(0, 25)}...`
                                : user.lastMessage
                              : t?.noRecentMessages}
                          </p>
                        </div>
                        {currentUser?.importantChats?.includes(
                          user.user._id
                        ) && (
                          <span
                            className="ml-2 text-2xl text-red-500"
                            title="Marked as Important"
                          >
                            <Sparkles />
                          </span>
                        )}
                      </div>
                    </>
                  ))
                : allChatUsers?.map((user, index) => (
                    <>
                      <div
                        onClick={() => setClickedUser(user.user)}
                        key={user._id}
                        className={`flex items-center cursor-pointer px-4 py-3 mb- rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                          index !== allChatUsers.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                          <img
                            src={
                              user?.user?.avatar ||
                              "https://placehold.co/200x200/cccccc/ffffff?text=No+Image"
                            }
                            alt={`${user?.user?.name} Avatar`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h2 className="text-lg font-semibold text-gray-800 capitalize">
                            {user?.user?.name}
                          </h2>
                          <p className="text-gray-600 text-sm">
                            {lastMessages[user.user._id]
                              ? lastMessages[user.user._id].images.length > 0
                                ? "Photo"
                                : lastMessages[user.user._id].content.length >
                                  25
                                ? `${lastMessages[user.user._id].content.slice(
                                    0,
                                    25
                                  )}...`
                                : lastMessages[user.user._id].content
                              : user.lastMessage
                              ? user.lastMessage.length > 25
                                ? `${user.lastMessage.slice(0, 25)}...`
                                : user.lastMessage
                              : t?.noRecentMessages}
                          </p>
                        </div>
                        {currentUser?.importantChats?.includes(
                          user.user._id
                        ) && (
                          <span
                            className="ml-2 text-2xl text-[red]"
                            title="Marked as Important"
                          >
                            <Sparkles />
                          </span>
                        )}
                      </div>
                    </>
                  ))}
            </div>
          </div>
          <div className="flex-1">
            <header className="bg-primaryText h-[67px] flex items-center justify-between p-4 gap-2 text-gray-700">
              {clickedUser && (
                <>
                  <div className="flex gap-2 items-center ">
                    <img
                      src={
                        clickedUser?.avatar ||
                        "https://placehold.co/200x/cccccc/ffffff.svg?text=No+Image"
                      }
                      alt={`${clickedUser?.name} Avatar`}
                      className="w-8 h-8 rounded-full"
                    />
                    <h1 className="text-2xl text-white font-semibold">
                      {clickedUser?.name || t?.selectUser} <br />
                    </h1>
                  </div>

                  <div>
                    <SelectOptions
                      onArchive={handleArchiveConversation}
                      onMarkAsImportant={handleMarkAsImportant}
                      onDelete={handleDeleteChat}
                      user={clickedUser}
                      currentUser={currentUser}
                      isArchived={isArchived}
                      translate={t}
                    />
                  </div>
                </>
              )}
            </header>
            <div
              ref={messagesEndRef}
              className="h-screen overflow-y-auto p-4 pb-36"
              style={{ scrollbarWidth: "thin" }}
            >
              {localMessages?.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500">{t?.noMessages}</p>
                </div>
              ) : (
                localMessages?.map((message, index) => (
                  <div
                    key={index}
                    className={`flex mb-4 cursor-pointer ${
                      message.senderId === loginUser?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.senderId !== loginUser?._id && (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                        <img
                          src={
                            clickedUser?.avatar ||
                            "https://placehold.co/200x/cccccc/ffffff.svg?text=No+Image"
                          }
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      {message.images && message.images.length > 0 && (
                        <div
                          className={`mb-1 flex max-w-96 rounded-lg p-3 gap-3 ${
                            message.senderId === loginUser?._id
                              ? "bg-primaryText text-white"
                              : "bg-[#DEDEDE] text-gray-700"
                          }`}
                        >
                          <div className="flex flex-wrap gap-3">
                            {message.images.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`image-${index}`}
                                onClick={() => handleImageClick(img)}
                                className="h-20 w-20 rounded-md object-cover "
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {message?.content && (
                        <div
                          className={`flex max-w-96  rounded-lg p-3 gap-3 ${
                            message.senderId === loginUser?._id
                              ? "bg-primaryText text-white"
                              : "bg-[#DEDEDE] text-gray-700"
                          }`}
                        >
                          <p>{message?.content}</p>
                        </div>
                      )}
                      {isModalOpen && (
                        <ImageModal
                          image={selectedImage}
                          onClose={() => setIsModalOpen(false)}
                        />
                      )}

                      <p className="text-xs text-right mt-1 mr-1">
                        {" "}
                        {message?.timestamp &&
                          new Intl.DateTimeFormat("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }).format(new Date(message.timestamp))}
                      </p>
                    </div>
                    {message.senderId === loginUser?._id && (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                        <img
                          src={
                            loginUser?.avatar ||
                            "https://placehold.co/200x/cccccc/ffffff.svg?text=No+Image"
                          }
                          alt="My Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            {clickedUser && (
              <footer className="bg-primaryGray border-t border-primaryText p-4 absolute bottom-0 w-full sm:w-3/4">
                {images.length > 0 && (
                  <div className="mb-3 ml-8 flex flex-wrap gap-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Selected ${index}`}
                          className="w-16 h-16 object-contain rounded-md border border-primaryText"
                        />

                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          <X />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <span className="flex items-center justify-center text-gray-600 hover:text-primaryText mr-2">
                      <Camera size={24} />
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      typingUsers.includes(clickedUser?._id)
                        ? `${clickedUser?.name} ${t?.userTyping}`
                        : t?.enterMessage
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full p-2 bg-primaryBg rounded-md border border-primaryText/80 focus:outline-none focus:border-primaryText"
                    onKeyUp={handleTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 text-md ml-2 font-medium text-white bg-primaryText rounded-md hover:bg-primaryText/80"
                  >
                    {t?.sending}
                  </button>
                </div>
              </footer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MessageChat);
