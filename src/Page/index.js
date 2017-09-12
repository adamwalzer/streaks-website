import React from 'react';
import classNames from 'classnames';
import { lowerCase, includes } from 'lodash';
import './style.scss';

class Page extends React.Component {
  defaultProps = {
    page: 'home',
  }

  getClassNames() {
    const title = lowerCase(this.props.title);
    return classNames(
      'page',
      title,
      `page-${this.props.page}`,
      {
        show: includes(title, this.props.page),
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
