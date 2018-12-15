import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux'
import CategoryForm from './CategoryForm';
import {startAddCategory,startSetCategories} from '../actions/categories';

class UpdateCategoryModal extends React.Component
{
   constructor(props){
      super(props);
   }
   
   onSubmit=(category)=> {  
      this.props.startAddCategory(category).then(()=>{
         let categories = this.props.startSetCategories();
         return categories.then((ref)=> {
            this.props.onUpdateCategory(ref);
         })
         
      });
      
   }

   render() {
   return (
            <Modal 
               isOpen={!!this.props.showCategoryModal}
               onRequestClose={this.props.onCancel}
               contentLabel="Add Category"
               closeTimeoutMS={200}
               className="modal"
               >
               <div className="modal--title"><h3>Add Category</h3></div>
               <div className="modal--content">
                    <div>
                       <CategoryForm onCancel={this.props.onCancel}
                                     onSubmit={this.onSubmit}
                                     categories={this.props.categories}></CategoryForm>
                    </div>      
                    
               </div>
               
            </Modal>
      )  
   }
}


const mapDispatchToProps = (dispatch) => ({
   startAddCategory : (category) => dispatch(startAddCategory(category)),
   startSetCategories : () => dispatch(startSetCategories())
});

export default connect(undefined,mapDispatchToProps)(UpdateCategoryModal);