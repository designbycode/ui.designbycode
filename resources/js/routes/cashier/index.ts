import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Laravel\Paddle\Http\Controllers\WebhookController::__invoke
 * @see vendor/laravel/cashier-paddle/src/Http/Controllers/WebhookController.php:43
 * @route '/paddle/webhook'
 */
export const webhook = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

webhook.definition = {
    methods: ["post"],
    url: '/paddle/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Paddle\Http\Controllers\WebhookController::__invoke
 * @see vendor/laravel/cashier-paddle/src/Http/Controllers/WebhookController.php:43
 * @route '/paddle/webhook'
 */
webhook.url = (options?: RouteQueryOptions) => {
    return webhook.definition.url + queryParams(options)
}

/**
* @see \Laravel\Paddle\Http\Controllers\WebhookController::__invoke
 * @see vendor/laravel/cashier-paddle/src/Http/Controllers/WebhookController.php:43
 * @route '/paddle/webhook'
 */
webhook.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhook.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Paddle\Http\Controllers\WebhookController::__invoke
 * @see vendor/laravel/cashier-paddle/src/Http/Controllers/WebhookController.php:43
 * @route '/paddle/webhook'
 */
    const webhookForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: webhook.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Paddle\Http\Controllers\WebhookController::__invoke
 * @see vendor/laravel/cashier-paddle/src/Http/Controllers/WebhookController.php:43
 * @route '/paddle/webhook'
 */
        webhookForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: webhook.url(options),
            method: 'post',
        })
    
    webhook.form = webhookForm
const cashier = {
    webhook: Object.assign(webhook, webhook),
}

export default cashier