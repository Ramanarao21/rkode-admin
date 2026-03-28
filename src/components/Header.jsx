import { HiLogout } from 'react-icons/hi';
import authService from '../services/authService';

export default function Header() {
  const user = authService.getUser();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authService.logout();
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#0f0d1a]">
          <span className="text-[#6c47ff]">RK</span>ODE LABS
          <span className="ml-3 text-sm text-gray-500 font-bold">Admin Dashboard</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Welcome, {user?.name || 'Admin'}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <HiLogout className="text-lg" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
