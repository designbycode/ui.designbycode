'use client';

import { User, Heart, MessageSquare } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function UserProfileCard() {
    return (
        <Card className="relative mx-auto w-full max-w-sm overflow-hidden border-border/50 bg-card/30 py-0 backdrop-blur-xs">
            {/* Cover photo placeholder */}
            <div className="relative h-32 w-full bg-linear-to-r from-primary/30 to-accent/30" />

            <CardContent className="pt-0 pb-6 text-center">
                {/* Profile Photo */}
                <div className="relative mx-auto -mt-14 flex size-16 items-center justify-center rounded-full border-2 border-border/80 bg-background text-lg font-bold text-primary shadow-sm">
                    <User className="size-8" />
                </div>

                <div className="mt-2.5">
                    <h4 className="text-sm font-bold text-foreground">
                        Sarah Jenkins
                    </h4>
                    <p className="text-[10px] text-muted-foreground">
                        Product Designer @ Peak
                    </p>
                </div>

                <p className="mx-auto mt-3 max-w-xs text-[10px] leading-relaxed text-muted-foreground/90">
                    UX/UI enthusiast. Currently designing fluid responsive
                    developer workspaces and styling libraries.
                </p>

                {/* Profile metrics */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-y border-border/20 py-2.5">
                    <div>
                        <div className="text-xs font-black text-foreground">
                            4.8k
                        </div>
                        <div className="mt-0.5 text-[8px] font-bold text-muted-foreground uppercase">
                            Followers
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-black text-foreground">
                            124
                        </div>
                        <div className="mt-0.5 text-[8px] font-bold text-muted-foreground uppercase">
                            Projects
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-black text-foreground">
                            12
                        </div>
                        <div className="mt-0.5 text-[8px] font-bold text-muted-foreground uppercase">
                            Awards
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-center gap-2">
                    <Button
                        size="sm"
                        className="h-8 gap-1.5 px-3.5 text-xs font-bold"
                    >
                        <Heart className="size-3.5" />
                        Follow
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1.5 border-border/60 px-3.5 text-xs font-bold"
                    >
                        <MessageSquare className="size-3.5" />
                        Message
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default UserProfileCard;
