"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/dashboard");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const confirmPassword = event.target[3].value;

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill all required fields");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });
      if (response.status === 400) {
        toast.error("User already exists");
        return;
      } else if (response.status === 201) {
        toast.success("User created successfully");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (sessionStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Register</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>

                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Confirm Password
                </label>

                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-5 mb-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-semibold"
                >
                  Register
                </button>
              </div>
              <span>
                {" "}
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-center hover:underline mt-3 text-blue-500"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default Register;
