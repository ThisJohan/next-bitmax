import Image from "next/image";
import bitmaxLogo from "../public/images/logo.png";

export default function Header() {
  return (
    <header className="w-full p-5 border-b border-solid border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ul className="flex gap-5">
            <li>
              <a>
                <Image
                  src={bitmaxLogo}
                  alt="Bitmax Logo"
                  width={120}
                  height={10}
                />
              </a>
            </li>
            <li>
              <a>
                قیمت ارز دیجیتال
                {/* <img src="./assets/images/bitmax-icon/direction-down-mid.svg"> */}
              </a>
            </li>
            <li>
              <a>
                خرید رمز ارز
                {/* <img src="./assets/images/bitmax-icon/direction-down-mid.svg"> */}
              </a>
            </li>
            <li>
              <a href="./help">راهنمای استفاده</a>
            </li>
            <li>
              <a href="./rules">کارمزد</a>
            </li>
            <li>
              <a href="./referral">دعوت از دوستان</a>
            </li>
            <li>
              <a href="https:blog.bitmax.ir/">بلاگ</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
            <button className="btn bg-blue-600 text-white">ثبت نام</button>
            <button className="btn">ورود</button>
        </div>
      </div>
    </header>
  );
}
