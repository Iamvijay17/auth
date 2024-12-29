import { Avatar } from "antd";
import React from "react";
import { getColorFromName } from "../../../utils";

const UserProfileCards = ({ user }) => {
  return (
    <div>
      <div className="max-w-sm w-full mx-auto z-10">
        <div className="flex flex-col">
          <div className="border shadow-lg rounded-3xl p-2 m-2">
            <div className="flex-none sm:flex">
              <div className="relative h-20 w-20 sm:mb-0 mb-3">
                {user.avatar ? (
                  <Avatar
                    src={user.avatar}
                    size={128}
                    className="w-20 h-20 object-cover rounded-2xl"
                  />
                ) : (
                  <Avatar
                    size={128}
                    className="w-20 h-20 object-cover rounded-2xl"
                    style={{
                      backgroundColor: getColorFromName(user.name)
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <a
                  href="#1"
                  className="absolute -right-2 bottom-2 -ml-3 text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                  </svg>
                </a>
              </div>
              <div className="flex-auto sm:ml-5 justify-evenly">
                <div className="flex items-center justify-between sm:mt-2">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none flex items-center">
                        {user.name}
                        {user.isVerified && (
                          <span className="ml-2">
                            <svg
                              aria-label="Verified"
                              className="x1lliihq x1n2onr6"
                              fill="#0095F6"
                              height={18}
                              viewBox="0 0 40 40"
                              width={14}
                            >
                              <path
                                d="M19.998 3.094L14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094zm7.415 11.225l2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18z"
                                fillRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>

                      <div className="flex-auto text-gray-400 my-1">
                        <span className="mr-3">{user.email}</span>
                        <span className="mr-3 border-r border-gray-600 max-h-0"></span>
                        <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  {/* Extra content here */}
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserProfileCards;
