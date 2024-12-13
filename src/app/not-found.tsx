'use client';

import { CHART_COLORS } from '@/utils/colors';
import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <div 
                    className="inline-flex rounded-full p-4 mb-4"
                    style={{ backgroundColor: `${CHART_COLORS.primary}15` }}
                >
                    <div 
                        className="rounded-full text-8xl font-bold"
                        style={{ color: CHART_COLORS.primary }}
                    >
                        404
                    </div>
                </div>
                
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
                <div className="mt-10">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 transition-colors duration-200"
                        style={{ 
                            borderColor: CHART_COLORS.primary,
                            color: CHART_COLORS.primary 
                        }}
                    >
                        <HomeIcon className="w-5 h-5 mr-2" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
} 