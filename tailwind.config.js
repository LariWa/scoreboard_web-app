module.exports = {
	theme: {
	  extend: {
		spacing: {
		  7: '1.75rem',
		},
	  },
	},
	variants: {
		opacity: ({ after }) => after(['disabled']),
	  backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
	  textColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
	},
	plugins: [],
  }
  