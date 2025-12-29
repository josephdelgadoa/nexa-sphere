"use client";

import React, { useEffect, useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

interface Submissions {
    id: string;
    timestamp: string;
    businessName: string;
    businessCategory: string;
    offerDetails: string;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

export default function SalesView() {
    const [submissions, setSubmissions] = useState<Submissions[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock historical data for the chart (since we only have recent real data)
    const data = [
        { name: 'Jun', revenue: 4000, profit: 2400 },
        { name: 'Jul', revenue: 3000, profit: 1398 },
        { name: 'Aug', revenue: 9800, profit: 5800 },
        { name: 'Sep', revenue: 6500, profit: 3908 },
        { name: 'Oct', revenue: 11000, profit: 7800 },
        { name: 'Nov', revenue: 14000, profit: 9800 },
        { name: 'Dec', revenue: 18500, profit: 12500 }, // Projected based on trend
    ];

    const pieData = [
        { name: 'Market Dominator', value: 45 },
        { name: 'Growth Accelerator', value: 30 },
        { name: 'Social Ignite', value: 15 },
        { name: 'Consulting', value: 10 },
    ];

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await fetch('/api/agency-onboarding');
                if (res.ok) {
                    const data = await res.json();
                    setSubmissions(data.reverse()); // Newest first
                }
            } catch (error) {
                console.error("Failed to fetch sales data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, []);

    // Infer revenue from real submissions (Simulation for demo)
    const realRevenue = submissions.length * 1500; // Assuming avg deal size of $1500
    const totalRevenue = 54000 + realRevenue; // Base + Real

    if (loading) return <div className="p-10 text-center text-gray-500">Loading Sales Data...</div>;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Revenue</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">${totalRevenue.toLocaleString()}</h3>
                    <div className="mt-2 flex items-center text-sm text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded w-fit">
                        <span>+24.5%</span>
                        <span className="ml-1">vs last month</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Active Clients</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{12 + submissions.length}</h3>
                    <div className="mt-2 flex items-center text-sm text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded w-fit">
                        <span>+{submissions.length} New</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg. Deal Size</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">$1,250</h3>
                    <p className="text-sm text-gray-400 mt-2">Driven by Market Dominator</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Conversion Rate</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">4.2%</h3>
                    <p className="text-sm text-gray-400 mt-2">Top 10% of industry</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Revenue Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue Performance</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} tickFormatter={(value) => `$${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px', color: '#f3f4f6' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Total Revenue" />
                                <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" name="Net Profit" />
                                <Legend verticalAlign="top" height={36} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales Distribution */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Package Distribution</h3>
                    <div className="h-[350px] w-full flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 w-full space-y-3">
                            {pieData.map((entry, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                        <span className="text-gray-600 dark:text-gray-300">{entry.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-900 dark:text-white">{entry.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
                    <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {/* Real Data Rendered Here */}
                            {submissions.map((sub, idx) => (
                                <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xs mr-3">
                                                {sub.businessName.charAt(0)}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{sub.businessName}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(sub.timestamp).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {sub.businessCategory}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        $1,500.00
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {/* Mock Fallback if empty, or just extra rows to look full */}
                            {submissions.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No recent transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
