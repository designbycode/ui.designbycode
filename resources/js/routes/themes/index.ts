import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:11
 * @route '/themes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/themes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:11
 * @route '/themes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:11
 * @route '/themes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:11
 * @route '/themes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:11
 * @route '/themes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:11
 * @route '/themes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:11
 * @route '/themes'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:31
 * @route '/themes/{theme}'
 */
export const show = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/themes/{theme}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:31
 * @route '/themes/{theme}'
 */
show.url = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { theme: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'name' in args) {
            args = { theme: args.name }
        }
    
    if (Array.isArray(args)) {
        args = {
                    theme: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        theme: typeof args.theme === 'object'
                ? args.theme.name
                : args.theme,
                }

    return show.definition.url
            .replace('{theme}', parsedArgs.theme.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:31
 * @route '/themes/{theme}'
 */
show.get = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:31
 * @route '/themes/{theme}'
 */
show.head = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:31
 * @route '/themes/{theme}'
 */
    const showForm = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:31
 * @route '/themes/{theme}'
 */
        showForm.get = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:31
 * @route '/themes/{theme}'
 */
        showForm.head = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const themes = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default themes