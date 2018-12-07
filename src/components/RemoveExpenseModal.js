import React from 'react';
import Modal from 'react-modal';

const RemoveExpenseModal = (props) => (
            <Modal 
               isOpen={!!props.showModal}
               onRequestClose={props.onClearSelectedExpense}
               contentLabel="Remove Expense"
               closeTimeoutMS={200}
               className="modal"
               >
               <div className="modal--title"><h3>Remove expense</h3></div>
               <div className="modal--content">
                    <div><p className="modal--body">Are you sure you want to remove this expense?</p></div>      
                    <div className="modal--actions">
                         <button className="button button--secondary" onClick={props.onClearSelectedExpense}>Cancel</button>
                         <button className="button button--warning" id="remove" onClick={props.onConfirm}>Remove</button>     
                    </div>
               </div>
               
            </Modal>
        
)

export default RemoveExpenseModal;