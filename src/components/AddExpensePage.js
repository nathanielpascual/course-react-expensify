import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
    state = {
        formStatus : 'add'
    }
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push('/dashboard');
    }
    render(){
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        formStatus={this.formStatus}
                        categories = {this.props.categories}
                        onSubmit = {this.onSubmit}/>
                </div>
               
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    categories : state.categories
});

const mapDispatchToProps = (dispatch) => ({
    startAddExpense : (expense) => dispatch(startAddExpense(expense))
});
export default connect(mapStateToProps,mapDispatchToProps)(AddExpensePage);