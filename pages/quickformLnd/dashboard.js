"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import QuickFormDetails from "./quickformdetails";

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("quickform");
  const [isAdmin, setIsAdmin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('@ ========= DASHBOARD LOADED =========');
    console.log('Current URL:', window.location.href);
    
    const checkAuth = () => {
      const auth = localStorage.getItem("adminAuthenticated");
      const loginTime = localStorage.getItem("adminLoginTime");
      
      if (auth === "true" && loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("adminAuthenticated");
          localStorage.removeItem("adminLoginTime");
          router.push("/quickformLnd");
        }
      } else {
        router.push("/quickformLnd");
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminLoginTime");
    router.push("/quickformLnd");
  };

  const tabs = [
    { id: "quickform", label: "Quick Form Details", icon: "📋" },
    { id: "chatbot", label: "ChatBot Details", icon: "🤖" },
    { id: "users", label: "User Details", icon: "👥" },
    { id: "admins", label: "Admin Details", icon: "👨‍💼" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">CS</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Career School Admin</h1>
              </div>
            </div>

            {/* Right side - Admin/User buttons and Logout */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    isAdmin
                      ? "bg-white text-blue-600 shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setIsAdmin(true)}
                >
                  Admin
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    !isAdmin
                      ? "bg-white text-blue-600 shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setIsAdmin(false)}
                >
                  User
                </button>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center py-2 px-1 border-b-2 text-sm font-medium transition
                    ${activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  <span className="mr-2 text-lg">{tab.icon}</span>
                  {tab.label}
                  <span className="ml-2">→</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {activeTab === "quickform" && <QuickFormDetails />}
          {activeTab === "chatbot" && <ChatbotDetails />}
          {activeTab === "users" && <UserDetails />}
          {activeTab === "admins" && <AdminDetails />}
        </div>
      </main>
    </div>
  );
}

// User Details Component
function UserDetails() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210", type: "Student" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543211", type: "Job Seeker" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "9876543212", type: "Placement Officer" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Details</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">#{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {user.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Admin Details Component
function AdminDetails() {
  const [admins, setAdmins] = useState([
    { id: 1, username: "careerschoolit", email: "admin@careerschool.com", role: "Admin", lastLogin: "Today" },
    { id: 2, username: "manager1", email: "manager@careerschool.com", role: "Manager", lastLogin: "Yesterday" },
    { id: 3, username: "staff1", email: "staff@careerschool.com", role: "Staff", lastLogin: "2 days ago" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Details</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-6 py-4 whitespace-nowrap">#{admin.id}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{admin.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    admin.role === 'Admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : admin.role === 'Manager'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {admin.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{admin.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Create a simple ChatbotDetails component
function ChatbotDetails() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ChatBot Details</h2>
      <p className="text-gray-600">Chatbot submissions will appear here.</p>
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">This feature is under development.</p>
      </div>
    </div>
  );
}