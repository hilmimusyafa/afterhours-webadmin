"use client"

import { CartesianGrid, Line, LineChart, XAxis, ResponsiveContainer, Tooltip } from "recharts"

export function ChartLineDefault({ chartData }: { chartData: { day: string; orders: number | null }[] }) {
    return (
        <div className="flex flex-col h-full w-full p-6 bg-[#0f0f0f] border border-[#1a1a1a] rounded-sm">
            <div className="flex flex-col gap-1 mb-6">
                <h3 className="font-['Ndot57Caps'] text-[#f0ece4] tracking-[0.1em] text-lg m-0">
                    ORDER <span className="text-[#d42b2b]">TREND</span>
                </h3>
                <p className="font-mono text-xs text-[#888] m-0">Past 5 Days, Today, and Tomorrow</p>
            </div>
            
            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                    initialDimension={{ width: 500, height: 250 }}
                >
                    <LineChart
                        data={chartData}
                        margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} stroke="#1a1a1a" />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }}
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0f0f0f', borderColor: '#1a1a1a', borderRadius: '2px' }}
                            itemStyle={{ color: '#d42b2b', fontFamily: 'monospace', fontSize: '12px' }}
                            labelStyle={{ color: '#f0ece4', fontFamily: 'monospace', fontSize: '12px', marginBottom: '4px' }}
                        />
                        <Line
                            dataKey="orders"
                            name="Orders"
                            type="monotone"
                            stroke="#d42b2b"
                            strokeWidth={2}
                            dot={{ fill: "#0f0f0f", stroke: "#d42b2b", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: "#d42b2b" }}
                            connectNulls={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
