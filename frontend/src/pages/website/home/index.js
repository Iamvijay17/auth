import Title from "antd/es/typography/Title";
import React from "react";
import AccommodationCard from "../../../components/AccommodationCard";
import VideoCard from "../../../components/VideoCard";
import BlogCard from "../../../components/BlogCard";

const Home = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="text-center">
          <Title level={1} className="font-dancingScript mb-3 text-secondary-white">
          Welcome to our website
          </Title>
          <Title level={4} className="font-mono text-secondary-white">
          Explore our platform
          </Title>
        </div>
      </div>
      <div>
        <AccommodationCard />
      </div>
      <div>
        <VideoCard />
      </div>
      <div>
        <BlogCard />
      </div>
    </>
  );
};

export default Home;
