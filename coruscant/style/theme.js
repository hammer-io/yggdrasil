import * as Colors from './colors'

const theme = {
  padding: {
    tiny: 16,
    small: 24,
    regular: 32,
    large: 48
  },

  projectDetails: {
    header: {
      padding: 20,
      margin: 20
    },
    headerText: {
      fontSize: 30
    }
  },

  colors: Colors,

  font: {
    family: {
      regular: 'Roboto'
    },

    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      heavy: 600
    },

    small: {
      size: 12,
      lineHeight: 16
    },
    regular: {
      size: 14,
      lineHeight: 20
    },
    large: {
      size: 16,
      lineHeight: 24
    },
    xlarge: {
      size: 20,
      lineHeight: 32
    }
  }
}

export default theme
