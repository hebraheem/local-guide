"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { getCurrentUser } from "@/actions/user.action";

const UseCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      try {
        const response = await getCurrentUser();
        if (response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return {
    user,
    loading,
  };
};
export default UseCurrentUser;
