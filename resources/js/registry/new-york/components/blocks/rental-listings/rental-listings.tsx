import React, { useState, useMemo } from 'react';
import {
    Search,
    Star,
    MapPin,
    Wifi,
    Coffee,
    Compass,
    Heart,
    Eye,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface RentalItem {
    id: string;
    name: string;
    description: string;
    location: string;
    price: number;
    rating: number;
    reviews: number;
    category: 'cabin' | 'villa' | 'loft' | 'beachfront';
    guests: number;
    beds: number;
    baths: number;
    featured: boolean;
    amenities: string[];
    gradient: string;
}

const LISTINGS_DATA: RentalItem[] = [
    {
        id: '1',
        name: 'Whispering Pines Retreat',
        description:
            'Cozy rustic cabin nestled deep in a redwood forest with outdoor stone fireplace and cedar hot tub.',
        location: 'Redwood Valley, CA',
        price: 135,
        rating: 4.92,
        reviews: 124,
        category: 'cabin',
        guests: 4,
        beds: 2,
        baths: 1,
        featured: true,
        amenities: ['Hot Tub', 'Fireplace', 'Wifi', 'Kitchen'],
        gradient: 'from-chart-4/70 via-chart-4 to-primary/80',
    },
    {
        id: '2',
        name: 'The Azure Wave Villa',
        description:
            'Spectacular infinity-pool seaside villa overlooking crystal blue waves with panoramic glass terrace.',
        location: 'Amalfi Coast, Italy',
        price: 280,
        rating: 4.98,
        reviews: 86,
        category: 'villa',
        guests: 6,
        beds: 3,
        baths: 3,
        featured: true,
        amenities: ['Pool', 'Sea View', 'Wifi', 'Breakfast'],
        gradient: 'from-chart-3/70 via-chart-3 to-primary/80',
    },
    {
        id: '3',
        name: 'Celestial Heights Loft',
        description:
            'Ultra-modern luxury loft featuring skyscraper skyline view, home theater, and rooftop skydeck.',
        location: 'Tokyo, Japan',
        price: 340,
        rating: 4.89,
        reviews: 42,
        category: 'loft',
        guests: 2,
        beds: 1,
        baths: 1.5,
        featured: false,
        amenities: ['Sky View', 'Gym', 'Wifi', 'Smart Home'],
        gradient: 'from-muted via-border/50 to-primary/80',
    },
    {
        id: '4',
        name: 'Coral Sands Beachfront',
        description:
            'Step directly onto pink powder sands. A bright beach chalet with hammocks, kayaks, and breeze deck.',
        location: 'Eleuthera, Bahamas',
        price: 195,
        rating: 4.95,
        reviews: 212,
        category: 'beachfront',
        guests: 5,
        beds: 3,
        baths: 2,
        featured: true,
        amenities: ['Beachfront', 'Kayaks', 'Wifi', 'Air Conditioning'],
        gradient: 'from-chart-3/80 via-chart-3 to-chart-2/80',
    },
    {
        id: '5',
        name: 'Mountain Crest Lodge',
        description:
            'Alpine retreat with ski-in/ski-out deck, heated floors, and majestic snowy peaks right outside.',
        location: 'Aspen, CO',
        price: 245,
        rating: 4.87,
        reviews: 73,
        category: 'cabin',
        guests: 8,
        beds: 4,
        baths: 3.5,
        featured: false,
        amenities: ['Ski Access', 'Fireplace', 'Wifi', 'Hot Tub'],
        gradient: 'from-chart-5/70 via-chart-5 to-primary/80',
    },
    {
        id: '6',
        name: 'Emerald Vista Hideaway',
        description:
            'Architectural forest treehouse elevated above the jungle canopy with rain shower and suspension bridge.',
        location: 'Monteverde, Costa Rica',
        price: 160,
        rating: 4.91,
        reviews: 95,
        category: 'beachfront',
        guests: 3,
        beds: 2,
        baths: 1,
        featured: false,
        amenities: ['Jungle View', 'Wifi', 'Eco-Friendly', 'Deck'],
        gradient: 'from-chart-2/70 via-chart-2 to-primary/80',
    },
];

export function RentalListings() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id)
                ? prev.filter((fId) => fId !== id)
                : [...prev, id],
        );
    };

    const categories = [
        { label: 'All Rentals', value: 'all' },
        { label: 'Cabins', value: 'cabin' },
        { label: 'Villas', value: 'villa' },
        { label: 'Lofts', value: 'loft' },
        { label: 'Beachfront', value: 'beachfront' },
    ];

    const filteredListings = useMemo(() => {
        return LISTINGS_DATA.filter((listing) => {
            const matchesSearch =
                listing.name.toLowerCase().includes(search.toLowerCase()) ||
                listing.location.toLowerCase().includes(search.toLowerCase()) ||
                listing.description
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                selectedCategory === 'all' ||
                listing.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [search, selectedCategory]);

    const getAmenityIcon = (amenity: string) => {
        switch (amenity.toLowerCase()) {
            case 'wifi':
                return <Wifi className="size-3" />;
            case 'breakfast':
            case 'coffee':
                return <Coffee className="size-3" />;
            default:
                return <Compass className="size-3" />;
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-4">
            {/* Header with Search and Category Filter */}
            <div className="flex flex-col gap-4 border-b border-border/20 pb-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight">
                        Rental Getaways
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Find premium cabins, villas, lofts, and unique spaces
                        around the world
                    </p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row md:max-w-md">
                    <div className="relative flex-1">
                        <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
                        <Input
                            placeholder="Search locations or listings..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-9 pl-9 text-xs"
                        />
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="no-scrollbar flex flex-wrap gap-1.5 overflow-x-auto pb-1">
                {categories.map((cat) => (
                    <Button
                        key={cat.value}
                        variant={
                            selectedCategory === cat.value
                                ? 'default'
                                : 'outline'
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(cat.value)}
                        className="h-8 cursor-pointer rounded-full px-4 text-xs select-none"
                    >
                        {cat.label}
                    </Button>
                ))}
            </div>

            {/* Listings Grid */}
            {filteredListings.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/50 bg-card/25 py-16 text-center backdrop-blur-xs">
                    <p className="text-sm text-muted-foreground">
                        No rentals match your search filters.
                    </p>
                    <Button
                        onClick={() => {
                            setSearch('');
                            setSelectedCategory('all');
                        }}
                        variant="link"
                        className="mt-2 text-xs"
                    >
                        Clear all filters
                    </Button>
                </div>
            ) : (
                <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredListings.map((listing) => (
                        <Card
                            key={listing.id}
                            className="group relative flex flex-col overflow-hidden border border-border/40 bg-card/15 backdrop-blur-xs transition-all duration-300 hover:border-border/70 hover:shadow-xl"
                        >
                            {/* Graphic Vector Representation (Abstract Gradient Image) */}
                            <div
                                className={`h-48 w-full bg-gradient-to-br ${listing.gradient} relative flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-[1.02]`}
                            >
                                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/20" />

                                {/* Featured Badge */}
                                {listing.featured && (
                                    <Badge className="absolute top-3 left-3 bg-chart-4 px-2 py-0.5 text-[9px] font-bold tracking-wide text-primary-foreground uppercase shadow-md hover:bg-chart-4/90">
                                        ★ Featured
                                    </Badge>
                                )}

                                {/* Favorite button */}
                                <button
                                    onClick={() => toggleFavorite(listing.id)}
                                    className="absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition-colors select-none hover:bg-black/55"
                                >
                                    <Heart
                                        className={`size-4 ${favorites.includes(listing.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                                    />
                                </button>

                                {/* Location Banner overlay */}
                                <div className="absolute right-3 bottom-3 left-3 z-10 flex items-center justify-between text-white">
                                    <span className="flex items-center gap-1 rounded bg-black/45 px-2 py-1 text-[10px] font-semibold backdrop-blur-xs">
                                        <MapPin className="size-3 text-sky-400" />
                                        {listing.location}
                                    </span>
                                    <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-extrabold text-primary-foreground">
                                        ${listing.price}{' '}
                                        <span className="text-[9px] font-normal opacity-85">
                                            / nt
                                        </span>
                                    </span>
                                </div>

                                {/* Abstract geometric pattern representing structures */}
                                <div className="size-24 scale-75 rotate-45 rounded border border-white/10 opacity-20 transition-all duration-700 group-hover:scale-90 group-hover:rotate-90" />
                            </div>

                            {/* Card Content Details */}
                            <CardHeader className="space-y-1 p-4 pb-2">
                                <div className="flex items-center justify-between">
                                    <Badge
                                        variant="secondary"
                                        className="px-2 py-0.5 font-mono text-[9px] tracking-wider capitalize"
                                    >
                                        {listing.category}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs">
                                        <Star className="size-3.5 fill-amber-500 text-amber-500" />
                                        <span className="font-bold text-foreground">
                                            {listing.rating}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground">
                                            ({listing.reviews})
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mt-1 line-clamp-1 text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                                    {listing.name}
                                </h3>
                            </CardHeader>

                            <CardContent className="flex flex-1 flex-col gap-3 p-4 pt-0 pb-3">
                                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                    {listing.description}
                                </p>

                                {/* Space characteristics info */}
                                <div className="mt-auto flex gap-3 border-y border-border/10 py-2 text-[10px] text-muted-foreground">
                                    <span>
                                        <strong>{listing.guests}</strong> Guests
                                    </span>
                                    <span>•</span>
                                    <span>
                                        <strong>{listing.beds}</strong> Beds
                                    </span>
                                    <span>•</span>
                                    <span>
                                        <strong>{listing.baths}</strong> Baths
                                    </span>
                                </div>
                            </CardContent>

                            <CardFooter className="mt-1 flex items-center justify-between gap-2 border-t border-border/10 p-4 pt-0">
                                <div className="flex max-w-[65%] gap-1.5 overflow-hidden">
                                    {listing.amenities
                                        .slice(0, 2)
                                        .map((amenity) => (
                                            <Badge
                                                key={amenity}
                                                variant="outline"
                                                className="flex shrink-0 items-center gap-1 border-border/30 bg-muted/5 px-1.5 py-0 text-[9px] font-normal text-muted-foreground"
                                            >
                                                {getAmenityIcon(amenity)}
                                                {amenity}
                                            </Badge>
                                        ))}
                                </div>
                                <Button
                                    size="sm"
                                    className="h-8 shrink-0 cursor-pointer gap-1 rounded bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/95"
                                >
                                    <Eye className="size-3.5" />
                                    Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RentalListings;
