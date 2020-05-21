import React from "react";
const user = JSON.parse(localStorage.getItem("user"));
const NavbarFile = () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper teal darken-1">
          <a href="#!" data-target="slide-out" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <div className="container">
            <a href="/cart" className="brand-logo">
              <i
                className="material-icons brand-logo h5"
                style={{ fontSize: "20px" }}
              >
                shopping_cart
              </i>
            </a>
          </div>
          <ul className="right hide-on-med-and-down">
            <li>
              <a className=" " href="/chat">
                چت
              </a>
            </li>
            <li>
              <a href="/products" className="">
                فروشگاه
              </a>
            </li>
            {user ? (
              <>
                <li>
                  <a href="/account" className=" ">
                    {user.userName}
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className=" "
                    onClick={() => localStorage.removeItem("user")}
                  >
                    خروج
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login" className=" ">
                    ورود
                  </a>
                </li>
                <li>
                  <a href="/signup" className=" ">
                    ثبت نام
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <ul id="slide-out" className="sidenav">
        <li></li>

        <>
          <li>
            <div className="divider"></div>
          </li>
        </>

        <li>
          <a href="/products">فروشگاه</a>
        </li>
        <li>
          <a className=" " href="/chat">
            چت
          </a>
        </li>

        {user ? (
          <>
            <li>
              <a href="/account" className=" ">
                {user.userName}
              </a>
            </li>
            <li>
              <a
                href="/"
                className=" "
                onClick={() => localStorage.removeItem("user")}
              >
                خروج
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/login" className=" ">
                ورود
              </a>
            </li>
            <li>
              <a href="/signup" className=" ">
                ثبت نام
              </a>
            </li>
          </>
        )}
      </ul>

      <ul id="dropdown1" className="dropdown-content">
        <li>
          <a href="/products" className="text-center">
            لیست محصولات
          </a>
        </li>

        <li>
          <a href="/products/add" className="text-center">
            اضافه کردن محصول
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavbarFile;
