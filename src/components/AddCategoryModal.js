import React from 'react';
import Modal from 'react-modal';
import CategoryForm from './CategoryForm';

const AddCategoryModal = (props) => (
            <Modal 
               isOpen={!!props.showCategoryModal}
               onRequestClose={props.onClearSelectedExpense}
               contentLabel="Add Category"
               closeTimeoutMS={200}
               className="modal"
               >
               <div className="modal--title"><h3>Add Category</h3></div>
               <div className="modal--content">
                    <div><p className="modal--body">
                       <CategoryForm></CategoryForm>
                    </p>
                    </div>      
                    
               </div>
               
            </Modal>
        
)

export default AddCategoryModal;