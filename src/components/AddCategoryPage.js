import React from 'react';
import {connect} from 'react-redux';
import CategoryForm from './CategoryForm';
import { startAddCategory } from '../actions/categories';

export class AddCategoryPage extends React.Component {
    onSubmit = (category) => { React.Component 
        this.props.startAddCategory(category);
        this.props.history.push('/dashboard');
    }
    render(){
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Category</h1>
                    </div>
                </div>
                <div className="content-container">
                    <CategoryForm 
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
    startAddCategory : (category) => dispatch(startAddCategory(category))
});
export default connect(mapStateToProps,mapDispatchToProps)(AddCategoryPage);