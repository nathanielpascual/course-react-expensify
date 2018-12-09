import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({id,description,category,amount,createdAt}) =>(
    <Link className="list-item" to={`/edit/${id}`} >
        <div>
            <h3 className="list_item__title"> {description}</h3>
            <span className="list_item__sub-title">{category}</span>
        </div>
        <div>
            <span className="list_item__sub-title"> {moment(createdAt).format('ddd MM-DD-YYYY')} </span>
            <h3 className="list_item__data">{numeral(amount / 100).format('0,0.00')}</h3>
        </div>
        
    </Link>
);

export default ExpenseListItem;
