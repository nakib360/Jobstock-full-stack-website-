import React from 'react';
import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaDribbble,
    FaArrowUp
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-700 border-t border-gray-200 pt-10 pb-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                    {/* Logo and Address */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                {/* Logo Placeholder */}
                                <span>JS</span>
                            </div>
                            <span className="text-xl font-bold">JOB STOCK</span>
                        </div>
                        <div className="text-sm text-gray-600">
                            <p>Collins Street West, Victoria Near Bank Road</p>
                            <p>Australia QHR12456.</p>
                        </div>
                        <div className="flex space-x-3 pt-2">
                            <FaFacebookF className="cursor-pointer hover:text-green-600" />
                            <FaLinkedinIn className="cursor-pointer hover:text-green-600" />
                            <FaTwitter className="cursor-pointer hover:text-green-600" />
                            <FaDribbble className="cursor-pointer hover:text-green-600" />
                        </div>
                    </div>

                    {/* For Clients */}
                    <div className="space-y-2 text-sm">
                        <h3 className="font-semibold text-green-700">For Clients</h3>
                        <p>Free Business tools</p>
                        <p>Affiliate Program</p>
                        <p>Success Stories</p>
                        <p>Upwork Reviews</p>
                        <p>Resources</p>
                        <p>Help & Support</p>
                    </div>

                    {/* Our Resources */}
                    <div className="space-y-2 text-sm">
                        <h3 className="font-semibold text-green-700">Our Resources</h3>
                        <p>Free Business tools</p>
                        <p>Affiliate Program</p>
                        <p>Success Stories</p>
                        <p>Upwork Reviews</p>
                        <p>Resources</p>
                        <p>Help & Support</p>
                    </div>

                    {/* Company */}
                    <div className="space-y-2 text-sm">
                        <h3 className="font-semibold text-green-700">The Company</h3>
                        <p>About Us</p>
                        <p>Leadership</p>
                        <p>Contact Us</p>
                        <p>Investor Relations</p>
                        <p>Trust, Safety & Security</p>
                    </div>

                    {/* App Downloads */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-green-700">Download Apps</h3>
                        <div className="border rounded-lg px-4 py-3 flex items-center space-x-3">
                            <i className="text-2xl text-gray-600 fab fa-apple"></i>
                            <div>
                                <p className="text-xs">GET IT ON</p>
                                <p className="text-sm font-semibold">Google Play</p>
                            </div>
                        </div>
                        <div className="border rounded-lg px-4 py-3 flex items-center space-x-3">
                            <i className="text-2xl text-gray-600 fab fa-android"></i>
                            <div>
                                <p className="text-xs">GET IT ON</p>
                                <p className="text-sm font-semibold">App Store</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-10 border-t pt-5 flex flex-wrap justify-between text-sm text-gray-600">
                    <div>© 2025 JobStock Design & Develop By ❤️ Shreethemes.</div>
                    <div className="flex space-x-6 mt-2 md:mt-0">
                        <p><span className="font-bold text-gray-800">12K</span> Job Posted</p>
                        <p><span className="font-bold text-gray-800">10M</span> Happy Customers</p>
                        <p><span className="font-bold text-gray-800">76K</span> Freelancers</p>
                        <p><span className="font-bold text-gray-800">200+</span> Companies</p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-5 right-5 z-50">
                <button className="bg-green-600 text-white p-3 rounded-full shadow hover:bg-green-700">
                    <FaArrowUp />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
