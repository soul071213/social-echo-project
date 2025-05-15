
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-12 w-12 text-primary mb-6"
        fill="currentColor"
      >
        <g>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </g>
      </svg>
      
      <h1 className="text-5xl font-bold mb-4">Hmm...this page doesn't exist</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Try searching for something else, or go back to the home page.
      </p>
      
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">
            Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/explore">
            Explore
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
