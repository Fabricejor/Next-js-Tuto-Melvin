// 'use client';

// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

// export default function KeycloakProtectedPage() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "unauthenticated") {
//     redirect("/api/auth/signin");
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
//       {session?.user && (
//         <div>
//           <p>Welcome, {session.user.name}!</p>
//           <p>Email: {session.user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// }
