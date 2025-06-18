'use client';
import { useState, useRef, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-yellow-500 hover:text-yellow-600 transition"
      >
        <UserCircle className="w-8 h-8" />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link
                href="/Pages/userProfile"
                className="block px-4 py-2 hover:bg-yellow-100 transition"
              >
                Ver perfil
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export function UserMenuSlideTramites() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
  
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="text-yellow-500 hover:text-yellow-600 transition"
        >
          <UserCircle className="w-8 h-8" />
        </button>
  
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <Link
                  href="/Pages/userProfile"
                  className="block px-4 py-2 hover:bg-yellow-100 transition"
                >
                  Ver perfil
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="w-full text-left px-4 py-2 hover:bg-yellow-100 transition"
                >
                  Cerrar sesión
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
