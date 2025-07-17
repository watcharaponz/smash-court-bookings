import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Calendar, LogIn, LogOut, Settings } from "lucide-react";

interface HeaderProps {
  user?: { name: string; email: string; isAdmin?: boolean } | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onNavigate?: (page: string) => void;
}

export function Header({ user, onLogin, onLogout, onNavigate }: HeaderProps) {
  return (
    <header className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onNavigate?.("home")}
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">CourtBook</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => onNavigate?.("courts")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Courts
          </button>
          {user && (
            <button 
              onClick={() => onNavigate?.("dashboard")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              My Bookings
            </button>
          )}
          {user?.isAdmin && (
            <button 
              onClick={() => onNavigate?.("admin")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin Panel
            </button>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{user.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button 
              variant="gradient" 
              size="sm" 
              onClick={onLogin}
              className="flex items-center space-x-1"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}