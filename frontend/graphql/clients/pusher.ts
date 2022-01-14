import Pusher from 'pusher-js'
import { ApolloLink, Observable } from 'apollo-link'

import type { Context } from '@nuxt/types'
import type { Operation, NextLink, FetchResult } from 'apollo-link'

interface EventPayloadResult {
  readonly data: Object
  readonly extensions: Object
}

interface EventPayload {
  readonly more: boolean
  readonly result: EventPayloadResult
}

class PusherLink extends ApolloLink {
  private pusher: Pusher

  public constructor(pusher: Pusher) {
    super()
    this.pusher = pusher
  }

  public request(operation: Operation, forward: NextLink): Observable<FetchResult> {
    return new Observable<FetchResult>((observer) => {
      let channel: string

      forward(operation).subscribe({
        next: (data: FetchResult) => {
          channel = data?.extensions?.lighthouse_subscriptions.channel ?? null

          if (!channel) {
            observer.next(data)
            observer.complete()

            return
          }

          this.subscribe(channel, observer)
        },
      })

      return () => this.unsubscribe(channel)
    })
  }

  private subscribe(channel: string, observer: ZenObservable.SubscriptionObserver<FetchResult>) {
    this.pusher
      .subscribe(channel)
      .bind('lighthouse-subscription', ({ more, result }: EventPayload) => {
        if (!more) {
          this.unsubscribe(channel)
          observer.complete()
        }

        if (result) {
          observer.next(result)
        }
      })
  }

  private unsubscribe(channel: string) {
    if (!channel) {
      return
    }

    this.pusher.unsubscribe(channel)
  }
}

export default ({ $config }: Context) => {
  if (!$config.pusher.key) {
    return {
      httpEndpoint: $config.graphql.endpoint,
    }
  }

  const pusher = new Pusher($config.pusher.key, {
    cluster: $config.pusher.cluster,
    wsHost: $config.pusher.host,
    wsPort: $config.pusher.port,
    forceTLS: $config.pusher.tls || false,
    authEndpoint: `${$config.graphql.endpoint}/subscriptions/auth`
  })

  return {
    httpEndpoint: $config.graphql.endpoint,
    link: new PusherLink(pusher),
  }
}
