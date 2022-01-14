<?php

namespace App\WebSockets;

use BeyondCode\LaravelWebSockets\WebSockets\Channels\Channel;
use BeyondCode\LaravelWebSockets\WebSockets\WebSocketHandler;
use Nuwave\Lighthouse\Subscriptions\Contracts\StoresSubscriptions;
use Ratchet\ConnectionInterface;

class PusherHandler extends WebSocketHandler
{
    public function onClose(ConnectionInterface $connection)
    {
        $storage = app(StoresSubscriptions::class);

        collect($this->channelManager->getChannels($connection->app->id))->each(function (Channel $channel, $subscriber) use ($storage, $connection) {
            if (collect($channel->getSubscribedConnections())->pluck('socketId')->doesntContain($connection->socketId)) {
                return;
            }

            $storage->deleteSubscriber($subscriber);
        });

        parent::onClose($connection);
    }
}
