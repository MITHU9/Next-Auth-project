import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className=" flex min-h-screen flex-col items-center justify-between p-20">
      <h1 className="text-3xl w-1/2 text-red-500 font-bold border p-4 rounded shadow-md">
        User successfully logged in, Here you can put anything you want...
      </h1>
    </div>
  );
};
export default dashboard;
