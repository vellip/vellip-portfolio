import { MdInfo } from "react-icons/md";

export default {
  name: 'aboutPage',
  type: 'document',
  title: 'About Page',
  icon: MdInfo,
  __experimental_actions: [
    //'create',
    'update',
    // 'delete',
    'publish'
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your portfolio for search engines and social media.'
    },
    {
      name: 'experience',
      type: 'array',
      title: 'Experience',
      of: [{type: 'experience'}]
    },
    {
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [{type: 'skill'}]
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{type: 'person'}]
    }
  ]
}
