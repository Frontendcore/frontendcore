module.exports = {
	options: {},
	main: {
		files: {
			'scss/_components.scss': [
				'components/**/*_pattern.scss',
				'components/**/*_main.scss'
			]
		}
	},
	screenXXXL: {
		files: {
			'scss/_components_screen-xxxl.scss': [
				'components/**/*_pattern.scss',
				'components/**/*_screen-xxxl*.scss',
				'components/**/*_desktop*.scss'
			]
		}
	},
	screenXXL: {
		files: {
			'scss/_components_screen-xxl.scss': [
				'components/**/*_pattern.scss',
				'components/**/*_screen-xxl*.scss',
				'components/**/*_desktop*.scss'
			]
		}
	},
	screenXL: {
		files: {
			'scss/_components_screen-xl.scss': [
				'components/**/*_pattern.scss',
				'components/**/*_screen-xl*.scss',
				'components/**/*_desktop*.scss'
			]
		}
	},
	screenL: {
		files: {
			'scss/_components_screen-l.scss': [
				'components/**/*_pattern.scss',
				'components/**/*_screen-l*.scss',
				'components/**/*_tablet*.scss'
			]
		}
	},
	screenM: {
		files: {
			'scss/_components_screen-m.scss': [
				'components/**/*_pattern.scss',
				'components/**/*_screen-m*.scss',
				'components/**/*_mobile*.scss'
			]
		}
	},
	screenS: {
		files: {
			'scss/_components_screen-s.scss': [
				'components/**/*_pattern.scss',
				'components/**/*_screen-s*.scss',
				'components/**/*_mobile*.scss'
			]
		}
	},
	screenXS: {
		files: {
			'scss/_components_screen-xs.scss': [
				'components/**/*_pattern.scss',
				'components/**/*_screen-xs*.scss',
				'components/**/*_mobile*.scss'
			]
		}
	}
}


