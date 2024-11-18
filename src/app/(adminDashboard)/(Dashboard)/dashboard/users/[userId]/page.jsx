"use client";
import Loading from "@/components/Loading";
import api from "@/redux/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserDetail = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const action = searchParams.get("action");
  const id = pathname.split("/")[3];
  const {
    data: user,
    isLoading,
    error,
  } = api.adminApis.useGetSingleUserQuery(id, {
    skip: !id,
  });
  const [updateUser] = api.adminApis.useUpdateUserMutation();

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    biography: "",
    city: "",
    country: "",
    gender: "",
    language: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        name: user.name || "",
        email: user.email || "",
        biography: user.biography || "",
        city: user.city || "",
        country: user.country || "",
        gender: user.gender || "",
        language: user.language || "",
        phoneNumber: user?.phoneNumber || "",
        dateOfBirth: user?.dateOfBirth || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        userId: user?._id,
        formData: updatedUser,
      }).unwrap();

      if (res?.success) {
        toast.success("User updated successfully");
        router.push(`/dashboard/users`);
      }
    } catch (error) {
      toast.error("Error updating user: " + error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) return <p>Error loading user details.</p>;

  return (
    <div className="p-8 my-8">
      {action === "update" ? (
        <>
          <h1 className="text-3xl font-semibold text-gray-800">
            Update User Details
          </h1>
          <form onSubmit={handleSubmit}>
            {Object.entries(updatedUser).map(([key, value]) => (
              <div className="mt-4" key={key}>
                <label className="block text-lg font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key === "email" ? "email" : "text"}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              type="submit"
              className="mt-6 px-4 py-2 bg-primaryText text-white rounded"
            >
              Save Changes
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            User Details
          </h1>
          <div className="flex items-center space-x-4">
            <img
              src={
                user?.avatar ||
                "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
              }
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">
                {user?.name}
              </h1>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Email:</span>{" "}
                {user?.email}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">City:</span>{" "}
                {user?.city}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Country:</span>{" "}
                {user?.country}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Gender:</span>{" "}
                {user?.gender}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Language:</span>{" "}
                {user?.language}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">Phone Number:</span>{" "}
                {user?.phoneNumber}
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-medium text-gray-700">
                  Date of Birth:
                </span>{" "}
                {user?.dateOfBirth}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Biography</h2>
            <p className="text-gray-600 mt-2">{user?.biography}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Account Dates
            </h2>
            <p className="text-gray-600 mt-2">
              <span className="font-medium text-gray-700">Created At:</span>{" "}
              {new Date(user?.createdAt).toLocaleDateString("en-GB")}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium text-gray-700">Updated At:</span>{" "}
              {new Date(user?.updatedAt).toLocaleDateString("en-GB")}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetail;
