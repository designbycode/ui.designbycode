import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';
import React from 'react';
import { StatCard } from './stat-card';

// Mock chart data for sparklines
const revenueData = [
    { value: 4000 },
    { value: 4500 },
    { value: 5100 },
    { value: 4900 },
    { value: 5300 },
    { value: 5800 },
    { value: 6200 },
];

const subscriptionsData = [
    { value: 120 },
    { value: 140 },
    { value: 135 },
    { value: 160 },
    { value: 180 },
    { value: 175 },
    { value: 210 },
];

const salesData = [
    { value: 300 },
    { value: 320 },
    { value: 290 },
    { value: 350 },
    { value: 410 },
    { value: 380 },
    { value: 450 },
];

const activeUsersData = [
    { value: 450 },
    { value: 480 },
    { value: 510 },
    { value: 490 },
    { value: 530 },
    { value: 560 },
    { value: 573 },
];

export function CardsStats() {
    return (
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Total Revenue"
                value="$45,231.89"
                description="+$8,231.89 from last month"
                trend={{ type: 'up', value: '20.1%' }}
                icon={<DollarSign className="size-4" />}
                chartType="area"
                chartData={revenueData}
                chartColor="var(--color-chart-2)"
            />
            <StatCard
                title="Subscriptions"
                value="+2,350"
                description="+180.1% from last month"
                trend={{ type: 'up', value: '180.1%' }}
                icon={<CreditCard className="size-4" />}
                chartType="bar"
                chartData={subscriptionsData}
                chartColor="var(--color-chart-3)"
            />
            <StatCard
                title="Sales"
                value="+12,234"
                description="+19% from last month"
                trend={{ type: 'up', value: '19%' }}
                icon={<DollarSign className="size-4" />}
                chartType="area"
                chartData={salesData}
                chartColor="var(--color-chart-1)"
            />
            <StatCard
                title="Active Now"
                value="+573"
                description="+201 since last hour"
                trend={{ type: 'up', value: '12%' }}
                icon={<Activity className="size-4" />}
                chartType="bar"
                chartData={activeUsersData}
                chartColor="var(--color-chart-4)"
            />
        </div>
    );
}
export default CardsStats;
