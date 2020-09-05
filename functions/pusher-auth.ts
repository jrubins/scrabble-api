// eslint-disable-next-line require-path-exists/exists
import { Handler } from 'aws-lambda'

import { STATUS_CODES } from './utils/types'
import { generateAuth } from './utils/realtime'
import { info } from './utils/logs'
import { makeResponse } from './utils/api'
import { stringToObject } from './utils/general'

interface PusherAuthBody {
  channel_name: string
  socket_id: string
  userId: string
  userName: string
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return makeResponse({ statusCode: STATUS_CODES.OK })
  }

  const data = stringToObject({
    propDelimiter: '&',
    valueDelimiter: '=',
    value: event.body,
  }) as PusherAuthBody
  const { channel_name: channel, socket_id: socketId, userId, userName } = data
  info('Authenticating Pusher request.', { data })

  const pusherAuth = generateAuth({ channel, socketId, userId, userName })
  info('Successfully generated auth for Pusher requests.', pusherAuth)

  return makeResponse({
    body: pusherAuth,
    statusCode: STATUS_CODES.OK,
  })
}
