const smartgrid = require('smart-grid');

module.exports = function smartGrid(cb) {
  smartgrid('./app/vendors/libs/smart-grid', {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
      maxWidth: '1250px', /* max-width оn very large screen */
      fields: '40px', /* side fields */
    },
    breakPoints: {
      lg: {
        width: '1100px', /* -> @media (max-width: 1100px) */
        fields: '40px', /* side fields */
      },
      md: {
        width: '960px',
        fields: '20px', /* side fields */
      },
      sm: {
        width: '780px',
        fields: '20px', /* side fields */
      },
      xs: {
        width: '560px',
        fields: '20px', /* side fields */
      },
      /*
       We can create any quantity of break points.

       some_name: {
       width: 'Npx',
       fields: 'N(px|%|rem)',
       offset: 'N(px|%|rem)'
       }
       */
    },
  });
  return cb();
};
