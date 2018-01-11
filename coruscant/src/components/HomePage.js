import React, {Component} from 'react';
import theme from "../../style/theme.js";
class HomePage extends Component {
    componentDidMount() {
        document.title = "Hammer.io";
    }

    render() {
        return (
            <div style={theme.simplePadding}>
                <h4>Welcome to Hammer-io</h4>
            </div>
        );
    }
}
export default HomePage;