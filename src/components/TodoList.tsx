import React from 'react';
import TodoItem from './TodoItem';

interface Props{

}

interface TodoItemState{
    id: number;
    text: string;
    done: boolean;
}

interface State{
    input: string;
    todoItems: TodoItemState[];
}

class TodoList extends React.Component<Props, State>{
    nextTodoId: number = 0;

    state:State = {
        input: '',
        todoItems: []
    }

    onToggle = (id: number): void =>{
        const { todoItems } = this.state;
        const nextTodoItems: TodoItemState[] = todoItems.map( item => {
            if(item.id === id){
                item.done = !item.done
            }
            return item;
        })

        this.setState({
            todoItems: nextTodoItems
        })
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { todoItems, input } = this.state;
        const newItem:TodoItemState = { id: this.nextTodoId++, text: input, done: false};
        const nextTodoItems:TodoItemState[] = todoItems.concat(newItem);
        this.setState({
            input: '',
            todoItems: nextTodoItems
        });
    }

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { value } = e.currentTarget;

        this.setState({
            input: value
        });
    }

    onRemove = (id: number): void => {
        const { todoItems } = this.state;
        const nextTodoItems: TodoItemState[] = todoItems.filter( item => item.id !== id);
        this.setState({
            todoItems: nextTodoItems
        });
    }

    render(){
        const { onChange, onToggle, onRemove } = this;
        const { input, todoItems } = this.state;

        const todoItemList: React.ReactElement[] = todoItems.map(
            todo => (
                <TodoItem
                    key={todo.id}
                    done={todo.done}
                    text={todo.text}
                    onToggle={()=> onToggle(todo.id)}
                    onRemove={()=> onRemove(todo.id) }
                />
            )
        );

        return (
            <div>
                <h1>hi</h1>
                <form onSubmit={this.onSubmit} >
                    <input onChange={onChange} value={input} />
                    <button type="submit">추가하기</button>
                </form>
                <ul>
                    { todoItemList }
                </ul>
            </div>
            
        )
    }

}

export default TodoList;