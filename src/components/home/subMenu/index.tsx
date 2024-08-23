"use client";

import Link from "next/link";
import styles from "./stles.module.scss";

import { X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { MenuProps } from "@/utils/menu.type";

interface SubMenuProp {
  menu: MenuProps;
}

export function SubMenu({ menu }: SubMenuProp) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(menu);

  useEffect(() => {
    const handleRisize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleRisize);

    return () => window.removeEventListener("resize", handleRisize);
  }, []);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <section className={styles.submenu}>
      <div className={styles.submenuIcon} onClick={toggleMenu}>
        <Menu size={34} color="#121212" />
        Serviços
      </div>

      <ul className={`${styles.ul} ${isOpen ? styles.open : ""}`}>
        {isOpen && (
          <button onClick={toggleMenu} className={styles.closeMenu}>
            <X size={54} color="#121212" />
          </button>
        )}

        {menu.objects.map((item) => (
          <li>
            <Link href={`/post/${item.slug}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
