import { getUserAction } from "../actions/auth";
import Link from "next/link";

export default async function NavbarAuth() {
    const user = await getUserAction();
    return (
        <div className="flex items-center gap-3 sm:gap-6">
            {user ? (
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-black group-hover:bg-blue-100 dark:group-hover:bg-blue-800 transition-colors">
                        {user.name?.[0].toUpperCase() || user.email?.[0].toUpperCase()}
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-xs font-black tracking-[0.2em] text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {user.name || user.email?.split('@')[0]}
                        </p>
                    </div>
                </Link>
            ) : (
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link href="/login" className="hidden sm:block text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 text-xs font-black uppercase tracking-[0.2em] px-4">
                        Sign In
                    </Link>
                    <Link href="/login" className="sm:hidden text-gray-600 dark:text-gray-300 text-sm font-bold px-3 py-2">
                        Login
                    </Link>
                    <Link href="/register" className="bg-blue-600 dark:bg-blue-700 text-white px-4 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs font-black uppercase tracking-wider sm:tracking-[0.2em] hover:bg-blue-700 dark:hover:bg-blue-800 transition-all active:scale-95">
                        <span className="sm:hidden">Join</span>
                        <span className="hidden sm:inline">Join Platform</span>
                    </Link>
                </div>
            )}
        </div>
    );
}