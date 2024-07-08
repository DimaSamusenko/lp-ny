import type { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  // create admin
  await payload.create({
    collection: 'users',
    data: {
      email: 'demo@payloadcms.com',
      password: 'demo',
    },
  })

  // create home page
  await Promise.all([
    await payload.create({
      collection: 'landings',
      data: {
        title: 'Home',
      },
    }),
  ])
}
