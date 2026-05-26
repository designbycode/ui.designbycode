import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:181
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
 * @see app/Http/Controllers/ThemesController.php:181
 * @route '/themes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:181
 * @route '/themes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:181
 * @route '/themes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:181
 * @route '/themes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:181
 * @route '/themes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ThemesController::index
 * @see app/Http/Controllers/ThemesController.php:181
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
* @see \App\Http\Controllers\ThemesController::create
 * @see app/Http/Controllers/ThemesController.php:15
 * @route '/themes/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/themes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ThemesController::create
 * @see app/Http/Controllers/ThemesController.php:15
 * @route '/themes/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ThemesController::create
 * @see app/Http/Controllers/ThemesController.php:15
 * @route '/themes/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ThemesController::create
 * @see app/Http/Controllers/ThemesController.php:15
 * @route '/themes/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ThemesController::create
 * @see app/Http/Controllers/ThemesController.php:15
 * @route '/themes/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ThemesController::create
 * @see app/Http/Controllers/ThemesController.php:15
 * @route '/themes/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ThemesController::create
 * @see app/Http/Controllers/ThemesController.php:15
 * @route '/themes/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\ThemesController::store
 * @see app/Http/Controllers/ThemesController.php:49
 * @route '/themes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/themes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ThemesController::store
 * @see app/Http/Controllers/ThemesController.php:49
 * @route '/themes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ThemesController::store
 * @see app/Http/Controllers/ThemesController.php:49
 * @route '/themes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ThemesController::store
 * @see app/Http/Controllers/ThemesController.php:49
 * @route '/themes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ThemesController::store
 * @see app/Http/Controllers/ThemesController.php:49
 * @route '/themes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:230
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
 * @see app/Http/Controllers/ThemesController.php:230
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
 * @see app/Http/Controllers/ThemesController.php:230
 * @route '/themes/{theme}'
 */
show.get = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:230
 * @route '/themes/{theme}'
 */
show.head = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:230
 * @route '/themes/{theme}'
 */
    const showForm = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:230
 * @route '/themes/{theme}'
 */
        showForm.get = (args: { theme: string | { name: string } } | [theme: string | { name: string } ] | string | { name: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ThemesController::show
 * @see app/Http/Controllers/ThemesController.php:230
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
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
}

export default themes