"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavOptions } from "@/config/base.config";
import { Home, ArrowLeft, Construction, AlertTriangle } from "lucide-react";

export default function NotFound() {
  const pathname = usePathname();

  const validPaths = NavOptions.map(option => option.href);
  const isUnderConstruction = validPaths.includes(pathname) && pathname !== "/";
  
  if (isUnderConstruction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <Construction className="w-24 h-24 text-custom-green mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Under Construction
            </h1>
            <p className="text-gray-600 mb-6">
              This page is currently being built. We're working hard to bring you something amazing!
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              What's Coming Soon
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-custom-green rounded-full"></div>
                <span className="text-gray-700">Enhanced user experience</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-custom-green rounded-full"></div>
                <span className="text-gray-700">Modern design interface</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-custom-green rounded-full"></div>
                <span className="text-gray-700">Comprehensive content</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-custom-green hover:bg-custom-green/90 text-white px-6 py-3">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-custom-green text-custom-green hover:bg-custom-green hover:text-white"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Expected completion: Coming Soon</p>
          </div>
        </div>
      </div>
    );
  }
  
  // 404 Error Page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            What you can do:
          </h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-custom-green rounded-full"></div>
              <span className="text-gray-700">Check the URL for typos</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-custom-green rounded-full"></div>
              <span className="text-gray-700">Go back to our homepage</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-custom-green rounded-full"></div>
              <span className="text-gray-700">Contact us if the problem persists</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-custom-green hover:bg-custom-green/90 text-white px-6 py-3">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="border-custom-green text-custom-green hover:bg-custom-green hover:text-white"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please{" "}
            <Link href="/contact-us" className="text-custom-green hover:underline">
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
