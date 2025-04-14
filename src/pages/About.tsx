
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import storyImg from "../assets/story.jpg"; // Adjust the path accordingly

const About = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Back2U</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our mission is to help students and staff reconnect with their lost belongings on campus.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Back2U was created by students who recognized a common problem on campus: the difficulty of finding lost items. The traditional lost and found system was disorganized and inefficient, often leading to unclaimed items and frustrated students.
            </p>
            <p className="text-gray-700 mb-4">
              We launched in 2023 with a simple mission: connect people with their lost belongings through a user-friendly online platform. Since then, we've helped hundreds of students recover their valuable items.
            </p>
            <p className="text-gray-700">
              Our platform is run by volunteers from the student body with support from the university administration.
            </p>
          </div>
          <div className="h-80 flex items-center justify-center">
            <img
              src={storyImg}
              alt="Team Photo"
              className="max-h-full rounded-2xl"
            />
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Report Items</h3>
              <p className="text-gray-600">
                Found something? Report it with details and photos. Lost something? Let our community know what to look for.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600">
                Our system matches lost reports with found items and notifies users when potential matches are identified.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Retrieve</h3>
              <p className="text-gray-600">
                Verify your ownership and arrange to collect your item from our secure campus collection points.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            Back2U is managed by a dedicated team of student volunteers and supported by campus administration.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900">Team Member {index}</h3>
                <p className="text-gray-600 text-sm">Role</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Help us reunite more people with their belongings by getting involved with Back2U.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-purple-700 hover:bg-gray-100" asChild>
              <Link to="/volunteer">Volunteer With Us</Link>
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-purple-600" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
