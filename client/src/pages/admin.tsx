import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllUsers, getTotalChats } from "../api/admin-stats";
import type { UserDetails } from "../types/user";
import { Trash2 } from "lucide-react";
import { deleteUserAccount } from "../api/admin-actions";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState<{
    totalChats: number;
  } | null>(null);
  const [users, setUsers] = useState<UserDetails[]>([]);
  const { isLoggedIn } = location.state || {};

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login", { replace: true });
    }
  }, []);

  useEffect(() => {
    (async function () {
      const stats = await Promise.all([getTotalChats(), getAllUsers()]);

      setStats({
        totalChats: stats[0]?.count ?? 0,
      });

      console.log(stats[1]);
      setUsers(stats[1]);
    })();
  }, []);

  const handleDelete = async (userId: string) => {
    const status = await deleteUserAccount(userId);

    if (status) {
      window.location.reload();
    }
  };
  return (
    <div className="w-[800px] bg-card border-2 card-border shadow-md rounded-xl p-5">
      <h1 className="font-semibold text-heading mb-1 ">Admin</h1>
      <h3 className="text-subheading">ChatApp Admin Panel</h3>
      <div className="mt-8 space-y-5 px-3">
        <div className="flex justify-around">
          <p>Total Users: {users.length}</p>
          <p>Total Chats: {stats?.totalChats}</p>
        </div>
        <h3 className="font-semibold text-[18px] mb-1 ">All Users</h3>
        <table className="w-full mt-3">
          <thead className="bg-body border-2 card-border">
            <th className="p-1">#</th>
            <th className="p-1">Username</th>
            <th className="p-1">Email</th>
            <th className="p-1">Actions</th>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center hover:card-border-bg">
                <td className="p-2">{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="text-rose-600 flex gap-2 hover:cursor-pointer"
                    onClick={() => handleDelete(user._id)}
                  >
                    <Trash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
