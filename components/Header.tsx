
import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            <div className="flex items-center">
              <img className="h-8 w-8 rounded-full" src="https://picsum.photos/100" alt="User" />
              <span className="ml-3 text-sm font-medium text-slate-700">Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
