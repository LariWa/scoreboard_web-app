module.exports = {
	theme: {
	  extend: {
		spacing: {
		  7: '1.75rem',
		},
	  },
	},
	safelist: [
		'text-yellow-500',
		'text-green-500',
		'text-red-500',
	  ],
	variants: {
		opacity: ({ after }) => after(['disabled']),
	  backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
	  textColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
	},
	plugins: [],
  }
  