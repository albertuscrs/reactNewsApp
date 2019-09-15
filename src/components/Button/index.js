import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ onClick, children, className='' }) =>
    <button
      className={ className }
      onClick={ onClick }>
      { children }
    </button>

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

Button.defaulProps = {
  className: ''
}

export const Loading = () =>
  <div className='col-md-6 offset-md-3'>
    <h3>Loading...</h3>
  </div>

export const Sort = ({ sortKey, onSort, children, className, activeSortKey }) =>
 {
   const sortClass = ['btn btn-outline-dark'];

   if(sortKey === activeSortKey){
     sortClass.push('btn btn-warning');
   }
  return(
    <Button
      className={ sortClass.join(' ') }
      onClick={ () => onSort(sortKey) }
      activeSortKey={ sortKey }
      >
      { children }
    </Button>
  )
 }