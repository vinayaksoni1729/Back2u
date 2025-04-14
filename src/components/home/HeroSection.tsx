import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImg from "../../assets/hero_img.jpg"; // Adjust the path accordingly

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Lost something on campus?{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
                We'll help you find it
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Back2U connects people who have lost items with those who have
              found them on our college campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-purple-500 hover:bg-purple-600"
                asChild
              >
                <Link to="/found-items">Browse Found Items</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-700 hover:bg-purple-50"
                asChild
              >
                <Link to="/report-found">Report Found Item</Link>
              </Button>
            </div>
          </div>

          <div className="animate-slide-up flex items-center justify-center ">
            <img
              src={heroImg}
              alt="Lost and Found"
              className="w-auto h-auto rounded-2xl shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
