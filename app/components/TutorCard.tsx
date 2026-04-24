'use client';

import Link from 'next/link';
import { TutorProfile } from '../types/intex';
import { Star, MapPin, ArrowRight } from 'lucide-react';

interface TutorCardProps {
    /** The tutor profile data to display */
    tutor: TutorProfile;
}

/**
 * A card component that displays summary information for a tutor profile.
 * Includes tutor name, hourly rate, category, bio snippet, and rating.
 */
export default function TutorCard({ tutor }: TutorCardProps) {
    const averageRating = tutor.reviews && tutor.reviews.length > 0
        ? (tutor.reviews.reduce((acc, rev) => acc + rev.rating, 0) / tutor.reviews.length).toFixed(1)
        : '0.0';

    return (
        <Link
            href={`/tutors/${tutor.id}`}
            className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 dark:hover:shadow-blue-400/5 transition-all duration-500 group relative overflow-hidden flex flex-col h-full animate-fade-in-up"
        >
            <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white">
                    {tutor.user.name.charAt(0)}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-gray-900 dark:text-white leading-tight">${tutor.hourlyRate}</span>
                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">/hour</span>
                </div>
            </div>

            <div className="relative z-10 mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 inline-block ${tutor.category ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-red-50 dark:bg-red-900/30 italic text-red-600 dark:text-red-400'}`}>
                    {tutor.category?.name || "(Category removed)"}
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                    {tutor.user.name}
                </h3>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium line-clamp-2 mb-8 relative z-10 leading-relaxed">
                {tutor.bio}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-700 mt-auto relative z-10">
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-amber-500 gap-1">
                        <Star size={16} fill={Number(averageRating) > 0 ? "currentColor" : "none"} />
                        <span className="text-gray-900 dark:text-white font-black text-sm">{averageRating}</span>
                    </div>
                    <div className="flex items-center text-gray-400 dark:text-gray-500 gap-1.5 font-bold text-xs">
                        <MapPin size={12} /> Remote
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest group-hover:gap-2.5 transition-all">
                    Profile <ArrowRight size={16} />
                </div>
            </div>
        </Link>
    );
}
