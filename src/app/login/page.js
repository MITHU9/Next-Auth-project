"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/dashboard");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      toast.error("Please fill all the input fields!");
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      if (res?.url) {
        router.replace("/dashboard");
      }
      toast.error("Invalid Credentials!");
    } else {
      toast.success("Successfully Logged In..");
    }
  };

  return (
    sessionStatus !== "authenticated" && (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-3">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="mb-4">
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
              <button
                type="submit"
                className="mt-1 mb-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-semibold"
              >
                Login
              </button>
            </div>
            <span>Don't have an account?</span>{" "}
            <Link
              href={"/register"}
              className="text-center text-blue-500 hover:underline mt-2"
            >
              Register
            </Link>
          </form>
        </div>
      </div>
    )
  );
};
export default Login;
