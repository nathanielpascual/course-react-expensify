import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import CategoryListItem from './CategoryListItem';
import {startSetCategories} from '../actions/categories';

class SelectCategoryModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showSelectCategoryModal:false,
            category:''
        }
    }

    onCancel = () => {
        this.props.onCancel();
    }

    onOpen =()=>{
       
    }

    render(){
        return(
            <Modal 
               isOpen={!!this.props.showSelectCategoryModal}
               onRequestClose={this.props.onCancel}
               contentLabel="Select Category"
               closeTimeoutMS={200}
               className="modal--list"
               >
               <div className="modal--title"><h3>Select Category</h3></div>
              <div className="modal--content">
                    <div className= "modal--body--list">
                    <div className="modal--content--title"><strong>Main Category</strong></div>
                    <div className="modal--content--title__main">{this.props.category}</div>
                    <div className="modal--content--title"><strong>Sub Category</strong></div>
                       <div>
                       {this.props.categories
                                .filter((category)=>category.description===this.props.description) 
                                .map((category)=>
                                <CategoryListItem key={category.id} {...category} onOpen={this.onOpen}/>
                       )}
                       </div>
                    </div>      
                </div>
                
            </Modal> 
        )
    };
}
const mapDispatchToProps = (dispatch) => ({
    startSetCategories : () => dispatch(startSetCategories())
 });
 

export default connect(undefined,mapDispatchToProps)(SelectCategoryModal);