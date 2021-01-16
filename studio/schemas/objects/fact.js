export default {
  type: 'object',
  name: 'fact',
  title: 'Fact',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Value',
      name: 'value',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
