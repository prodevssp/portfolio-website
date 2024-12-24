"use client";

import { getAuth } from "firebase/auth";
import { notFound, useRouter } from "next/navigation";

function onlyAdmin(WrappedComponent) {
  return (props) => {
    const auth = getAuth();
    const router = useRouter();

    const user = auth?.currentUser;

    if (!user) {
      notFound();
      return null;
    }

    if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      notFound();
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default onlyAdmin;
