import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import RemoveExpenseModal from './RemoveExpenseModal';

export class EditExpensePage extends React.Component {
    state = {
        showModal : false,
        formStatus : 'edit'
    }

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/dashboard');
    };

    onRemove = () => {
   
        this.setState({showModal:true})
    };

    onConfirm = ()=> {
            this.props.startRemoveExpense({id:this.props.expense.id});
            this.setState({showModal:false})
            this.props.history.push('/dashboard');
        
    }

    onClearSelectedExpense= () => {
        this.setState({showModal:false})
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        formStatus={this.formStatus}
                        categories = {this.props.categories}
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}/>
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>  
                
                <RemoveExpenseModal 
                    showModal={this.state.showModal}
                    onClearSelectedExpense = {this.onClearSelectedExpense} 
                    onConfirm = {this.onConfirm}
                    />
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    expense : state.expenses.length !==undefined ? state.expenses.find((expense)=> expense.id === props.match.params.id) : state.expenses,
    categories : state.categories
});

const mapDispatchToProps = (dispatch) => ({
        startEditExpense : (id, expense) => dispatch(startEditExpense(id,expense)),
        startRemoveExpense : (data) => dispatch(startRemoveExpense(data))
});
export default connect(mapStateToProps,mapDispatchToProps)(EditExpensePage);