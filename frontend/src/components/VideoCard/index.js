import React from 'react';

const VideoCard = () => {
  return (
    <div>
      <div className="mx-auto my-10 grid max-w-screen-xl gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="mx-2 rounded-xl bg-gray-100"></div>
        <div className="group cursor mx-4 overflow-hidden rounded-2xl bg-white shadow-xl duration-200 hover:-translate-y-4">
          <div className="flex h-60 flex-col justify-between overflow-hidden">
            <img src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHZpZGVvZ3JhcGh5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="group-hover:scale-110 h-full w-full object-cover duration-200" />
          </div>
          <div className="flex-1 overflow-hidden bg-white px-6 py-8">
            <h5 className="group-hover:text-indigo-600 mb-4 text-xl font-bold">Video 6: Learn more about marketing</h5>
            <p className="mb-8 text-gray-600">Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</p>
            <div className="flex justify-between">
              <a href="#" className="group text-lg font-bold focus:text-indigo-600 hover:text-indigo-600">
                <span>▷</span>
                <span className="underline">Watch Now</span>
              </a>
              <div className="max-w-full flex-none lg:px-4">
                <h5 className="text-lg font-bold">Video 6</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-2 rounded-xl bg-gray-100"></div>
      </div>

    </div>
  );
};

export default VideoCard;
