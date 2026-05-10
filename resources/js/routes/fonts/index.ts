import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/fonts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const fonts = {
    index: Object.assign(index, index),
}

export default fonts