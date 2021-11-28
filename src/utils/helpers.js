export function getImage(id) {
  let images = require.context('@/assets/images/')
  return images(`./image-product-${id}.jpg`)
}