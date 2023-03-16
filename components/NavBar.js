import React from 'react'
import {View,TouchableOpacity,SafeAreaView, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
    main: PropTypes.bool,
};

const defaultProps = {
    main: false,
};

class NavBar extends React.PureComponent {

    render() {
        const {navigation, main} = this.props;
        return (
            <SafeAreaView>
                {main ? (
                    <View style={styles.mainnav}>
                    </View>
                ) :
                (<View>
                </View>)}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        height: 60,
        width: 40,
        padding: 4,
        marginLeft: 7,
    },
    mainnav: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    }
});

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;