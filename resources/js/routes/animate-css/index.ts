import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
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

const animateCss = {
    index: Object.assign(index, index),
}

export default animateCss