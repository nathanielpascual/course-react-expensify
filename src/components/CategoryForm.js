import React from 'react';

export default class CategoryForm extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            description: props.category? props.category.description : '',
            parentId : props.category? props.category.parentId : '0',
            error : ''
        }
    }
    onDescriptionChange = (e)=> {
        const description = e.target.value;
        this.setState(()=>({description}));
    };

    onSubmit =(e)=>{
        e.preventDefault();
        if(!this.state.description){
            this.setState(()=>({error:'Please provide description'}))
        }
        else{
            if(this.handleCheck(this.state.description).length > 0)
                 this.setState(()=>({error:'Category already exists.'}))
            else {
                this.setState(()=>({error:''}));
                this.props.onSubmit({
                    description : this.state.description,
                    parentId : this.state.parentId,
                })
           }
        }
    }

    handleCheck=(val)=>{
        return this.props.categories.filter((category)=> val=== category.description)
    }
    onCancel = (e)=> {
        e.preventDefault();
        this.props.onCancel();
    }
    
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
            {this.state.error && <p className="form__error">{this.state.error}</p>}
                <div className="form__body">
                    <input 
                        type="text"
                        className="text-input input__max-width"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}/>
                </div>
                <div className="form__footer-container">
                    <button className="button button--secondary" onClick={this.onCancel}>Cancel</button>
                    <button className="button">Save</button>
                 </div>
            </form>
        )
    };
}