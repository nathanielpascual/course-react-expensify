import React from 'react';

export default class CategoryForm extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            description: props.category? props.category.description : '',
            parentId : props.category? props.category.parentId : '',
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
            this.setState(()=>({error:''}));
            this.props.onSubmit({
                description : this.state.description,
                parentId : this.state.parentId,
            })
        }
    }

    onCancel = (e)=> {
        e.preventDefault();
    }
    
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
            {this.state.error && <p className="form__error">{this.state.error}</p>}
                <div className="field">
                    <input 
                        type="text"
                        className="text-input input__max-width"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}/>
                </div>
                <div>
                    <button className="button--secondary">Cancel</button>
                    <button className="button">Save</button>
                 </div>
            </form>
        )
    };
}