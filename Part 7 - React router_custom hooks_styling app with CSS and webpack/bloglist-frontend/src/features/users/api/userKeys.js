const userKeys = {
  all: ['users'],
  user: (id) => [...userKeys.all, id],
}

export default userKeys
