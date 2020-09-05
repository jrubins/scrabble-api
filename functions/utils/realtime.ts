import Pusher from 'pusher'

const pusherAppId = process.env.PUSHER_APP_ID
if (!pusherAppId) {
  throw new Error('Please add the PUSHER_APP_ID environment variable.')
}

const pusherAppKey = process.env.PUSHER_APP_KEY
if (!pusherAppKey) {
  throw new Error('Please add the PUSHER_APP_KEY environment variable.')
}

const pusherAppSecret = process.env.PUSHER_APP_SECRET
if (!pusherAppSecret) {
  throw new Error('Please add the PUSHER_APP_SECRET environment variable.')
}

const pusher = new Pusher({
  appId: pusherAppId,
  key: pusherAppKey,
  secret: pusherAppSecret,
  cluster: 'us2',
  useTLS: true,
})

/**
 * Pushes an event when a round starts.
 */
export function generateAuth({
  channel,
  socketId,
  userId,
  userName,
}: {
  channel: string
  socketId: string
  userId: string
  userName: string
}) {
  return pusher.authenticate(socketId, channel, {
    user_id: userId,
    // @ts-ignore
    user_info: {
      name: userName,
    },
  })
}
