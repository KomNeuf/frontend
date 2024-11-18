"use client";

import api from "@/redux/api";
import Link from "next/link";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { truncateText } from "@/utils/myFuc";
import {
  ArrowDownAZ,
  CheckCircleIcon,
  ClockIcon,
  PackageCheck,
  TruckIcon,
  XCircleIcon,
} from "lucide-react";
import { useMemo } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);
export default function DashboardOverview() {
  const { data: usersData } = api.adminApis.useGetAdminAllUsersQuery("");
  const { data: allProduct } = api.adminApis.useGetAllProductsQuery("");
  const { data: orders } = api.adminApis.useGetAllOrdersQuery("");
  const { data: advertisements } =
    api.adminApis.useGetAllAdvertisementsQuery("");
  const { data: contacts } = api.adminApis.useGetAllContactsQuery("");

  const totalUsers = usersData?.users?.length || 0;
  const totalProducts = allProduct?.length || 0;
  const totalOrders = orders?.data?.length || 0;
  const totalAdvertisements = advertisements?.data?.length || 0;
  const totalContacts = contacts?.data?.length || 0;

  const barData = {
    labels: [
      "Users",
      "Products",
      "Total Orders",
      "Total Advertisements",
      "Total Contacts",
    ],
    datasets: [
      {
        label: "Total Count",
        data: [
          totalUsers,
          totalProducts,
          totalOrders,
          totalAdvertisements,
          totalContacts,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const initialStats = {
    "In Progress": 0,
    All: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
    Completed: 0,
  };

  orders?.data?.forEach((order) => {
    if (initialStats.hasOwnProperty(order.status)) {
      initialStats[order.status] += 1;
    }
  });

  const orderStats = [
    {
      id: 1,
      status: "All",
      count: orders?.data?.length,
      icon: ArrowDownAZ,
      color: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      status: "In Progress",
      count: initialStats["In Progress"],
      icon: ClockIcon,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 3,
      status: "Shipped",
      count: initialStats.Shipped,
      icon: TruckIcon,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 4,
      status: "Delivered",
      count: initialStats.Delivered,
      icon: PackageCheck,
      color: "bg-blue-50 text-blue-400",
    },
    {
      id: 5,
      status: "Cancelled",
      count: initialStats.Cancelled,
      icon: XCircleIcon,
      color: "bg-red-100 text-red-800",
    },
    {
      id: 6,
      status: "Completed",
      count: initialStats.Completed,
      icon: CheckCircleIcon,
      color: "bg-green-100 text-green-800",
    },
  ];

  const monthlyRevenue = (() => {
    // Initialize with all months set to 0 revenue
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const revenueMap = months.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    // Populate revenueMap with actual order data
    orders?.data?.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString("default", { month: "short" });
      revenueMap[month] += order.totalPrice;
    });

    // Convert revenueMap to an array of objects
    return months.map((month) => ({
      month,
      amount: revenueMap[month],
    }));
  })();

  const totalRevenue = monthlyRevenue.reduce(
    (sum, month) => sum + month.amount,
    0
  );

  const lineChartData = {
    maintainAspectRatio: false,
    labels: monthlyRevenue.map((data) => data.month),
    datasets: [
      {
        label: "Monthly Revenue (MAD)",
        data: monthlyRevenue.map((data) => data.amount),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.raw.toLocaleString()} MAD`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10000,
          callback: (value) => ` ${value.toLocaleString()} MAD`,
        },
      },
    },
  };
  return (
    <main className="p-8 space-y-6  overflow-x-scroll">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 ">
        <Card
          title=" Users"
          count={totalUsers}
          description="Number of All Users."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              fill="none"
            >
              <path
                d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17H8M16 13H8M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <Card
          title=" Products"
          count={totalProducts}
          description="Number of All Products."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              fill="none"
            >
              <path d="M23 6.066v12.065l-11.001 5.869-11-5.869v-12.131l11-6 11.001 6.066zm-21.001 11.465l9.5 5.069v-10.57l-9.5-4.946v10.447zm20.001-10.388l-9.501 4.889v10.568l9.501-5.069v-10.388zm-5.52 1.716l-9.534-4.964-4.349 2.373 9.404 4.896 4.479-2.305zm-8.476-5.541l9.565 4.98 3.832-1.972-9.405-5.185-3.992 2.177z" />
            </svg>
          }
        />
        <Card
          title=" Orders"
          count={totalOrders}
          description="Number of All Orders."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              fill="none"
            >
              <path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24-4v20h2v-18h18v-2h-20zm14 11h-6v-1h6v1zm0 1h-6v1h6v-1zm0 2h-6v1h6v-1zm0 2h-6v1h6v-1zm1-4l2.5 3 2.5-3h-5z" />
            </svg>
          }
        />
        <Card
          title=" Advertisements"
          count={totalAdvertisements}
          description="Number of All Advertisements."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              fill="none"
            >
              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm.534 4.007h-1.024v-3.016c-5.693.249-10.27 4.826-10.519 10.519h3.016v1.024h-3.014c.271 5.672 4.839 10.227 10.517 10.475v-2.972h1.024v2.97c5.658-.27 10.203-4.815 10.473-10.473h-2.97v-1.024h2.972c-.248-5.678-4.803-10.246-10.475-10.517v3.014zm6.465 12.993h-13.996l-.002-1.023c.01-1.215.123-1.443 1.024-1.651 1.107-.256 1.754-.479 1.254-1.422-1.519-2.869-.084-4.404 1.52-4.404 1.636 0 3.045 1.593 1.522 4.404-.284.522-.204.825.106 1.033.196-.171.481-.302.894-.397 1.433-.331 2.27-.621 1.623-1.841-1.966-3.713-.521-5.699 1.555-5.699 2.117 0 3.527 2.062 1.557 5.699-.666 1.227.216 1.518 1.62 1.841 1.411.326 1.323 1.067 1.323 2.46v1zm-8.979-2.14c-.306-.172-.579-.415-.741-.774-.222-.492-.167-1.051.163-1.659.545-1.007.678-1.887.364-2.414-.412-.693-1.605-.676-2.005-.012-.314.521-.182 1.409.362 2.436.324.61.375 1.167.152 1.657-.394.863-1.461 1.061-2.022 1.197-.22.053-.282.068-.289.341l-.002.368h3.997c0-.442-.011-.819.021-1.14zm7.979 1.14c.006-1.346.047-1.348-.549-1.485-.248-.058-3.746-.578-2.273-3.293.828-1.529 1.046-2.84.595-3.595-.502-.841-2.039-.836-2.534-.013-.448.744-.233 2.063.59 3.617 1.476 2.783-2.221 3.269-2.282 3.284-.6.138-.552.132-.547 1.485h7z" />
            </svg>
          }
        />
        <Card
          title=" Contact Forms"
          count={totalContacts}
          description="Number of All Contact Forms."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              fill="none"
            >
              <path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z" />
            </svg>
          }
        />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2  gap-4">
        <div className=" bg-white p-4 rounded-xl w-full  min-h-[400px] shadow-xl ring-1 ring-gray-900/5">
          <Bar
            data={barData}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-xl w-full min-h-[400px] shadow-xl ring-1 ring-gray-900/5">
          <Pie
            data={barData}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>

      <div className="space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl  shadow-xl ring-1 ring-gray-900/5 col-span-1">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Top Users</h3>
            <ul className="space-y-4">
              {usersData?.users
                ?.slice()
                .sort((a, b) => b.reviews.length - a.reviews.length)
                .slice(0, 5)
                .map((user) => (
                  <li
                    key={user._id}
                    className="flex items-center space-x-4 border-b pb-2"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full">
                      <img
                        src={
                          user?.avatar ||
                          "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
                        }
                        alt={`User Avatar`}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-700 truncate">
                        {user.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Email: {user.email}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/users/${user._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Profile
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-xl  shadow-xl ring-1 ring-gray-900/5 col-span-1">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Top Products
            </h3>
            <ul className="space-y-4">
              {allProduct
                ?.slice()
                .sort((a, b) => {
                  if (b.viewCount !== a.viewCount) {
                    return b.viewCount - a.viewCount;
                  }
                  return b.likes.length - a.likes.length;
                })
                .slice(0, 5)
                .map((product) => (
                  <li
                    key={product?._id}
                    className="flex items-center space-x-4 border-b pb-2"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full">
                      <img
                        src={
                          product?.photos[0] ||
                          "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
                        }
                        alt={`User Avatar`}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-700 truncate">
                        {truncateText(product?.title, 25)}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {truncateText(product?.description, 40)}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/product/${product?._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Product
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-4 rounded-xl w-full shadow-xl ring-1 ring-gray-900/5">
          <div className="flex  flex-wrap justify-between  items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 ">
              Monthly Revenue Trend
            </h2>{" "}
            <h2 className="text-xl font-semibold text-gray-800">
              Total Revenue: {totalRevenue.toLocaleString()} MAD
            </h2>
          </div>
          <Line
            data={lineChartData}
            options={options}
            style={{ width: "100%", height: "300px" }}
          />
        </div>
      </div>

      <div className="space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {orderStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-xl  shadow-xl ring-1 ring-gray-900/5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    {stat.status} Orders
                  </p>
                  <p className="text-2xl font-semibold text-gray-700">
                    {stat.count}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-gray-200 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-1 ${
                      stat.color.includes("green")
                        ? "bg-green-500"
                        : stat.color.includes("red")
                        ? "bg-red-500"
                        : stat.color.includes("yellow")
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                    style={{
                      width: `${
                        (stat.count /
                          orderStats.reduce(
                            (acc, curr) => acc + curr.count,
                            0
                          )) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function Card({ title, icon, count, description }) {
  return (
    <div className="relative w-full">
      <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg ">
        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primaryText transition-all duration-300 group-hover:scale-[10]"></span>
        <div className="relative z-10 mx-auto max-w-md">
          <span className="grid h-20 w-20 place-items-center text-[#F5F1E4] group-hover:text-[#070911] rounded-full transition-all duration-300 group-hover:bg-[#F5F1E4]">
            {icon}
          </span>
          <div className="space-y-1 pt-3 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-[#F5F1E4]">
            <p className="text-xl font-bold">{title}</p>
            <p className="text-2xl font-bold">{count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
