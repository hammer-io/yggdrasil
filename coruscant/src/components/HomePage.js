import React, {Component} from 'react';
const styles = {
    padding: {
        padding: 20
    }
};
class HomePage extends Component {
    componentDidMount() {
        document.title = "Hammer.io";
    }

    render() {
        return (
            <div style={styles.padding}>
                <h4>Welcome to Hammer-io</h4>
            </div>
        );
    }
}
export default HomePage;