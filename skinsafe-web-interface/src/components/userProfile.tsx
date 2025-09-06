// "use client";
// import { Session } from "next-auth";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

// export default function UserProfile() {

//   const { data: session } = useSession();
  
//   if (!session) {
//     return <p>Please sign in to view your profile.</p>;
//   }

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p>Name: {session?.user?.name}</p>
//       <p>Email: {session?.user?.email}</p>
//     </div>
//   );
// }
