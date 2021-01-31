import {format} from 'date-fns'

export default {
  name: 'textPage',
  title: 'Text Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 120,
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      description: 'You can use this field to schedule projects where you show them',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'simplePortableText',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'projectPortableText',
    },
    {
      name: 'relatedPages',
      title: 'Related pages',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}, {type: 'textPage'}]}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
    },
    prepare({title = 'No title', publishedAt, slug = {}}) {
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        subtitle: publishedAt ? path : 'Missing publishing date',
      }
    },
  },
}
