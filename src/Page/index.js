import React from 'react';
import classNames from 'classnames';
import { lowerCase } from 'lodash';
import './style.scss';

class Page extends React.Component {
  getClassNames() {
    const title = lowerCase(this.props.title);
    return classNames(
      'page',
      title,
      {
        show: this.props.page === title
      },
    );
  }

  render() {
    return (
      <div className={this.getClassNames()} children={this.props.children} />
    );
  }
}

export default Page;
