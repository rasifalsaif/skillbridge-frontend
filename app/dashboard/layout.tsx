import { getUserAction } from '@/app/actions/auth';
import Logo from '@/app/components/Logo';
import LogoutButton from '@/app/components/LogoutButton';
import NavItemLink from '@/app/components/NavItemLink';
import NavSectionTitle from '@/app/components/NavSectionTitle';
import SidebarContainer from '@/app/components/SidebarContainer';
import { navigation, sharedNavigation } from '@/app/constants/navLinks';
import { DashboardProvider } from '@/app/context/DashboardContext';
import { redirect } from 'next/navigation';
import React from 'react';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await getUserAction();

    if (!user) {
        redirect('/login');
    }

    const currentNav = navigation[user.role as keyof typeof navigation] || sharedNavigation;
    return (
        <DashboardProvider>
            <div className="h-screen flex bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors duration-300">
                <SidebarContainer>
                    <div className="h-full flex flex-col p-6">
                        <div className="mb-10">
                            <Logo />
                        </div>

                        <nav className="flex-1 space-y-1">
                            <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-4 mb-4">
                                Main Menu
                            </div>
                            {currentNav.map((item) => (
                                <NavItemLink key={item.name} href={item.href}>
                                    <item.icon size={20} />
                                    <span className="font-bold text-sm tracking-tight">{item.name}</span>
                                </NavItemLink>
                            ))}
                        </nav>
                    </div>
                </SidebarContainer>

                <div className="flex-1 flex flex-col min-w-0 h-full relative">
                    <header className="h-20 shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/50 px-6 flex items-center justify-between z-30 transition-colors duration-300">
                        <NavSectionTitle role={user.role} />
                        <div className="flex items-center gap-4">
                            <ThemeSwitcher />
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-black">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="hidden md:block overflow-hidden">
                                    <div className="font-black text-sm text-gray-900 dark:text-gray-100 truncate">{user.name}</div>
                                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{user.role}</div>
                                </div>
                            </div>
                            <LogoutButton user={user} />
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-6 md:p-16">
                        {children}
                    </main>
                </div>
            </div>
        </DashboardProvider>
    );
}
