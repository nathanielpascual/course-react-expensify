import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import CategoryListItem from './CategoryListItem';
import {startSetCategories} from '../actions/categories';
import SelectCategoryModal from './SelectCategoryModal';

class CategoryModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showSelectCategoryModal:false,
            category:''
        }
    }

    onCancel = () => {
        this.setState({showSelectCategoryModal:false});
    }

    onOpen =(category)=>{
        this.setState({category})
        this.setState({showSelectCategoryModal:true});
    }

    render(){
        return(
            <Modal 
               isOpen={!!this.props.showCategoryModal}
               onRequestClose={this.props.onCancel}
               contentLabel="Select Category"
               closeTimeoutMS={200}
               className="modal--list"
               >
               <div className="modal--title"><h3>Select Category</h3></div>
               <div className="modal--content">
                    <div className= "modal--body--list">
                       {this.props.categories.map((category)=> 
                            <CategoryListItem key={category.id} {...category} onOpen={this.onOpen}/>
                       )}
                    </div>      
                </div>
                { 
                    ( this.state.category !== '' &&
                        <SelectCategoryModal 
                            showSelectCategoryModal={this.state.showSelectCategoryModal}
                            categories={this.props.categories}
                            category={this.state.category}
                            onOpen={this.onOpen}/>
                    )
                }
            </Modal> 
        )
    };
}
const mapDispatchToProps = (dispatch) => ({
    startSetCategories : () => dispatch(startSetCategories())
 });
 

export default connect(undefined,mapDispatchToProps)(CategoryModal);