import React from 'react';
import { Menu, Icon, Sidebar } from 'semantic-ui-react'; // eslint-disable-line

import Navigation from '../../containers/Navigation/Navigation';
import SiteLogo from '../../components/SiteLogo/SiteLogo';
import Routes from '../../Views/Routes';
import Footer from '../../containers/Footer/MobileFooter';
import styles from './Mobile.postcss';

function setHeaderDistances(size) {
  if (size === 'small') {
    return {
      width: '80%',
      marginBottom: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    };
  }
  return {
    width: '90%',
    marginBottom: '3rem',
    marginLeft: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };
}

function setIconDistances(size) {
  if (size === 'small') {
    return {
      position: 'relative',
      top: '1.25rem',
      marginRight: '0.75rem',
    };
  }
  return {
    position: 'relative',
    top: '1.25rem',
    marginRight: '1.5rem',
  };
}

export default class Mobile extends React.Component {
  state = {
    menuVisible: false,
  };

  togglePanel = () => {
    this.setState({ menuVisible: !this.state.menuVisible, });
  };

  render() {
    return (
      <div className={styles.container}>
        <div style={setHeaderDistances(this.props.size)}>
          <div style={setIconDistances(this.props.size)}>
            <Icon
              name='sidebar'
              className={styles.icon}
              onClick={() =>
                this.setState({ menuVisible: !this.state.menuVisible, })
              }
            />
          </div>
          <SiteLogo>
            <a href='/' />
          </SiteLogo>
        </div>

        <Sidebar.Pushable attached='bottom'>
          <Sidebar
            width='thin'
            as={Menu}
            animation='overlay'
            visible={this.state.menuVisible}
            icon='labeled'
            vertical
            direction='left'
            className={styles.sidebar}
          >
            <Menu.Item
              onClick={() =>
                this.setState({ menuVisible: !this.state.menuVisible, })
              }
            >
              <Navigation size='large' direction='vertical' />
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={this.state.menuVisible}>
            <Routes />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Footer />
      </div>
    );
  }
}
