import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AnimateController::index
* @see Http/Controllers/AnimateController.php:11
* @route '/animate-css'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/animate-css',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnimateController::index
* @see Http/Controllers/AnimateController.php:11
* @route '/animate-css'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnimateController::index
* @see Http/Controllers/AnimateController.php:11
* @route '/animate-css'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnimateController::index
* @see Http/Controllers/AnimateController.php:11
* @route '/animate-css'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnimateController::index
* @see Http/Controllers/AnimateController.php:11
* @route '/animate-css'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnimateController::index
* @see Http/Controllers/AnimateController.php:11
* @route '/animate-css'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AnimateController::index
* @see Http/Controllers/AnimateController.php:11
* @route '/animate-css'
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

const animateCss = {
    index: Object.assign(index, index),
}

export default animateCss