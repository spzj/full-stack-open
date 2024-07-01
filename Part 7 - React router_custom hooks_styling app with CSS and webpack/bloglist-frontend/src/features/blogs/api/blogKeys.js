const blogKeys = {
  all: ['blogs'],
  blog: (id) => [...blogKeys.all, id],
}

export default blogKeys
