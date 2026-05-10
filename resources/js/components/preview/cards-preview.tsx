import { Minus, Plus, Send } from 'lucide-react';
import { useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Line,
    LineChart,
    ResponsiveContainer,
} from 'recharts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useCSSVars } from '@/hooks/use-css-vars';
import type { Registry } from '@/types/registry';

const lineData = Array.from({ length: 12 }, (_, i) => ({
    v: 30 + Math.sin(i / 1.5) * 20 + i * 3,
}));
const barData = Array.from({ length: 14 }, (_, i) => ({
    v: 20 + Math.abs(Math.sin(i)) * 60 + (i % 3) * 8,
}));

export function CardsPreview({ theme }: { theme: Registry }) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [goal, setGoal] = useState(350);
    const { cssVars } = useCSSVars(theme);

    return (
        <div style={cssVars} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Total Revenue */}
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className="text-3xl">$15,231.89</CardTitle>
                    <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p>
                </CardHeader>
                <CardContent className="h-20 p-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData}>
                            <Line
                                type="monotone"
                                dataKey="v"
                                stroke="var(--color-chart-1)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Subscriptions */}
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Subscriptions</CardDescription>
                    <CardTitle className="text-3xl">+2,350</CardTitle>
                    <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                    </p>
                </CardHeader>
                <CardContent className="h-20 p-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={lineData}>
                            <Area
                                type="monotone"
                                dataKey="v"
                                stroke="var(--color-chart-2)"
                                fill="var(--color-chart-2)"
                                fillOpacity={0.2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Calendar */}
            <Card className="row-span-2">
                <CardContent className="p-2">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md"
                    />
                </CardContent>
            </Card>

            {/* Move Goal */}
            <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                    <CardTitle>Move Goal</CardTitle>
                    <CardDescription>
                        Set your daily activity goal.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center gap-6">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setGoal((g) => Math.max(0, g - 10))}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <div className="text-center">
                            <div className="text-5xl font-bold tabular-nums">
                                {goal}
                            </div>
                            <div className="mt-1 text-[10px] tracking-wider text-muted-foreground uppercase">
                                Calories/day
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setGoal((g) => g + 10)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="mt-4 h-[60px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <Bar
                                    dataKey="v"
                                    fill="var(--color-foreground)"
                                    radius={2}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <Button className="mt-4 w-full">Set Goal</Button>
                </CardContent>
            </Card>

            {/* Upgrade subscription */}
            <Card>
                <CardHeader>
                    <CardTitle>Upgrade your subscription</CardTitle>
                    <CardDescription>
                        You are currently on the free plan. Upgrade to pro.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label className="text-xs">Name</Label>
                            <Input
                                defaultValue="Evil Rabbit"
                                className="mt-1 h-8"
                            />
                        </div>
                        <div>
                            <Label className="text-xs">Email</Label>
                            <Input
                                defaultValue="example@acme.com"
                                className="mt-1 h-8"
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="text-xs">Card Number</Label>
                        <div className="mt-1 grid grid-cols-3 gap-2">
                            <Input
                                placeholder="1234 1234 1234"
                                className="col-span-2 h-8"
                            />
                            <Input placeholder="MM/YY" className="h-8" />
                        </div>
                    </div>
                    <div>
                        <Label className="text-xs">Plan</Label>
                        <RadioGroup
                            defaultValue="starter"
                            className="mt-2 grid grid-cols-2 gap-2"
                        >
                            <Label className="flex cursor-pointer items-start gap-2 rounded-md border border-border p-3 has-[[data-state=checked]]:border-primary">
                                <RadioGroupItem value="starter" />
                                <div>
                                    <div className="text-sm font-medium">
                                        Starter Plan
                                    </div>
                                    <div className="text-[11px] text-muted-foreground">
                                        For small teams.
                                    </div>
                                </div>
                            </Label>
                            <Label className="flex cursor-pointer items-start gap-2 rounded-md border border-border p-3 has-[[data-state=checked]]:border-primary">
                                <RadioGroupItem value="pro" />
                                <div>
                                    <div className="text-sm font-medium">
                                        Pro Plan
                                    </div>
                                    <div className="text-[11px] text-muted-foreground">
                                        More features.
                                    </div>
                                </div>
                            </Label>
                        </RadioGroup>
                    </div>
                    <div>
                        <Label className="text-xs">Notes</Label>
                        <Textarea placeholder="Enter notes" className="mt-1" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-xs">
                            I agree to the terms and conditions
                        </Label>
                    </div>
                </CardContent>
            </Card>

            {/* Create account */}
            <Card>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your email to create your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">
                            GitHub
                        </Button>
                        <Button variant="outline" size="sm">
                            Google
                        </Button>
                    </div>
                    <div className="text-center text-[10px] tracking-wider text-muted-foreground uppercase">
                        Or continue with
                    </div>
                    <div>
                        <Label className="text-xs">Email</Label>
                        <Input
                            placeholder="m@example.com"
                            className="mt-1 h-8"
                        />
                    </div>
                    <div>
                        <Label className="text-xs">Password</Label>
                        <Input type="password" className="mt-1 h-8" />
                    </div>
                    <Button className="w-full">Create account</Button>
                </CardContent>
            </Card>

            {/* Chat */}
            <Card>
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-sm">Sofia Davis</CardTitle>
                        <CardDescription className="text-xs">
                            m@example.com
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="w-fit rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm">
                        Hi, how can I help you today?
                    </div>
                    <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
                        I need help building a theme editor.
                    </div>
                    <div className="w-fit rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm">
                        Sure! What design tokens are you targeting?
                    </div>
                    <div className="flex gap-2 pt-2">
                        <Input placeholder="Type a message…" className="h-9" />
                        <Button size="icon" className="h-9 w-9">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
