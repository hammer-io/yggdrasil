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

  palette: {
    primary1Color: Colors.primary_u1,
    primary2Color: Colors.primary,
    primary3Color: Colors.neutdark,
    accent1Color: Colors.accent,
    accent2Color: Colors.neutlight,
    accent3Color: Colors.neutdark_d2,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.neutlight_u4,
    borderColor: Colors.neutlight,
    disabledColor: Colors.neutdark_u3,
    pickerHeaderColor: Colors.primary_u1,
    clockCircleColor: Colors.darkBlack,
    shadowColor: Colors.fullBlack,
    bodyBackground: Colors.neutlight,
    anchorColor: Colors.primary
  },

  // Setting default font family for all components
  fontFamily: 'Roboto',

  font: {
    family: {
      regular: 'Roboto',
      slab: 'Roboto Slab',
      heading: 'Skranji'
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
