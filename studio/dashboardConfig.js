export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '60009f11f9689835ae1830ad',
                  title: 'Sanity Studio',
                  name: 'vellip-portfolio-studio',
                  apiId: '2ad64916-3a9b-434d-8961-961b670063b8'
                },
                {
                  buildHookId: '60009f11f9689837ba182f1b',
                  title: 'Portfolio Website',
                  name: 'vellip-portfolio',
                  apiId: '6b97c070-219a-458f-b8d1-2f171c77aa32'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/vellip/vellip-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://vellip-portfolio.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    }
  ]
}
