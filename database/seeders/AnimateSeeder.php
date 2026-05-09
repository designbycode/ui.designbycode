<?php

namespace Database\Seeders;

use App\Models\Animate;
use Illuminate\Database\Seeder;

class AnimateSeeder extends Seeder
{
    public function run(): void
    {
        if (Animate::count() > 0) {
            $this->command->warn('Animations table is not empty — skipping seeder.');

            return;
        }

        $total = 0;

        foreach (static::animations() as $animation) {
            Animate::create($animation);
            $total++;
        }

        $this->command->info("Seeded {$total} animations.");
    }

    private function animations(): array
    {
        return [
            [
                'name' => 'animate-bounce',
                'title' => 'Animate Bounce',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce' => 'bounce 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounce' => [
                            '0%, 20%, 50%, 80%, 100%' => [
                                'transform' => 'translateY(0)',
                            ],
                            '40%' => [
                                'transform' => 'translateY(-30px)',
                            ],
                            '60%' => [
                                'transform' => 'translateY(-15px)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-pulse',
                'title' => 'Animate Pulse',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-pulse' => 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes pulse' => [
                            '0%, 100%' => [
                                'opacity' => '1',
                            ],
                            '50%' => [
                                'opacity' => '0.5',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-flash',
                'title' => 'Animate Flash',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-flash' => 'flash 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes flash' => [
                            '0%, 50%, 100%' => [
                                'opacity' => '1',
                            ],
                            '25%, 75%' => [
                                'opacity' => '0',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-wobble',
                'title' => 'Animate Wobble',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-wobble' => 'wobble 1s ease-in-out',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes wobble' => [
                            '0%, 100%' => [
                                'transform' => 'translateX(0%)',
                            ],
                            '15%' => [
                                'transform' => 'translateX(-25%) rotate(-5deg)',
                            ],
                            '30%' => [
                                'transform' => 'translateX(20%) rotate(3deg)',
                            ],
                            '45%' => [
                                'transform' => 'translateX(-15%) rotate(-3deg)',
                            ],
                            '60%' => [
                                'transform' => 'translateX(10%) rotate(2deg)',
                            ],
                            '75%' => [
                                'transform' => 'translateX(-5%) rotate(-1deg)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rubber-band',
                'title' => 'Animate Rubber Band',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rubber-band' => 'rubberBand 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rubberBand' => [
                            '0%' => [
                                'transform' => 'scale3d(1, 1, 1)',
                            ],
                            '30%' => [
                                'transform' => 'scale3d(1.25, 0.75, 1)',
                            ],
                            '40%' => [
                                'transform' => 'scale3d(0.75, 1.25, 1)',
                            ],
                            '50%' => [
                                'transform' => 'scale3d(1.15, 0.85, 1)',
                            ],
                            '65%' => [
                                'transform' => 'scale3d(0.95, 1.05, 1)',
                            ],
                            '75%' => [
                                'transform' => 'scale3d(1.05, 0.95, 1)',
                            ],
                            '100%' => [
                                'transform' => 'scale3d(1, 1, 1)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-shake',
                'title' => 'Animate Shake',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-shake' => 'shake 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes shake' => [
                            '0%, 100%' => [
                                'transform' => 'translateX(0)',
                            ],
                            '10%, 30%, 50%, 70%, 90%' => [
                                'transform' => 'translateX(-10px)',
                            ],
                            '20%, 40%, 60%, 80%' => [
                                'transform' => 'translateX(10px)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-head-shake',
                'title' => 'Animate Head Shake',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-head-shake' => 'headShake 1s ease-in-out',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes headShake' => [
                            '0%' => [
                                'transform' => 'translateX(0)',
                            ],
                            '6.5%' => [
                                'transform' => 'translateX(-6px) rotate(-6deg)',
                            ],
                            '18.5%' => [
                                'transform' => 'translateX(5px) rotate(6deg)',
                            ],
                            '31.5%' => [
                                'transform' => 'translateX(-3px) rotate(-3deg)',
                            ],
                            '43.5%' => [
                                'transform' => 'translateX(2px) rotate(2deg)',
                            ],
                            '100%' => [
                                'transform' => 'translateX(0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-swing',
                'title' => 'Animate Swing',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-swing' => 'swing 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes swing' => [
                            '20%' => [
                                'transform' => 'rotate3d(0, 0, 1, 15deg)',
                            ],
                            '40%' => [
                                'transform' => 'rotate3d(0, 0, 1, -10deg)',
                            ],
                            '60%' => [
                                'transform' => 'rotate3d(0, 0, 1, 5deg)',
                            ],
                            '80%' => [
                                'transform' => 'rotate3d(0, 0, 1, -5deg)',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, 0deg)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-tada',
                'title' => 'Animate Tada',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-tada' => 'tada 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes tada' => [
                            '0%, 100%' => [
                                'transform' => 'scale3d(1, 1, 1)',
                            ],
                            '10%, 20%' => [
                                'transform' => 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)',
                            ],
                            '30%, 50%, 70%, 90%' => [
                                'transform' => 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
                            ],
                            '40%, 60%, 80%' => [
                                'transform' => 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-jello',
                'title' => 'Animate Jello',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-jello' => 'jello 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes jello' => [
                            '0%' => [
                                'transform' => 'scale3d(1, 1, 1)',
                            ],
                            '30%' => [
                                'transform' => 'scale3d(1.25, 0.75, 1)',
                            ],
                            '40%' => [
                                'transform' => 'scale3d(0.75, 1.25, 1)',
                            ],
                            '50%' => [
                                'transform' => 'scale3d(1.15, 0.85, 1)',
                            ],
                            '65%' => [
                                'transform' => 'scale3d(0.95, 1.05, 1)',
                            ],
                            '75%' => [
                                'transform' => 'scale3d(1.05, 0.95, 1)',
                            ],
                            '100%' => [
                                'transform' => 'scale3d(1, 1, 1)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-heart-beat',
                'title' => 'Animate Heart Beat',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-heart-beat' => 'heartBeat 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes heartBeat' => [
                            '0%' => [
                                'transform' => 'scale(1)',
                            ],
                            '14%' => [
                                'transform' => 'scale(1.3)',
                            ],
                            '28%' => [
                                'transform' => 'scale(1)',
                            ],
                            '42%' => [
                                'transform' => 'scale(1.3)',
                            ],
                            '70%' => [
                                'transform' => 'scale(1)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-flip',
                'title' => 'Animate Flip',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-flip' => 'flip 1s ease-in-out',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes flip' => [
                            '0%' => [
                                'transform' => 'perspective(400px) rotate3d(0, 1, 0, -360deg)',
                                'animation-timing-function' => 'ease-out',
                            ],
                            '40%' => [
                                'transform' => 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)',
                                'animation-timing-function' => 'ease-out',
                            ],
                            '50%' => [
                                'transform' => 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)',
                                'animation-timing-function' => 'ease-in',
                            ],
                            '80%' => [
                                'transform' => 'perspective(400px) scale3d(0.95, 0.95, 0.95)',
                                'animation-timing-function' => 'ease-in',
                            ],
                            '100%' => [
                                'transform' => 'perspective(400px) scale3d(1, 1, 1)',
                                'animation-timing-function' => 'ease-in',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-flip-in-x',
                'title' => 'Animate Flip In X',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-flip-in-x' => 'flipInX 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes flipInX' => [
                            '0%' => [
                                'transform' => 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
                                'opacity' => '0',
                            ],
                            '40%' => [
                                'transform' => 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
                                'animation-timing-function' => 'ease-out',
                            ],
                            '60%' => [
                                'transform' => 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
                                'opacity' => '1',
                            ],
                            '80%' => [
                                'transform' => 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
                            ],
                            '100%' => [
                                'transform' => 'perspective(400px)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-flip-in-y',
                'title' => 'Animate Flip In Y',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-flip-in-y' => 'flipInY 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes flipInY' => [
                            '0%' => [
                                'transform' => 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
                                'opacity' => '0',
                            ],
                            '40%' => [
                                'transform' => 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
                                'animation-timing-function' => 'ease-out',
                            ],
                            '60%' => [
                                'transform' => 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
                                'opacity' => '1',
                            ],
                            '80%' => [
                                'transform' => 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
                            ],
                            '100%' => [
                                'transform' => 'perspective(400px)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-flip-out-x',
                'title' => 'Animate Flip Out X',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-flip-out-x' => 'flipOutX 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes flipOutX' => [
                            '0%' => [
                                'transform' => 'perspective(400px)',
                            ],
                            '30%' => [
                                'transform' => 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'transform' => 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
                                'opacity' => '0',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-flip-out-y',
                'title' => 'Animate Flip Out Y',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-flip-out-y' => 'flipOutY 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes flipOutY' => [
                            '0%' => [
                                'transform' => 'perspective(400px)',
                            ],
                            '30%' => [
                                'transform' => 'perspective(400px) rotate3d(0, 1, 0, -15deg)',
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'transform' => 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
                                'opacity' => '0',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-in',
                'title' => 'Animate Fade In',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-in' => 'fadeIn 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeIn' => [
                            '0%' => [
                                'opacity' => '0',
                            ],
                            '100%' => [
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-in-down',
                'title' => 'Animate Fade In Down',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-in-down' => 'fadeInDown 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeInDown' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, -100%, 0)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-in-down-big',
                'title' => 'Animate Fade In Down Big',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-in-down-big' => 'fadeInDownBig 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeInDownBig' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, -2000px, 0)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-in-left',
                'title' => 'Animate Fade In Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-in-left' => 'fadeInLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeInLeft' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(-100%, 0, 0)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-in-left-big',
                'title' => 'Animate Fade In Left Big',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-in-left-big' => 'fadeInLeftBig 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeInLeftBig' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(-2000px, 0, 0)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-in-right',
                'title' => 'Animate Fade In Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-in-right' => 'fadeInRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeInRight' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(100%, 0, 0)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-in-right-big',
                'title' => 'Animate Fade In Right Big',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-in-right-big' => 'fadeInRightBig 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeInRightBig' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(2000px, 0, 0)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-in-up',
                'title' => 'Animate Fade In Up',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-in-up' => 'fadeInUp 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeInUp' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, 100%, 0)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-in-up-big',
                'title' => 'Animate Fade In Up Big',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-in-up-big' => 'fadeInUpBig 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeInUpBig' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, 2000px, 0)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-out',
                'title' => 'Animate Fade Out',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-out' => 'fadeOut 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeOut' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'opacity' => '0',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-out-down',
                'title' => 'Animate Fade Out Down',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-out-down' => 'fadeOutDown 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeOutDown' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, 100%, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-out-down-big',
                'title' => 'Animate Fade Out Down Big',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-out-down-big' => 'fadeOutDownBig 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeOutDownBig' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, 2000px, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-out-left',
                'title' => 'Animate Fade Out Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-out-left' => 'fadeOutLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeOutLeft' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(-100%, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-out-left-big',
                'title' => 'Animate Fade Out Left Big',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-out-left-big' => 'fadeOutLeftBig 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeOutLeftBig' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(-2000px, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-out-right',
                'title' => 'Animate Fade Out Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-out-right' => 'fadeOutRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeOutRight' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(100%, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-out-right-big',
                'title' => 'Animate Fade Out Right Big',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-out-right-big' => 'fadeOutRightBig 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeOutRightBig' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(2000px, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-out-up',
                'title' => 'Animate Fade Out Up',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-out-up' => 'fadeOutUp 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeOutUp' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, -100%, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-fade-out-up-big',
                'title' => 'Animate Fade Out Up Big',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-fade-out-up-big' => 'fadeOutUpBig 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes fadeOutUpBig' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, -2000px, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-slide-in-down',
                'title' => 'Animate Slide In Down',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-slide-in-down' => 'slideInDown 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes slideInDown' => [
                            '0%' => [
                                'transform' => 'translate3d(0, -100%, 0)',
                                'visibility' => 'visible',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-slide-in-left',
                'title' => 'Animate Slide In Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-slide-in-left' => 'slideInLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes slideInLeft' => [
                            '0%' => [
                                'transform' => 'translate3d(-100%, 0, 0)',
                                'visibility' => 'visible',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-slide-in-right',
                'title' => 'Animate Slide In Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-slide-in-right' => 'slideInRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes slideInRight' => [
                            '0%' => [
                                'transform' => 'translate3d(100%, 0, 0)',
                                'visibility' => 'visible',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-slide-in-up',
                'title' => 'Animate Slide In Up',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-slide-in-up' => 'slideInUp 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes slideInUp' => [
                            '0%' => [
                                'transform' => 'translate3d(0, 100%, 0)',
                                'visibility' => 'visible',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-slide-out-down',
                'title' => 'Animate Slide Out Down',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-slide-out-down' => 'slideOutDown 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes slideOutDown' => [
                            '0%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, 100%, 0)',
                                'visibility' => 'hidden',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-slide-out-left',
                'title' => 'Animate Slide Out Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-slide-out-left' => 'slideOutLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes slideOutLeft' => [
                            '0%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(-100%, 0, 0)',
                                'visibility' => 'hidden',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-slide-out-right',
                'title' => 'Animate Slide Out Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-slide-out-right' => 'slideOutRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes slideOutRight' => [
                            '0%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(100%, 0, 0)',
                                'visibility' => 'hidden',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-slide-out-up',
                'title' => 'Animate Slide Out Up',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-slide-out-up' => 'slideOutUp 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes slideOutUp' => [
                            '0%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, -100%, 0)',
                                'visibility' => 'hidden',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-zoom-in',
                'title' => 'Animate Zoom In',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-zoom-in' => 'zoomIn 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes zoomIn' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'scale3d(0.3, 0.3, 0.3)',
                            ],
                            '50%' => [
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-zoom-in-down',
                'title' => 'Animate Zoom In Down',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-zoom-in-down' => 'zoomInDown 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes zoomInDown' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)',
                                'animation-timing-function' => 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                            ],
                            '60%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
                                'animation-timing-function' => 'cubic-bezier(0.175, 0.885, 0.32, 1)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-zoom-in-left',
                'title' => 'Animate Zoom In Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-zoom-in-left' => 'zoomInLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes zoomInLeft' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)',
                                'animation-timing-function' => 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                            ],
                            '60%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)',
                                'animation-timing-function' => 'cubic-bezier(0.175, 0.885, 0.32, 1)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-zoom-in-right',
                'title' => 'Animate Zoom In Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-zoom-in-right' => 'zoomInRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes zoomInRight' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)',
                                'animation-timing-function' => 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                            ],
                            '60%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)',
                                'animation-timing-function' => 'cubic-bezier(0.175, 0.885, 0.32, 1)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-zoom-in-up',
                'title' => 'Animate Zoom In Up',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-zoom-in-up' => 'zoomInUp 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes zoomInUp' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)',
                                'animation-timing-function' => 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                            ],
                            '60%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
                                'animation-timing-function' => 'cubic-bezier(0.175, 0.885, 0.32, 1)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-zoom-out',
                'title' => 'Animate Zoom Out',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-zoom-out' => 'zoomOut 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes zoomOut' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '50%' => [
                                'opacity' => '0',
                                'transform' => 'scale3d(0.3, 0.3, 0.3)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-zoom-out-down',
                'title' => 'Animate Zoom Out Down',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-zoom-out-down' => 'zoomOutDown 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes zoomOutDown' => [
                            '40%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
                                'animation-timing-function' => 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)',
                                'transform-origin' => 'center bottom',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-zoom-out-left',
                'title' => 'Animate Zoom Out Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-zoom-out-left' => 'zoomOutLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes zoomOutLeft' => [
                            '40%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'scale(0.1) translate3d(-1000px, 0, 0)',
                                'transform-origin' => 'left center',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-zoom-out-right',
                'title' => 'Animate Zoom Out Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-zoom-out-right' => 'zoomOutRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes zoomOutRight' => [
                            '40%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'scale(0.1) translate3d(1000px, 0, 0)',
                                'transform-origin' => 'right center',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-zoom-out-up',
                'title' => 'Animate Zoom Out Up',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-zoom-out-up' => 'zoomOutUp 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes zoomOutUp' => [
                            '40%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
                                'animation-timing-function' => 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)',
                                'transform-origin' => 'center bottom',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rotate-in',
                'title' => 'Animate Rotate In',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rotate-in' => 'rotateIn 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rotateIn' => [
                            '0%' => [
                                'transform' => 'rotate3d(0, 0, 1, -200deg)',
                                'opacity' => '0',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, 0deg)',
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rotate-out',
                'title' => 'Animate Rotate Out',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rotate-out' => 'rotateOut 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rotateOut' => [
                            '0%' => [
                                'transform' => 'rotate3d(0, 0, 1, 0deg)',
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, 200deg)',
                                'opacity' => '0',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-roll-in',
                'title' => 'Animate Roll In',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-roll-in' => 'rollIn 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rollIn' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 0, 0) rotate3d(0, 0, 1, 0deg)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-roll-out',
                'title' => 'Animate Roll Out',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-roll-out' => 'rollOut 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rollOut' => [
                            '0%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 0, 0) rotate3d(0, 0, 1, 0deg)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-light-speed-in',
                'title' => 'Animate Light Speed In',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-light-speed-in' => 'lightSpeedInRight 1s ease-out',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes lightSpeedInRight' => [
                            '0%' => [
                                'transform' => 'translate3d(100%, 0, 0) skewX(-30deg)',
                                'opacity' => '0',
                            ],
                            '60%' => [
                                'transform' => 'skewX(20deg)',
                                'opacity' => '1',
                            ],
                            '80%' => [
                                'transform' => 'skewX(-5deg)',
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-light-speed-out',
                'title' => 'Animate Light Speed Out',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-light-speed-out' => 'lightSpeedOutLeft 1s ease-in',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes lightSpeedOutLeft' => [
                            '0%' => [
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(-100%, 0, 0) skewX(30deg)',
                                'opacity' => '0',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-jack-in-box',
                'title' => 'Animate Jack In Box',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-jack-in-box' => 'jackInTheBox 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes jackInTheBox' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'scale(0.1) rotate(0deg)',
                            ],
                            '50%' => [
                                'transform' => 'scale(1.05) rotate(10deg)',
                            ],
                            '70%' => [
                                'transform' => 'scale(0.9) rotate(-3deg)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'scale(1) rotate(0deg)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-hinge',
                'title' => 'Animate Hinge',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-hinge' => 'hinge 2s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes hinge' => [
                            '0%' => [
                                'transform' => 'rotate3d(0, 0, 1, 0deg)',
                                'transform-origin' => 'top left',
                                'animation-timing-function' => 'ease-in-out',
                            ],
                            '20%, 60%' => [
                                'transform' => 'rotate3d(0, 0, 1, 80deg)',
                                'transform-origin' => 'top left',
                                'animation-timing-function' => 'ease-in-out',
                            ],
                            '40%, 80%' => [
                                'transform' => 'rotate3d(0, 0, 1, 60deg)',
                                'transform-origin' => 'top left',
                                'animation-timing-function' => 'ease-in-out',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, 90deg)',
                                'transform-origin' => 'top left',
                                'opacity' => '0',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bounce-in',
                'title' => 'Animate Bounce In',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce-in' => 'bounceIn 0.75s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounceIn' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'scale3d(0.3, 0.3, 0.3)',
                            ],
                            '20%' => [
                                'transform' => 'scale3d(1.1, 1.1, 1.1)',
                            ],
                            '40%' => [
                                'transform' => 'scale3d(0.9, 0.9, 0.9)',
                            ],
                            '60%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(1.03, 1.03, 1.03)',
                            ],
                            '80%' => [
                                'transform' => 'scale3d(0.97, 0.97, 0.97)',
                            ],
                            '100%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(1, 1, 1)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bounce-in-down',
                'title' => 'Animate Bounce In Down',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce-in-down' => 'bounceInDown 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounceInDown' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, -3000px, 0) scaleY(3)',
                            ],
                            '60%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 25px, 0) scaleY(0.9)',
                            ],
                            '75%' => [
                                'transform' => 'translate3d(0, -10px, 0) scaleY(0.95)',
                            ],
                            '90%' => [
                                'transform' => 'translate3d(0, 5px, 0) scaleY(0.985)',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bounce-in-left',
                'title' => 'Animate Bounce In Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce-in-left' => 'bounceInLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounceInLeft' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(-3000px, 0, 0) scaleX(3)',
                            ],
                            '60%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(25px, 0, 0) scaleX(1)',
                            ],
                            '75%' => [
                                'transform' => 'translate3d(-10px, 0, 0) scaleX(0.98)',
                            ],
                            '90%' => [
                                'transform' => 'translate3d(5px, 0, 0) scaleX(0.995)',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bounce-in-right',
                'title' => 'Animate Bounce In Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce-in-right' => 'bounceInRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounceInRight' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(3000px, 0, 0) scaleX(3)',
                            ],
                            '60%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(-25px, 0, 0) scaleX(1)',
                            ],
                            '75%' => [
                                'transform' => 'translate3d(10px, 0, 0) scaleX(0.98)',
                            ],
                            '90%' => [
                                'transform' => 'translate3d(-5px, 0, 0) scaleX(0.995)',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bounce-in-up',
                'title' => 'Animate Bounce In Up',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce-in-up' => 'bounceInUp 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounceInUp' => [
                            '0%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, 3000px, 0) scaleY(5)',
                            ],
                            '60%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, -20px, 0) scaleY(0.9)',
                            ],
                            '75%' => [
                                'transform' => 'translate3d(0, 10px, 0) scaleY(0.95)',
                            ],
                            '90%' => [
                                'transform' => 'translate3d(0, -5px, 0) scaleY(0.985)',
                            ],
                            '100%' => [
                                'transform' => 'translate3d(0, 0, 0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bounce-out',
                'title' => 'Animate Bounce Out',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce-out' => 'bounceOut 0.75s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounceOut' => [
                            '20%' => [
                                'transform' => 'scale3d(0.9, 0.9, 0.9)',
                            ],
                            '50%, 55%' => [
                                'opacity' => '1',
                                'transform' => 'scale3d(1.1, 1.1, 1.1)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'scale3d(0.3, 0.3, 0.3)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bounce-out-down',
                'title' => 'Animate Bounce Out Down',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce-out-down' => 'bounceOutDown 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounceOutDown' => [
                            '20%' => [
                                'transform' => 'translate3d(0, 10px, 0) scaleY(0.985)',
                            ],
                            '40%, 45%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, -20px, 0) scaleY(0.9)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, 2000px, 0) scaleY(3)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bounce-out-left',
                'title' => 'Animate Bounce Out Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce-out-left' => 'bounceOutLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounceOutLeft' => [
                            '20%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(20px, 0, 0) scaleX(0.9)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(-2000px, 0, 0) scaleX(2)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bounce-out-right',
                'title' => 'Animate Bounce Out Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce-out-right' => 'bounceOutRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounceOutRight' => [
                            '20%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(-20px, 0, 0) scaleX(0.9)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(2000px, 0, 0) scaleX(2)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bounce-out-up',
                'title' => 'Animate Bounce Out Up',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bounce-out-up' => 'bounceOutUp 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bounceOutUp' => [
                            '20%' => [
                                'transform' => 'translate3d(0, -10px, 0) scaleY(0.985)',
                            ],
                            '40%, 45%' => [
                                'opacity' => '1',
                                'transform' => 'translate3d(0, 20px, 0) scaleY(0.9)',
                            ],
                            '100%' => [
                                'opacity' => '0',
                                'transform' => 'translate3d(0, -2000px, 0) scaleY(3)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-back-in-down',
                'title' => 'Animate Back In Down',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-back-in-down' => 'backInDown 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes backInDown' => [
                            '0%' => [
                                'transform' => 'translateY(-1200px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '80%' => [
                                'transform' => 'translateY(0px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '100%' => [
                                'transform' => 'scale(1)',
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-back-in-left',
                'title' => 'Animate Back In Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-back-in-left' => 'backInLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes backInLeft' => [
                            '0%' => [
                                'transform' => 'translateX(-2000px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '80%' => [
                                'transform' => 'translateX(0px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '100%' => [
                                'transform' => 'scale(1)',
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-back-in-right',
                'title' => 'Animate Back In Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-back-in-right' => 'backInRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes backInRight' => [
                            '0%' => [
                                'transform' => 'translateX(2000px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '80%' => [
                                'transform' => 'translateX(0px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '100%' => [
                                'transform' => 'scale(1)',
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-back-in-up',
                'title' => 'Animate Back In Up',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-back-in-up' => 'backInUp 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes backInUp' => [
                            '0%' => [
                                'transform' => 'translateY(1200px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '80%' => [
                                'transform' => 'translateY(0px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '100%' => [
                                'transform' => 'scale(1)',
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-back-out-down',
                'title' => 'Animate Back Out Down',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-back-out-down' => 'backOutDown 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes backOutDown' => [
                            '0%' => [
                                'transform' => 'scale(1)',
                                'opacity' => '1',
                            ],
                            '20%' => [
                                'transform' => 'translateY(0px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '100%' => [
                                'transform' => 'translateY(700px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-back-out-left',
                'title' => 'Animate Back Out Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-back-out-left' => 'backOutLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes backOutLeft' => [
                            '0%' => [
                                'transform' => 'scale(1)',
                                'opacity' => '1',
                            ],
                            '20%' => [
                                'transform' => 'translateX(0px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '100%' => [
                                'transform' => 'translateX(-2000px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-back-out-right',
                'title' => 'Animate Back Out Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-back-out-right' => 'backOutRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes backOutRight' => [
                            '0%' => [
                                'transform' => 'scale(1)',
                                'opacity' => '1',
                            ],
                            '20%' => [
                                'transform' => 'translateX(0px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '100%' => [
                                'transform' => 'translateX(2000px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-back-out-up',
                'title' => 'Animate Back Out Up',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-back-out-up' => 'backOutUp 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes backOutUp' => [
                            '0%' => [
                                'transform' => 'scale(1)',
                                'opacity' => '1',
                            ],
                            '20%' => [
                                'transform' => 'translateY(0px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                            '100%' => [
                                'transform' => 'translateY(-700px) scale(0.7)',
                                'opacity' => '0.7',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rotate-in-down-left',
                'title' => 'Animate Rotate In Down Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rotate-in-down-left' => 'rotateInDownLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rotateInDownLeft' => [
                            '0%' => [
                                'transform' => 'rotate3d(0, 0, 1, -45deg)',
                                'opacity' => '0',
                                'transform-origin' => 'left bottom',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, 0deg)',
                                'opacity' => '1',
                                'transform-origin' => 'left bottom',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rotate-in-down-right',
                'title' => 'Animate Rotate In Down Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rotate-in-down-right' => 'rotateInDownRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rotateInDownRight' => [
                            '0%' => [
                                'transform' => 'rotate3d(0, 0, 1, 45deg)',
                                'opacity' => '0',
                                'transform-origin' => 'right bottom',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, 0deg)',
                                'opacity' => '1',
                                'transform-origin' => 'right bottom',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rotate-in-up-left',
                'title' => 'Animate Rotate In Up Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rotate-in-up-left' => 'rotateInUpLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rotateInUpLeft' => [
                            '0%' => [
                                'transform' => 'rotate3d(0, 0, 1, 45deg)',
                                'opacity' => '0',
                                'transform-origin' => 'left bottom',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, 0deg)',
                                'opacity' => '1',
                                'transform-origin' => 'left bottom',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rotate-in-up-right',
                'title' => 'Animate Rotate In Up Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rotate-in-up-right' => 'rotateInUpRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rotateInUpRight' => [
                            '0%' => [
                                'transform' => 'rotate3d(0, 0, 1, -90deg)',
                                'opacity' => '0',
                                'transform-origin' => 'right bottom',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, 0deg)',
                                'opacity' => '1',
                                'transform-origin' => 'right bottom',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rotate-out-down-left',
                'title' => 'Animate Rotate Out Down Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rotate-out-down-left' => 'rotateOutDownLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rotateOutDownLeft' => [
                            '0%' => [
                                'opacity' => '1',
                                'transform-origin' => 'left bottom',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, 45deg)',
                                'opacity' => '0',
                                'transform-origin' => 'left bottom',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rotate-out-down-right',
                'title' => 'Animate Rotate Out Down Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rotate-out-down-right' => 'rotateOutDownRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rotateOutDownRight' => [
                            '0%' => [
                                'opacity' => '1',
                                'transform-origin' => 'right bottom',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, -45deg)',
                                'opacity' => '0',
                                'transform-origin' => 'right bottom',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rotate-out-up-left',
                'title' => 'Animate Rotate Out Up Left',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rotate-out-up-left' => 'rotateOutUpLeft 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rotateOutUpLeft' => [
                            '0%' => [
                                'opacity' => '1',
                                'transform-origin' => 'left bottom',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, -45deg)',
                                'opacity' => '0',
                                'transform-origin' => 'left bottom',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-rotate-out-up-right',
                'title' => 'Animate Rotate Out Up Right',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-rotate-out-up-right' => 'rotateOutUpRight 1s',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes rotateOutUpRight' => [
                            '0%' => [
                                'opacity' => '1',
                                'transform-origin' => 'right bottom',
                            ],
                            '100%' => [
                                'transform' => 'rotate3d(0, 0, 1, 90deg)',
                                'opacity' => '0',
                                'transform-origin' => 'right bottom',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-float',
                'title' => 'Animate Float',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-float' => 'float 3s ease-in-out infinite',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes float' => [
                            '0%, 100%' => [
                                'transform' => 'translateY(0)',
                            ],
                            '50%' => [
                                'transform' => 'translateY(-20px)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-spin',
                'title' => 'Animate Spin',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-spin' => 'spin 1s linear infinite',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes spin' => [
                            '0%' => [
                                'transform' => 'rotate(0deg)',
                            ],
                            '100%' => [
                                'transform' => 'rotate(360deg)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-wiggle',
                'title' => 'Animate Wiggle',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-wiggle' => 'wiggle 0.8s ease-in-out infinite',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes wiggle' => [
                            '0%, 100%' => [
                                'transform' => 'rotate(-3deg)',
                            ],
                            '50%' => [
                                'transform' => 'rotate(3deg)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-ping',
                'title' => 'Animate Ping',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-ping' => 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes ping' => [
                            '75%, 100%' => [
                                'transform' => 'scale(2)',
                                'opacity' => '0',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-blur-in',
                'title' => 'Animate Blur In',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-blur-in' => 'blurIn 0.6s ease-out',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes blurIn' => [
                            '0%' => [
                                'filter' => 'blur(12px)',
                                'opacity' => '0',
                            ],
                            '100%' => [
                                'filter' => 'blur(0px)',
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-blur-out',
                'title' => 'Animate Blur Out',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-blur-out' => 'blurOut 0.6s ease-in',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes blurOut' => [
                            '0%' => [
                                'filter' => 'blur(0px)',
                                'opacity' => '1',
                            ],
                            '100%' => [
                                'filter' => 'blur(12px)',
                                'opacity' => '0',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-glitch',
                'title' => 'Animate Glitch',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-glitch' => 'glitch 0.6s steps(1) infinite',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes glitch' => [
                            '0%, 100%' => [
                                'transform' => 'translate(0)',
                            ],
                            '20%' => [
                                'transform' => 'translate(-3px, 2px)',
                            ],
                            '40%' => [
                                'transform' => 'translate(-3px, -2px)',
                            ],
                            '60%' => [
                                'transform' => 'translate(3px, 2px)',
                            ],
                            '80%' => [
                                'transform' => 'translate(3px, -2px)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-pop',
                'title' => 'Animate Pop',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-pop' => 'pop 0.4s cubic-bezier(0.26, 0.53, 0.74, 1.48)',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes pop' => [
                            '0%' => [
                                'transform' => 'scale(0.8)',
                                'opacity' => '0',
                            ],
                            '70%' => [
                                'transform' => 'scale(1.1)',
                            ],
                            '100%' => [
                                'transform' => 'scale(1)',
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-compress',
                'title' => 'Animate Compress',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-compress' => 'compress 0.5s ease-in-out',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes compress' => [
                            '0%, 100%' => [
                                'transform' => 'scaleY(1)',
                            ],
                            '50%' => [
                                'transform' => 'scaleY(0.5)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-expand',
                'title' => 'Animate Expand',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-expand' => 'expand 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes expand' => [
                            '0%' => [
                                'transform' => 'scale(0)',
                                'opacity' => '0',
                            ],
                            '100%' => [
                                'transform' => 'scale(1)',
                                'opacity' => '1',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-drop',
                'title' => 'Animate Drop',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-drop' => 'drop 0.6s ease-out',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes drop' => [
                            '0%' => [
                                'transform' => 'translateY(-200px)',
                                'opacity' => '0',
                            ],
                            '60%' => [
                                'transform' => 'translateY(15px)',
                                'opacity' => '1',
                            ],
                            '80%' => [
                                'transform' => 'translateY(-8px)',
                            ],
                            '100%' => [
                                'transform' => 'translateY(0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-sway',
                'title' => 'Animate Sway',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-sway' => 'sway 2s ease-in-out infinite',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes sway' => [
                            '0%, 100%' => [
                                'transform' => 'rotate(-5deg)',
                                'transform-origin' => 'top center',
                            ],
                            '50%' => [
                                'transform' => 'rotate(5deg)',
                                'transform-origin' => 'top center',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-ken-burns',
                'title' => 'Animate Ken Burns',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-ken-burns' => 'kenBurns 8s ease-in-out infinite alternate',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes kenBurns' => [
                            '0%' => [
                                'transform' => 'scale(1) translate(0, 0)',
                            ],
                            '100%' => [
                                'transform' => 'scale(1.15) translate(-2%, -2%)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-tilt',
                'title' => 'Animate Tilt',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-tilt' => 'tilt 1.5s ease-in-out infinite alternate',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes tilt' => [
                            '0%' => [
                                'transform' => 'perspective(400px) rotateY(0deg)',
                            ],
                            '100%' => [
                                'transform' => 'perspective(400px) rotateY(15deg)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-ring',
                'title' => 'Animate Ring',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-ring' => 'ring 0.5s ease-in-out',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes ring' => [
                            '0%, 100%' => [
                                'transform' => 'rotate(0deg)',
                            ],
                            '10%, 30%' => [
                                'transform' => 'rotate(15deg)',
                            ],
                            '20%, 40%' => [
                                'transform' => 'rotate(-15deg)',
                            ],
                            '50%, 70%' => [
                                'transform' => 'rotate(10deg)',
                            ],
                            '60%, 80%' => [
                                'transform' => 'rotate(-10deg)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-alarm',
                'title' => 'Animate Alarm',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-alarm' => 'alarm 0.8s ease-in-out',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes alarm' => [
                            '0%, 100%' => [
                                'transform' => 'rotate(0deg) scale(1)',
                            ],
                            '10%, 30%' => [
                                'transform' => 'rotate(-25deg) scale(1.05)',
                            ],
                            '20%, 40%' => [
                                'transform' => 'rotate(25deg) scale(1.05)',
                            ],
                            '50%, 70%' => [
                                'transform' => 'rotate(-15deg) scale(1.02)',
                            ],
                            '60%, 80%' => [
                                'transform' => 'rotate(15deg) scale(1.02)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-bell',
                'title' => 'Animate Bell',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => [
                    '--animate-bell' => 'bell 1s ease-in-out',
                ],
                'css' => [
                    '@layer utilities' => [
                        '@keyframes bell' => [
                            '0%' => [
                                'transform' => 'rotate(0)',
                            ],
                            '10%' => [
                                'transform' => 'rotate(15deg)',
                            ],
                            '20%' => [
                                'transform' => 'rotate(-15deg)',
                            ],
                            '30%' => [
                                'transform' => 'rotate(10deg)',
                            ],
                            '40%' => [
                                'transform' => 'rotate(-10deg)',
                            ],
                            '50%' => [
                                'transform' => 'rotate(0)',
                            ],
                            '100%' => [
                                'transform' => 'rotate(0)',
                            ],
                        ],
                    ],
                ],
                'registryDependencies' => null,
            ],
            [
                'name' => 'animate-all',
                'title' => 'Animate All',
                'type' => 'registry:style',
                'user_id' => 1,
                'author' => 'designbycode',
                'meta' => [
                    'category' => 'animations',
                    'version' => '1.0.0',
                ],
                'css_vars' => null,
                'css' => null,
                'registryDependencies' => [
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-pulse.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-flash.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-wobble.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rubber-band.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-shake.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-head-shake.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-swing.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-tada.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-jello.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-heart-beat.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-flip.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-flip-in-x.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-flip-in-y.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-flip-out-x.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-flip-out-y.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-in.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-in-down.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-in-down-big.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-in-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-in-left-big.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-in-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-in-right-big.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-in-up.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-in-up-big.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-out.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-out-down.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-out-down-big.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-out-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-out-left-big.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-out-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-out-right-big.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-out-up.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-fade-out-up-big.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-slide-in-down.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-slide-in-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-slide-in-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-slide-in-up.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-slide-out-down.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-slide-out-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-slide-out-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-slide-out-up.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-zoom-in.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-zoom-in-down.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-zoom-in-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-zoom-in-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-zoom-in-up.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-zoom-out.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-zoom-out-down.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-zoom-out-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-zoom-out-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-zoom-out-up.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rotate-in.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rotate-out.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-roll-in.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-roll-out.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-light-speed-in.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-light-speed-out.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-jack-in-box.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-hinge.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce-in.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce-in-down.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce-in-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce-in-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce-in-up.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce-out.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce-out-down.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce-out-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce-out-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-bounce-out-up.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-back-in-down.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-back-in-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-back-in-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-back-in-up.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-back-out-down.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-back-out-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-back-out-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-back-out-up.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rotate-in-down-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rotate-in-down-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rotate-in-up-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rotate-in-up-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rotate-out-down-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rotate-out-down-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rotate-out-up-left.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-rotate-out-up-right.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-float.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-spin.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-wiggle.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-ping.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-blur-in.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-blur-out.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-glitch.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-pop.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-compress.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-expand.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-drop.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-sway.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-ken-burns.json',
                    'https://ui.designbycode.co.za/r/animate-css/animate-tilt.json',
                ],
            ],
        ];
    }


}
