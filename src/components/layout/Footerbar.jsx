import React from "react";
import { House, ReceiptText, FilePlus, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Footerbar() {
  const user = useSelector((state) => state.zone.zoneInfo);

  return (
    <>
      {/* Footer Nav */}
      <div className="footer-nav-area" id="footerNav">
        <div className="footer-nav position-relative footer-style-five shadow-sm">
          <ul className="h-100 d-flex ps-0">
            <li className="">
              <Link href="/">
                <House size={18} color="#434343" />
              </Link>
            </li>
            <li>
              <Link href="/generate-receipt">
                <FilePlus size={18} color="#434343" />
              </Link>
            </li>
            <li>
              <Link href="/reports">
                <ReceiptText size={18} color="#434343" />
              </Link>
            </li>

            <li>
              {user ? (
                <Link href="/profile/myprofile">
                  <CircleUserRound size={18} color="#434343" />
                </Link>
              ) : (
                <Link href="/auth/signin">
                  <CircleUserRound size={18} color="#434343" />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
