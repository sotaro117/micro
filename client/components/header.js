import React from "react";
import Link from "next/link";

function header({ currentUser }) {
  const links = [
    !currentUser && { label: "Sign up", href: "/auth/signup" },
    !currentUser && { label: "Sign in", href: "/auth/signin" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li className='nav-item' key={href}>
          <Link href={href}>
            <a className='nav-link'>{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className='navbar- navbar-light bg-light'>
      <Link href='/'>
        <a className='navbar-brand'>Home</a>
      </Link>

      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex algin-items-center'>{links}</ul>
      </div>
    </nav>
  );
}

export default header;
