import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ComponentsController::index
 * @see app/Http/Controllers/ComponentsController.php:13
 * @route '/components'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/components',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ComponentsController::index
 * @see app/Http/Controllers/ComponentsController.php:13
 * @route '/components'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ComponentsController::index
 * @see app/Http/Controllers/ComponentsController.php:13
 * @route '/components'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ComponentsController::index
 * @see app/Http/Controllers/ComponentsController.php:13
 * @route '/components'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ComponentsController::index
 * @see app/Http/Controllers/ComponentsController.php:13
 * @route '/components'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ComponentsController::index
 * @see app/Http/Controllers/ComponentsController.php:13
 * @route '/components'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ComponentsController::index
 * @see app/Http/Controllers/ComponentsController.php:13
 * @route '/components'
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
* @see \App\Http\Controllers\ComponentsController::show
 * @see app/Http/Controllers/ComponentsController.php:49
 * @route '/components/{component}'
 */
export const show = (args: { component: string | number } | [component: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/components/{component}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ComponentsController::show
 * @see app/Http/Controllers/ComponentsController.php:49
 * @route '/components/{component}'
 */
show.url = (args: { component: string | number } | [component: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { component: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    component: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        component: args.component,
                }

    return show.definition.url
            .replace('{component}', parsedArgs.component.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ComponentsController::show
 * @see app/Http/Controllers/ComponentsController.php:49
 * @route '/components/{component}'
 */
show.get = (args: { component: string | number } | [component: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ComponentsController::show
 * @see app/Http/Controllers/ComponentsController.php:49
 * @route '/components/{component}'
 */
show.head = (args: { component: string | number } | [component: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ComponentsController::show
 * @see app/Http/Controllers/ComponentsController.php:49
 * @route '/components/{component}'
 */
    const showForm = (args: { component: string | number } | [component: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ComponentsController::show
 * @see app/Http/Controllers/ComponentsController.php:49
 * @route '/components/{component}'
 */
        showForm.get = (args: { component: string | number } | [component: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ComponentsController::show
 * @see app/Http/Controllers/ComponentsController.php:49
 * @route '/components/{component}'
 */
        showForm.head = (args: { component: string | number } | [component: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const components = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default components