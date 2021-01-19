export default {
  type: 'object',
  name: 'skill',
  title: 'Skill',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      type: 'bioPortableText',
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
