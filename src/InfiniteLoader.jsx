import React, {Component} from 'react';
import PropTypes from 'prop-types';

class InfiniteLoader extends Component {

  state = {
    showLoader: false,
    showEndOfResults: false
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  showEndOfResults = () => {
    this.setState({showEndOfResults: true});
  }

  showLoader = () => {
    this.setState({showLoader: true});
  }

  hideLoader = () => {
    this.setState({showLoader: false});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children != nextProps.children) {
      this.hideLoader();
    }
  }

  isBottom(el) {
    return el
      .getBoundingClientRect()
      .bottom <= window.innerHeight;
  }

  trackScrolling = () => {

    if (this.isBottom(this.wrappedElement)) {
      console.log('hasReachedBottom');
      const {fetchMoreData, hasMoreItems} = this.props;
      if (hasMoreItems) {
        this.showLoader();
        fetchMoreData();
      } else {
        const {endOfResultsRender} = this.props;
        if (endOfResultsRender) {
          this.showEndOfResults();
        }
      }
    }
  };

  render() {
    const {fetchMoreData, hasMoreItems, customLoader, endOfResultsRender} = this.props;
    const {showLoader, showEndOfResults} = this.state;
    return (
      <div ref ={node => this.wrappedElement = node} className="infinite-loader">
        {this.props.children}
        {showLoader && customLoader}
        {showEndOfResults && endOfResultsRender}
      </div>

    );
  }
}

InfiniteLoader.propTypes = {};

export default InfiniteLoader;