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
      textAlign: 'left',
      display: 'inline-block',
      padding: 10,
      margin: 20,
      maxHeight: 500,
      overflow: 'auto'
    },
    descriptionText: {
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontSize: 16,
      display: 'inline',
      marginRight: 5,
      marginLeft: 5
    },
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerText: {
      fontFamily: 'Arial',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 30,
      display: 'inline-block',
      marginRight: 5,
      marginLeft: 5
    },
    bodyText: {
      fontFamily: 'Arial',
      fontWeight: 'normal',
      fontSize: 16,
      display: 'block',
      marginRight: 5,
      marginLeft: 5
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
