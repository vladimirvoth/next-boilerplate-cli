const fs = require('fs');

module.exports = {
  standardizeTitle: (title) => {
    const lowerCaseTitle = title.toLowerCase();

    return {
      title: lowerCaseTitle,
      className:
        lowerCaseTitle.charAt(0).toUpperCase() + lowerCaseTitle.slice(1)
    };
  },
  getTemplateConfig: (template) => {
    switch (template) {
      case 'page':
        return {
          template: 'page.txt',
          path: 'pages',
          fileSuffix: '.tsx',
          standardizedTitleType: 'title',
          replace: [{ regex: /className/g, newSubstr: 'className' }]
        };
      case 'test':
        return {
          template: 'test.txt',
          path: '__tests__',
          fileSuffix: '.test.tsx',
          standardizedTitleType: 'className',
          replace: [
            { regex: /className/g, newSubstr: 'className' },
            { regex: /title/g, newSubstr: 'title' }
          ]
        };
      case 'scss':
        return {
          template: 'scss.txt',
          path: 'styles',
          fileSuffix: '.module.scss',
          standardizedTitleType: 'className',
          replace: []
        };
      default:
        return {};
    }
  },
  useTemplate: (template, title, rootDir) =>
    new Promise((resolve) => {
      const standardizedTitleObj = module.exports.standardizeTitle(title);
      const templateConfig = module.exports.getTemplateConfig(template);

      fs.readFile(
        `${rootDir}/templates/${templateConfig.template}`,
        'utf8',
        (err, data) => {
          if (err) {
            return console.log(err);
          }

          let result = '';

          templateConfig.replace.map((replaceData) => {
            if (result === '') {
              result = data.replace(
                replaceData.regex,
                standardizedTitleObj[replaceData.newSubstr]
              );
            } else {
              result = result.replace(
                replaceData.regex,
                standardizedTitleObj[replaceData.newSubstr]
              );
            }
          });

          fs.writeFile(
            `./${templateConfig.path}/${
              standardizedTitleObj[templateConfig.standardizedTitleType]
            }${templateConfig.fileSuffix}`,
            !result ? data : result,
            'utf8',
            (err) => {
              if (err) return console.log(err);

              console.log(
                `${templateConfig.path}/${
                  standardizedTitleObj[templateConfig.standardizedTitleType]
                }${templateConfig.fileSuffix} successfully created!`
              );

              resolve();
            }
          );
        }
      );
    })
};
