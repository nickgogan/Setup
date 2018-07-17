import React from 'react';
import { NavLink } from 'react-router-dom'; // eslint-disable-line

import styles from './Navigation.postcss';

function selectLinkStyle(size) {
  if (size === 'large') {
    return {
      margin: '1rem',
      padding: '0.5rem',
      fontSize: '1.5rem',
    };
  }
  return {};
}

function selectNavDirection(direction) {
  if (direction === 'vertical') {
    return {
      display: 'flex',
      flexDirection: 'column',
    };
  }
  return {};
}

const Navigation = props => (
  <nav className={styles.navbar} style={selectNavDirection(props.direction)}>
    <NavLink
      exact
      to='/'
      activeClassName={styles.activeLink}
      className={styles.link}
      style={selectLinkStyle(props.size)}
    >
      Home
    </NavLink>
    <NavLink
      to='/research'
      activeClassName={styles.activeLink}
      className={styles.link}
      style={selectLinkStyle(props.size)}
    >
      Research
    </NavLink>
    <NavLink
      to='/papers'
      activeClassName={styles.activeLink}
      className={styles.link}
      style={selectLinkStyle(props.size)}
    >
      Papers
    </NavLink>
    <NavLink
      to='/resources'
      activeClassName={styles.activeLink}
      className={styles.link}
      style={selectLinkStyle(props.size)}
    >
      Resources
    </NavLink>
    <NavLink
      to='/people'
      activeClassName={styles.activeLink}
      className={styles.link}
      style={selectLinkStyle(props.size)}
    >
      People
    </NavLink>
    {/* <NavLink
      to='/about'
      activeClassName={styles.activeLink}
      className={styles.link}
      style={selectLinkStyle(props.size)}
    >
      About
    </NavLink> */}
  </nav>
);

export default Navigation;
