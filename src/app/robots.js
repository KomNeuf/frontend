import { MetadataRoute } from 'next'
 
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      disallow: '/dashboard',
      allow: "/"
    },
}
}