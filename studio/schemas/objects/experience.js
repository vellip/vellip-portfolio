export default {
  type: 'object',
  name: 'experience',
  title: 'Experience',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Since',
      name: 'since',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Agency',
      name: 'agency',
      type: 'bioPortableText',
    },
  ],
  preview: {
    select: {
      title: 'since'
    }
  }
}
