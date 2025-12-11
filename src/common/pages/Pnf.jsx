import React from "react";
import { Link } from "react-router-dom";

export default function Pnf() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50 p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden md:flex">
        {/* Left: Image / GIF */}
        <div className="md:w-1/2 flex items-center justify-center bg-slate-100 p-6">
          <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            alt="searching for page gif"
            className="w-full h-64 object-contain md:h-80"
          />
        </div>

        {/* Right: Text & actions */}
        <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-3">Oops — page not found</h1>
            <p className="text-slate-600 mb-4">
              Looks like the page you're trying to reach doesn't exist (yet!). Maybe the book was removed,
              the URL changed, or someone typed the address incorrectly.
            </p>

            <div className="bg-sky-50 border-l-4 border-sky-400 p-4 rounded mb-4">
              <p className="text-slate-700">
                Try these:
              </p>
              <ul className="list-disc list-inside mt-2 text-slate-600">
                <li>Go back to the homepage</li>
                <li>Browse our collection of books</li>
                <li>Search by title from the All Books page</li>
              </ul>
            </div>

            <div className="mt-4 flex gap-3">
              <Link
                to="/"
                className="inline-block px-5 py-3 bg-blue-900 text-white rounded-lg shadow hover:opacity-95"
                aria-label="Go to home"
              >
                Go to Home
              </Link>

              <Link
                to="/all-books"
                className="inline-block px-5 py-3 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50"
                aria-label="Browse all books"
              >
                Browse Books
              </Link>
            </div>
          </div>

          <div className="mt-6 text-sm text-slate-500">
            <p>
              If you think this is an error, please contact us at{" "}
              <a href="mailto:support@bookstore.example" className="text-blue-700 underline">support@bookstore.example</a>.
            </p>
            <p className="mt-2">Happy reading — the Bookstore team 📚</p>
          </div>
        </div>
      </div>
    </div>
  );
}


