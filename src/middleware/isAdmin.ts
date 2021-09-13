import { MyContext } from 'src/types'
import { MiddlewareFn } from 'type-graphql'

export const isAdmin: MiddlewareFn<MyContext> = ({ context }, next) => {
  // using slug to judge if admin user or not
  if (!(context.req.params.userName === 'admin')) {
    throw new Error('Not an admin user.')
  }

  return next()
}