import React from 'react';
import classNames from 'classnames';
import { replace, lowerCase, includes } from 'lodash';
import './style.scss';

class Page extends React.Component {
  defaultProps = {
    page: 'home',
  }

  getClassNames() {
    const title = lowerCase(this.props.title);
    const page = replace(this.props.page || 'home', '/', '_');
    return classNames(
      'page',
      title,
      `page-${page}`,
      {
        show: includes(page, title),
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
