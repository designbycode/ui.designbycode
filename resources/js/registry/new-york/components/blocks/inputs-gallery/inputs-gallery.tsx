import React, { useState } from 'react';
import {
    Tag,
    Search,
    Hash,
    Lock,
    Phone,
    DollarSign,
    Coins,
    Binary,
    Sliders,
} from 'lucide-react';
import { InputSlug } from '@/registry/new-york/components/ui/inputs/input-slug';
import { InputPhone } from '@/registry/new-york/components/ui/inputs/input-phone';
import { InputCurrency } from '@/registry/new-york/components/ui/inputs/input-currency';
import { InputNumber } from '@/registry/new-york/components/ui/inputs/input-number';
import { InputPassword } from '@/registry/new-york/components/ui/inputs/input-password';
import {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectValue,
    MultiSelectContent,
    MultiSelectItem,
} from '@/registry/new-york/components/ui/inputs/multi-select';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function InputsGallery() {
    // Original states
    const [slugValue, setSlugValue] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchFocused, setSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    // New component states
    const [phoneValue, setPhoneValue] = useState('1234567890');
    const [currencyUsd, setCurrencyUsd] = useState<number | undefined>(1250.75);
    const [currencyEur, setCurrencyEur] = useState<number | undefined>(89.9);
    const [numberVal1, setNumberVal1] = useState<number | undefined>(24);
    const [numberVal2, setNumberVal2] = useState<number | undefined>(1.5);

    const options = [
        { label: 'Next.js', value: 'next' },
        { label: 'Laravel', value: 'laravel' },
        { label: 'React', value: 'react' },
        { label: 'Vite', value: 'vite' },
        { label: 'Tailwind CSS', value: 'tailwind' },
    ];

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6">
            <div className="space-y-2">
                <Badge
                    variant="outline"
                    className="bg-primary/5 px-3 py-1 font-mono text-xs tracking-widest text-primary uppercase"
                >
                    Component Showcase
                </Badge>
                <h2 className="text-2xl font-bold tracking-tight">
                    Interactive Inputs Gallery
                </h2>
                <p className="text-xs text-muted-foreground">
                    Explore and compare different interactive input fields, tag
                    drop-downs, phone validators, currency formatters, and
                    number steppers.
                </p>
            </div>

            <div className="grid w-full items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* 1. Slug Formatter Input */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Hash className="size-4 text-chart-5" />
                            Auto-Slug Input
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Format text dynamically into clean, URL-safe slug
                            strings as you type.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center space-y-3 pb-6">
                        <InputSlug
                            value={slugValue}
                            onValueChange={setSlugValue}
                            placeholder="Type a title e.g. New Product Launch..."
                            className="h-9 w-full text-xs"
                        />
                        <div className="truncate rounded border border-border/20 bg-muted/30 p-2.5 font-mono text-[10px] text-muted-foreground">
                            slug:{' '}
                            <span className="font-bold text-primary">
                                {slugValue || 'none'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Multi-Select Dropdown */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Tag className="size-4 text-chart-3" />
                            Multi-Select Dropdown
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Dropdown component for selecting and compiling
                            multiple tags.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex min-h-[120px] flex-1 flex-col justify-center space-y-3 pb-6">
                        <MultiSelect
                            value={selectedTags}
                            onValueChange={setSelectedTags}
                        >
                            <MultiSelectTrigger className="h-9 w-full text-xs">
                                <MultiSelectValue placeholder="Select technologies..." />
                            </MultiSelectTrigger>
                            <MultiSelectContent>
                                {options.map((opt) => (
                                    <MultiSelectItem
                                        key={opt.value}
                                        value={opt.value}
                                    >
                                        {opt.label}
                                    </MultiSelectItem>
                                ))}
                            </MultiSelectContent>
                        </MultiSelect>
                        <div className="truncate rounded border border-border/20 bg-muted/30 p-2.5 font-mono text-[10px] text-muted-foreground">
                            Selected:{' '}
                            <span className="font-bold text-primary">
                                {selectedTags.join(', ') || 'none'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Focus-Glow Search Input */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Search className="size-4 text-chart-2" />
                            Focus-Glow Search
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Expands and updates border glow states upon search
                            selection.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center pb-6">
                        <div className="relative">
                            <Search
                                className={`absolute top-1/2 left-3 size-3.5 -translate-y-1/2 transition-colors duration-300 ${
                                    searchFocused
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                }`}
                            />
                            <Input
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                placeholder="Search queries..."
                                className={`h-9 pl-9 text-xs transition-all duration-300 ${
                                    searchFocused
                                        ? 'border-primary bg-card/50 ring-1 ring-primary/20'
                                        : 'border-border/50 bg-card/15'
                                }`}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Interactive Phone Number */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Phone className="size-4 text-chart-4" />
                            Formatted Phone Input
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Enforces numeric input and formats to masks like US
                            phone standard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center space-y-3 pb-6">
                        <InputPhone
                            value={phoneValue}
                            onValueChange={setPhoneValue}
                            placeholder="(555) 000-0000"
                            className="h-9 w-full text-xs"
                        />
                        <div className="truncate rounded border border-border/20 bg-muted/30 p-2.5 font-mono text-[10px] text-muted-foreground">
                            digits:{' '}
                            <span className="font-bold text-primary">
                                {phoneValue || 'none'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Currency Formatter (USD) */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <DollarSign className="size-4 text-chart-4" />
                            Currency Input (USD)
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Thousand grouping, decimal enforcement, and
                            auto-round on blur.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center space-y-3 pb-6">
                        <InputCurrency
                            value={currencyUsd}
                            onValueChange={(val) => setCurrencyUsd(val)}
                            currency="USD"
                            locale="en-US"
                            placeholder="0.00"
                            className="h-9 w-full text-xs"
                        />
                        <div className="truncate rounded border border-border/20 bg-muted/30 p-2.5 font-mono text-[10px] text-muted-foreground">
                            float:{' '}
                            <span className="font-bold text-primary">
                                {currencyUsd !== undefined
                                    ? currencyUsd
                                    : 'none'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 6. Currency Formatter (EUR) */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Coins className="size-4 text-chart-3" />
                            Currency Input (EUR)
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Supports international locales and currency symbols
                            automatically.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center space-y-3 pb-6">
                        <InputCurrency
                            value={currencyEur}
                            onValueChange={(val) => setCurrencyEur(val)}
                            currency="EUR"
                            locale="de-DE"
                            placeholder="0,00"
                            className="h-9 w-full text-xs"
                        />
                        <div className="truncate rounded border border-border/20 bg-muted/30 p-2.5 font-mono text-[10px] text-muted-foreground">
                            float:{' '}
                            <span className="font-bold text-primary">
                                {currencyEur !== undefined
                                    ? currencyEur
                                    : 'none'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 7. Numeric Stepper / Suffix */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Binary className="size-4 text-chart-1" />
                            Numeric Spinner (px)
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Numeric stepper controls, Arrow keys, limits, and
                            suffix labels.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center space-y-3 pb-6">
                        <InputNumber
                            value={numberVal1}
                            onValueChange={setNumberVal1}
                            min={0}
                            max={100}
                            step={1}
                            suffix="px"
                            placeholder="0"
                            className="h-9 w-full text-xs"
                        />
                        <div className="truncate rounded border border-border/20 bg-muted/30 p-2.5 font-mono text-[10px] text-muted-foreground">
                            number:{' '}
                            <span className="font-bold text-primary">
                                {numberVal1 !== undefined ? numberVal1 : 'none'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 8. Decimals Spinner */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Sliders className="size-4 text-chart-5" />
                            Decimals Spinner
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Increment with float step (e.g. 0.5) and precision
                            auto-handling.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center space-y-3 pb-6">
                        <InputNumber
                            value={numberVal2}
                            onValueChange={setNumberVal2}
                            min={0}
                            max={10}
                            step={0.5}
                            placeholder="0.0"
                            className="h-9 w-full text-xs"
                        />
                        <div className="truncate rounded border border-border/20 bg-muted/30 p-2.5 font-mono text-[10px] text-muted-foreground">
                            number:{' '}
                            <span className="font-bold text-primary">
                                {numberVal2 !== undefined ? numberVal2 : 'none'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 9. Secure Password Field */}
                <Card className="flex flex-col justify-between border border-border/40 bg-card/25 backdrop-blur-xs">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Lock className="size-4 text-chart-1" />
                            Password Input
                        </CardTitle>
                        <CardDescription className="text-xs">
                            A secure password input field with a toggleable visibility eye icon.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-center space-y-3 pb-6">
                        <InputPassword
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            placeholder="••••••••"
                            className="h-9 w-full text-xs"
                        />
                        <div className="truncate rounded border border-border/20 bg-muted/30 p-2.5 font-mono text-[10px] text-muted-foreground">
                            Value:{' '}
                            <span className="font-bold text-primary">
                                {passwordValue || 'none'}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default InputsGallery;
